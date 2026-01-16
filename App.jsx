import React, { useState } from 'react';

const madhhabColors = {
    hanafi: { bg: '#1a5f4a', light: '#e8f5f1', accent: '#2d8a6e' },
    maliki: { bg: '#8b4513', light: '#fdf5e6', accent: '#a0522d' },
    shafii: { bg: '#1e3a5f', light: '#e8f0f8', accent: '#2c5282' },
    hanbali: { bg: '#5c4033', light: '#f5efe8', accent: '#7a5a45' }
};

const madhhabInfo = {
    hanafi: { name: 'المذهب الحنفي', founder: 'الإمام أبو حنيفة النعمان', icon: '🕌' },
    maliki: { name: 'المذهب المالكي', founder: 'الإمام مالك بن أنس', icon: '📿' },
    shafii: { name: 'المذهب الشافعي', founder: 'الإمام محمد بن إدريس الشافعي', icon: '📖' },
    hanbali: { name: 'المذهب الحنبلي', founder: 'الإمام أحمد بن حنبل', icon: '🌙' }
};

function App() {
    const [question, setQuestion] = useState('');
    const [fatwa, setFatwa] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedMadhhab, setExpandedMadhhab] = useState(null);

  const askFatwa = async () => {
        if (!question.trim()) {
                setError('الرجاء إدخال سؤالك');
                return;
        }

        setLoading(true);
        setError('');
        setFatwa(null);
        setExpandedMadhhab(null);

        try {
                const response = await fetch('/api/ask-fatwa', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ question })
                });

          if (!response.ok) {
                    throw new Error('Failed to get response');
          }

          const data = await response.json();
                setFatwa(data);
        } catch (err) {
                setError('حدث خطأ في جلب الفتوى. الرجاء المحاولة مرة أخرى.');
                console.error(err);
        } finally {
                setLoading(false);
        }
  };

  const toggleMadhhab = (madhhab) => {
        setExpandedMadhhab(expandedMadhhab === madhhab ? null : madhhab);
  };

  return (
        <div style={styles.container}>
                <header style={styles.header}>
                          <div style={styles.headerPattern}></div>div>
                          <h1 style={styles.title}>الفتاوى الشرعية</h1>h1>
                          <p style={styles.subtitle}>إجابات من المذاهب السنية الأربعة</p>p>
                          <div style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>div>
                </header>header>

                <main style={styles.main}>
                          <div style={styles.inputSection}>
                                      <label style={styles.label}>اطرح سؤالك الشرعي</label>label>
                                      <textarea
                                                    style={styles.textarea}
                                                    placeholder="مثال: ما حكم صلاة الجماعة؟ أو ما هي شروط الزكاة؟"
                                                    value={question}
                                                    onChange={(e) => setQuestion(e.target.value)}
                                                    rows={4}
                                                  />
                                      <button
                                                    style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
                                                    onClick={askFatwa}
                                                    disabled={loading}
                                                  >
                                        {loading ? (
                                                                  <span style={styles.loadingText}>
                                                                                  <span style={styles.spinner}>⏳</span>span>
                                                                                  جاري البحث في كتب الفقه...
                                                                  </span>span>
                                                                ) : (
                                                                  <>🔍 استفتِ</>>
                                                                )}
                                      </button>button>
                          </div>div>
                
                  {error && (
                    <div style={styles.error}>
                                <span>⚠️</span>span> {error}
                    </div>div>
                        )}
                
                  {fatwa && (
                    <div style={styles.resultsSection}>
                                <div style={styles.questionDisplay}>
                                              <span style={styles.questionIcon}>❓</span>span>
                                              <span style={styles.questionText}>{fatwa.question}</span>span>
                                </div>div>
                    
                                <div style={styles.madhhabGrid}>
                                  {['hanafi', 'maliki', 'shafii', 'hanbali'].map((madhhab) => (
                                      <div
                                                          key={madhhab}
                                                          style={{
                                                                                ...styles.madhhabCard,
                                                                                borderColor: madhhabColors[madhhab].bg
                                                          }}
                                                        >
                                                        <div
                                                                              style={{
                                                                                                      ...styles.madhhabHeader,
                                                                                                      backgroundColor: madhhabColors[madhhab].bg
                                                                                }}
                                                                              onClick={() => toggleMadhhab(madhhab)}
                                                                            >
                                                                            <div style={styles.madhhabTitleRow}>
                                                                                                  <span style={styles.madhhabIcon}>{madhhabInfo[madhhab].icon}</span>span>
                                                                                                  <div>
                                                                                                                          <h3 style={styles.madhhabName}>{madhhabInfo[madhhab].name}</h3>h3>
                                                                                                                          <p style={styles.founderName}>{madhhabInfo[madhhab].founder}</p>p>
                                                                                                    </div>div>
                                                                            </div>div>
                                                                            <span style={styles.expandIcon}>
                                                                              {expandedMadhhab === madhhab ? '▲' : '▼'}
                                                                            </span>span>
                                                        </div>div>
                                      
                                                        <div
                                                                              style={{
                                                                                                      ...styles.rulingBadge,
                                                                                                      backgroundColor: madhhabColors[madhhab].light,
                                                                                                      borderColor: madhhabColors[madhhab].accent
                                                                                }}
                                                                            >
                                                                            <span style={styles.rulingLabel}>الحكم:</span>span>
                                                                            <span style={{ ...styles.rulingText, color: madhhabColors[madhhab].bg }}>
                                                                              {fatwa[madhhab]?.ruling}
                                                                            </span>span>
                                                        </div>div>
                                      
                                        {expandedMadhhab === madhhab && (
                                                                              <div style={styles.expandedContent}>
                                                                                                    <div style={styles.section}>
                                                                                                                            <h4 style={styles.sectionTitle}>📜 الشرح والتفصيل</h4>h4>
                                                                                                                            <p style={styles.sectionText}>{fatwa[madhhab]?.explanation}</p>p>
                                                                                                      </div>div>
                                                                                {fatwa[madhhab]?.evidence && (
                                                                                                        <div
                                                                                                                                    style={{
                                                                                                                                                                  ...styles.evidenceBox,
                                                                                                                                                                  backgroundColor: madhhabColors[madhhab].light,
                                                                                                                                                                  borderRightColor: madhhabColors[madhhab].bg
                                                                                                                                      }}
                                                                                                                                  >
                                                                                                                                  <h4 style={styles.evidenceTitle}>📖 الدليل</h4>h4>
                                                                                                                                  <p style={styles.evidenceText}>{fatwa[madhhab]?.evidence}</p>p>
                                                                                                          </div>div>
                                                                                                    )}
                                                                              </div>div>
                                                        )}
                                      </div>div>
                                    ))}
                                </div>div>
                    
                      {fatwa.consensus && (
                                    <div style={styles.consensusBox}>
                                                    <h3 style={styles.consensusTitle}>🤝 نقاط الاتفاق</h3>h3>
                                                    <p style={styles.consensusText}>{fatwa.consensus}</p>p>
                                    </div>div>
                                )}
                    
                      {fatwa.note && (
                                    <div style={styles.noteBox}>
                                                    <h3 style={styles.noteTitle}>💡 ملاحظة</h3>h3>
                                                    <p style={styles.noteText}>{fatwa.note}</p>p>
                                    </div>div>
                                )}
                    </div>div>
                        )}
                
                        <div style={styles.disclaimer}>
                                  <p>⚠️ هذا التطبيق للإرشاد العام فقط. للمسائل الخاصة، يُرجى الرجوع إلى أهل العلم المتخصصين.</p>p>
                        </div>div>
                </main>main>
        
              <footer style={styles.footer}>
                      <p>وَمَا أُوتِيتُم مِّنَ الْعِلْمِ إِلَّا قَلِيلًا</p>p>
              </footer>footer>
        </div>div>
      );
}

const styles = {
    container: { fontFamily: "'Noto Naskh Arabic', 'Amiri', serif", direction: 'rtl', minHeight: '100vh', backgroundColor: '#f8f5f0', color: '#2c3e50' },
    header: { background: 'linear-gradient(135deg, #1a5f4a 0%, #0d3d30 100%)', padding: '24px 16px', textAlign: 'center', position: 'relative', overflow: 'hidden' },
    headerPattern: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")`, backgroundSize: '30px 30px' },
    title: { color: '#fff', fontSize: '28px', fontWeight: 'bold', margin: '0 0 8px 0', position: 'relative', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' },
    subtitle: { color: '#d4af37', fontSize: '14px', margin: 0, position: 'relative' },
    bismillah: { color: '#fff', fontSize: '18px', marginTop: '16px', opacity: 0.9, position: 'relative' },
    main: { padding: '16px', maxWidth: '600px', margin: '0 auto' },
    inputSection: { backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', marginBottom: '20px' },
    label: { display: 'block', fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#1a5f4a' },
    textarea: { width: '100%', padding: '14px', fontSize: '16px', border: '2px solid #e0e0e0', borderRadius: '12px', resize: 'none', fontFamily: 'inherit', direction: 'rtl', boxSizing: 'border-box', transition: 'border-color 0.3s', outline: 'none' },
    button: { width: '100%', padding: '14px 24px', fontSize: '18px', fontWeight: 'bold', backgroundColor: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '12px', marginTop: '12px', cursor: 'pointer', fontFamily: 'inherit', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 10px rgba(26,95,74,0.3)' },
    loadingText: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
    spinner: { animation: 'spin 1s linear infinite' },
    error: { backgroundColor: '#fff5f5', color: '#c53030', padding: '12px 16px', borderRadius: '10px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #feb2b2' },
    resultsSection: { marginTop: '20px' },
    questionDisplay: { backgroundColor: '#fff', borderRadius: '12px', padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderRight: '4px solid #d4af37' },
    questionIcon: { fontSize: '24px' },
    questionText: { fontSize: '16px', lineHeight: '1.8', color: '#2c3e50' },
    madhhabGrid: { display: 'flex', flexDirection: 'column', gap: '16px' },
    madhhabCard: { backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', borderWidth: '2px', borderStyle: 'solid' },
    madhhabHeader: { padding: '16px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    madhhabTitleRow: { display: 'flex', alignItems: 'center', gap: '12px' },
    madhhabIcon: { fontSize: '28px' },
    madhhabName: { color: '#fff', fontSize: '18px', fontWeight: 'bold', margin: 0 },
    founderName: { color: 'rgba(255,255,255,0.8)', fontSize: '12px', margin: '4px 0 0 0' },
    expandIcon: { color: '#fff', fontSize: '14px' },
    rulingBadge: { padding: '12px 16px', borderWidth: '0 0 2px 0', borderStyle: 'solid', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },
    rulingLabel: { fontSize: '14px', color: '#666' },
    rulingText: { fontSize: '16px', fontWeight: 'bold' },
    expandedContent: { padding: '16px' },
    section: { marginBottom: '16px' },
    sectionTitle: { fontSize: '15px', fontWeight: 'bold', color: '#2c3e50', margin: '0 0 8px 0' },
    sectionText: { fontSize: '15px', lineHeight: '1.9', color: '#4a5568', margin: 0 },
    evidenceBox: { padding: '14px', borderRadius: '10px', borderRightWidth: '4px', borderRightStyle: 'solid' },
    evidenceTitle: { fontSize: '14px', fontWeight: 'bold', color: '#2c3e50', margin: '0 0 8px 0' },
    evidenceText: { fontSize: '14px', lineHeight: '1.8', color: '#4a5568', margin: 0, fontStyle: 'italic' },
    consensusBox: { backgroundColor: '#e8f5e9', borderRadius: '12px', padding: '16px', marginTop: '20px', borderRight: '4px solid #4caf50' },
    consensusTitle: { fontSize: '16px', fontWeight: 'bold', color: '#2e7d32', margin: '0 0 8px 0' },
    consensusText: { fontSize: '15px', lineHeight: '1.8', color: '#4a5568', margin: 0 },
    noteBox: { backgroundColor: '#fff8e1', borderRadius: '12px', padding: '16px', marginTop: '16px', borderRight: '4px solid #ffc107' },
    noteTitle: { fontSize: '16px', fontWeight: 'bold', color: '#f57c00', margin: '0 0 8px 0' },
    noteText: { fontSize: '15px', lineHeight: '1.8', color: '#4a5568', margin: 0 },
    disclaimer: { backgroundColor: '#fafafa', borderRadius: '10px', padding: '14px', marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#718096', border: '1px dashed #cbd5e0' },
    footer: { backgroundColor: '#1a5f4a', color: 'rgba(255,255,255,0.8)', textAlign: 'center', padding: '16px', fontSize: '14px', marginTop: '24px' }
};

export default App;</></button>
