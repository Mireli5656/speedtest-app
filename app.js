* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #0a0e1a;
  --line: rgba(255,255,255,0.08);
  --text: #edf2ff;
  --muted: #a7b1d1;
  --primary: #79e7ff;
  --cyan: #53d6ff;
  --green: #5ef29d;
  --purple: #7a74ff;
  --shadow: 0 18px 48px rgba(5, 10, 20, 0.45);
}

html, body {
  width: 100%;
  min-height: 100%;
  font-family: "Inter", sans-serif;
  background:
    radial-gradient(circle at top, rgba(80,170,255,0.18), transparent 25%),
    radial-gradient(circle at bottom right, rgba(122,116,255,0.12), transparent 30%),
    var(--bg);
  color: var(--text);
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 18px;
}

.app-shell {
  width: 100%;
  max-width: 1200px;
  border: 1px solid var(--line);
  border-radius: 26px;
  background: rgba(11, 14, 22, 0.84);
  box-shadow: var(--shadow);
  backdrop-filter: blur(14px);
  overflow: hidden;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px;
  border-bottom: 1px solid var(--line);
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 1.35rem;
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  box-shadow: 0 14px 28px rgba(83,214,255,0.32);
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.brand h1 {
  margin: 0;
  font-size: clamp(1.2rem, 4vw, 1.8rem);
  font-weight: 800;
}

.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 92px;
  min-height: 46px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--green), var(--cyan));
  color: #031722;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(94,242,157,0.28);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 20;
}

.primary-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 32px rgba(94,242,157,0.32);
}

.primary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.dashboard {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 18px;
  padding: 20px;
}

.panel {
  background: linear-gradient(180deg, rgba(18,22,34,0.94), rgba(13,17,27,0.96));
  border: 1px solid var(--line);
  border-radius: 22px;
  padding: 22px;
}

.meter-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.server-chip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: var(--muted);
  font-size: 0.75rem;
  margin-bottom: 14px;
  text-align: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px rgba(94,242,157,0.8);
}

.gauge-wrap {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}

.gauge-ring {
  position: relative;
  width: min(360px, 85vw);
  aspect-ratio: 1;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: conic-gradient(
    from 220deg,
    rgba(93,243,160,0.95) 0deg,
    rgba(83,214,255,0.9) 150deg,
    rgba(123,116,255,0.8) 220deg,
    rgba(255,255,255,0.08) 225deg,
    rgba(255,255,255,0.06) 360deg
  );
  box-shadow: inset 0 0 30px rgba(20,30,65,0.5), 0 20px 40px rgba(4,8,20,0.45);
}

.gauge-ring::before {
  content: "";
  position: absolute;
  inset: 14px;
  border-radius: 50%;
  background: rgba(9,13,18,0.9);
  border: 1px solid rgba(255,255,255,0.06);
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
  width: 6px;
  height: 38%;
  border-radius: 999px;
  background: linear-gradient(180deg, #fff, rgba(255,255,255,0.2));
  transform-origin: center bottom;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%) rotate(-120deg);
  transition: transform 1.2s cubic-bezier(0.2, 0.65, 0.18, 1);
  box-shadow: 0 0 20px rgba(255,255,255,0.4);
}

.needle::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--primary);
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px rgba(121,231,255,0.85);
}

.gauge-center {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(6,10,18,0.82);
  border: 1px solid rgba(255,255,255,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 2;
}

.score-label {
  font-size: 0.68rem;
  color: var(--muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
}

#speedValue {
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1;
  margin-top: 6px;
}

.metrics-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.metric-box {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  padding: 14px 10px;
  text-align: center;
}

.metric-box label {
  display: block;
  font-size: 0.7rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
  font-weight: 600;
}

.metric-box strong {
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-weight: 700;
}

.chart-panel {
  display: flex;
  flex-direction: column;
  min-height: 500px;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
}

.status-badge {
  font-size: 0.7rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  padding: 4px 10px;
  background: rgba(255,255,255,0.03);
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.06);
}

#speedChart {
  width: 100%;
  height: 100%;
  flex: 1;
  background: linear-gradient(180deg, rgba(8,12,18,0.72), rgba(19,24,36,0.08));
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.04);
}

.app-footer {
  padding: 16px 24px;
  text-align: center;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.8rem;
}

@media (max-width: 1024px) {
  .dashboard { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .topbar {
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  .brand {
    flex-direction: column;
    gap: 10px;
  }

  .primary-btn {
    width: 100%;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .gauge-ring {
    width: min(300px, 90vw);
  }
}
