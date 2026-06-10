# 锦城蜀韵 · AI 文旅向导

成都文旅 AI 智能体，前后端分离架构，国风蜀韵 UI 风格。

## 启动方式

### 后端（FastAPI）

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

访问：http://localhost:8000/api/routes

### 前端（React + Vite）

```bash
cd frontend
npm install
npm run dev
```

访问：http://localhost:5173

---

## 功能页面

| 页面 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 选择游玩偏好 |
| 路线页 | `/routes` | AI 生成成都文旅路线 |
| 闯关页 | `/challenge` | 蜀文化知识问答 |
| 文创页 | `/creative` | 生成朋友圈/小红书文案 |

## 向导"锦锦"

每页右下角悬浮，提供成都旅游小贴士。

## 项目结构

```
jincheng-agent/
├── frontend/   # React + Vite + Tailwind
└── backend/    # Python FastAPI + SQLite(预留)
```
