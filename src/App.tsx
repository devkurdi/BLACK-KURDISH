import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={styles.body}>
      <div style={styles.mesh}></div>
      <div style={{...styles.container, opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)'}}>
        <div style={styles.glassCard}>
          <div style={styles.header}>
            <div style={styles.dot}></div>
            <span style={styles.brandName}>BLACK KURD</span>
          </div>
          <h1 style={styles.title}>
            پاشەڕۆژا <span style={styles.blueText}>تەکنەلۆژیا</span> کوردی
          </h1>
          <p style={styles.description}>
            ئاڤاکرنا پڕۆژێن داهێنانەر د بیاڤێ زیرەکیا دەستکرد و وێبێ دا ب زاراڤێ بادینی.
          </p>
          <div style={styles.buttonContainer}>
            <button style={styles.mainBtn}>دەستپێبکە</button>
            <button style={styles.outlineBtn}>پڕۆژە</button>
          </div>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statNum}>+١٠</span>
              <span style={styles.statLabel}>پڕۆژە</span>
            </div>
            <div style={styles.line}></div>
            <div style={styles.statItem}>
              <span style={styles.statNum}>٢٤/٧</span>
              <span style={styles.statLabel}>سەرهێڵ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  body: { backgroundColor: '#020202', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'sans-serif', direction: 'rtl', overflow: 'hidden', position: 'relative' },
  mesh: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(at 0% 0%, rgba(61, 133, 198, 0.15) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(142, 68, 173, 0.1) 0, transparent 50%)', zIndex: 0 },
  container: { zIndex: 1, padding: '20px', transition: 'all 1s ease' },
  glassCard: { background: 'rgba(15, 15, 15, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '30px', padding: '40px', maxWidth: '450px', textAlign: 'center' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '25px' },
  dot: { width: '10px', height: '10px', backgroundColor: '#3d85c6', borderRadius: '50%', boxShadow: '0 0 10px #3d85c6' },
  brandName: { fontSize: '12px', fontWeight: 'bold', color: '#888', letterSpacing: '2px' },
  title: { fontSize: '32px', fontWeight: '900', marginBottom: '20px' },
  blueText: { color: '#3d85c6' },
  description: { color: '#aaa', fontSize: '15px', marginBottom: '35px' },
  buttonContainer: { display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px' },
  mainBtn: { padding: '12px 25px', borderRadius: '10px', border: 'none', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  outlineBtn: { padding: '12px 25px', borderRadius: '10px', border: '1px solid #333', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer' },
  stats: { display: 'flex', justifyContent: 'center', gap: '30px', borderTop: '1px solid #222', paddingTop: '25px' },
  statItem: { display: 'flex', flexDirection: 'column' },
  statNum: { fontSize: '18px', fontWeight: 'bold' },
  statLabel: { fontSize: '11px', color: '#555' },
  line: { width: '1px', height: '25px', backgroundColor: '#222' }
};

export default App;
