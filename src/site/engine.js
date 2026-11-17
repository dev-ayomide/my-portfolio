/* Portfolio engine — ported from prototypes/lab (pick h6-a1-w2-e1-c1-dark-serif). */
/* ==========================================================================
   Portfolio design lab. Each section has several variants; the dock at the
   bottom swaps them live. Every variant = { name, render(): html, mount(el): cleanup }.
   ========================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
let P = [];
let navigate = () => {};
const EMAIL = 'ayomidepaul784@gmail.com';
const RESUME = '/Taiwo_Ayomide_Resume_latest.pdf';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const D2R = Math.PI / 180;
const LAGOS = [6.52, 3.38];

/* ---------------- shared helpers ---------------- */
let dotRGB = '237,236,232';
const readTheme = () => { dotRGB = getComputedStyle(document.documentElement).getPropertyValue('--dot').trim() || dotRGB; };
const toast = (msg) => { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 1600); };
const copyEmail = () => { navigator.clipboard?.writeText(EMAIL).catch(() => {}); toast('Email copied'); };
const host = (u) => { try { return new URL(u).host.replace('www.', ''); } catch { return 'github.com'; } };
const lagosTime = () => new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit' }).format(new Date());

const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
// Fallback for fast scrolls / throttled observers: anything above the fold line always reveals.
const pending = new Set();
const sweep = () => { const line = innerHeight * 0.95; pending.forEach((el) => { if (!el.isConnected) return pending.delete(el); if (el.getBoundingClientRect().top < line) { el.classList.add('in'); pending.delete(el); } }); };
addEventListener('scroll', sweep, { passive: true });
const watchReveals = (root) => { $$('[data-rv]', root).forEach((el, i) => { el.style.transitionDelay = `${Math.min(i, 6) * 60}ms`; io.observe(el); pending.add(el); }); requestAnimationFrame(sweep); };

// World land mask (shared by the globe heroes), rasterised once.
let maskPromise = null;
const landMask = () => maskPromise || (maskPromise = Promise.all([
  import('topojson-client'),
  import('world-atlas/land-110m.json').then((m) => m.default || m),
]).then(([{ feature }, topo]) => {
  const land = feature(topo, topo.objects.land);
  const c = document.createElement('canvas'); c.width = 360; c.height = 180;
  const m = c.getContext('2d'); m.fillStyle = '#fff';
  for (const f of land.features) for (const poly of (f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates)) {
    m.beginPath(); for (const ring of poly) ring.forEach(([lo, la], k) => (k ? m.lineTo(lo + 180, 90 - la) : m.moveTo(lo + 180, 90 - la))); m.fill('evenodd');
  }
  return m.getImageData(0, 0, 360, 180).data;
}).catch(() => null));
const isLand = (mask, la, lo) => !mask || mask[(Math.min(179, Math.max(0, Math.round(90 - la))) * 360 + Math.min(359, Math.max(0, Math.round(lo + 180)))) * 4] > 128;
const spherePoints = (mask, want) => {
  const out = [], N = want * 3.4, g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N && out.length < want; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = g * i;
    const la = Math.asin(y) / D2R, lo = ((Math.atan2(Math.sin(th) * r, Math.cos(th) * r) / D2R + 540) % 360) - 180;
    if (isLand(mask, la, lo)) out.push([la * D2R, lo * D2R]);
  }
  return out;
};
const fitCanvas = (cv) => { const dpr = Math.min(devicePixelRatio || 1, 2); const W = cv.clientWidth, H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; const ctx = cv.getContext('2d'); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); return { ctx, W, H }; };

/* ---------------- content ---------------- */
const jobs = [
  { when: 'Jul – Sep 2026', d: '2026', co: 'Heirs Technologies', role: 'AI Intern, Software Engineering', flow: ['Support question', 'Embed', 'pgvector search · 1,318 past resolutions', 'Confidence score', 'Answer · analyst note · escalate'], pts: [['Built retrieval over ', '2,400+ past tickets', ' for an ITSM platform used by 15 organisations, with confidence thresholds that answer, note, or escalate.'], ['Wrote ', '231 tests', ' and shipped in four stages behind flags. Designed ', 'read-only, fail-closed', ' data access for an internal AI assistant.']] },
  { when: 'Aug 2025 – Mar 2026', d: '2025–26', co: 'Platnova', role: 'Contract Software Engineer · Remote', pts: [['Customer app: ', 'deposits, virtual cards', ' and faster transfers.'], ['Admin platform: ', 'KYB reviews, merchant wallets, settlements', ' and audit trails.']] },
  { when: 'Oct 2025 – now', d: '2025–', co: 'Campor', role: 'Co-founder, Frontend lead', pts: [['Leads the frontend, product decisions and onboarding for a ', 'live campus marketplace', '.']] },
  { when: '2023 – 2027', d: '2023–27', co: "Redeemer's University", role: 'B.Sc. Computer Science', pts: [["Dean's List twice. Gold Scholar 2023/24, Bronze Scholar 2024/25.", '', '']] },
];
const awards = [['2nd', 'Interswitch × Enyata Buildathon · 500+ teams'], ['Winner', 'ALATPay Buildathon'], ['1st', 'RUNACOSS Web Design Contest'], ['2nd', 'DATICAN AI in Medicine'], ['Top 10', 'Canton Construct Ideathon'], ['10th', 'StackUp Coding Challenge'], ['Bounty', 'Hedera Origin'], ['Bounty', 'Arbitrum Builders']];
const awardsHTML = () => `<div class="awards" data-rv>${awards.map(([p, e]) => `<div><b>${p}</b><span>${e}</span></div>`).join('')}</div>`;
const jobPts = (pts) => pts.map(([a, b, c]) => `<li>${a}${b ? `<b>${b}</b>` : ''}${c}</li>`).join('');

/* ====================================================================
   HERO
   ==================================================================== */
const HERO = [
  {
    name: 'Statement',
    render: () => `
      <div class="hero h-statement" id="top">
        <div class="grid-lines"></div>
        <div class="wrap" style="position:relative">
          <div class="who" data-rv><img src="/mypic.jpg" alt=""><div><b>Ayomide Taiwo</b><span class="muted">AI engineer · Lagos</span></div></div>
          <h1><span class="ln"><span>I build AI that knows when to escalate,</span></span><span class="ln"><span>and LLM features people can trust.</span></span></h1>
          <div class="proof" data-rv>
            <div><b>2,400+</b><span>tickets behind an AI retrieval system at Heirs</span></div>
            <div><b>15</b><span>organisations in banking, insurance &amp; energy using it</span></div>
            <div><b>231</b><span>tests written for one staged release</span></div>
            <div><b>2nd / 500+</b><span>teams at the Interswitch × Enyata Buildathon</span></div>
          </div>
        </div>
      </div>`,
    mount: (el) => { const h = $('.h-statement', el); const t = setTimeout(() => h.classList.add('in'), 80); return () => clearTimeout(t); },
  },
  {
    name: 'Editorial column',
    render: () => `
      <div class="hero h-editorial" id="top"><div class="wrap"><div class="col">
        <div class="top" data-rv><img src="/mypic.jpg" alt=""><div><b>Ayomide Taiwo</b><span class="muted">AI engineer, Lagos</span></div></div>
        <h1 data-rv>I build AI products: retrieval, assistants and agents, <em>with the guardrails that make them safe to ship.</em></h1>
        <p data-rv>Most recently at <a class="link" href="#experience">Heirs Technologies</a> I added AI search over 2,400 support tickets to a platform fifteen organisations use, with thresholds that decide when it answers and when it hands off to a person.</p>
        <p data-rv>I also build AI at hackathons: SeeForMe describes the world out loud for blind users, and Fusion turns a prompt into an editable video (2nd of 500+ teams).</p>
        <div class="row" data-rv><a class="link" href="#work">Selected work</a><a class="link" href="${RESUME}">Résumé</a><a class="link" href="mailto:${EMAIL}">${EMAIL}</a><span class="faint">Press <span class="mono">⌘K</span></span></div>
        <div class="now" data-rv>
          <div><span>Now</span><span>Final year, Computer Science at Redeemer's University</span></div>
          <div><span>Building</span><span>StreetGuard, a street-safety app for Lagos</span></div>
          <div><span>Open to</span><span>AI engineering roles, remote or on-site</span></div>
        </div>
      </div></div></div>`,
    mount: () => () => {},
  },
  {
    name: 'System trace',
    render: () => `
      <div class="hero h-trace" id="top"><div class="wrap"><div class="g">
        <div>
          <h1 data-rv>AI engineer. <span>I build AI that knows when not to answer.</span></h1>
          <p data-rv>Retrieval, LLM assistants and agents, built into real products. Most recently, AI search over 2,400 support tickets for a platform 15 organisations use.</p>
          <div class="cta" data-rv><a class="btn solid" href="#work">Selected work</a><a class="btn" href="${RESUME}">Résumé</a></div>
        </div>
        <div class="trace" data-rv aria-label="Animated trace of an AI support request moving through retrieval, generation and a confidence check">
          <div class="trace-h"><span class="q" id="tq"></span><span class="mono faint" id="tid"></span></div>
          <div class="trace-b" id="tspans"></div>
          <div class="trace-ans" id="tans"></div>
          <div class="trace-f"><span id="ttotal">—</span><span class="verdict" id="tverdict"><i></i><span></span></span></div>
        </div>
      </div></div></div>`,
    mount: (el) => {
      const QUERIES = [
        ['How do I reset a customer’s card PIN?', 0.84, 'Open the card in the admin console, choose “Reset PIN”, and the customer gets an OTP to set a new one.'],
        ['Why did settlement batch 4471 fail last night?', 0.31, ''],
        ['Can a dormant account still receive transfers?', 0.72, 'Yes. Inbound transfers post normally; outbound is blocked until the account is reactivated.'],
      ];
      const SPANS = [['gateway', 'edge', 3, 0, ''], ['auth', 'scope', 5, 3, ''], ['embed', 'query', 16, 8, ''], ['pgvector', 'top-k 8', 11, 24, ''], ['rerank', '', 27, 35, ''], ['llm', 'stream', 380, 62, 'llm'], ['guardrail', 'threshold', 7, 442, 'guard']];
      const TOTAL = 460;
      let alive = true, qi = 0; const timers = [];
      const sleep = (ms) => new Promise((r) => timers.push(setTimeout(r, reduce ? 0 : ms)));
      $('#tspans', el).innerHTML = SPANS.map(([n, sub, dur, start, cls]) => `
        <div class="span"><span class="n">${n} <i>${sub}</i></span><span class="track"><span class="bar ${cls}" style="left:${(start / TOTAL) * 100}%;width:${Math.max(1.2, (dur / TOTAL) * 100)}%"></span></span><span class="ms">${dur}ms</span></div>`).join('');
      const rows = $$('.span', el), ans = $('#tans', el), v = $('#tverdict', el);
      const run = async () => {
        while (alive) {
          const [q, conf, a] = QUERIES[qi++ % QUERIES.length];
          rows.forEach((r) => r.classList.remove('on')); v.classList.remove('on', 'esc'); ans.innerHTML = '';
          $('#tq', el).innerHTML = `<b>POST</b> /v1/answer · “${q}”`; $('#tid', el).textContent = `tr_${Math.random().toString(36).slice(2, 8)}`; $('#ttotal', el).textContent = '…';
          await sleep(500);
          for (const r of rows) { if (!alive) return; r.classList.add('on'); await sleep(260); }
          $('#ttotal', el).textContent = `total ${TOTAL}ms · confidence ${conf.toFixed(2)}`;
          const esc = conf < 0.5;
          v.classList.toggle('esc', esc); v.querySelector('span').textContent = esc ? `escalated to a person (< 0.50)` : `answered (≥ 0.50)`; v.classList.add('on');
          if (esc) ans.textContent = 'Not confident enough to answer. Routed to an analyst with the top 3 retrieved tickets attached.';
          else { let txt = ''; for (const w of a.split(' ')) { if (!alive) return; txt += `${w} `; ans.innerHTML = `${txt}<span class="cur"></span>`; await sleep(55); } ans.textContent = txt.trim(); }
          await sleep(3200);
        }
      };
      run();
      return () => { alive = false; timers.forEach(clearTimeout); };
    },
  },
  {
    name: 'Portrait field',
    render: () => `
      <div class="hero h-canvas h-portrait" id="top" style="height:240vh"><div class="pin">
        <canvas aria-label="Ayomide's portrait drawn in particles; it becomes a globe as you scroll" role="img"></canvas>
        <div class="copy"><h1>Ayomide<br>Taiwo</h1><p>AI-native software engineer. I build <b>retrieval systems, LLM assistants and AI agents</b> that real teams rely on.</p></div>
        <div class="side" id="pside"><b>Move your cursor</b>through the portrait</div>
      </div></div>`,
    mount: (el) => {
      const cv = $('canvas', el), hero = $('.h-portrait', el), side = $('#pside', el);
      let { ctx, W, H } = fitCanvas(cv), alive = true, raf = 0, prog = 0, parts = [], GW = 0, GH = 0, rot = -3.38 * D2R - 0.4, first = true;
      const t0 = performance.now(), mouse = { x: -1e4, y: -1e4 };
      const onResize = () => ({ ctx, W, H } = fitCanvas(cv));
      const onScroll = () => { const r = hero.getBoundingClientRect(); prog = Math.min(1, Math.max(0, (-r.top / (r.height - innerHeight)) * 1.25)); };
      const mm = (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
      const ml = () => { mouse.x = mouse.y = -1e4; };
      addEventListener('resize', onResize); addEventListener('scroll', onScroll, { passive: true }); cv.parentElement.addEventListener('pointermove', mm); cv.parentElement.addEventListener('pointerleave', ml);
      const img = new Image(); img.src = '/mypic.jpg';
      img.decode().then(() => {
        if (!alive) return;
        GW = innerWidth < 700 ? 120 : 170; GH = Math.round((GW * img.height) / img.width);
        const oc = document.createElement('canvas'); oc.width = GW; oc.height = GH; const o = oc.getContext('2d'); o.drawImage(img, 0, 0, GW, GH);
        const px = o.getImageData(0, 0, GW, GH).data, lum = new Float32Array(GW * GH);
        for (let i = 0; i < GW * GH; i++) lum[i] = (px[i * 4] * 0.3 + px[i * 4 + 1] * 0.59 + px[i * 4 + 2] * 0.11) / 255;
        const L = (x, y) => lum[Math.min(GH - 1, Math.max(0, y)) * GW + Math.min(GW - 1, Math.max(0, x))];
        for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
          const b = L(x, y), g = Math.abs(L(x + 1, y) - L(x - 1, y)) + Math.abs(L(x, y + 1) - L(x, y - 1));
          const w = Math.max((b - 0.15) / 0.5, g * 2.2);
          if (w >= 0.1) parts.push({ u: x / GW, v: y / GH, l: Math.min(1, w), x: 0, y: 0, vx: 0, vy: 0, d: Math.random() * 0.25, g: [0, 0] });
        }
        const assign = (mask) => { const pts = spherePoints(mask, parts.length); for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [pts[i], pts[j]] = [pts[j], pts[i]]; } parts.forEach((p, i) => (p.g = pts[i % pts.length])); };
        assign(null); landMask().then((m) => alive && m && assign(m));
        onScroll(); raf = requestAnimationFrame(frame);
      });
      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      function frame(now) {
        if (!alive) return; raf = requestAnimationFrame(frame);
        const ph = Math.min(H * 0.86, (W * 0.62 * GH) / GW), pw = (ph * GW) / GH, cell = pw / GW;
        const L = { px: W < 700 ? (W - pw) / 2 : W * 0.72 - pw / 2, py: W < 700 ? H * 0.05 : (H - ph) / 2, gx: W < 700 ? W / 2 : W * 0.68, gy: H * (W < 700 ? 0.34 : 0.48), gr: Math.min(W, H) * (W < 700 ? 0.4 : 0.33) };
        const intro = reduce ? 1 : Math.min(1, (now - t0) / 1600);
        ctx.clearRect(0, 0, W, H); rot += 0.0016;
        side.innerHTML = prog > 0.6 ? `<b>Lagos, Nigeria</b>${lagosTime()} WAT · open to remote roles` : '<b>Move your cursor</b>through the portrait';
        for (const p of parts) {
          const k = ease(Math.min(1, Math.max(0, (prog - p.d * 0.6) / 0.85)));
          const [la, lo] = p.g, z = Math.cos(la) * Math.cos(lo + rot);
          const tx1 = L.px + p.u * pw, ty1 = L.py + p.v * ph, tx2 = L.gx + Math.cos(la) * Math.sin(lo + rot) * L.gr, ty2 = L.gy - Math.sin(la) * L.gr;
          const mid = Math.sin(Math.PI * k);
          const tx = tx1 + (tx2 - tx1) * k + Math.sin(p.u * 40 + now * 0.001) * 40 * mid, ty = ty1 + (ty2 - ty1) * k + Math.cos(p.v * 40 + now * 0.0012) * 40 * mid;
          if (first) { p.x = tx + (Math.random() - 0.5) * W; p.y = ty + (Math.random() - 0.5) * H; }
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 8100) { const d = Math.sqrt(d2) + 0.01, f = (1 - d / 90) * 3.2; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
          p.vx = (p.vx + (tx - p.x) * 0.09) * 0.78; p.vy = (p.vy + (ty - p.y) * 0.09) * 0.78; p.x += p.vx; p.y += p.vy;
          const back = k > 0.5 && z < 0, pa = 0.08 + Math.pow(p.l, 1.5) * 0.92, ga = back ? 0.06 : 0.3 + z * 0.65, a = (pa + (ga - pa) * k) * intro;
          const s = Math.max(1, cell * (0.35 + p.l * 0.55) * (1 - k) + 1.5 * k);
          ctx.fillStyle = `rgba(${dotRGB},${a})`; ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
        }
        if (prog > 0.85) {
          const la = LAGOS[0] * D2R, lo = LAGOS[1] * D2R, z = Math.cos(la) * Math.cos(lo + rot);
          if (z > 0) { const x = L.gx + Math.cos(la) * Math.sin(lo + rot) * L.gr, y = L.gy - Math.sin(la) * L.gr, pp = (now / 1400) % 1;
            ctx.strokeStyle = `rgba(74,222,128,${1 - pp})`; ctx.beginPath(); ctx.arc(x, y, 4 + pp * 20, 0, 7); ctx.stroke(); ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fill(); }
        }
        first = false;
      }
      return () => { alive = false; cancelAnimationFrame(raf); removeEventListener('resize', onResize); removeEventListener('scroll', onScroll); };
    },
  },
  {
    name: 'Globe',
    render: () => `
      <div class="hero h-canvas h-globe" id="top" style="height:100svh;overflow:hidden">
        <canvas aria-label="Globe with Lagos marked" role="img"></canvas>
        <div class="copy"><h1>Ayomide<br>Taiwo</h1><p>AI-native software engineer in Lagos. I build <b>retrieval systems, LLM assistants and AI agents</b> for teams anywhere.</p>
          <div class="cta"><a class="btn solid" href="#work">Selected work</a><a class="btn" href="${RESUME}">Résumé</a></div></div>
        <div class="side"><b>Lagos, Nigeria</b><span id="gtime"></span> WAT · drag the globe</div>
      </div>`,
    mount: (el) => {
      const cv = $('canvas', el); let { ctx, W, H } = fitCanvas(cv), alive = true, raf = 0, dots = [], rot = -LAGOS[1] * D2R - 0.9, vel = 0.0016, drag = false, lx = 0;
      const tilt = -0.3;
      const build = (m) => { dots = spherePoints(m, innerWidth < 700 ? 3000 : 5200); };
      build(null); landMask().then((m) => alive && m && build(m));
      const proj = (la, lo, R, cx, cy) => { const x = Math.cos(la) * Math.sin(lo + rot), y = Math.sin(la), z = Math.cos(la) * Math.cos(lo + rot); return [cx + x * R, cy - (y * Math.cos(tilt) - z * Math.sin(tilt)) * R, y * Math.sin(tilt) + z * Math.cos(tilt)]; };
      const onResize = () => ({ ctx, W, H } = fitCanvas(cv));
      const down = (e) => { drag = true; lx = e.clientX; }, move = (e) => { if (!drag) return; vel = (e.clientX - lx) * 0.004; rot += vel; lx = e.clientX; }, up = () => { drag = false; };
      cv.addEventListener('pointerdown', down); addEventListener('pointermove', move); addEventListener('pointerup', up); addEventListener('resize', onResize);
      $('#gtime', el).textContent = lagosTime();
      const frame = (now) => {
        if (!alive) return; raf = requestAnimationFrame(frame);
        if (!drag && !reduce) { rot += vel; vel += (0.0016 - vel) * 0.03; }
        const R = W < 700 ? W * 0.5 : Math.min(W * 0.28, H * 0.4), cx = W < 700 ? W * 0.55 : W * 0.7, cy = H * (W < 700 ? 0.34 : 0.52);
        ctx.clearRect(0, 0, W, H);
        ctx.strokeStyle = `rgba(${dotRGB},.10)`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
        for (let lat = -60; lat <= 60; lat += 30) { ctx.beginPath(); for (let lo = -180; lo <= 180; lo += 4) { const [x, y, z] = proj(lat * D2R, lo * D2R, R, cx, cy); if (z < 0) { ctx.moveTo(x, y); continue; } ctx.lineTo(x, y); } ctx.strokeStyle = `rgba(${dotRGB},.05)`; ctx.stroke(); }
        const s = Math.max(1.3, R / 230);
        for (const [la, lo] of dots) { const [x, y, z] = proj(la, lo, R, cx, cy); if (z <= 0) continue; ctx.fillStyle = `rgba(${dotRGB},${0.14 + z * 0.7})`; ctx.fillRect(x - s / 2, y - s / 2, s, s); }
        const [x, y, z] = proj(LAGOS[0] * D2R, LAGOS[1] * D2R, R, cx, cy);
        if (z > 0) { const pp = (now / 1400) % 1; ctx.strokeStyle = `rgba(74,222,128,${1 - pp})`; ctx.beginPath(); ctx.arc(x, y, 4 + pp * 22, 0, 7); ctx.stroke(); ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fill();
          ctx.font = '500 12px Geist, system-ui'; ctx.fillStyle = `rgba(${dotRGB},.85)`; ctx.fillText('Lagos', x + 12, y + 4); }
      };
      raf = requestAnimationFrame(frame);
      return () => { alive = false; cancelAnimationFrame(raf); removeEventListener('pointermove', move); removeEventListener('pointerup', up); removeEventListener('resize', onResize); };
    },
  },
  {
    name: 'Photo → globe',
    render: () => `
      <div class="hero h-canvas h-photo" id="top" style="height:270vh"><div class="pin">
        <canvas aria-label="Photo of Ayomide that dissolves into particles and becomes a globe with Lagos marked as you scroll" role="img"></canvas>
        <div class="wrap hero-wrap">
          <div class="copy"><h1>Ayomide<br>Taiwo</h1><p>AI-native software engineer in Lagos. I build <b>retrieval systems, LLM assistants and AI agents</b> for teams anywhere.</p>
            <div class="cta"><a class="btn solid" href="#work">Selected work</a><a class="btn" href="${RESUME}">Résumé</a></div></div>
          <div class="side" id="pside"><b>Scroll</b>to see where I work from</div>
        </div>
      </div></div>`,
    mount: (el) => {
      const cv = $('canvas', el), hero = $('.h-photo', el), wrapEl = $('.hero-wrap', el), side = $('#pside', el);
      let { ctx, W, H } = fitCanvas(cv), alive = true, raf = 0, prog = 0, parts = [], GW = 0, GH = 0, rot = -3.38 * D2R - 0.35, photo = null, first = true;
      const mouse = { x: -1e4, y: -1e4, nx: 0, ny: 0 }, tilt = { x: 0, y: 0 };
      const onResize = () => ({ ctx, W, H } = fitCanvas(cv));
      const onScroll = () => { const r = hero.getBoundingClientRect(); prog = Math.min(1, Math.max(0, (-r.top / (r.height - innerHeight)) * 1.2)); };
      const mm = (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.nx = (e.clientX / innerWidth) * 2 - 1; mouse.ny = (e.clientY / innerHeight) * 2 - 1; };
      const ml = () => { mouse.x = mouse.y = -1e4; mouse.nx = mouse.ny = 0; };
      addEventListener('resize', onResize); addEventListener('scroll', onScroll, { passive: true });
      cv.parentElement.addEventListener('pointermove', mm); cv.parentElement.addEventListener('pointerleave', ml);

      const img = new Image(); img.src = '/mypic.jpg';
      img.decode().then(() => {
        if (!alive) return;
        // 1) The sharp photo, feathered into the page so the studio backdrop has no hard edges.
        const PW = 760, PH = Math.round((PW * img.height) / img.width);
        photo = document.createElement('canvas'); photo.width = PW; photo.height = PH;
        const pc = photo.getContext('2d');
        pc.filter = 'grayscale(.15) contrast(1.06) brightness(1.04)'; pc.drawImage(img, 0, 0, PW, PH); pc.filter = 'none';
        pc.globalCompositeOperation = 'destination-in';
        const g = pc.createRadialGradient(PW * 0.5, PH * 0.42, PW * 0.18, PW * 0.5, PH * 0.48, PW * 0.78);
        g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(0.62, 'rgba(0,0,0,.92)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        pc.fillStyle = g; pc.fillRect(0, 0, PW, PH);
        const fb = pc.createLinearGradient(0, 0, 0, PH); fb.addColorStop(0, 'rgba(0,0,0,0)'); fb.addColorStop(0.16, 'rgba(0,0,0,1)'); fb.addColorStop(0.72, 'rgba(0,0,0,1)'); fb.addColorStop(1, 'rgba(0,0,0,0)');
        pc.fillStyle = fb; pc.fillRect(0, 0, PW, PH);
        const fs = pc.createLinearGradient(0, 0, PW, 0); fs.addColorStop(0, 'rgba(0,0,0,0)'); fs.addColorStop(0.18, 'rgba(0,0,0,1)'); fs.addColorStop(0.82, 'rgba(0,0,0,1)'); fs.addColorStop(1, 'rgba(0,0,0,0)');
        pc.fillStyle = fs; pc.fillRect(0, 0, PW, PH);
        pc.globalCompositeOperation = 'source-over';

        // 2) Particles sampled from the same photo, each remembering its own tone.
        GW = innerWidth < 700 ? 110 : 160; GH = Math.round((GW * img.height) / img.width);
        const oc = document.createElement('canvas'); oc.width = GW; oc.height = GH; const o = oc.getContext('2d'); o.drawImage(img, 0, 0, GW, GH);
        const px = o.getImageData(0, 0, GW, GH).data, lum = new Float32Array(GW * GH);
        for (let i = 0; i < GW * GH; i++) lum[i] = (px[i * 4] * 0.3 + px[i * 4 + 1] * 0.59 + px[i * 4 + 2] * 0.11) / 255;
        const Lx = (x, y) => lum[Math.min(GH - 1, Math.max(0, y)) * GW + Math.min(GW - 1, Math.max(0, x))];
        for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) {
          const b = Lx(x, y), gr = Math.abs(Lx(x + 1, y) - Lx(x - 1, y)) + Math.abs(Lx(x, y + 1) - Lx(x, y - 1));
          const w = Math.max((b - 0.15) / 0.5, gr * 2.2);
          if (w >= 0.1) parts.push({ u: x / GW, v: y / GH, l: Math.min(1, w), b, x: 0, y: 0, vx: 0, vy: 0, d: Math.random() * 0.22, g: [0, 0] });
        }
        const assign = (mask) => { const pts = spherePoints(mask, parts.length); for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [pts[i], pts[j]] = [pts[j], pts[i]]; } parts.forEach((p, i) => (p.g = pts[i % pts.length])); };
        assign(null); landMask().then((m) => alive && m && assign(m));
        onScroll(); raf = requestAnimationFrame(frame);
      });

      const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
      const smooth = (a, b, t) => { const k = Math.min(1, Math.max(0, (t - a) / (b - a))); return k * k * (3 - 2 * k); };
      function frame(now) {
        if (!alive) return; raf = requestAnimationFrame(frame);
        // Everything lines up with the page column: portrait's right edge = column's right edge.
        const wr = wrapEl.getBoundingClientRect(), cr = cv.getBoundingClientRect(), pad = parseFloat(getComputedStyle(wrapEl).paddingRight) || 0;
        const colL = wr.left - cr.left + pad, colR = wr.right - cr.left - pad;
        const mobile = W < 760;
        const ph = mobile ? Math.min(H * 0.5, (colR - colL) * GH / GW) : Math.min(H * 0.8, ((colR - colL) * 0.5 * GH) / GW), pw = (ph * GW) / GH;
        const px0 = mobile ? colL + (colR - colL - pw) / 2 : colR - pw, py0 = mobile ? 78 : (H - ph) / 2 + 10;
        // Globe sits inside the column: its right edge never passes the column edge.
        const gr = mobile ? (colR - colL) * 0.4 : Math.min(pw * 0.5, H * 0.34), gx = mobile ? px0 + pw / 2 : Math.min(px0 + pw / 2, colR - gr - 8), gy = py0 + ph * (mobile ? 0.5 : 0.46);
        tilt.x += (mouse.nx * 10 - tilt.x) * 0.06; tilt.y += (mouse.ny * 8 - tilt.y) * 0.06;
        ctx.clearRect(0, 0, W, H); rot += 0.0016;

        const photoA = 1 - smooth(0.02, 0.2, prog), partA = smooth(0.0, 0.16, prog);
        side.innerHTML = prog > 0.6 ? `<b>Lagos, Nigeria</b>${lagosTime()} WAT · open to remote roles` : '<b>Scroll</b>to see where I work from';
        if (photo && photoA > 0.01) { ctx.globalAlpha = photoA; ctx.drawImage(photo, px0 + tilt.x, py0 + tilt.y, pw, ph); ctx.globalAlpha = 1; }

        if (partA > 0.001) {
          const cell = pw / GW;
          for (const p of parts) {
            const k = ease(Math.min(1, Math.max(0, (prog - 0.1 - p.d * 0.5) / 0.75)));
            const [la, lo] = p.g, z = Math.cos(la) * Math.cos(lo + rot);
            const tx1 = px0 + tilt.x + p.u * pw, ty1 = py0 + tilt.y + p.v * ph, tx2 = gx + Math.cos(la) * Math.sin(lo + rot) * gr, ty2 = gy - Math.sin(la) * gr;
            const mid = Math.sin(Math.PI * k);
            const tx = tx1 + (tx2 - tx1) * k + Math.sin(p.u * 40 + now * 0.001) * 36 * mid, ty = ty1 + (ty2 - ty1) * k + Math.cos(p.v * 40 + now * 0.0012) * 36 * mid;
            if (first) { p.x = tx; p.y = ty; }
            const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
            if (d2 < 8100 && k > 0.02) { const d = Math.sqrt(d2) + 0.01, f = (1 - d / 90) * 3; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
            p.vx = (p.vx + (tx - p.x) * 0.12) * 0.74; p.vy = (p.vy + (ty - p.y) * 0.12) * 0.74; p.x += p.vx; p.y += p.vy;
            const back = k > 0.5 && z < 0, pa = 0.1 + Math.pow(p.l, 1.4) * 0.9, ga = back ? 0.06 : 0.3 + z * 0.65, a = (pa + (ga - pa) * k) * partA;
            const s = Math.max(1, cell * 0.9 * (1 - k) + 1.5 * k);
            ctx.fillStyle = `rgba(${dotRGB},${a})`; ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);
          }
          first = false;
        }
        if (prog > 0.85) {
          const la = LAGOS[0] * D2R, lo = LAGOS[1] * D2R, z = Math.cos(la) * Math.cos(lo + rot);
          if (z > 0) { const x = gx + Math.cos(la) * Math.sin(lo + rot) * gr, y = gy - Math.sin(la) * gr, pp = (now / 1400) % 1;
            ctx.strokeStyle = `rgba(74,222,128,${1 - pp})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(x, y, 4 + pp * 20, 0, 7); ctx.stroke();
            ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fill();
            ctx.font = '500 12px Geist, system-ui'; ctx.fillStyle = `rgba(${dotRGB},.85)`; ctx.fillText('Lagos', x + 12, y + 4); }
        }
      }
      return () => { alive = false; cancelAnimationFrame(raf); removeEventListener('resize', onResize); removeEventListener('scroll', onScroll); };
    },
  },
];

/* ====================================================================
   ABOUT
   ==================================================================== */
const ABOUT = [
  {
    name: 'Bio + photo',
    render: () => `
      <div class="sec a-bio" id="about"><div class="wrap"><div class="g">
        <div data-rv><div class="ph"><img src="/mypic.jpg" alt="Ayomide Taiwo"></div>
          <div class="facts"><div><span>Based in</span><span>Lagos, Nigeria</span></div><div><span>Time</span><span class="mono">${lagosTime()} WAT</span></div><div><span>Studying</span><span>CS, Redeemer's '27</span></div><div><span>Open to</span><span>Remote &amp; on-site</span></div></div></div>
        <div class="txt">
          <p class="sec-label" data-rv><i></i>About</p>
          <h2 class="h2" data-rv>From frontend to AI engineering.</h2>
          <div class="tog" data-rv><button class="on" data-l="0">Short</button><button data-l="1">Long</button></div>
          <div id="bio"></div>
        </div>
      </div></div></div>`,
    mount: (el) => {
      const BIO = [
        `<p>I'm an <b>AI-native software engineer</b> in Lagos. I build retrieval systems, LLM assistants and agents, mostly in Python and TypeScript, and I care most about the moment an AI system has to decide whether it should answer at all.</p>`,
        `<p>I'm an <b>AI-native software engineer</b> in Lagos. I started on the frontend and moved into AI: retrieval and RAG with pgvector, LLM assistants, agents with LangGraph, and computer vision with YOLO. FastAPI, NestJS, PostgreSQL and Redis are how I get them into production.</p>
         <p>At <b>Heirs Technologies</b> I added AI retrieval to a service-management platform fifteen organisations use, and spent most of the time on what makes AI safe to ship: confidence thresholds, access scoping and 231 tests. Before that I shipped fintech features at <b>Platnova</b>.</p>
         <p>Outside work I build AI at hackathons, including SeeForMe (2nd, DATICAN AI in Medicine) and Fusion (2nd of 500+ teams). I co-founded <b>Campor</b> and I'm building StreetGuard, a street-safety app for Lagos.</p>`,
      ];
      const bio = $('#bio', el), set = (i) => { bio.innerHTML = BIO[i]; $$('.tog button', el).forEach((b) => b.classList.toggle('on', +b.dataset.l === i)); };
      set(0); $$('.tog button', el).forEach((b) => b.addEventListener('click', () => set(+b.dataset.l)));
      return () => {};
    },
  },
  {
    name: 'Scroll statement',
    render: () => {
      const parts = [['I started on the frontend and moved into AI. Today I build AI systems where', false], ['a wrong answer is expensive:', true], ["assistants that can't leak another team's data, retrieval that knows when it doesn't know, and agents that hand off to a person when they should.", false]];
      const words = parts.flatMap(([t, hi]) => t.split(' ').map((w) => `<span class="w${hi ? ' hi' : ''}">${w}</span>`)).join(' ');
      return `<div class="sec a-statement" id="about"><div class="wrap">
        <p class="sec-label"><i></i>About</p>
        <p class="st" id="stmt">${words}</p>
        <div class="nums">${[[2400, '+', 'support tickets indexed for AI retrieval'], [15, '', 'organisations on that platform'], [231, '', 'tests in one staged release'], [8, '', 'hackathon placings and bounties']].map(([n, s, l]) => `<div><b><span data-n="${n}">0</span>${s}</b><span>${l}</span></div>`).join('')}</div>
      </div></div>`;
    },
    mount: (el) => {
      const st = $('#stmt', el), ws = $$('.w', st);
      const onScroll = () => { const r = st.getBoundingClientRect(), vh = innerHeight; const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35))); const n = Math.round(p * ws.length); ws.forEach((w, i) => w.classList.toggle('lit', i < n)); };
      addEventListener('scroll', onScroll, { passive: true }); onScroll();
      const ob = new IntersectionObserver((es) => es.forEach((e) => { if (!e.isIntersecting) return; ob.unobserve(e.target); const end = +e.target.dataset.n, t0 = performance.now();
        const step = (t) => { const k = Math.min(1, (t - t0) / 1600), v = 1 - Math.pow(1 - k, 4); e.target.textContent = Math.round(end * v).toLocaleString(); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }), { threshold: 0.6 });
      $$('[data-n]', el).forEach((n) => ob.observe(n));
      return () => { removeEventListener('scroll', onScroll); ob.disconnect(); };
    },
  },
  {
    name: 'How I work on AI',
    render: () => `
      <div class="sec a-principles" id="about"><div class="wrap"><div class="g">
        <div class="intro"><p class="sec-label" data-rv><i></i>How I work</p><h2 class="h2" data-rv>Most of the work in an AI feature isn't the model.</h2>
          <p data-rv>It's deciding what the system may see, when it should stay quiet, and how it gets rolled out without surprising anyone. These are the rules I've actually shipped with.</p></div>
        <ol>
          <li data-rv><div><b>It answers only above a threshold.</b><span>Below it, the case goes to an analyst as a private note, or to a person.</span><small>Heirs Technologies · 2,400+ tickets</small></div></li>
          <li data-rv><div><b>It gets the least access that works.</b><span>Per-department, read-only, denied by default.</span><small>Heirs · internal risk &amp; audit platform</small></div></li>
          <li data-rv><div><b>It ships in stages.</b><span>Behind flags, one cohort at a time, with tests around what the model is allowed to do.</span><small>231 tests · four-stage rollout</small></div></li>
          <li data-rv><div><b>It uses a model only where one is needed.</b><span>YOLO for detection, an LLM only to phrase the instruction.</span><small>SeeForMe · 2nd, DATICAN AI in Medicine</small></div></li>
        </ol>
      </div></div></div>`,
    mount: () => () => {},
  },
];

/* ====================================================================
   WORK  (all variants open the same case-study page)
   ==================================================================== */
const workHead = (p) => `<div class="w-head"><div><p class="sec-label" data-rv><i></i>Selected work</p><h2 class="h2" data-rv>Things I've built and shipped.</h2></div><p data-rv>${p}</p></div>`;
const WORK = [
  {
    name: 'Sticky showcase',
    render: () => `
      <div class="sec w-show" id="work"><div class="wrap">${workHead('Hackathon wins, a live startup and client platforms. Scroll through them, or open any one for the full write-up.')}
        <div class="g">
          <div class="names">${P.map((p, i) => `<button class="nm${i ? '' : ' on'}" data-i="${i}"><span>${p.title}</span><small>${p.award} · ${p.category}</small></button>`).join('')}</div>
          <div class="stage">
            <div class="frame"><div class="bar"><i></i><i></i><i></i><span id="wurl"></span></div><div class="shots">${P.map((p, i) => `<img src="${p.image}" alt="" class="${i ? '' : 'on'}" ${i > 1 ? 'loading="lazy"' : ''}>`).join('')}</div></div>
            <div class="meta"><div class="s" id="wsum"></div><div class="a" id="wawd"></div><div class="st" id="wstk"></div><div class="open"><a class="link" href="#" id="wgo">Read the case study →</a></div></div>
          </div>
        </div>
        <div class="mlist">${P.map((p, i) => `<button class="card-m" data-i="${i}" style="all:unset;cursor:pointer;display:block"><div class="frame"><div class="bar"><i></i><i></i><i></i><span>${host(p.links.live || p.links.source)}</span></div><div class="shots"><img class="on" src="${p.image}" alt="" loading="lazy"></div></div><h3>${p.title}</h3><p>${p.summary}</p></button>`).join('')}</div>
      </div></div>`,
    mount: (el) => {
      const nms = $$('.nm', el), shots = $$('.shots img', $('.stage', el)); let cur = -1;
      const show = (i) => { if (i === cur) return; cur = i; const p = P[i];
        nms.forEach((n, k) => n.classList.toggle('on', k === i)); shots.forEach((s, k) => s.classList.toggle('on', k === i));
        $('#wsum', el).textContent = p.summary; $('#wawd', el).textContent = p.award; $('#wstk', el).textContent = p.stack.slice(0, 6).join(' · '); $('#wurl', el).textContent = host(p.links.live || p.links.source); };
      show(0);
      const ob = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && show(+e.target.dataset.i)), { rootMargin: '-48% 0px -48% 0px' });
      nms.forEach((n) => { ob.observe(n); n.addEventListener('click', () => (cur === +n.dataset.i ? openCase(cur) : n.scrollIntoView({ behavior: 'smooth', block: 'center' }))); });
      $('#wgo', el).addEventListener('click', (e) => { e.preventDefault(); openCase(cur); });
      $$('.card-m', el).forEach((c) => c.addEventListener('click', () => openCase(+c.dataset.i)));
      return () => ob.disconnect();
    },
  },
  {
    name: 'Index + preview',
    render: () => `
      <div class="sec w-index" id="work"><div class="wrap">${workHead('Hover a row for a preview. Click to expand it in place; “Full case study” opens the write-up.')}
        <div class="rows">${P.map((p, i) => `
          <div class="row" data-i="${i}" data-rv>
            <button aria-expanded="false"><span class="n">${p.title}</span><span class="w">${p.summary}</span><span class="r">${p.award}</span><span class="x">+</span></button>
            <div class="det"><div class="det-in">
              <div><p>${p.overview}</p>${p.features.length ? `<h4>What it does</h4><ul>${p.features.slice(0, 4).map((f) => `<li>${f}</li>`).join('')}</ul>` : ''}
                <h4>Stack</h4><div class="muted" style="font-size:14.5px">${p.stack.join(', ')}</div>
                <div class="lk"><a class="link full" href="#">Full case study →</a>${p.links.live ? `<a class="link" href="${p.links.live}" target="_blank" rel="noopener">Live ↗</a>` : ''}${p.links.source ? `<a class="link" href="${p.links.source}" target="_blank" rel="noopener">Source ↗</a>` : ''}</div></div>
              <div><div class="frame"><div class="bar"><i></i><i></i><i></i><span>${host(p.links.live || p.links.source)}</span></div><div class="shots"><img class="on" src="${p.image}" alt="" loading="lazy"></div></div></div>
            </div></div>
          </div>`).join('')}</div>
      </div></div>`,
    mount: (el) => {
      const peek = $('#peek'), pimg = $('img', peek);
      const pm = (e) => { peek.style.left = `${e.clientX + 180}px`; peek.style.top = `${e.clientY}px`; };
      $$('.row', el).forEach((row) => {
        const b = $('button', row), det = $('.det', row), i = +row.dataset.i;
        b.addEventListener('click', () => {
          const open = !row.classList.contains('open');
          det.style.height = `${det.scrollHeight}px`;
          if (open) det.addEventListener('transitionend', () => row.classList.contains('open') && (det.style.height = 'auto'), { once: true });
          else requestAnimationFrame(() => (det.style.height = '0px'));
          row.classList.toggle('open', open); b.setAttribute('aria-expanded', open); peek.classList.remove('on');
        });
        b.addEventListener('pointerenter', () => { if (row.classList.contains('open')) return; pimg.src = P[i].image; peek.classList.add('on'); });
        b.addEventListener('pointerleave', () => peek.classList.remove('on'));
        b.addEventListener('pointermove', pm);
        $('.full', row).addEventListener('click', (e) => { e.preventDefault(); openCase(i); });
      });
      return () => peek.classList.remove('on');
    },
  },
  {
    name: 'Gallery',
    render: () => `
      <div class="sec w-grid" id="work"><div class="wrap">${workHead('Ten projects. The first is the one I’m proudest of; every card opens a full case study.')}
        <div class="cards">${P.map((p, i) => `
          <button class="card${i === 0 ? ' big' : ''}" data-i="${i}" data-rv>
            <div class="frame"><div class="bar"><i></i><i></i><i></i><span>${host(p.links.live || p.links.source)}</span></div><div class="shots"><img src="${p.image}" alt="" loading="lazy"></div></div>
            <div class="c-meta"><div><h3>${p.title}</h3><p>${p.summary}</p></div><span class="a">${p.award}</span></div>
          </button>`).join('')}</div>
      </div></div>`,
    mount: (el) => { $$('.card', el).forEach((c) => c.addEventListener('click', () => openCase(+c.dataset.i))); return () => {}; },
  },
];

/* Case-study page (rendered by the /work/:slug route) */
function openCase(i) { if (P[i]) navigate(`/work/${P[i].slug}`); }
export function renderCase(host, slug) {
  const i = P.findIndex((x) => x.slug === slug);
  if (i < 0) { host.innerHTML = `<article class="cs-in"><h1>Not found</h1><p class="lede">That project doesn't exist. <a class="link" href="/" data-nav="/">Back to all work</a></p></article>`; return; }
  const p = P[i], n = P[(i + 1) % P.length];
  host.innerHTML = `
    <div class="cs-bar"><a class="crumb" href="/#work" data-nav="/#work">← All work</a><span class="crumb"><b>${p.title}</b></span></div>
    <article class="cs-in">
      <p class="sec-label"><i></i>${p.category}</p>
      <h1>${p.title}</h1>
      <p class="lede">${p.summary}</p>
      <div class="kv"><div><span>Result</span>${p.award}</div><div><span>Context</span>${p.event || p.category}</div><div><span>Stack</span>${p.stack.slice(0, 3).join(', ')}</div><div><span>Links</span>${[p.links.live && `<a class="link" href="${p.links.live}" target="_blank" rel="noopener">Live</a>`, p.links.demo && `<a class="link" href="${p.links.demo}" target="_blank" rel="noopener">Demo</a>`, p.links.source && `<a class="link" href="${p.links.source}" target="_blank" rel="noopener">Code</a>`].filter(Boolean).join(' · ') || '—'}</div></div>
      <div class="shot"><img src="${p.image}" alt="${p.title} screenshot"></div>
      <h3>Overview</h3><p class="ov">${p.overview}</p>
      ${p.arch?.length ? `<h3>How it fits together</h3><div class="flow sys">${p.arch.map((f) => `<span>${f}</span>`).join('<i>→</i>')}</div>` : ''}
      ${p.features.length ? `<h3>What it does</h3><ul>${p.features.map((f) => `<li>${f}</li>`).join('')}</ul>` : ''}
      ${p.how.length ? `<h3>How it works</h3><ol>${p.how.map((f) => `<li>${f}</li>`).join('')}</ol>` : ''}
      <h3>Stack</h3><div class="flow">${p.stack.map((t) => `<span>${t}</span>`).join('')}</div>
      <a class="nx" href="/work/${n.slug}" data-nav="/work/${n.slug}"><span><small>Next project</small><b>${n.title}</b></span><span style="font-size:24px">→</span></a>
    </article>`;
  document.title = `${p.title} — Ayomide Taiwo`;
}

/* ====================================================================
   EXPERIENCE
   ==================================================================== */
const EXP = [
  {
    name: 'Timeline rail',
    render: () => `
      <div class="sec e-rail" id="experience"><div class="wrap">
        <p class="sec-label" data-rv><i></i>Experience</p><h2 class="h2" data-rv>Where I've worked.</h2>
        <div class="xp"><div class="rail"><i></i></div>${jobs.map((j) => `<div class="job" data-rv><div class="when">${j.when}</div><div><h3>${j.co}</h3><div class="role">${j.role}</div><ul>${jobPts(j.pts)}</ul>${j.flow ? `<div class="flow sys" aria-label="How the retrieval system routes a question">${j.flow.map((f) => `<span>${f}</span>`).join('<i>→</i>')}</div>` : ''}</div></div>`).join('')}</div>
        ${awardsHTML()}
      </div></div>`,
    mount: (el) => {
      const xp = $('.xp', el), fill = $('.rail i', el), js = $$('.job', el);
      const onScroll = () => { const r = xp.getBoundingClientRect(), mid = innerHeight * 0.6; const p = Math.min(1, Math.max(0, (mid - r.top) / r.height)); fill.style.height = `${p * 100}%`; js.forEach((j) => j.classList.toggle('on', j.getBoundingClientRect().top < mid)); };
      addEventListener('scroll', onScroll, { passive: true }); onScroll();
      return () => removeEventListener('scroll', onScroll);
    },
  },
  {
    name: 'Dated list',
    render: () => `
      <div class="sec e-table" id="experience"><div class="wrap">
        <p class="sec-label" data-rv><i></i>Experience</p><h2 class="h2" data-rv>Where I've worked.</h2>
        <div class="t">${jobs.map((j) => `<div class="tr" data-rv><div class="d">${j.d}</div><div><b>${j.co}</b><div class="rl">${j.role}</div></div><p>${j.pts.map((p) => p.join('')).join(' ')}</p></div>`).join('')}</div>
        ${awardsHTML()}
      </div></div>`,
    mount: () => () => {},
  },
];

/* ====================================================================
   CONTACT
   ==================================================================== */
const CONTACT = [
  {
    name: 'Big close',
    render: () => `
      <div class="c-big" id="contact"><div class="wrap">
        <p class="sec-label" style="justify-content:center" data-rv><i></i>Contact</p>
        <h2 data-rv>Building AI that has to work?</h2>
        <p data-rv>I'm open to AI engineering roles, remote or on-site, and I usually reply within a day.</p>
        <div class="cta" data-rv><button class="mail" id="cmail">${EMAIL}</button></div>
        <div class="cta" data-rv><a class="btn" href="https://www.linkedin.com/in/taiwoayomide/" target="_blank" rel="noopener">LinkedIn ↗</a><a class="btn" href="https://github.com/dev-ayomide" target="_blank" rel="noopener">GitHub ↗</a><a class="btn" href="${RESUME}">Résumé</a></div>
      </div></div>`,
    mount: (el) => { $('#cmail', el).addEventListener('click', copyEmail); return () => {}; },
  },
  {
    name: 'Minimal',
    render: () => `
      <div class="c-min" id="contact"><div class="wrap"><div class="g">
        <div><p class="sec-label" data-rv><i></i>Contact</p><h2 data-rv>Email is the fastest way to reach me.</h2><span class="avail" data-rv><i></i>Available for new roles · Lagos ${lagosTime()} WAT</span></div>
        <div class="list" data-rv>
          <button id="cmail2">${EMAIL}<span>copy</span></button>
          <a href="https://www.linkedin.com/in/taiwoayomide/" target="_blank" rel="noopener">LinkedIn<span>↗</span></a>
          <a href="https://github.com/dev-ayomide" target="_blank" rel="noopener">GitHub<span>↗</span></a>
          <a href="https://x.com/dev_ayomide" target="_blank" rel="noopener">X<span>↗</span></a>
          <a href="${RESUME}">Résumé<span>pdf</span></a>
        </div>
      </div></div></div>`,
    mount: (el) => { $('#cmail2', el).addEventListener('click', copyEmail); return () => {}; },
  },
];

/* ⌘K palette */
let paletteReady = false;
function setupPalette() {
  if (paletteReady) return; paletteReady = true;
  const pal = $('#pal'), inp = $('#palIn'), list = $('#palList');
  const cmds = () => [
    ['Go to work', () => navigate('/#work'), 'jump'],
    ['Go to experience', () => navigate('/#experience'), 'jump'],
    ['Copy email', copyEmail, 'action'],
    ['Open résumé', () => window.open(RESUME, '_blank'), 'link'],
    ['Open GitHub', () => window.open('https://github.com/dev-ayomide', '_blank'), 'link'],
    ...P.map((p, i) => [`Case study: ${p.title}`, () => openCase(i), 'project']),
  ];
  let sel = 0, shown = [];
  const draw = () => { list.innerHTML = shown.map((c, i) => `<li class="${i === sel ? 'sel' : ''}" data-i="${i}">${c[0]}<span>${c[2]}</span></li>`).join(''); };
  const open = () => { pal.classList.add('on'); inp.value = ''; shown = cmds(); sel = 0; draw(); setTimeout(() => inp.focus(), 10); };
  const close = () => pal.classList.remove('on');
  const run = (c) => { close(); c[1](); };
  $('#kbtn').addEventListener('click', open);
  pal.addEventListener('click', (e) => { if (e.target === pal) close(); const li = e.target.closest('li'); if (li) run(shown[+li.dataset.i]); });
  inp.addEventListener('input', () => { const q = inp.value.toLowerCase(); shown = cmds().filter((c) => c[0].toLowerCase().includes(q)); sel = 0; draw(); });
  addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.classList.contains('on') ? close() : open(); return; }
    if (e.key === 'Escape' && pal.classList.contains('on')) close();
    if (!pal.classList.contains('on')) return;
    if (e.key === 'ArrowDown') { sel = (sel + 1) % shown.length; draw(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { sel = (sel - 1 + shown.length) % shown.length; draw(); e.preventDefault(); }
    if (e.key === 'Enter' && shown[sel]) run(shown[sel]);
  });
}

/* ====================================================================
   MOUNT (called by the React shell)
   ==================================================================== */
const PICK = [[HERO, 5, '#s-hero'], [ABOUT, 0, '#s-about'], [WORK, 1, '#s-work'], [EXP, 0, '#s-exp'], [CONTACT, 0, '#s-contact']];
const cleanups = {};
function renderInto(list, i, sel) {
  cleanups[sel]?.();
  const host = $(sel); if (!host) return;
  host.innerHTML = list[i].render();
  cleanups[sel] = list[i].mount(host) || (() => {});
  watchReveals(host);
}
export function mountSite(go) {
  navigate = go; readTheme();
  PICK.forEach(([list, i, sel]) => renderInto(list, i, sel));
  setupPalette();
  const pnLinks = $$('.pn-l'), pnhl = $('#pnhl');
  const pnSync = () => {
    const mid = innerHeight * 0.45; let on = null;
    for (const a of pnLinks) { const t = document.getElementById(a.dataset.target); if (!t) continue; const r = t.getBoundingClientRect(); if (r.top <= mid && r.bottom > mid) on = a; }
    pnLinks.forEach((a) => a.classList.toggle('on', a === on));
    if (on && pnhl) { pnhl.style.left = `${on.offsetLeft}px`; pnhl.style.width = `${on.offsetWidth}px`; pnhl.style.opacity = 1; } else if (pnhl) pnhl.style.opacity = 0;
  };
  const tick = () => { const c = $('#clock'); if (c) c.textContent = `${lagosTime()} WAT`; };
  tick(); const clock = setInterval(tick, 15000);
  addEventListener('scroll', pnSync, { passive: true }); addEventListener('resize', pnSync); pnSync();
  return () => { Object.values(cleanups).forEach((c) => c()); clearInterval(clock); removeEventListener('scroll', pnSync); removeEventListener('resize', pnSync); };
}
/** Projects arrive from Supabase after first paint; re-render the work list. */
export function setProjects(list) { P = list; if ($('#s-work')) renderInto(WORK, 1, '#s-work'); }
export function setNavigate(go) { navigate = go; setupPalette(); }
export const copyEmailAction = copyEmail;
