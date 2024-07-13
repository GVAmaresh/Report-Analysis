from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi import FastAPI
from typing import List
import uvicorn

from api.deep_learning.dl_models.summerized import Summerized_Text
from api.deep_learning.dl_models.compare import compare

app = FastAPI(docs_url="/api/docs", openapi_url="/api/openapi.json")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class StrRequest(BaseModel):
    text: str
class CompareRequest(BaseModel):
    texts: List[str]
    text: str

@app.post("/api/summerized")
async def get_summerized(request: StrRequest ):
    try:
        text = request.text
        if not text:
            return JSONResponse({"status": 422, "message": "Invalid Input"}, status_code=422)
        summary = Summerized_Text(text)
        if not summary:
            return JSONResponse({"status": 500, "message": "No matching text found", "data": {}})

        return JSONResponse({"status": 200, "message": "Matching text found", "data": summary})
        
    except Exception as e:
        print("Error => ", e)
        return JSONResponse({"status": 500, "message": str(e)}, status_code=500)
    
@app.post("/api/compare")
def compareTexts(request: CompareRequest):
    try:
        text = request.text
        texts = request.texts
        if not texts or not text:
            return JSONResponse({"status": 422, "message": "Invalid Input"}, status_code=422)
        reports = []
        for summary in texts:
            value = compare(text, summary)
            reports.append({"summary": summary, "value": value})
        sorted_reports = sorted(reports, key=lambda x: x["compare"], reverse=True)
        return JSONResponse({"status": 200, "message": "Comparisons made", "data": sorted_reports, "summary": text})
    except Exception as e:
        print("Error => ", e)
        return JSONResponse({"status": 500, "message": str(e)}, status_code=500)
    
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=4000)