# AgriBulk Monorepo

Large-scale B2B marketplace for **matooke**, **maize**, **beans** and **Irish potatoes**.

## Structure

```
agribulk/
├── frontend/          # Next.js (JavaScript)
│   ├── pages/         # Routes (Home, Listings, Client, Seller, Supplier)
│   ├── components/    # Layout + AgriBot chat widget
│   ├── lib/api.js     # Backend API client
│   └── styles/        # Emerald Green design system
│
└── backend/           # FastAPI
    ├── app/
    │   ├── schemas/       # Pydantic request/response models
    │   ├── models/        # SQLAlchemy ORM
    │   ├── repositories/  # Data access layer
    │   ├── services/      # Business logic
    │   ├── routers/       # Thin HTTP endpoints only
    │   ├── agents/        # AgriBot agentic AI (tools + tool-calling loop)
    │   └── core/          # Config, DB, security
    ├── requirements.txt
    └── .env.example
```

## Colour palette

- Navy Blue `#0B1C2D`
- Emerald Green `#1F7A63`
- Soft White `#F5F7FA`
- Cool Gray `#9AA3A8`

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env        # optional: set OPENAI_API_KEY for full agent mode
uvicorn app.main:app --reload --port 8000
```

- API docs: http://localhost:8000/docs
- Health: http://localhost:8000/health
- Chat: `POST /api/chat` with body `{ "content": "What is the matooke price range?" }`

### Layering

| Folder | Responsibility |
|--------|----------------|
| `schemas/` | Pydantic DTOs |
| `models/` | SQLAlchemy tables |
| `repositories/` | DB queries only |
| `services/` | Business rules & orchestration |
| `routers/` | FastAPI route definitions (thin) |
| `agents/` | AgriBot tools + agent loop |

### AgriBot (agentic AI)

Specialized in bulk produce trade. Tools:

- `get_market_summary` – aggregated live prices & volumes
- `search_listings` – filter by commodity / location
- `get_commodity_advice` – grades, seasons, storage, bulk tips
- `estimate_order_value` – rough UGX totals

With `OPENAI_API_KEY` it runs a multi-step tool-calling agent. Without a key it still uses the same tools in a deterministic fallback mode.

Seeded demo users (password: `password123`):

- `client@agribulk.test`
- `seller@agribulk.test`
- `supplier@agribulk.test`

## Frontend (Next.js – JavaScript)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

The floating **AgriBot** button (bottom-right) talks to `POST /api/chat`.

Set `NEXT_PUBLIC_API_URL` if the API is not on `http://localhost:8000/api`.

## Quick start (both)

1. Start backend on port 8000  
2. Start frontend on port 3000  
3. Open the site and click the chat bubble to talk to AgriBot  
4. Browse `/listings` for seeded stock  
