// PortoFX Core Engine — Spring physics + Dual-Preset (Sketch & Fire) 2D Canvas VFX
// Tailored to Adip Habibullah's "Playful Tactile Sketchbook & Design-Canvas" portfolio.
// Zero dependencies, SSR-safe, zero-idle-loop, prefers-reduced-motion aware.

const TAU = Math.PI * 2;
const MAX_LIVE = 180;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rnd = (a = 1, b) => (b === undefined ? Math.random() * a : a + Math.random() * (b - a));
const out = (t) => 1 - (1 - t) ** 3;
const inn = (t) => t * t * t;
const back = (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;

const hasBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

export const PALETTE = {
  ink: '#111111',
  paper: '#ffffff',
  fog: '#f7f7f5',
  line: '#deded9',
  blue: '#1557ff',
  softBlue: '#b8d8ff',
  orange: '#ff5a0a',
  yellow: '#ffe45c',
};

export class Spring {
  constructor(x = 0, k = 300, d = 20) {
    this.x = x;
    this.v = 0;
    this.to = x;
    this.k = k;
    this.d = d;
  }
  step(dt) {
    if (!(dt > 0)) return this.x;
    const safeDt = Math.min(dt, 0.25);
    const n = Math.max(1, Math.ceil(safeDt / 0.008));
    const h = safeDt / n;
    for (let i = 0; i < n; i++) {
      this.v += (-this.k * (this.x - this.to) - this.d * this.v) * h;
      this.x += this.v * h;
    }
    return this.x;
  }
}

let browserBound = false;
let calm = false;
let dpr = 1;
let now = 0;
let last = 0;
let running = false;
let measureCtx = null;

const front = { c: null, g: null, live: [], dirty: false };
const frames = new Set();
const timers = [];
const bakedWords = new Map();

function syncBrowserEnv() {
  if (!hasBrowser()) return false;
  if (!browserBound) {
    browserBound = true;
    dpr = Math.min(2.25, window.devicePixelRatio || 1);
    injectBaseStyles();
    try {
      const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      if (mq) {
        calm = !!mq.matches;
        mq.addEventListener?.('change', (e) => {
          calm = !!e.matches;
          if (calm) clear();
        });
      }
    } catch {
      calm = false;
    }
    window.addEventListener?.('resize', resizeCanvas);
    if (document.fonts) {
      document.fonts.ready?.then?.(() => bakedWords.clear())?.catch?.(() => {});
      document.fonts.addEventListener?.('loadingdone', () => bakedWords.clear());
    }
  }
  return true;
}

function injectBaseStyles() {
  if (!hasBrowser() || !document.head) return;
  if (!document.head.querySelector?.('style[data-porto-fx]')) {
    const style = document.createElement('style');
    style.setAttribute('data-porto-fx', '1');
    style.textContent = `:where(:root){--pf-ink:#111111;--pf-paper:#ffffff;--pf-fog:#f7f7f5;--pf-line:#deded9;--pf-blue:#1557ff;--pf-soft-blue:#b8d8ff;--pf-orange:#ff5a0a;--pf-yellow:#ffe45c}
canvas.porto-fx{position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:2147483000}`;
    document.head.append(style);
  }
  if (!document.head.querySelector?.('link[href*="Caveat"]')) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
    document.head.append(link);
  }
}

function ensureFront() {
  if (!syncBrowserEnv()) return false;
  if (!front.c && document.body) {
    const c = document.createElement('canvas');
    c.className = 'porto-fx';
    c.setAttribute('aria-hidden', 'true');
    document.body.append(c);
    front.c = c;
    front.g = c.getContext('2d');
    resizeCanvas();
  }
  return !!front.g;
}

function resizeCanvas() {
  if (!hasBrowser()) return;
  dpr = Math.min(2.25, window.devicePixelRatio || 1);
  if (front.c) {
    front.c.width = Math.round((window.innerWidth || 1280) * dpr);
    front.c.height = Math.round((window.innerHeight || 800) * dpr);
  }
}

function resolvePreset(preset) {
  if (preset === 'fire' || preset === 'sketch') return preset;
  if (hasBrowser()) {
    const attr = document.documentElement?.dataset?.portoFx;
    if (attr === 'fire' || attr === 'sketch') return attr;
  }
  return portoFX.defaultPreset === 'fire' ? 'fire' : 'sketch';
}

function addEffect(life, draw) {
  if (!syncBrowserEnv() || calm || !(life > 0)) return null;
  if (!ensureFront()) return null;
  if (front.live.length >= MAX_LIVE) front.live.shift();
  const p = { t: 0, life, draw, dead: false };
  front.live.push(p);
  startLoop();
  return p;
}

function tickEffects(dt) {
  if (!front.c || !front.g || (!front.live.length && !front.dirty)) return;
  const g = front.g;
  const ox = hasBrowser() ? window.scrollX || 0 : 0;
  const oy = hasBrowser() ? window.scrollY || 0 : 0;

  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.globalAlpha = 1;
  g.shadowBlur = 0;
  g.clearRect(0, 0, front.c.width / dpr, front.c.height / dpr);
  g.translate(-ox, -oy);
  g.lineJoin = 'round';
  g.lineCap = 'round';

  front.live = front.live.filter((p) => !p.dead && (p.t += dt) < p.life);
  for (const p of front.live) {
    g.save();
    g.globalAlpha = 1;
    g.shadowBlur = 0;
    p.draw(g, p.t / p.life, p.t, dt);
    g.restore();
  }
  front.dirty = front.live.length > 0;
}

function advance(dt) {
  if (!(dt > 0)) return;
  const stepDt = Math.min(dt, 0.1);
  now += stepDt;
  if (timers.length) {
    const due = timers.filter((q) => q.at <= now).sort((a, b) => a.at - b.at);
    for (const q of due) {
      const idx = timers.indexOf(q);
      if (idx >= 0) timers.splice(idx, 1);
    }
    for (const q of due) q.fn();
  }
  for (const fn of [...frames]) fn(stepDt);
  tickEffects(stepDt);
}

function loop(ms) {
  if (!running || !hasBrowser()) {
    running = false;
    return;
  }
  const dt = clamp((ms - last) / 1000, 0, 0.034);
  last = ms;
  if (!portoFX.paused) advance(dt);
  if (!frames.size && !timers.length && !front.live.length && !front.dirty) {
    running = false;
    return;
  }
  window.requestAnimationFrame(loop);
}

function startLoop() {
  if (running || !hasBrowser()) return;
  running = true;
  last = window.performance?.now?.() ?? 0;
  window.requestAnimationFrame(loop);
}

function later(ms, fn) {
  if (!syncBrowserEnv() || typeof fn !== 'function') return;
  timers.push({ at: now + Math.max(0, ms) / 1000, fn });
  startLoop();
}

function clear() {
  front.live.length = 0;
  timers.length = 0;
  if (front.c && front.g) {
    front.g.setTransform(1, 0, 0, 1, 0, 0);
    front.g.clearRect(0, 0, front.c.width, front.c.height);
    front.dirty = false;
  }
}

// ───────── Coordinate & Input Caret Helpers ─────────

function at(target, fx = 0.5, fy = 0.5) {
  if (!target) return { x: 0, y: 0, w: 0, h: 0, valid: false };
  if (typeof target.getBoundingClientRect === 'function') {
    if (!hasBrowser()) return { x: 0, y: 0, w: 0, h: 0, valid: false };
    const b = target.getBoundingClientRect();
    if (!(b.width > 0 || b.height > 0)) return { x: 0, y: 0, w: 0, h: 0, valid: false };
    return {
      x: b.left + (window.scrollX || 0) + b.width * fx,
      y: b.top + (window.scrollY || 0) + b.height * fy,
      w: b.width,
      h: b.height,
      valid: true,
    };
  }
  if (typeof target.x === 'number' && typeof target.y === 'number') {
    if (target.valid === false) return { x: 0, y: 0, w: 0, h: 0, valid: false };
    return { x: target.x, y: target.y, w: target.w || 0, h: target.h || 0, valid: true };
  }
  return { x: 0, y: 0, w: 0, h: 0, valid: false };
}

function caretPoint(inputEl) {
  if (!inputEl || !hasBrowser() || typeof inputEl.getBoundingClientRect !== 'function') {
    return { x: 0, y: 0, valid: false };
  }
  const b = inputEl.getBoundingClientRect();
  if (!(b.width > 0 && b.height > 0)) return { x: 0, y: 0, valid: false };

  let textW = 0;
  let padLeft = 40;
  try {
    if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d');
    const cs = window.getComputedStyle?.(inputEl);
    if (cs) {
      if (cs.font) measureCtx.font = cs.font;
      const parsed = parseFloat(cs.paddingLeft);
      if (Number.isFinite(parsed)) padLeft = parsed;
    }
    const val = String(inputEl.value || '');
    const pos = typeof inputEl.selectionStart === 'number' ? inputEl.selectionStart : val.length;
    textW = measureCtx.measureText(val.slice(0, pos)).width;
  } catch {
    textW = String(inputEl.value || '').length * 7.5;
  }

  const localX = clamp(padLeft + textW, 18, Math.max(20, b.width - 28));
  return {
    x: b.left + (window.scrollX || 0) + localX,
    y: b.top + (window.scrollY || 0) + b.height * 0.52,
    valid: true,
  };
}

// ───────── Cel-Shaded Sketch & Fire VFX Primitives ─────────

// Expanding Figma-style selection rectangle with 4 corner resize handles
function selectBurst(x, y, { w = 78, h = 34, preset, life = 0.42 } = {}) {
  const mode = resolvePreset(preset);
  const strokeCol = mode === 'fire' ? PALETTE.orange : PALETTE.blue;
  const tiltDir = rnd(-0.08, 0.08);
  addEffect(life, (g, k) => {
    const grow = out(clamp(k / 0.45));
    const die = 1 - inn(clamp((k - 0.45) / 0.55));
    const cw = (w * 0.78 + grow * 42) * die;
    const ch = (h * 0.78 + grow * 22) * die;
    const lw = 2 * die;
    if (cw < 4 || lw < 0.25) return;

    g.translate(x, y);
    g.rotate(tiltDir * grow);
    g.strokeStyle = strokeCol;
    g.lineWidth = lw;
    g.strokeRect(-cw / 2, -ch / 2, cw, ch);

    const hs = Math.max(2, 6.2 * die);
    for (const [hx, hy] of [[-cw / 2, -ch / 2], [cw / 2, -ch / 2], [-cw / 2, ch / 2], [cw / 2, ch / 2]]) {
      g.fillStyle = PALETTE.paper;
      g.fillRect(hx - hs / 2, hy - hs / 2, hs, hs);
      g.strokeRect(hx - hs / 2, hy - hs / 2, hs, hs);
    }
  });
}

// Two-tone cel-shaded impact star + accent pins
function burst(x, y, { r = 40, spikes = 11, preset, life = 0.36 } = {}) {
  const mode = resolvePreset(preset);
  const pinCol = mode === 'fire' ? PALETTE.orange : PALETTE.blue;
  const shadeCol = mode === 'fire' ? PALETTE.orange : PALETTE.softBlue;
  const coreCol = mode === 'fire' ? PALETTE.yellow : PALETTE.paper;

  const j = Array.from({ length: spikes * 2 }, (_, i) => (i % 2 ? rnd(0.36, 0.52) : rnd(0.78, 1.15)));
  const rot = rnd(TAU);
  const pins = Array.from({ length: 7 }, (_, i) => ({
    a: (i / 7) * TAU + rnd(0.45),
    l: rnd(1.2, 1.65),
    w: rnd(0.035, 0.06),
  }));

  const star = (R, turn, inner = 1) => {
    const p = new Path2D();
    j.forEach((m, i) => {
      const a = rot + turn + (i / j.length) * TAU;
      const rr = R * (i % 2 ? m * inner : m);
      if (i === 0) p.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
      else p.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
    });
    p.closePath();
    return p;
  };

  addEffect(life, (g, k) => {
    const R = r * out(clamp(k / 0.3));
    const hollow = 1 + inn(clamp((k - 0.34) / 0.66)) * 1.35;
    const r0 = R * 0.58 * Math.min(1.9, hollow);

    g.fillStyle = pinCol;
    g.beginPath();
    for (const n of pins) {
      const l = R * n.l;
      if (l <= r0 + 0.5) continue;
      g.moveTo(x + Math.cos(n.a - n.w) * r0, y + Math.sin(n.a - n.w) * r0);
      g.lineTo(x + Math.cos(n.a) * l, y + Math.sin(n.a) * l);
      g.lineTo(x + Math.cos(n.a + n.w) * r0, y + Math.sin(n.a + n.w) * r0);
    }
    g.fill();

    const die = 1 - inn(clamp((k - 0.72) / 0.28));
    if (die < 0.08) return;
    const big = star(R * 1.08 * die, 0.16, hollow);
    g.fillStyle = shadeCol;
    g.fill(big);
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = Math.max(0.4, 1.4 * die);
    g.stroke(big);

    const sml = star(R * 0.78 * die, 0, hollow);
    g.fillStyle = coreCol;
    g.fill(sml);
    g.stroke(sml);
  });
}

// Multi-tongue cel-shaded anime fire crown (#ff5a0a outer + #ffe45c inner + #111111 outline)
function flames(x, y, { tongues = 7, h = 54, w = 13, life = 0.5 } = {}) {
  const half = (tongues - 1) / 2;
  const ts = Array.from({ length: tongues }, (_, i) => ({
    a: -Math.PI / 2 + (i - half) * 0.34 + rnd(-0.08, 0.08),
    len: h * rnd(0.72, 1.18) * (1 - Math.abs(i - half) * 0.1),
    w: w * rnd(0.78, 1.18),
    wiggle: rnd(7, 13),
    ph: rnd(TAU),
  }));

  addEffect(life, (g, k, t) => {
    const grow = out(clamp(k / 0.26));
    const die = 1 - inn(clamp((k - 0.44) / 0.56));
    const sc = grow * die;
    if (sc < 0.05) return;

    const outer = new Path2D();
    const inner = new Path2D();
    for (const f of ts) {
      const L = f.len * (0.48 + out(k) * 0.72) * die;
      const W = f.w * sc;
      if (W < 0.6 || L < 2) continue;
      const tipA = f.a + Math.sin(t * f.wiggle + f.ph) * 0.12;
      const bx = x + Math.cos(f.a) * (8 + 16 * inn(k));
      const by = y + Math.sin(f.a) * (6 + 12 * inn(k));
      const tx = bx + Math.cos(tipA) * L;
      const ty = by + Math.sin(tipA) * L - 10 * k;
      const nx = -Math.sin(f.a);
      const ny = Math.cos(f.a);

      outer.moveTo(bx + nx * W, by + ny * W);
      outer.quadraticCurveTo((bx + tx) * 0.5 + nx * W * 0.88, (by + ty) * 0.5 + ny * W * 0.88, tx, ty);
      outer.quadraticCurveTo((bx + tx) * 0.5 - nx * W * 0.88, (by + ty) * 0.5 - ny * W * 0.88, bx - nx * W, by - ny * W);
      outer.closePath();

      const iw = W * 0.52;
      const itx = bx + Math.cos(tipA) * (L * 0.62);
      const ity = by + Math.sin(tipA) * (L * 0.62) - 6 * k;
      inner.moveTo(bx + nx * iw, by + ny * iw);
      inner.quadraticCurveTo((bx + itx) * 0.5 + nx * iw * 0.8, (by + ity) * 0.5 + ny * iw * 0.8, itx, ity);
      inner.quadraticCurveTo((bx + itx) * 0.5 - nx * iw * 0.8, (by + ity) * 0.5 - ny * iw * 0.8, bx - nx * iw, by - ny * iw);
      inner.closePath();
    }

    g.lineWidth = Math.max(0.5, 2.8 * sc);
    g.strokeStyle = PALETTE.ink;
    g.stroke(outer);
    g.fillStyle = PALETTE.orange;
    g.fill(outer);
    g.fillStyle = PALETTE.yellow;
    g.fill(inner);
  });
}

// Buoyant rising fire embers (diamond sparks)
function embers(x, y, { n = 8, speed = 130, life = 0.62 } = {}) {
  for (let i = 0; i < n; i++) {
    const vx = rnd(-speed * 0.75, speed * 0.75);
    const vy = rnd(-speed * 1.15, -speed * 0.42);
    const r0 = rnd(2.8, 5.4);
    const col = i % 2 === 0 ? PALETTE.yellow : PALETTE.orange;
    const ph = rnd(TAU);
    addEffect(life * rnd(0.75, 1.1), (g, k, t) => {
      const r = r0 * (1 - inn(clamp((k - 0.45) / 0.55)));
      if (r < 0.45) return;
      const px = x + vx * t + Math.sin(t * 14 + ph) * 4.5;
      const py = y + vy * t - 36 * t * t;
      g.translate(px, py);
      g.rotate(Math.atan2(vy - 72 * t, vx));
      g.beginPath();
      g.moveTo(-r * 2.1, 0);
      g.lineTo(0, -r);
      g.lineTo(r * 1.35, 0);
      g.lineTo(0, r);
      g.closePath();
      g.fillStyle = col;
      g.strokeStyle = PALETTE.ink;
      g.lineWidth = Math.max(0.4, 1.15 * (r / r0));
      g.fill();
      g.stroke();
    });
  }
}

// Two-tone paper dust or warm ash puff
function puff(x, y, { n = 4, size = 10, vx = 0, vy = -18, preset, life = 0.56, spread = 1 } = {}) {
  const mode = resolvePreset(preset);
  const shade = mode === 'fire' ? PALETTE.line : PALETTE.softBlue;
  const fill = mode === 'fire' ? PALETTE.fog : PALETTE.paper;

  const lobes = Array.from({ length: n }, (_, i) => ({
    a: (i / n) * TAU + rnd(0.55),
    d: rnd(0.28, 0.92) * size * spread,
    r: rnd(0.58, 1) * size,
    sp: rnd(0.65, 1.25),
  }));
  lobes.unshift({ a: 0, d: 0, r: size, sp: 1 });

  addEffect(life, (g, k, t) => {
    const grow = back(clamp(t / 0.2));
    const die = 1 - inn(clamp((k - 0.52) / 0.48));
    const sc = grow * die;
    if (sc < 0.06) return;

    const px = x + vx * out(k) * life;
    const py = y + vy * out(k) * life;
    const u = new Path2D();
    for (const l of lobes) {
      const rr = l.r * sc;
      if (rr <= 0.4) continue;
      const lx = px + Math.cos(l.a + t * 0.9 * l.sp) * l.d * (0.5 + out(k) * 0.85);
      const ly = py + Math.sin(l.a + t * 0.9 * l.sp) * l.d * (0.5 + out(k) * 0.85);
      u.moveTo(lx + rr, ly);
      u.arc(lx, ly, rr, 0, TAU);
    }

    g.save();
    g.lineWidth = Math.max(0.5, 2.4 * die);
    g.strokeStyle = PALETTE.ink;
    g.stroke(u);
    g.restore();

    g.save();
    g.clip(u);
    g.fillStyle = shade;
    g.fillRect(px - size * 4, py - size * 4, size * 8, size * 8);
    g.translate(-size * 0.18 * die, -size * 0.24 * die);
    g.fillStyle = fill;
    g.fill(u);
    g.restore();
  });
}

// Directional geometric wedges
function ticks(x, y, { n = 5, r = 18, len = 12, dir = -Math.PI / 2, fan = 0.45, preset, life = 0.4 } = {}) {
  const mode = resolvePreset(preset);
  addEffect(life, (g, k) => {
    const a = out(clamp(k / 0.48));
    const b = inn(clamp((k - 0.38) / 0.62));
    for (let i = 0; i < n; i++) {
      const an = dir + (i - (n - 1) / 2) * fan;
      const r0 = r + len * b * 1.3;
      const r1 = r + len * a * 1.3;
      if (r1 - r0 < 0.8) continue;
      const hw = 0.075 + 2 / (r1 + 8);
      const col = i % 3 === 1 ? PALETTE.yellow : mode === 'fire' ? PALETTE.orange : PALETTE.blue;
      g.beginPath();
      g.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0);
      g.lineTo(x + Math.cos(an - hw) * r1, y + Math.sin(an - hw) * r1);
      g.lineTo(x + Math.cos(an + hw) * r1, y + Math.sin(an + hw) * r1);
      g.closePath();
      g.fillStyle = col;
      g.fill();
      if (col === PALETTE.yellow) {
        g.strokeStyle = PALETTE.ink;
        g.lineWidth = 1;
        g.stroke();
      }
    }
  });
}

// Crisp directional speed lines that thin to nothing
function lines(x, y, { n = 6, dir = Math.PI, len = 42, spread = 20, preset, life = 0.3 } = {}) {
  const mode = resolvePreset(preset);
  for (let i = 0; i < n; i++) {
    const o = rnd(-spread, spread);
    const l = len * rnd(0.55, 1.25);
    const d = rnd(0, 0.22);
    const w = rnd(1.2, 2.5);
    const col = i === 0 ? (mode === 'fire' ? PALETTE.orange : PALETTE.blue) : PALETTE.ink;
    addEffect(life, (g, k) => {
      const kk = clamp((k - d) / (1 - d));
      const lw = w * (1 - inn(kk));
      if (kk <= 0 || lw < 0.2) return;
      const a = out(kk);
      const b = inn(kk);
      const px = x - Math.sin(dir) * o;
      const py = y + Math.cos(dir) * o;
      g.strokeStyle = col;
      g.lineWidth = lw;
      g.beginPath();
      g.moveTo(px + Math.cos(dir) * l * b * 1.35, py + Math.sin(dir) * l * b * 1.35);
      g.lineTo(px + Math.cos(dir) * l * (0.18 + a * 1.18), py + Math.sin(dir) * l * (0.18 + a * 1.18));
      g.stroke();
    });
  }
}

// Crescent slash smear
function slash(x, y, { len = 96, ang = -0.35, thick = 13, preset, life = 0.38 } = {}) {
  const mode = resolvePreset(preset);
  const outerCol = mode === 'fire' ? PALETTE.orange : PALETTE.blue;
  const innerCol = mode === 'fire' ? PALETTE.yellow : PALETTE.paper;
  const R = len * 0.9;
  const cx = x - Math.cos(ang - Math.PI / 2) * R * 0.86;
  const cy = y - Math.sin(ang - Math.PI / 2) * R * 0.86;
  const a0 = ang - Math.PI / 2 - 0.6;
  const sweep = 1.2;

  addEffect(life, (g, k) => {
    const head = out(clamp(k / 0.42));
    const tail = inn(clamp((k - 0.2) / 0.8));
    if (head - tail < 0.015) return;
    const cres = (T) => {
      const p = new Path2D();
      const N = 22;
      for (let i = 0; i <= N; i++) {
        const u = lerp(tail, head, i / N);
        const a = a0 + sweep * u;
        if (i === 0) p.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        else p.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
      }
      for (let i = N; i >= 0; i--) {
        const q = i / N;
        const u = lerp(tail, head, q);
        const a = a0 + sweep * u;
        const rr = R - T * Math.sin(q * Math.PI) ** 0.7;
        p.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      }
      p.closePath();
      return p;
    };
    const main = cres(thick);
    g.fillStyle = outerCol;
    g.fill(main);
    g.fillStyle = innerCol;
    g.fill(cres(thick * 0.44));
    g.strokeStyle = PALETTE.ink;
    g.lineWidth = 1.3;
    g.stroke(main);
  });
}

// 4-point sketchbook sparkle (✦)
function kira(x, y, { r = 9, preset, life = 0.5 } = {}) {
  const mode = resolvePreset(preset);
  const strokeCol = mode === 'fire' ? PALETTE.orange : PALETTE.blue;
  const fillCol = mode === 'fire' ? PALETTE.yellow : PALETTE.paper;
  addEffect(life, (g, k, t) => {
    const s = r * Math.sin(k * Math.PI) ** 0.65;
    if (s < 0.6) return;
    const q = s * 0.18;
    const p = new Path2D();
    g.translate(x, y);
    g.rotate(Math.sin(t * 4) * 0.22);
    p.moveTo(0, -s);
    p.quadraticCurveTo(q, -q, s * 0.76, 0);
    p.quadraticCurveTo(q, q, 0, s);
    p.quadraticCurveTo(-q, q, -s * 0.76, 0);
    p.quadraticCurveTo(-q, -q, 0, -s);
    p.closePath();
    g.fillStyle = fillCol;
    g.fill(p);
    g.strokeStyle = strokeCol;
    g.lineWidth = Math.max(0.5, 1.8 * (s / r));
    g.stroke(p);
  });
}

// Offscreen-baked Caveat handwritten callout + wavy underline swoosh (HiDPI scaled)
function bakeWordCanvas(text, color) {
  const scale = Math.max(1, dpr);
  const key = `${text}|${color}|${scale}`;
  const cached = bakedWords.get(key);
  if (cached) return cached;

  const c = document.createElement('canvas');
  const padX = 24;
  const padY = 20;
  const fontPx = 34;
  const fontSpec = `700 ${fontPx}px "Caveat", cursive, sans-serif`;

  const probe = c.getContext('2d');
  probe.font = fontSpec;
  const tw = Math.max(48, Math.ceil(probe.measureText(text).width));
  const lw = tw + padX * 2;
  const lh = fontPx + padY * 2 + 10;
  c.width = Math.round(lw * scale);
  c.height = Math.round(lh * scale);

  const x = c.getContext('2d');
  x.scale(scale, scale);
  x.font = fontSpec;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.lineJoin = 'round';
  x.lineCap = 'round';

  const cx = lw / 2;
  const cy = lh / 2 - 3;

  x.lineWidth = 6;
  x.strokeStyle = PALETTE.paper;
  x.strokeText(text, cx, cy);

  x.fillStyle = color;
  x.fillText(text, cx, cy);

  const hw = tw * 0.46;
  x.beginPath();
  x.moveTo(cx - hw, cy + 15);
  x.quadraticCurveTo(cx, cy + 10, cx + hw, cy + 16);
  x.lineWidth = 4.6;
  x.strokeStyle = PALETTE.paper;
  x.stroke();
  x.lineWidth = 2.2;
  x.strokeStyle = color;
  x.stroke();

  const entry = { c, lw, lh };
  bakedWords.set(key, entry);
  return entry;
}

function sfx(word, x, y, { size = 28, rot = -0.09, preset, col, life = 0.85 } = {}) {
  const label = String(word || '').trim();
  if (!label || !syncBrowserEnv() || calm) return;
  const mode = resolvePreset(preset);
  const fillCol = col || (mode === 'fire' ? PALETTE.orange : PALETTE.blue);
  const entry = bakeWordCanvas(label, fillCol);
  const k0 = size / 34;
  const sp = new Spring(0.22, 540, 16);
  sp.to = 1;
  let lastT = 0;

  addEffect(life, (g, k, t) => {
    const dt = Math.max(0.001, t - lastT);
    lastT = t;
    const sc = sp.step(dt) * (1 - inn(clamp((k - 0.82) / 0.18))) * k0;
    if (sc < 0.04) return;
    g.translate(x + Math.sin(t * 29) * 0.75, y + Math.cos(t * 25) * 0.75);
    g.rotate(rot + Math.sin(t * 6.5) * 0.03);
    g.drawImage(entry.c, (-entry.lw / 2) * sc, (-entry.lh / 2) * sc, entry.lw * sc, entry.lh * sc);
  });
}

// ───────── Portfolio Interaction Helpers ─────────

function dodge(target, { dir, preset, word } = {}) {
  const pt = at(target);
  if (!pt.valid) return;
  const mode = resolvePreset(preset);
  const escapeAngle = typeof dir === 'number' ? dir : rnd(0, TAU);
  puff(pt.x, pt.y, { n: 5, size: 11, vx: Math.cos(escapeAngle) * 18, vy: -16, preset: mode, life: 0.52 });
  lines(pt.x, pt.y, { n: 6, dir: escapeAngle, len: 46, spread: 18, preset: mode, life: 0.28 });
  if (mode === 'fire') embers(pt.x, pt.y, { n: 5, speed: 95, life: 0.45 });
  else ticks(pt.x, pt.y, { n: 4, r: 14, len: 10, dir: escapeAngle + Math.PI, preset: mode, life: 0.34 });
  if (word) sfx(word, pt.x + 18, pt.y - 36, { size: 24, preset: mode });
}

function catchWin(target, { preset = 'fire', word = 'gotcha!' } = {}) {
  const pt = at(target);
  if (!pt.valid) return;
  const mode = resolvePreset(preset);
  selectBurst(pt.x, pt.y, { w: Math.max(68, pt.w), h: Math.max(68, pt.h), preset: 'sketch', life: 0.48 });
  flames(pt.x, pt.y + 6, { tongues: 8, h: 58, w: 14, life: 0.54 });
  embers(pt.x, pt.y, { n: 12, speed: 155, life: 0.7 });
  kira(pt.x - 34, pt.y - 26, { r: 10, preset: 'sketch', life: 0.55 });
  kira(pt.x + 36, pt.y - 22, { r: 9, preset: mode, life: 0.55 });
  if (word) sfx(word, pt.x + 26, pt.y - 56, { size: 32, preset: mode });
}

function celebrate(target, { word = 'hey!' } = {}) {
  const pt = at(target);
  if (!pt.valid) return;
  const globalMode = resolvePreset();
  selectBurst(pt.x, pt.y, { w: Math.min(130, Math.max(76, pt.w * 0.72)), h: Math.min(130, Math.max(76, pt.h * 0.72)), preset: 'sketch', life: 0.46 });
  if (globalMode === 'fire') {
    flames(pt.x, pt.y + 10, { tongues: 8, h: 62, w: 15, life: 0.52 });
  } else {
    burst(pt.x, pt.y, { r: 46, spikes: 11, preset: 'sketch', life: 0.38 });
  }
  embers(pt.x, pt.y - 6, { n: 10, speed: 145, life: 0.65 });
  puff(pt.x - 38, pt.y + 18, { n: 4, size: 9, vx: -22, vy: -14, preset: 'sketch', life: 0.52 });
  puff(pt.x + 38, pt.y + 18, { n: 4, size: 9, vx: 22, vy: -14, preset: 'sketch', life: 0.52 });
  kira(pt.x - 42, pt.y - 34, { r: 10, preset: 'sketch', life: 0.55 });
  kira(pt.x + 44, pt.y - 28, { r: 9, preset: 'fire', life: 0.55 });
  if (word) sfx(word, pt.x + 34, pt.y - 64, { size: 32, preset: globalMode });
}

function bindSquash(el, { low = 0.84, wide = 0.48, k = 540, d = 15 } = {}) {
  if (!el || !hasBrowser() || typeof el.addEventListener !== 'function') return () => {};
  syncBrowserEnv();
  const s = new Spring(1, k, d);
  const prevTransition = el.style?.transition || '';

  const stepFn = (dt) => {
    if (calm || !el.isConnected) {
      if (el.style) {
        el.style.transform = '';
        el.style.transition = prevTransition;
      }
      frames.delete(stepFn);
      return;
    }
    const y = s.step(dt);
    const still = Math.abs(y - 1) < 0.0015 && Math.abs(s.v) < 0.012;
    if (still) {
      el.style.transform = '';
      el.style.transition = prevTransition;
      frames.delete(stepFn);
    } else {
      el.style.transition = 'none';
      const sx = (1 + (1 - y) * wide).toFixed(3);
      const sy = y.toFixed(3);
      el.style.transform = `scale(${sx}, ${sy})`;
    }
  };

  const wake = () => {
    if (calm) return;
    frames.add(stepFn);
    startLoop();
  };

  const onDown = () => {
    if (el.disabled) return;
    s.to = low;
    wake();
  };
  const onRelease = () => {
    if (s.to !== 1) {
      s.to = 1;
      s.v = Math.max(s.v, 2.4);
      wake();
    }
  };

  el.addEventListener('pointerdown', onDown);
  const releaseEvents = ['pointerup', 'pointerleave', 'pointercancel', 'blur'];
  for (const ev of releaseEvents) el.addEventListener(ev, onRelease);

  return () => {
    frames.delete(stepFn);
    if (el.style) {
      el.style.transform = '';
      el.style.transition = prevTransition;
    }
    el.removeEventListener?.('pointerdown', onDown);
    for (const ev of releaseEvents) el.removeEventListener?.(ev, onRelease);
  };
}

function bindKeycap(el, { preset, word } = {}) {
  if (!el || !hasBrowser() || typeof el.addEventListener !== 'function') return () => {};
  const unbindSquash = bindSquash(el, { low: 0.86, wide: 0.36, k: 580, d: 16 });
  let toggleAlt = false;
  const onClick = () => {
    const pt = at(el);
    if (!pt.valid) return;
    const mode = resolvePreset(preset);
    toggleAlt = !toggleAlt;
    selectBurst(pt.x, pt.y, { w: Math.max(64, pt.w * 0.7), h: Math.max(36, pt.h * 0.7), preset: mode, life: 0.38 });
    if (mode === 'fire') {
      flames(pt.x, pt.y + 4, { tongues: 5, h: 40, w: 11, life: 0.42 });
      embers(pt.x, pt.y, { n: 6, speed: 110, life: 0.5 });
    } else {
      ticks(pt.x, pt.y - 6, { n: 5, r: 16, len: 12, dir: -Math.PI / 2, preset: mode, life: 0.38 });
      kira(pt.x - 24, pt.y - 18, { r: 8, preset: 'sketch', life: 0.45 });
      kira(pt.x + 24, pt.y - 14, { r: 7, preset: 'fire', life: 0.45 });
    }
    const label = typeof word === 'function' ? word(toggleAlt) : word || (toggleAlt ? 'copy!' : 'paste!');
    sfx(label, pt.x + 22, pt.y - 38, { size: 25, preset: toggleAlt ? mode : 'fire' });
  };
  el.addEventListener('click', onClick);
  return () => {
    unbindSquash();
    el.removeEventListener?.('click', onClick);
  };
}

export function showPortoToast(message, { preset, word, duration = 2400 } = {}) {
  if (!hasBrowser() || !message || typeof CustomEvent === 'undefined') return;
  const detail = {
    id: Date.now() + Math.random(),
    message: String(message),
    preset: resolvePreset(preset),
    word: word ?? 'copied!',
    duration,
  };
  window.dispatchEvent(new CustomEvent('porto:toast', { detail }));
}

export function fireButtonFX(eventOrEl, { kind = 'primary', preset, word } = {}) {
  const target = eventOrEl?.currentTarget || eventOrEl?.target || eventOrEl;
  const pt = at(target);
  if (!pt.valid) return;
  const mode = kind === 'fire' ? 'fire' : resolvePreset(preset);

  if (mode === 'fire' || kind === 'fire') {
    selectBurst(pt.x, pt.y, { w: Math.max(68, pt.w), h: Math.max(34, pt.h), preset: 'fire', life: 0.4 });
    flames(pt.x, pt.y + 6, { tongues: 7, h: 48, w: 12, life: 0.48 });
    embers(pt.x, pt.y, { n: 8, speed: 125, life: 0.58 });
    if (word !== '') sfx(word || 'lit!', pt.x + 24, pt.y - 44, { size: 27, preset: 'fire' });
    return;
  }

  if (kind === 'copy') {
    selectBurst(pt.x, pt.y, { w: Math.max(54, pt.w), h: Math.max(28, pt.h), preset: mode, life: 0.38 });
    kira(pt.x - 20, pt.y - 16, { r: 8, preset: 'sketch', life: 0.45 });
    kira(pt.x + 22, pt.y - 12, { r: 7, preset: 'fire', life: 0.45 });
    ticks(pt.x, pt.y, { n: 5, r: 16, len: 10, dir: -Math.PI / 2, preset: mode, life: 0.36 });
    if (word) sfx(word, pt.x + 20, pt.y - 38, { size: 24, preset: mode });
    return;
  }

  if (kind === 'secondary') {
    ticks(pt.x, pt.y, { n: 4, r: Math.max(16, pt.h * 0.45), len: 10, dir: -Math.PI / 2, preset: mode, life: 0.35 });
    puff(pt.x, pt.y + 6, { n: 3, size: 7, vy: -12, preset: mode, life: 0.4 });
    if (word) sfx(word, pt.x + 18, pt.y - 34, { size: 23, preset: mode });
    return;
  }

  selectBurst(pt.x, pt.y, { w: Math.max(72, pt.w), h: Math.max(34, pt.h), preset: mode, life: 0.42 });
  burst(pt.x, pt.y, { r: 34, spikes: 9, preset: mode, life: 0.34 });
  puff(pt.x - pt.w * 0.38, pt.y + 8, { n: 3, size: 7.5, vx: -16, vy: -12, preset: mode, life: 0.44 });
  puff(pt.x + pt.w * 0.38, pt.y + 8, { n: 3, size: 7.5, vx: 16, vy: -12, preset: mode, life: 0.44 });
  if (word) sfx(word, pt.x + 24, pt.y - 42, { size: 26, preset: mode });
}

export const portoFX = {
  version: 1,
  paused: false,
  defaultPreset: 'sketch',
  PALETTE,
  Spring,
  get calm() {
    syncBrowserEnv();
    return calm;
  },
  get liveCount() {
    return front.live.length;
  },
  resolvePreset,
  advance,
  later,
  clear,
  at,
  caretPoint,
  selectBurst,
  burst,
  flames,
  embers,
  puff,
  ticks,
  lines,
  slash,
  kira,
  sfx,
  dodge,
  catchWin,
  celebrate,
  bindSquash,
  bindKeycap,
  showPortoToast,
  fireButtonFX,
};

if (hasBrowser()) {
  window.PortoFX = portoFX;
  syncBrowserEnv();
}

export default portoFX;
