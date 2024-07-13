from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi import FastAPI, File, UploadFile
import uvicorn

from drive_db.drive_db import main
from controllers.controllers import push_file_db

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

global service

@app.post("/api/save-docs")
def save_docs(file: UploadFile=File(...)):
    try:
        file_id, status = push_file_db(service, file)
        if not file_id:
            return JSONResponse({"status": 500,  "message": {status}, "data": None }, status_code=500)
        return JSONResponse({"status":200, "message": "Document saved Successfully", "data": file_id}, status_code=200)
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse({"status": 500, "message": str(e)}, status_code=500)


if __name__ == '__main__':
    service = main()
    uvicorn.run(app, host="127.0.0.1", port=5000)
