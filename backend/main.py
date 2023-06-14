from fastapi import FastAPI, File, UploadFile
import aiofiles


app = FastAPI()

@app.get("/")
async def read_root():
    return 'anus'

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile):
    async with aiofiles.open('./raw/{0}'.format(file.filename), 'wb') as out_file:
        content = await file.read()  # async read
        await out_file.write(content)  # async write

    return {"Result": "OK"}
    # return {"filename": file.filename}