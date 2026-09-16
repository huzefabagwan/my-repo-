from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
from app.api.integration import router as integration_router
from app.api.planning import router as planning_router
from app.api.ml import router as ml_router
from app.api.constraints import router as constraints_router
from app.db.session import init_db

app = FastAPI(title="RAILOPT - AI Block Planning & Optimization API")

# Configure CORS
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.include_router(integration_router)
app.include_router(planning_router)
app.include_router(ml_router)
app.include_router(constraints_router)

@app.on_event("startup")
async def on_startup():
    init_db()
