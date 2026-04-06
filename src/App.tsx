import { useState, useEffect } from 'react'
import './App.css'

type ViewMode = 'digital' | 'analog' | 'settings'

function App() {
  const [time, setTime] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const saved = localStorage.getItem('clock-view-mode');
    return (saved === 'digital' || saved === 'analog' || saved === 'settings') ? saved as ViewMode : 'digital';
  })
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('clock-view-mode', viewMode);
  }, [viewMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTimeParts = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return { hours, minutes, seconds }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatWeekday = (date: Date) => {
    return date.toLocaleDateString('tr-TR', { weekday: 'long' })
  }

  const { hours, minutes, seconds } = formatTimeParts(time)
  const hourDeg = (time.getHours() % 12) * 30 + time.getMinutes() * 0.5
  const minuteDeg = time.getMinutes() * 6
  const secondDeg = time.getSeconds() * 6

  const nextAlarm = '07:30'
  const focusTime = '25:00'
  const londonTime = new Date(time.getTime() - 3 * 60 * 60 * 1000).toLocaleTimeString('tr-TR', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })

  return (
    <div className="app">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-logo">NOCTURNAL</div>
        <div className="nav-links">
          <button 
            className={`nav-link ${viewMode === 'digital' ? 'active' : ''}`}
            onClick={() => setViewMode('digital')}
          >
            Dijital
          </button>
          <button 
            className={`nav-link ${viewMode === 'analog' ? 'active' : ''}`}
            onClick={() => setViewMode('analog')}
          >
            Analog
          </button>
          <button 
            className={`nav-link ${viewMode === 'settings' ? 'active' : ''}`}
            onClick={() => setSettingsOpen(true)}
          >
            Ayarlar
          </button>
        </div>
        <div className="nav-actions">
          <button 
            className="nav-button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Bildirimler"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button 
            className="nav-button"
            onClick={() => setSettingsOpen(true)}
            aria-label="Menü"
          >
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content bg-mesh">
        {/* Ambient Glow */}
        <div className="ambient-glow">
          <div className="glow-circle"></div>
        </div>

        {/* Digital View */}
        {viewMode === 'digital' && (
          <section className="clock-section">
            <div className="clock-label">Güncel Zaman</div>
            <div className="digital-clock text-glow">
              {hours}:{minutes}
              <span className="digital-seconds">:{seconds}</span>
            </div>
            <div className="date-display">
              <p className="date-text">{formatDate(time).toUpperCase()}</p>
              <div className="date-divider">
                <span className="divider-line"></span>
                <p className="weekday-text">{formatWeekday(time)}</p>
                <span className="divider-line"></span>
              </div>
            </div>

            {/* Info Cards */}
            <div className="info-cards">
              <div className="info-card">
                <span className="material-symbols-outlined info-card-icon">alarm</span>
                <span className="info-card-value">{nextAlarm}</span>
                <span className="info-card-label">Sıradaki Alarm</span>
              </div>
              <div className="info-card">
                <span className="material-symbols-outlined info-card-icon">timer</span>
                <span className="info-card-value">{focusTime}</span>
                <span className="info-card-label">Odaklanma</span>
              </div>
              <div className="info-card">
                <span className="material-symbols-outlined info-card-icon">schedule</span>
                <span className="info-card-value">{londonTime}</span>
                <span className="info-card-label">Londra</span>
              </div>
            </div>
          </section>
        )}

        {/* Analog View */}
        {viewMode === 'analog' && (
          <section className="clock-section">
            <div className="analog-clock-container">
              <span className="analog-clock-label">GMT +03:00</span>
              <svg className="analog-clock-svg" viewBox="0 0 100 100">
                {/* Face Background */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="48" 
                  fill="transparent" 
                  stroke="rgba(165,170,194,0.05)" 
                  strokeWidth="0.5"
                />
                {/* Hour Markers */}
                <g stroke="var(--color-outline-variant)" strokeWidth="0.5">
                  <line x1="50" y1="5" x2="50" y2="8" />
                  <line x1="95" y1="50" x2="92" y2="50" />
                  <line x1="50" y1="95" x2="50" y2="92" />
                  <line x1="5" y1="50" x2="8" y2="50" />
                </g>
                {/* Hour Hand */}
                <g transform={`rotate(${hourDeg} 50 50)`}>
                  <line 
                    x1="50" 
                    y1="50" 
                    x2="50" 
                    y2="28" 
                    stroke="var(--color-secondary)" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"
                  />
                </g>
                {/* Minute Hand */}
                <g transform={`rotate(${minuteDeg} 50 50)`}>
                  <line 
                    x1="50" 
                    y1="50" 
                    x2="50" 
                    y2="18" 
                    stroke="var(--color-on-surface)" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                  />
                </g>
                {/* Second Hand */}
                <g transform={`rotate(${secondDeg} 50 50)`}>
                  <line 
                    x1="50" 
                    y1="58" 
                    x2="50" 
                    y2="10" 
                    stroke="var(--color-primary)" 
                    strokeWidth="0.75" 
                    strokeLinecap="round"
                  />
                  <circle cx="50" cy="50" r="1.5" fill="var(--color-primary)" />
                </g>
                {/* Center Pin */}
                <circle cx="50" cy="50" r="2.5" fill="var(--color-surface-variant)" />
              </svg>
            </div>
            <div className="sub-clock">
              <div className="sub-clock-time">
                {hours}:{minutes}
                <span className="sub-clock-seconds">.{seconds}</span>
              </div>
              <div className="sub-clock-date">
                {time.getDate()} {formatDate(time).split(' ')[1]} {formatWeekday(time)}
              </div>
            </div>
          </section>
        )}

        {/* Settings View */}
        {viewMode === 'settings' && (
          <section className="clock-section">
            <div className="settings-placeholder">
              <h2>Ayarlar</h2>
              <p>Ayarlar paneli için sağ üst menüyü kullanın</p>
            </div>
          </section>
        )}
      </main>

      {/* Settings Panel */}
      <div 
        className={`settings-overlay ${settingsOpen ? 'open' : ''}`}
        onClick={() => setSettingsOpen(false)}
      />
      <div className={`settings-panel ${settingsOpen ? 'open' : ''}`}>
        <div className="settings-header">
          <h2 className="settings-title">Ayarlar</h2>
          <button 
            className="settings-close"
            onClick={() => setSettingsOpen(false)}
            aria-label="Kapat"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="settings-content">
          <p>Uygulama tercihlerini yönetin</p>
          <div className="settings-section">
            <h3>Görünüm Modu</h3>
            <div className="settings-options">
              <button 
                className={`settings-option ${viewMode === 'digital' ? 'active' : ''}`}
                onClick={() => { setViewMode('digital'); setSettingsOpen(false); }}
              >
                <span className="material-symbols-outlined">schedule</span>
                Dijital
              </button>
              <button 
                className={`settings-option ${viewMode === 'analog' ? 'active' : ''}`}
                onClick={() => { setViewMode('analog'); setSettingsOpen(false); }}
              >
                <span className="material-symbols-outlined">watch</span>
                Analog
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button 
          className={`bottom-nav-item ${viewMode === 'digital' ? 'active' : ''}`}
          onClick={() => setViewMode('digital')}
        >
          <span className="material-symbols-outlined">schedule</span>
          <span className="bottom-nav-label">Dijital</span>
        </button>
        <button 
          className={`bottom-nav-item ${viewMode === 'analog' ? 'active' : ''}`}
          onClick={() => setViewMode('analog')}
        >
          <span className="material-symbols-outlined">watch</span>
          <span className="bottom-nav-label">Analog</span>
        </button>
        <button 
          className={`bottom-nav-item ${settingsOpen ? 'active' : ''}`}
          onClick={() => setSettingsOpen(true)}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="bottom-nav-label">Ayarlar</span>
        </button>
      </nav>
    </div>
  )
}

export default App
