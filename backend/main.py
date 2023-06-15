from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from os import listdir
from os.path import isfile, join
import json
import aiofiles
from typing import List


app = FastAPI()

@app.get("/")
async def read_root():
    onlyfiles = [f for f in listdir('./resultMeta') if isfile(join('./resultMeta', f))]
    data = []
    for i in onlyfiles:
        with open('./resultMeta/{}'.format(i)) as file:
            data.append(json.load(file))
    return data

@app.get('/media/')
async def getMedia(imageName:str):
    return FileResponse(path='./raw/{}'.format(imageName), filename=imageName, media_type='image/jpeg')

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile, coordX: List[str], coordY: List[str] ):
    async with aiofiles.open('./raw/{0}'.format(file.filename), 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)

    return {"Result": "OK"}