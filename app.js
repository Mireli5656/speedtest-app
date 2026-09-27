(() => {
  'use strict';

  const startBtn = document.getElementById('startTestBtn');
  const speedValue = document.getElementById('speedValue');
  const pingValue = document.getElementById('pingValue');
  const downloadValue = document.getElementById('downloadValue');
  const uploadValue = document.getElementById('uploadValue');
  const selectedServerText = document.getElementById('selectedServerText');
  const liveStatus = document.getElementById('liveStatus');
  const needle = document.getElementById('needle');
  const canvas = document.getElementById('speedChart');

  if (!startBtn || !canvas) {
    console.error('Speed Test: required HTML elements are missing.');
    return;
  }

  const ctx = canvas.getContext('2d');
  const samples = [];
  let running = false;

  // Cloudflare endpoints are used only for latency selection.
  const servers = [
    { name: 'Cloudflare Speed', url: 'https://speed.cloudflare.com' },
    { name: 'Cloudflare', url: 'https://www.cloudflare.com' },
    { name: 'Cloudflare CDN', url: 'https://cdnjs.cloudflare.com' }
  ];

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function status(text) {
    liveStatus.textContent = text;
  }

  function updateGauge(mbps) {
    const rotation = -120 + clamp(mbps / 220, 0, 1) * 240;
    needle.style.transform = `translateX(-50%) rotate(${rotation}deg)`;
    speedValue.textContent = Number.isFinite(mbps) ? mbps.toFixed(1) : '0';
  }

  function addSample(value) {
    samples.push(value);
    if (samples.length > 32) samples.shift();
    drawChart();
  }

  function drawChart() {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(83, 214, 255, .14)');
    gradient.addColorStop(1, 'rgba(122, 116, 255, .02)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255,255,255,.08)';
    ctx.lineWidth = 1;
    for (let row = 0; row <= 4; row += 1) {
      const y = (height / 4) * row;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (samples.length < 2) return;

    const maximum = Math.max(200, ...samples);
    ctx.beginPath();
    samples.forEach((value, index) => {
      const x = (index / (samples.length - 1)) * width;
      const y = height - (value / maximum) * (height - 20) - 10;
      index === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#79e7ff';
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(121,231,255,.6)';
    ctx.shadowBlur = 14;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  async function latency(server) {
    const started = performance.now();
    try {
      await fetch(`${server.url}/cdn-cgi/trace?speedtest=${Date.now()}`, {
        mode: 'no-cors',
        cache: 'no-store'
      });
      return performance.now() - started;
    } catch {
      return Number.POSITIVE_INFINITY;
    }
  }

  async function selectServer() {
    const results = await Promise.all(
      servers.map(async (server) => ({ ...server, ms: await latency(server) }))
    );
    const selected = results.sort((a, b) => a.ms - b.ms)[0] || servers[0];
    const displayMs = Number.isFinite(selected.ms) ? ` (${Math.round(selected.ms)} ms)` : '';
    selectedServerText.textContent = `${selected.name}${displayMs}`;
    return selected;
  }

  async function measurePing(server) {
    const values = [];
    for (let i = 0; i < 5; i += 1) {
      const ms = await latency(server);
      if (Number.isFinite(ms)) values.push(ms);
      await sleep(80);
    }
    const result = values.length
      ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
      : 0;
    pingValue.textContent = `${result} ms`;
    return result;
  }

  async function measureDownload() {
    // Cloudflare's documented speed endpoint. A cache-busting query avoids cached data.
    const bytes = 10 * 1024 * 1024;
    const started = performance.now();
    const response = await fetch(`https://speed.cloudflare.com/__down?bytes=${bytes}&t=${Date.now()}`, {
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);
    const data = await response.arrayBuffer();
    const seconds = (performance.now() - started) / 1000;
    const mbps = (data.byteLength * 8) / seconds / 1e6;
    downloadValue.textContent = `${mbps.toFixed(1)} Mbps`;
    addSample(mbps);
    return mbps;
  }

  async function measureUpload() {
    const bytes = 5 * 1024 * 1024;
    const payload = new Uint8Array(bytes);
    crypto.getRandomValues(payload.subarray(0, Math.min(payload.length, 65536)));
    const body = new Blob([payload], { type: 'application/octet-stream' });
    const started = performance.now();
    const response = await fetch(`https://speed.cloudflare.com/__up?t=${Date.now()}`, {
      method: 'POST',
      body,
      cache: 'no-store'
    });
    if (!response.ok) throw new Error(`Upload failed: ${response.status}`);
    await response.arrayBuffer();
    const seconds = (performance.now() - started) / 1000;
    const mbps = (bytes * 8) / seconds / 1e6;
    uploadValue.textContent = `${mbps.toFixed(1)} Mbps`;
    addSample(mbps);
    return mbps;
  }

  async function runSpeedTest() {
    if (running) return;
    running = true;
    startBtn.disabled = true;
    startBtn.textContent = 'Testing…';
    samples.length = 0;
    drawChart();
    updateGauge(0);

    try {
      status('Finding server…');
      const server = await selectServer();
      status('Measuring ping…');
      await measurePing(server);
      status('Testing download…');
      const download = await measureDownload();
      status('Testing upload…');
      const upload = await measureUpload();
      updateGauge((download + upload) / 2);
      status('Complete');
    } catch (error) {
      console.error('Speed test failed:', error);
      status('Test failed');
      selectedServerText.textContent = 'Cloudflare test unavailable';
      pingValue.textContent = 'N/A';
      downloadValue.textContent = 'N/A';
      uploadValue.textContent = 'N/A';
      updateGauge(0);
    } finally {
      running = false;
      startBtn.disabled = false;
      startBtn.textContent = 'Go';
    }
  }

  startBtn.addEventListener('click', runSpeedTest);
  updateGauge(0);
  status('Idle');
  for (let i = 0; i < 10; i += 1) addSample(0);
})();
