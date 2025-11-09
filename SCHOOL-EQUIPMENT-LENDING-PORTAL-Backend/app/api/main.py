from fastapi import FastAPI
from api.v1.api import api_router
from .database import engine
from . import models
from api.v1.api import api_router

models.Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="School Equipment Lending Portal",
    description="API for managing school equipment loans.",
    version="1.0.0",
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the School Equipment Lending Portal"}


app.include_router(api_router, prefix="/api/v1")
