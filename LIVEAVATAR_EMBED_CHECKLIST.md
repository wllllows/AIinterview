# LiveAvatar Embed 集成 — 踩坑记录与核心代码模板

> 本文档补充官方 SKILL.md 中未明确说明的细节，确保后续 AI 能一次性写出正确的集成代码。

---

## 一、API 端点速查表

| 操作 | 端点 | 认证方式 | 必填字段 |
|------|------|----------|----------|
| 创建 Context | `POST /v1/contexts` | `X-API-KEY: <api_key>` | `name`, `opening_text`, `prompt` |
| 创建 Embed | `POST /v2/embeddings` | `X-API-KEY: <api_key>` | `avatar_id`, `context_id` |
| 查询头像列表 | `GET /v1/avatars` | `X-API-KEY: <api_key>` | 无 |

**⚠️ 认证头统一用 `X-API-KEY`，不是 `Authorization: Bearer`**

---

## 二、创建 Context — 最容易踩坑的地方

### 2.1 请求体结构（Node.js）

```js
const contextBody = {
  name: `Demo Context ${Date.now()}`,  // ✅ 必填，且必须全局唯一！
  opening_text: 'Hello! How can I help you today?',  // ✅ 必填！
  prompt: 'You are a friendly assistant.'  // ✅ 必填
};
```

### 2.2 常见错误

| 错误现象 | 原因 |
|----------|------|
| `422 Validation Error: body -> name: Field required` | 没传 `name` |
| `422 Validation Error: body -> opening_text: Field required` | 没传 `opening_text` |
| `4000 Bad request: Context with this name already exists` | `name` 重复了，每次请求必须唯一 |

### 2.3 解决方案

**`name` 必须唯一**，建议用时间戳或 UUID：

```js
name: `LiveAvatar Context ${Date.now()}`
// 或
name: `Context ${crypto.randomUUID()}`
```

### 2.4 响应字段名

```js
// API 返回的是 data.id，不是 data.context_id！
const contextId = contextRes.data.id;  // ✅ 正确
const contextId = contextRes.data.context_id;  // ❌ 错误，undefined
```

---

## 三、创建 Embed

### 3.1 请求体结构

```js
const embedBody = {
  avatar_id: '65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0',  // Embed 沙盒头像 ID
  context_id: contextId,  // 上一步拿到的 data.id
  is_sandbox: true        // 沙盒模式不扣费
};
```

### 3.2 沙盒头像 ID

| 模式 | 沙盒 Avatar ID |
|------|---------------|
| **Embed** | `65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0` |
| FULL/LITE Session | `dd73ea75-1218-4ef3-92ce-606d5f7fbc0a` |

**⚠️ Embed 和 Session 的沙盒头像 ID 不一样！** 如果用错会失败。

### 3.3 生产环境切换

1. 调用 `GET /v1/avatars` 获取自己的头像列表
2. 去掉 `is_sandbox: true`
3. 把 `avatar_id` 换成你自己的生产头像 ID

---

## 四、前端 iframe — 权限配置

### 4.1 最小可用配置

```html
<iframe
  src="https://embed.liveavatar.com/v1/<id>"
  allow="microphone"
  title="LiveAvatar Embed"
  style="aspect-ratio: 16/9; width: 100%; border: none;"
></iframe>
```

### 4.2 更稳健的推荐配置（Chrome 兼容性更好）

```html
<iframe
  src="https://embed.liveavatar.com/v1/<id>"
  allow="microphone; camera; autoplay; fullscreen"
  title="LiveAvatar Embed"
  referrerpolicy="no-referrer-when-downgrade"
  loading="eager"
  style="aspect-ratio: 16/9; width: 100%; border: none;"
></iframe>
```

### 4.3 常见问题

| 问题 | 原因 | 解决 |
|------|------|------|
| 数字人没声音 | 没加 `allow="microphone"` | 必须加 |
| Chrome 阻止 iframe 加载 | HTTP localhost 嵌入 HTTPS + 安全策略 | 加 `referrerpolicy`，或部署到 HTTPS |
| 页面空白无报错 | 未授予浏览器麦克风权限 | 检查地址栏 🔒 图标，允许麦克风和第三方 Cookie |

---

## 五、完整最小后端代码（Node.js + Express）

```js
const express = require('express');
const https = require('https');

const app = express();
const PORT = 3000;

// ⚠️ 生产环境应使用环境变量
const API_KEY = process.env.LIVEAVATAR_API_KEY || 'your-api-key';
const SANDBOX_AVATAR_ID = '65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0';

app.use(express.static('public'));
app.use(express.json());

// 通用 HTTPS 请求辅助函数
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
    // 1. 创建 Context — name 必须唯一！
    const contextBody = {
      name: `Context ${Date.now()}`,
      opening_text: 'Hello! How can I help you today?',
      prompt: req.body.prompt || 'You are a helpful assistant.'
    };

    const contextRes = await liveAvatarRequest('/v1/contexts', 'POST', contextBody);

    if (contextRes.code !== 1000 || !contextRes.data || !contextRes.data.id) {
      return res.status(500).json({ error: 'Context creation failed', detail: contextRes });
    }

    const contextId = contextRes.data.id;  // ✅ 注意是 data.id

    // 2. 创建 Embed
    const embedBody = {
      avatar_id: SANDBOX_AVATAR_ID,
      context_id: contextId,
      is_sandbox: true
    };

    const embedRes = await liveAvatarRequest('/v2/embeddings', 'POST', embedBody);

    if (embedRes.code !== 1000 || !embedRes.data || !embedRes.data.url) {
      return res.status(500).json({ error: 'Embed creation failed', detail: embedRes });
    }

    res.json({
      success: true,
      url: embedRes.data.url,
      context_id: contextId
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

## 六、调试 checklist

修改代码后**必须重启服务器**，否则旧代码仍在运行。

```bash
# 停止旧进程
Ctrl+C

# 重新启动
npm start

# 浏览器强制刷新（清除缓存）
Ctrl+F5
```

### 排错顺序

1. **后端日志** — 看 `console.log` 输出，确认 API 调用走到哪一步
2. **Context 是否创建成功** — 检查 `contextRes.code === 1000`
3. **Embed 是否创建成功** — 检查 `embedRes.code === 1000`
4. **前端 Network 面板** — 看 `/api/create-embed` 返回的 JSON 是否正确
5. **iframe 加载** — 看 Network 面板中 `embed.liveavatar.com` 的状态码
6. **浏览器权限** — 检查麦克风权限是否已允许

---

## 七、关键差异总结（vs 官方文档未明确之处）

| 官方 SKILL.md 没明说 | 实际情况 |
|---------------------|----------|
| 创建 context 只需 `prompt` | 还需要 `name` + `opening_text`，且 `name` 必须唯一 |
| 响应中有 `context_id` | 响应中是 `data.id` |
| 沙盒头像只有一个 | Embed 和 Session 的沙盒头像 ID **不同** |
| `allow="microphone"` 就够 | Chrome 可能需要额外加 `camera; autoplay; fullscreen` 和 `referrerpolicy` |

---

*整理时间：2026-04-17*  
*基于 skill: heygen-com/liveavatar-agent-skills (liveavatar-integrate)*
