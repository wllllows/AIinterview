const express = require('express');
const https = require('https');
const cors = require('cors');

const app = express();
const PORT = 3000;

const API_KEY = '95fccaab-1cfb-11f1-a99e-066a7fa2e369';
const SANDBOX_AVATAR_ID = '65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0';

app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: false
}));
app.use(express.json());

function liveAvatarRequest(path, method, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const options = {
      hostname: 'api.liveavatar.com',
      path: path,
      method: method,
      headers: {
        'X-API-KEY': API_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => { responseData += chunk; });
      res.on('end', () => {
        try { resolve(JSON.parse(responseData)); }
        catch (e) { resolve({ raw: responseData }); }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

app.post('/api/create-embed', async (req, res) => {
  try {
    const contextBody = {
      name: `Interview Context ${Date.now()}`,
      opening_text: req.body.opening_text || '你好！我是今天的 AI 面试官。很高兴认识你，请简单做一个自我介绍吧。',
      prompt: req.body.prompt || '你是一位专业的前端技术面试官，面试场景是中文。你的语气友善但专业，会针对候选人的回答进行深入追问。'
    };

    const contextRes = await liveAvatarRequest('/v1/contexts', 'POST', contextBody);
    console.log('Context response:', contextRes);

    if (contextRes.code !== 1000 || !contextRes.data || !contextRes.data.id) {
      return res.status(500).json({ error: 'Context creation failed', detail: contextRes });
    }

    const contextId = contextRes.data.id;

    const embedBody = {
      avatar_id: SANDBOX_AVATAR_ID,
      context_id: contextId,
      is_sandbox: true
    };

    const embedRes = await liveAvatarRequest('/v2/embeddings', 'POST', embedBody);
    console.log('Embed response:', embedRes);

    if (embedRes.code !== 1000 || !embedRes.data || !embedRes.data.url) {
      return res.status(500).json({ error: 'Embed creation failed', detail: embedRes });
    }

    res.json({
      success: true,
      url: embedRes.data.url,
      context_id: contextId
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`LiveAvatar backend running at http://localhost:${PORT}`);
  console.log(`POST http://localhost:${PORT}/api/create-embed  to create an embed`);
});
