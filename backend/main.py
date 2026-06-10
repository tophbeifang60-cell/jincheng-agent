import os
import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from routers import routes, games, creative

load_dotenv()

DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY", "")
DEEPSEEK_BASE_URL = os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1")
DEEPSEEK_MODEL = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")

SYSTEM_PROMPT = """你是"锦城蜀韵 AI 文旅向导"的熊猫导游。
你熟悉成都景点、美食、川剧、非遗和半日游路线。
回答要适合游客，简洁实用。
优先结合以下内容：
宽窄巷子、锦里、武侯祠、杜甫草堂、人民公园、春熙路、成都大熊猫繁育研究基地、川剧体验馆；
美食包括担担面、钟水饺、龙抄手、三大炮、兔头、火锅、冰粉、钵钵鸡、肥肠粉；
非遗包括川剧变脸、蜀绣、糖画、竹编。
如果用户问路线，要按时间顺序给出推荐。
如果用户问附近吃什么，要推荐2-4个美食。
如果不知道，不要编造具体店名，可以给通用建议。"""

FALLBACK_REPLIES = [
    "哎呀，我这会儿脑袋有点晕乎乎的～🐼 你先逛逛地图嘛，宽窄巷子的担担面巴适得很！",
    "信号不太好呢～不过我记得锦里那边晚上逛特别有感觉，红灯高挂，古风满满！",
    "唔～正在打盹儿，你先切（去）武侯祠看看嘛，红墙竹影拍照超好看的！",
    "嘿嘿，网络不太稳定～给你个tip：半日游就先去宽窄巷子，再去锦里，晚黑（晚上）到春熙路吃火锅！",
    "熊猫导游暂时掉线啦～不过人民公园的盖碗茶和钟水饺一定要试试，安逸得板！",
    "哎呀，后台正在修整～杜甫草堂的翠竹和茅屋很有诗意，值得一去哦！",
]


class ChatRequest(BaseModel):
    message: str


class ChatReply(BaseModel):
    reply: str


app = FastAPI(title="锦城蜀韵 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes.router, prefix="/api")
app.include_router(games.router, prefix="/api")
app.include_router(creative.router, prefix="/api")


def mock_reply(message: str) -> str:
    message_lower = message.lower()

    if any(w in message_lower for w in ["宽窄巷子", "附近", "吃", "美食"]):
        return "宽窄巷子附近好吃的多得很！🐼 担担面、三大炮、钟水饺、兔头，边走边吃安逸惨了～逛完去隔壁的魁星楼街，还有钵钵鸡和冰粉，保证你吃撑！"

    if any(w in message_lower for w in ["半天", "半日", "路线", "怎么玩"]):
        return "半天时间嘛，我给你安排：上午逛宽窄巷子（2小时），吃碗担担面；然后去锦里和武侯祠（2小时），晚黑（晚上）如果还有精力就去春熙路吃顿火锅～这条路线紧凑又不赶，巴适得很！"

    if any(w in message_lower for w in ["川剧", "变脸", "晚上"]):
        return "川剧变脸晚上看最安逸！很多剧场19:30开场，灯光效果好，变脸更有震撼力。推荐搭配锦里夜游，先逛锦里看红灯，再去看变脸，一晚上安排得明明白白！"

    if any(w in message_lower for w in ["锦里", "区别", "对比", "vs"]):
        return "锦里和宽窄巷子味道不一样哦～锦里主打三国文化+古风夜市，红灯高挂适合晚上逛；宽窄巷子是老成都院落+文艺小店，适合白天慢慢逛。简单说：锦里更热闹更有夜游氛围，宽窄更安静更有成都慢生活气息～两个都去才完整！"

    return random.choice(FALLBACK_REPLIES)


@app.post("/api/chat", response_model=ChatReply)
async def chat(req: ChatRequest):
    if not DEEPSEEK_API_KEY:
        print("[chat] DEEPSEEK_API_KEY 未配置，使用 mock 回复", flush=True)
        return ChatReply(reply=mock_reply(req.message))

    import httpx

    url = f"{DEEPSEEK_BASE_URL}/chat/completions"
    print(f"[chat] 请求 DeepSeek API: {url}", flush=True)

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                url,
                headers={
                    "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": DEEPSEEK_MODEL,
                    "messages": [
                        {"role": "system", "content": SYSTEM_PROMPT},
                        {"role": "user", "content": req.message},
                    ],
                    "max_tokens": 500,
                    "temperature": 0.8,
                },
            )
            if resp.status_code != 200:
                body = resp.text[:500]
                print(f"[chat] DeepSeek API 错误 | 状态码: {resp.status_code} | 响应: {body}", flush=True)
                return ChatReply(reply=mock_reply(req.message))

            data = resp.json()
            reply = data["choices"][0]["message"]["content"].strip()
            print(f"[chat] DeepSeek 回复成功 ({len(reply)} 字符)", flush=True)
            return ChatReply(reply=reply)

    except httpx.TimeoutException:
        print(f"[chat] DeepSeek API 超时 (30s) | URL: {url}", flush=True)
        return ChatReply(reply=mock_reply(req.message))
    except Exception as e:
        print(f"[chat] DeepSeek API 连接失败: {type(e).__name__}: {e} | URL: {url}", flush=True)
        return ChatReply(reply=mock_reply(req.message))
