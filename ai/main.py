from fastapi import FastAPI
from pydantic import BaseModel
app=FastAPI(title="SentinelOps AI")
class Signal(BaseModel):
    latency: float
    error_rate: float
    traffic: float
@app.get("/health")
def health(): return {"status":"operational"}
@app.post("/analyze")
def analyze(s: Signal):
    score=min(0.99, max(0.01, 0.35*s.error_rate + 0.01*s.latency + 0.002*s.traffic))
    return {"anomaly_score":round(score,2),"severity":"critical" if score>.75 else "elevated" if score>.45 else "normal","probable_cause":"dependency saturation"}
