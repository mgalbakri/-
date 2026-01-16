import React, { useState } from 'react';

const madhhabColors = {
          hanafi: { bg: '#1a5f4a', light: '#e8f5f1', accent: '#2d8a6e' },
          maliki: { bg: '#8b4513', light: '#fdf5e6', accent: '#a0522d' },
          shafii: { bg: '#1e3a5f', light: '#e8f0f8', accent: '#2c5282' },
          hanbali: { bg: '#5c4033', light: '#f5efe8', accent: '#7a5445' }
};

const madhhabInfo = {
          hanafi: { name: 'المذهب الحنفي', founder: 'الإمام أبو حنيفة النعمان', icon: '✋' },
          maliki: { name: 'المذهب المالكي', founder: 'الإمام مالك بن أنس', icon: '📖' },
          shafii: { name: 'المذهب الشافعي', founder: 'الإمام محمد بن إدريس الشافعي', icon: '⚖️' },
          hanbali: { name: 'المذهب الحنبلي', founder: 'الإمام أحمد بن حنبل', icon: '📚' }
};

function App() {
          const [question, setQuestion] = useState('');
          const [fatwa, setFatwa] = useState(null);
          const [loading, setLoading] = useState(false);
          const [error, setError] = useState('');
          const [expandedMadhhab, setExpandedMadhhab] = useState(null);

  const askFatwa = async () => {
              if (!question.trim()) {
                            setError('الرجاء إدخال سؤال صحيح');
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
                            setError('حدث خطأ في الحصول على الفتوى. يرجى المحاولة لاحقاً.');
                            console.error(err);
              } finally {
                            setLoading(false);
              }
  };

  const styles = {
              container: {
                            maxWidth: '900px',
                            margin: '0 auto',
                            padding: '20px',
                            fontFamily: 'Arial, sans-serif',
                            direction: 'rtl',
                            backgroundColor: '#f5f5f5',
                            minHeight: '100vh'
              },
              header: {
                            textAlign: 'center',
                            marginBottom: '30px',
                            color: '#2c3e50'
              },
              title: {
                            fontSize: '32px',
                            fontWeight: 'bold',
                            margin: '0 0 10px 0'
              },
              subtitle: {
                            fontSize: '16px',
                            color: '#666'
              },
              inputSection: {
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            marginBottom: '20px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              },
              label: {
                            display: 'block',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                            color: '#333'
              },
              input: {
                            width: '100%',
                            padding: '12px',
                            marginBottom: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
              },
              button: {
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
              },
              errorMessage: {
                            color: '#e74c3c',
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: '#fadbd8',
                            borderRadius: '4px'
              },
              fatwasContainer: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '15px'
              },
              madhhabCard: {
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            cursor: 'pointer'
              },
              madhhabHeader: {
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
              },
              madhhabTitle: {
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#2c3e50'
              },
              madhhabText: {
                            padding: '0 16px 16px 16px',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            color: '#555'
              }
  };

  return (
              <div style={styles.container}>
                            <div style={styles.header}>
                                            <h1 style={styles.title}>الفتاوى الشرعية</h1>h1>
                                            <p style={styles.subtitle}>المذاهب الأربعة</p>p>
                            </div>div>

                            <div style={styles.inputSection}>
                                            <label style={styles.label}>اسأل سؤالك الشرعي:</label>label>
                                            <input
                                                              type="text"
                                                              style={styles.input}
                                                              placeholder="مثال: هل يجوز الاستثمار في العملات الرقمية؟"
                                                              value={question}
                                                              onChange={(e) => setQuestion(e.target.value)}
                                                              onKeyPress={(e) => e.key === 'Enter' && askFatwa()}
                                                            />
                                            <button style={styles.button} onClick={askFatwa} disabled={loading}>
                                                    {loading ? 'جاري البحث...' : 'احصل على الفتوى'}
                                            </button>button>
                                    {error && <div style={styles.errorMessage}>{error}</div>div>}
                            </div>div>

                      {fatwa && (
                              <div>
                                        <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#2c3e50'}}>الفتاوى</h2>h2>
                                        <div style={styles.fatwasContainer}>
                                                {Object.keys(fatwa).map((madhab) => (
                                                    <div
                                                                            key={madhab}
                                                                            style={{...styles.madhhabCard, borderLeft: `4px solid ${madhhabColors[madhab]?.bg}`}}
                                                                            onClick={() => setExpandedMadhhab(expandedMadhhab === madhab ? null : madhab)}
                                                                          >
                                                                    <div style={{...styles.madhhabHeader, backgroundColor: madhhabColors[madhab]?.light}}>
                                                                                      <span style={styles.madhhabTitle}>
                                                                                              {madhhabInfo[madhab]?.icon} {madhhabInfo[madhab]?.name}
                                                                                              </span>span>
                                                                                      <span>{expandedMadhhab === madhab ? '−' : '+'}</span>span>
                                                                    </div>div>
                                                            {expandedMadhhab === madhab && (
                                                                                                    <div style={styles.madhhabText}>
                                                                                                                        <p><strong>المؤسس:</strong>strong> {madhhabInfo[madhab]?.founder}</p>p>
                                                                                                                        <p>{fatwa[madhab]}</p>p>
                                                                                                            </div>div>
                                                                    )}
                                                    </div>div>
                                                  ))}
                                        </div>div>
                              </div>div>
                    )}
              </div>div>
            );
}

export default App;
