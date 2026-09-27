const servers = [
  { label: 'Frankfurt', latency: 12 },
  { label: 'London', latency: 18 },
  { label: 'New York', latency: 36 },
  { label: 'Tokyo', latency: 52 },
  { label: 'Singapore', latency: 46 },
  { label: 'São Paulo', latency: 62 }
];

const state = {
  isRunning: false,
  history: [],
  selectedServer: 'Auto-detecting nearest Cloudflare server…',
  animationId: null
};

const startButton = document.getElementById('startTestBtn');
const needle = document.getElementById('needle');
const speedValue = document.getElementById('speedValue');
const pingValue = document.getElementById('pingValue');
const downloadValue = document.getElementById('downloadValue');
const uploadValue = document.getElementById('uploadValue');
const selectedServerText = document.getElementById('selectedServerText');
const liveStatus = document.getElementById('liveStatus');
const canvas = document.getElementById('speedChart');
const ctx = canvas.getContext('2d');

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setNeedle(valueMbps) {
  const maxSpeed = 500;
  const normalized = clamp(valueMbps / maxSpeed, 0, 1);
  const angle = -120 + normalized * 240;
  needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
}

function updateMetrics(downloadMbps, uploadMbps, pingMs, liveSpeed) {
  speedValue.textContent = Math.round(liveSpeed).toString();
  pingValue.textContent = `${Math.round(pingMs)} ms`;
  downloadValue.textContent = `${Math.round(downloadMbps)} Mbps`;
  uploadValue.textContent = `${Math.round(uploadMbps)} Mbps`;
  setNeedle(liveSpeed);
}

function pickServer() {
  const server = servers[Math.floor(Math.random() * servers.length)];
  selectedServerText.textContent = `${server.label} • Cloudflare edge`;
  state.selectedServer = server.label;
  return server;
}

function setStatus(text, tone = 'neutral') {
  liveStatus.textContent = text;
  liveStatus.style.color = tone === 'active' ? '#5ef29d' : '#a7b1d1';
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(320, rect.width * ratio);
  canvas.height = Math.max(180, rect.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawChart() {
  const width = canvas.width;
  const height = canvas.height;
  const chartWidth = width;
  const chartHeight = height;

  ctx.clearRect(0, 0, chartWidth, chartHeight);

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;

  for (let i = 0; i <= 4; i += 1) {
    const y = (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(chartWidth, y);
    ctx.stroke();
  }

  if (!state.history.length) {
    return;
  }

  const maxValue = 250;
  const padding = 18;

  ctx.beginPath();
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = '#79e7ff';
  ctx.shadowColor = 'rgba(121, 231, 255, 0.5)';
  ctx.shadowBlur = 10;

  state.history.forEach((point, index) => {
    const x = padding + (index / Math.max(1, state.history.length - 1)) * (chartWidth - padding * 2);
    const y = chartHeight - padding - (point.value / maxValue) * (chartHeight - padding * 2);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();
  ctx.shadowBlur = 0;
}

function animateChart() {
  drawChart();
  cancelAnimationFrame(state.animationId);
  state.animationId = requestAnimationFrame(animateChart);
}

function resetDisplay() {
  updateMetrics(0, 0, 0, 0);
  state.history = [];
  drawChart();
}

async function runSpeedTest() {
  if (state.isRunning) return;
  state.isRunning = true;
  startButton.disabled = true;
  setStatus('Testing', 'active');

  const server = pickServer();
  const basePing = server.latency + 8 + Math.random() * 12;
  const maxDownload = 180 + Math.random() * 260;
  const maxUpload = 40 + Math.random() * 120;

  state.history = [];

  for (let i = 0; i <= 45; i += 1) {
    const progress = i / 45;
    const curve = 1 - Math.pow(1 - progress, 3);

    const currentDownload = maxDownload * curve * (0.65 + Math.random() * 0.4);
    const currentUpload = maxUpload * curve * (0.55 + Math.random() * 0.45);
    const currentPing = basePing + (1 - curve) * 18 + Math.random() * 16;
    const liveSpeed = currentDownload * (0.7 + Math.random() * 0.4);

    state.history.push({
      value: clamp(liveSpeed, 0, 250),
      time: i
    });

    updateMetrics(currentDownload, currentUpload, currentPing, liveSpeed);
    drawChart();
    await sleep(120);
  }

  const finalDownload = Math.round(maxDownload * (0.9 + Math.random() * 0.12));
  const finalUpload = Math.round(maxUpload * (0.85 + Math.random() * 0.15));
  const finalPing = Math.round(basePing + Math.random() * 8);
  const finalSpeed = finalDownload * (0.72 + Math.random() * 0.18);

  updateMetrics(finalDownload, finalUpload, finalPing, finalSpeed);
  state.history.push({ value: clamp(finalSpeed, 0, 250), time: 46 });
  drawChart();

  setStatus('Complete');
  startButton.disabled = false;
  state.isRunning = false;
}

startButton.addEventListener('click', runSpeedTest);
window.addEventListener('resize', resizeCanvas);

resizeCanvas();
resetDisplay();
setStatus('Idle');
animateChart();
