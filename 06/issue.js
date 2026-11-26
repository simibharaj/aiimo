(() => {
  "use strict";
  const $ = (selector, element = document) => element.querySelector(selector);
  const $$ = (selector, element = document) => Array.from(element.querySelectorAll(selector));
  const clamp = (x, min = 0, max = 1) => Math.max(min, Math.min(max, x));
  const names = JSON.parse($("#courses-data").textContent);
  const layers = $$(".layer");
  const sections = $$("[data-scene]");
  const root = document.documentElement;
  const cinema = $(".cinema");
  const footer = $("#gratitude");
  const progress = $(".progress i");
  const mastDate = $(".mast-date");
  const tally = $(".tally");
  const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const storeKey = "aiimo-thanksgiving-06-v1";
  let saved;
  try { saved = JSON.parse(sessionStorage.getItem(storeKey) || "{}") || {}; } catch { saved = {}; }
  let total = Number.isSafeInteger(saved.total) && saved.total >= 0 ? saved.total : 0;
  let motionOverride = typeof saved.motion === "boolean" ? saved.motion : null;
  let hasMotion = motionOverride ?? !motionQuery.matches;
  let offsets = [];
  let footerStart = 0;
  let viewHeight = 0;
  let scheduled = false;
  let current = 0;
  const activeLayers = new Set();
  const nearPreviews = new Set();
  const shots = layers.map((layer, idx) => {
    const section = sections[idx];
    const data = names[idx - 1];
    const record = data ? (saved.dishes?.[data.key] || {}) : {};
    const opened = Number.isInteger(record.opened) ? clamp(record.opened, 0, 3) : 0;
    return {
      layer, section, data, opened,
      version: Number.isInteger(record.version) ? clamp(record.version, 0, opened) : 0,
      vote: [0, 1].includes(record.vote) ? record.vote : -1,
      img: $(".plate-art", layer), arrival: $(".arrival", section),
      cameraSrc: layer.dataset.camera, mutationSrc: layer.dataset.mutation,
      camera: null, mutation: null, holding: false, startingMutation: false, cameraGoal: 0,
      artToken: 0, sequence: 0, lastLoaded: "", preloaded: false, active: false,
    };
  });

  function persist() {
    const dishes = {};
    for (const shot of shots.slice(1)) {
      dishes[shot.data.key] = { version: shot.version, opened: shot.opened, vote: shot.vote };
    }
    try { sessionStorage.setItem(storeKey, JSON.stringify({ total, motion: motionOverride, dishes })); } catch {}
  }

  function tallyUp() {
    const unit = total === 1 ? "time" : "times";
    $("b", tally).textContent = total;
    $("span", tally).textContent = unit;
    $("#total-end").textContent = total + " " + unit + ".";
  }

  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(frame); }
  }

  function putArt(shot, version, animate) {
    if (!shot.data) return;
    const src = "assets/" + shot.data.key + "-r" + version + ".webp";
    if (shot.lastLoaded === src) return;
    shot.lastLoaded = src;
    shot.layer.style.setProperty("--ambience", "url('" + src + "')");
    const token = ++shot.artToken;
    const previous = shot.img;
    // Only display a decoded replacement. A rapid second tap can supersede it.
    if (!previous.hasAttribute("src")) { previous.src = src; return; }
    const next = new Image();
    next.alt = "";
    next.decoding = "async";
    next.className = "plate-art new-art";
    next.src = src;
    function swap() {
      if (token !== shot.artToken) return;
      for (const image of $$(".plate-art", shot.layer)) {
        if (image !== previous) image.remove();
      }
      shot.layer.append(next);
      shot.img = next;
      if (!animate || !hasMotion) {
        next.className = "plate-art";
        previous.remove();
        return;
      }
      requestAnimationFrame(() => requestAnimationFrame(() => next.classList.add("arrived")));
      setTimeout(() => {
        if (next === shot.img) next.className = "plate-art";
        previous.remove();
      }, 520);
    }
    if (next.decode) next.decode().then(swap).catch(() => {});
    else if (next.complete) swap();
    else next.addEventListener("load", swap, { once: true });
  }

  function makeFilm(shot, which) {
    const source = which === "camera" ? shot.cameraSrc : shot.mutationSrc;
    if (shot[which] || !source || !hasMotion) return shot[which];
    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("aria-hidden", "true");
    video.disablePictureInPicture = true;
    shot[which] = video;
    shot.layer.append(video);
    video.addEventListener("loadedmetadata", () => {
      video.classList.toggle("portrait", video.videoHeight > video.videoWidth);
      if (which === "camera") seekCamera(shot);
      schedule();
    });
    video.addEventListener("loadeddata", () => {
      if (which === "camera") seekCamera(shot);
      schedule();
    });
    video.addEventListener("error", () => {
      video.classList.remove("visible");
      if (which === "camera") shot.section.classList.remove("with-camera");
      if (which === "mutation") {
        shot.holding = false;
        shot.startingMutation = false;
        putArt(shot, shot.version, false);
      }
      schedule();
    });
    if (which === "camera") video.addEventListener("seeked", () => seekCamera(shot));
    video.src = source;
    return video;
  }

  function seekCamera(shot) {
    const video = shot.camera;
    if (!video || !hasMotion || shot.version !== 0 || video.error || !Number.isFinite(video.duration)) return;
    const time = shot.cameraGoal * Math.max(0, video.duration - 0.045);
    if (video.readyState >= 2 && shot.active) video.classList.add("visible");
    if (!video.seeking && Math.abs(video.currentTime - time) > 0.045) {
      try { video.currentTime = time; } catch { /* Metadata will trigger another seek. */ }
    }
  }

  function showShot(index, opacity) {
    const shot = shots[index];
    shot.active = true;
    shot.layer.style.visibility = "visible";
    shot.layer.style.opacity = opacity.toFixed(3);
    if (!shot.startingMutation) putArt(shot, shot.version, false);
    if (hasMotion && shot.version === 0 && shot.cameraSrc) {
      makeFilm(shot, "camera");
      seekCamera(shot);
    }
  }

  function hideShot(shot) {
    shot.active = false;
    shot.layer.style.visibility = "hidden";
    shot.layer.style.opacity = "0";
    if (shot.mutation && !shot.mutation.paused) shot.mutation.pause();
    // A reader who has moved past a mutation comes back to the final plate.
    if (shot.startingMutation || (shot.holding && !shot.mutation?.ended)) {
      shot.sequence++;
      shot.holding = false;
      shot.startingMutation = false;
      shot.mutation?.classList.remove("visible");
      putArt(shot, shot.version, false);
    }
  }

  function frame() {
    scheduled = false;
    const y = Math.max(0, window.scrollY);
    let index = 0;
    for (let i = 1; i < offsets.length && offsets[i] <= y; i++) index = i;
    current = index;
    const atEnd = y >= footerStart;
    const band = viewHeight * 0.52;
    const next = index + 1;
    const mix = next < shots.length ? clamp((y + band - offsets[next]) / band) : 0;
    const visible = new Set(atEnd ? [] : [index]);
    if (mix > 0 && !atEnd) visible.add(next);
    for (const i of activeLayers) if (!visible.has(i)) hideShot(shots[i]);
    activeLayers.clear();
    for (const i of visible) {
      const shot = shots[i];
      if (i === 0) {
        const part = shot.cameraSrc && shot.cameraSrc === shots[1].cameraSrc ? 0.4 : 1;
        shot.cameraGoal = clamp(y / Math.max(1, offsets[1])) * part;
      } else {
        const travel = Math.max(0, shot.arrival.offsetHeight - viewHeight);
        const p = clamp((y - offsets[i] + band) / Math.max(1, band + travel));
        const from = i === 1 && shot.cameraSrc && shot.cameraSrc === shots[0].cameraSrc ? 0.4 : 0;
        shot.cameraGoal = from + p * (1 - from);
      }
      showShot(i, i === next ? (hasMotion ? mix : Number(mix > 0.5)) : 1);
      activeLayers.add(i);
    }
    const afterCover = y > (offsets[1] - band * 0.55);
    root.classList.toggle("reading-issue", afterCover);
    mastDate.hidden = afterCover || total > 0;
    tally.hidden = !mastDate.hidden;
    const reading = index > 0 ? clamp((y - offsets[index] - Math.max(0, shots[index].arrival.offsetHeight - viewHeight)) / (viewHeight * .45)) : 0;
    cinema.style.setProperty("--ink-density", reading.toFixed(2));
    progress.style.transform = "scaleX(" + clamp(y / Math.max(1, document.documentElement.scrollHeight - viewHeight)) + ")";
    // Warm the next cover without downloading six films on first paint.
    if (shots[next] && !shots[next].preloaded) {
      shots[next].preloaded = true;
      putArt(shots[next], shots[next].version, false);
    }
  }

  function measure() {
    offsets = sections.map(el => el.getBoundingClientRect().top + window.scrollY);
    footerStart = footer.getBoundingClientRect().top + window.scrollY;
    viewHeight = document.documentElement.clientHeight || window.innerHeight;
    schedule();
  }

  function updateControls(shot) {
    const { section, version, opened, data } = shot;
    $(".page-number", section).textContent = (version + 1) + " / 4";
    $(".previous", section).disabled = version === 0;
    $(".next-version", section).disabled = version >= opened;
    $(".caption", section).textContent = data.caps[version];
    $(".plate-description", section).textContent = data.alt[version];
    $$(".choice", section).forEach((button, i) => button.setAttribute("aria-pressed", String(shot.vote === i)));
  }

  function changeVersion(shot, version, generate) {
    const sequence = ++shot.sequence;
    const oldVersion = shot.version;
    shot.version = version;
    shot.opened = Math.max(shot.opened, version);
    shot.holding = false;
    shot.startingMutation = false;
    shot.mutation?.pause();
    shot.mutation?.classList.remove("visible");
    if (generate) total++;
    updateControls(shot);
    tallyUp();
    persist();
    const playMutation = generate && oldVersion === 0 && version === 1 && hasMotion && shot.mutationSrc;
    if (playMutation) {
      const film = makeFilm(shot, "mutation");
      shot.startingMutation = true;
      const reveal = () => {
        if (shot.sequence !== sequence || !shot.active) return;
        shot.holding = true;
        shot.startingMutation = false;
        film.classList.add("visible");
        shot.camera?.classList.remove("visible");
        putArt(shot, version, false);
      };
      film.currentTime = 0;
      film.addEventListener("playing", reveal, { once: true });
      film.play().catch(() => {
        if (shot.sequence !== sequence) return;
        shot.startingMutation = false;
        shot.camera?.classList.remove("visible");
        putArt(shot, version, false);
      });
    } else {
      shot.camera?.classList.remove("visible");
      putArt(shot, version, true);
    }
    schedule();
  }

  for (const shot of shots.slice(1)) {
    const section = shot.section;
    updateControls(shot);
    $(".regenerate", section).addEventListener("click", () => {
      const version = shot.opened < 3 ? shot.opened + 1 : (shot.version + 1) % 4;
      changeVersion(shot, version, true);
    });
    $(".previous", section).addEventListener("click", () => changeVersion(shot, shot.version - 1, false));
    $(".next-version", section).addEventListener("click", () => changeVersion(shot, shot.version + 1, false));
    $$(".choice", section).forEach((button, i) => button.addEventListener("click", () => {
      shot.vote = i;
      updateControls(shot);
      persist();
    }));
  }

  function previewPlayback(video, on) {
    if (!on || !hasMotion || document.hidden) { video.pause(); return; }
    if (!video.hasAttribute("src")) video.src = video.dataset.src;
    video.muted = true;
    video.play().catch(() => {});
  }
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) nearPreviews.add(entry.target); else nearPreviews.delete(entry.target);
        previewPlayback(entry.target, entry.isIntersecting);
      });
    }, { threshold: 0.18 });
    $$(".footer-film").forEach(video => observer.observe(video));
    // The portfolio preview is a still capture that glides. It only moves while it is on screen.
    const panObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("in-view", entry.isIntersecting));
    }, { threshold: 0.18 });
    $$(".site-pan").forEach(image => panObserver.observe(image.parentElement));
  } else {
    $$(".site-pan").forEach(image => image.parentElement.classList.add("in-view"));
  }

  function applyMotion() {
    hasMotion = motionOverride ?? !motionQuery.matches;
    root.classList.toggle("still-motion", !hasMotion);
    const control = $("#motion");
    control.textContent = hasMotion ? "Pause motion" : "Play motion";
    control.setAttribute("aria-pressed", String(!hasMotion));
    for (const shot of shots) {
      shot.section.classList.toggle("with-camera", Boolean(shot.data && hasMotion && shot.cameraSrc && !shot.camera?.error));
      if (!hasMotion) {
        shot.sequence++;
        shot.holding = false;
        shot.startingMutation = false;
        shot.mutation?.pause();
        shot.mutation?.classList.remove("visible");
        shot.camera?.classList.remove("visible");
      }
    }
    nearPreviews.forEach(video => previewPlayback(video, true));
    measure();
  }
  $("#motion").addEventListener("click", () => { motionOverride = !hasMotion; applyMotion(); persist(); });
  motionQuery.addEventListener?.("change", applyMotion);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) shots.forEach(shot => shot.mutation?.pause());
    else if (shots[current].holding && !shots[current].mutation?.ended && hasMotion) shots[current].mutation?.play().catch(() => {});
    nearPreviews.forEach(video => previewPlayback(video, true));
  });

  const fields = [$("#g1"), $("#g2"), $("#g3")];
  const name = $("#gname");
  const form = $(".place-fields");
  const status = $(".save-status");
  function syncPaper() {
    fields.forEach((field, i) => { $("#line-" + (i + 1)).textContent = field.value.trim() || "…"; });
    $("#paper-signature").textContent = name.value.trim() ? "With love, " + name.value.trim() : "";
  }
  form.addEventListener("input", () => { syncPaper(); status.textContent = ""; });
  form.addEventListener("reset", () => setTimeout(() => { syncPaper(); status.textContent = ""; }, 0));
  $$(".suggestions button").forEach(button => button.addEventListener("click", () => {
    const field = fields.find(el => !el.value.trim());
    if (!field) { status.textContent = "Your card is full. Edit a line to change it."; return; }
    field.value = button.textContent;
    status.textContent = "";
    syncPaper();
  }));

  function linesFor(ctx, text, width) {
    const lines = [];
    let line = "";
    for (const word of text.split(/\s+/)) {
      const candidate = line ? line + " " + word : word;
      if (ctx.measureText(candidate).width <= width) { line = candidate; continue; }
      if (line) { lines.push(line); line = ""; }
      for (const letter of Array.from(word)) {
        if (line && ctx.measureText(line + letter).width > width) { lines.push(line); line = ""; }
        line += letter;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  async function drawCard() {
    if (document.fonts) await Promise.all(["400 42px Caslon", "italic 400 50px Caslon", "600 24px Schibsted"].map(f => document.fonts.load(f).catch(() => [])));
    const canvas = document.createElement("canvas");
    canvas.width = 1080; canvas.height = 1920;
    const ctx = canvas.getContext("2d");
    const paper = { x: 100, y: 340, w: 880, h: 1230 };
    const background = new Image();
    background.src = $("#card-photo").content.textContent.trim();
    try { await background.decode(); ctx.drawImage(background, 0, 0, 1080, 1920); }
    catch { ctx.fillStyle = "#13291f"; ctx.fillRect(0, 0, 1080, 1920); }
    ctx.fillStyle = "rgba(9,23,15,.46)"; ctx.fillRect(0, 0, 1080, 1920);
    ctx.fillStyle = "white"; ctx.fillRect(paper.x, paper.y, paper.w, paper.h);
    for (const [inset, color, weight] of [[19, "#172642", 3], [32, "#ad8742", 2]]) {
      ctx.strokeStyle = color; ctx.lineWidth = weight;
      ctx.strokeRect(paper.x + inset, paper.y + inset, paper.w - inset * 2, paper.h - inset * 2);
    }
    ctx.fillStyle = "#a47e38"; ctx.fillRect(420, 472, 87, 2); ctx.fillRect(573, 472, 87, 2);
    ctx.save(); ctx.translate(540, 473); ctx.rotate(Math.PI / 4); ctx.fillRect(-7, -7, 14, 14); ctx.restore();
    ctx.textAlign = "center"; ctx.fillStyle = "#192a43"; ctx.font = "600 29px Schibsted, Arial";
    ctx.fillText("Thanksgiving 2026", 540, 558);
    ctx.font = "italic 400 52px Caslon, Georgia"; ctx.fillText("This year I’m grateful for", 540, 644, 735);
    fields.forEach((field, i) => {
      const top = 750 + i * 190;
      ctx.textAlign = "left"; ctx.fillStyle = "#927034"; ctx.font = "italic 400 37px Caslon, Georgia";
      ctx.fillText(["i.", "ii.", "iii."][i], 195, top + 28);
      const text = field.value.trim() || "…";
      let size = 43, lines = [];
      for (; size >= 24; size--) {
        ctx.font = "400 " + size + "px Caslon, Georgia";
        lines = linesFor(ctx, text, 610);
        if (lines.length <= 3) break;
      }
      ctx.fillStyle = "#17243c";
      lines.forEach((line, j) => ctx.fillText(line, 264, top + 28 + j * (size + 8)));
      ctx.strokeStyle = "#a3a7af"; ctx.lineWidth = 2; ctx.setLineDash([3, 7]);
      ctx.beginPath(); ctx.moveTo(195, top + 145); ctx.lineTo(885, top + 145); ctx.stroke(); ctx.setLineDash([]);
    });
    ctx.textAlign = "center"; ctx.fillStyle = "#1b2941"; ctx.font = "italic 400 45px Caslon, Georgia";
    if (name.value.trim()) ctx.fillText("With love, " + name.value.trim(), 540, 1392, 690);
    ctx.fillStyle = "#4d5561"; ctx.font = "500 25px Schibsted, Arial";
    ctx.fillText("ai, in my opinion · edition 06", 540, 1483);
    ctx.fillStyle = "#fff"; ctx.font = "400 26px Schibsted, Arial";
    ctx.fillText("The only part of Thanksgiving you can’t regenerate.", 540, 1770, 920);
    return new Promise((resolve, reject) => canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error("PNG unavailable")), "image/png"));
  }
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const button = $("#save-card");
    button.disabled = true;
    status.textContent = "Preparing your place card…";
    try {
      const blob = await drawCard();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url; link.download = "My Thanksgiving place card.png"; link.textContent = "Download the PNG";
      status.replaceChildren(link);
      link.click();
      // Leave a visible download in case the browser requires another user gesture.
      window.addEventListener("pagehide", () => URL.revokeObjectURL(url), { once: true });
    } catch { status.textContent = "The image couldn’t save. Your place card is still here. Try again."; }
    finally { button.disabled = false; }
  });

  const share = $("#share");
  const canonical = $('link[rel="canonical"]').href;
  if (/^(simibharaj\.me|simibharaj\.github\.io)$/.test(location.hostname) && /\/aiimo\/06\/?(?:index\.html)?$/.test(location.pathname)) {
    share.hidden = false;
    share.addEventListener("click", async () => {
      try {
        if (navigator.share) await navigator.share({ url: canonical, title: "The perfect Thanksgiving. Generated." });
        else { await navigator.clipboard.writeText(canonical); $("#share-status").textContent = "Dinner link copied."; }
      } catch (error) { if (error.name !== "AbortError") $("#share-status").textContent = canonical; }
    });
  }
  root.classList.add("enhanced");
  tallyUp();
  syncPaper();
  applyMotion();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", measure, { passive: true });
  window.addEventListener("pageshow", measure);
  document.fonts?.ready.then(measure);
  if ("ResizeObserver" in window) new ResizeObserver(measure).observe(document.querySelector("main"));
})();
