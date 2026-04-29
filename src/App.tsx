import React, { useState } from 'react';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'ai', text: 'سلاڤ! ئەز زیرەکیا دەستکرد یا BLACK KURD م. ئەز دشێم ب بادینی هاریکاریا تە بکەم.' }
  ]);
  const [loading, setLoading] = useState(false);

  // ل ڤێرێ پێدڤییە API Key یا خۆ دانی
  const API_KEY = "AIzaSyCLJ3po7oBk1BjJSu9sWTK-vTtF26Q1ut8"; 

  const handleChat = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `بەرسڤێ ب زاراڤێ بادینی بدە: ${input}` }] }]
        })
      });

      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      
      setMessages((prev) => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'ai', text: 'ببورە، کێشەیەک د سێرڤەری دا هەبوو.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>BLACK KURD AI 🤖</div>
      
      <div style={styles.chatWindow}>
        {messages.map((m, i) => (
          <div key={i} style={m.role === 'user' ? styles.userBubble : styles.aiBubble}>
            {m.text}
          </div>
        ))}
        {loading && <div style={styles.loading}>چاوەڕێ بە...</div>}
      </div>

      <div style={styles.inputArea}>
        <input 
          style={styles.input} 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleChat()}
          placeholder="تشتەکێ بنڤیسە..."
        />
        <button style={styles.button} onClick={handleChat} disabled={loading}>
          {loading ? '...' : 'ناردن'}
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { backgroundColor: '#050505', height: '100vh', display: 'flex', flexDirection: 'column', color: '#fff', direction: 'rtl', fontFamily: 'sans-serif' },
  header: { padding: '20px', textAlign: 'center', fontSize: '20px', fontWeight: 'bold', borderBottom: '1px solid #222' },
  chatWindow: { flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' },
  userBubble: { alignSelf: 'flex-start', backgroundColor: '#3d85c6', padding: '12px', borderRadius: '15px 15px 0 15px', maxWidth: '80%' },
  aiBubble: { alignSelf: 'flex-end', backgroundColor: '#222', padding: '12px', borderRadius: '15px 15px 15px 0', maxWidth: '80%', border: '1px solid #333' },
  inputArea: { padding: '20px', display: 'flex', gap: '10px', borderTop: '1px solid #222' },
  input: { flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#111', color: '#fff', outline: 'none' },
  button: { padding: '10px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  loading: { textAlign: 'center', fontSize: '12px', color: '#888' }
};

export default App;
