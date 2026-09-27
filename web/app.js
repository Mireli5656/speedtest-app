* {
  box-sizing: border-box;
}

:root {
  --bg: #090b13;
  --panel: rgba(17, 20, 31, 0.86);
  --panel-strong: rgba(20, 25, 37, 0.98);
  --line: rgba(255, 255, 255, 0.08);
  --text: #edf2ff;
  --muted: #a7b1d1;
  --primary: #79e7ff;
  --cyan: #53d6ff;
  --green: #5ef29d;
  --purple: #7a74ff;
  --orange: #ffb469;
  --shadow: 0 16px 48px rgba(3, 10, 24, 0.45);
}

html, body {
  margin: 0;
  min-height: 100%;
  background:
    radial-gradient(circle at top, rgba(80, 170, 255, 0.25), transparent 28%),
    radial-gradient(circle at bottom right, rgba(122, 116, 255, 0.2), transparent 28%),
    var(--bg);
  color: var(--text);
  font-family: "Inter", sans-serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px 18px;
}

.app-shell {
  width: min(1180px, 100%);
  border: 1px solid var(--line);
  border-radius: 28px;
  background: rgba(11, 14, 22, 0.84);
  backdrop-filter: blur(18px);
  box-shadow: var(--shadow);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 30px 18px;
  border-bottom: 1px solid var(--line);
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  font-weight: 800;
  font-size: 1.15rem;
  box-shadow: 0 14px 28px rgba(83, 214, 255, 0.35);
}

.eyebrow {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-transform: uppercase;
}

h1 {
  margin: 4px 0 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
}

.primary-btn {
  appearance: none;
  border: 0;
  border-radius: 999px;
  padding: 0.9rem 1.7rem;
  background: linear-gradient(135deg, var(--green), var(--cyan));
  color: #031722;
  font-weight: 800;
  font-size: 1.05rem;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(94, 242, 157, 0.28);
  transition: transform 0.16s ease, box-shadow 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px rgba(94, 242, 157, 0.32);
}

.primary-btn:active {
  transform: translateY(0);
}

.dashboard {
  display: grid;
  grid-template-columns: minmax(420px, 1fr) minmax(320px, 1.3fr);
  gap: 18px;
  padding: 20px 22px 22px;
}

.panel {
  background: linear-gradient(180deg, rgba(18, 22, 34, 0.94), rgba(13, 17, 27, 0.96));
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 20px;
}

.meter-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 620px;
}

.server-chip {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: var(--muted);
  text-align: center;
  font-size: 0.8rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px rgba(94, 242, 157, 0.8);
}

.gauge-wrap {
  display: grid;
  place-items: center;
  padding: 8px 0 18px;
}

.gauge-ring {
  position: relative;
  width: min(420px, 78vw);
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: conic-gradient(from 220deg, rgba(93, 243, 160, 0.95) 0deg, rgba(83, 214, 255, 0.9) 150deg, rgba(123, 116, 255, 0.8) 220deg, rgba(255, 255, 255, 0.08) 225deg, rgba(255, 255, 255, 0.06) 360deg);
  box-shadow: inset 0 0 30px rgba(20, 30, 65, 0.5), 0 24px 52px rgba(4, 8, 20, 0.45);
}

.gauge-ring::before {
  content: "";
  position: absolute;
  inset: 16px;
  border-radius: 50%;
  background: rgba(9, 13, 18, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.gauge-inner {
  position: relative;
  width: 72%;
  height: 72%;
  display: grid;
  place-items: center;
  z-index: 1;
}

.needle-wrap {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.needle {
  position: absolute;
  width: 8px;
  height: 43%;
  border-radius: 999px;
  background: linear-gradient(180deg, #fff, rgba(255,255,255,0.2));
  transform-origin: center bottom;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%) rotate(-120deg);
  transition: transform 1.1s cubic-bezier(0.2, 0.65, 0.18, 1);
  box-shadow: 0 0 18px rgba(255,255,255,0.35);
}

.needle::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--primary);
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px rgba(121, 231, 255, 0.85);
}

.gauge-center {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: rgba(6, 10, 18, 0.82);
  border: 1px solid rgba(255,255,255,0.04);
  z-index: 2;
}

.score-label {
  font-size: 0.7rem;
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

#gaugeValue, #speedValue {
  font-size: clamp(2.4rem, 3vw, 3.1rem);
  line-height: 1;
  margin-top: 4px;
}

.metrics-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.metric-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 18px;
  text-align: center;
  padding: 14px 10px;
}

.metric-box label {
  display: block;
  color: var(--muted);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.metric-box strong {
  font-size: clamp(1.1rem, 2vw, 1.6rem);
}

.chart-panel {
  display: flex;
  flex-direction: column;
  min-height: 620px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.1rem;
}

#liveStatus {
  font-size: 0.8rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

#speedChart {
  width: 100%;
  height: 100%;
  min-height: 320px;
  background: linear-gradient(180deg, rgba(8, 12, 18, 0.72), rgba(19, 24, 36, 0.08));
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  margin-top: 12px;
}

@media (max-width: 900px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .meter-panel,
  .chart-panel {
    min-height: auto;
  }
}

@media (max-width: 560px) {
  .topbar {
    padding: 18px 18px 14px;
  }

  .brand {
    gap: 10px;
  }

  .primary-btn {
    padding: 0.8rem 1.2rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
