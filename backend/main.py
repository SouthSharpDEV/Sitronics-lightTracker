from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from os import listdir
from os.path import isfile, join
import json
import aiofiles
from typing import List
from algorithms.main_def import mainf


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    return FileResponse(path='./result/{}'.format(imageName), filename=imageName, media_type='image/jpeg')

@app.get('/test')
async def getMedia():
    mainf('./raw/test.jpg', './result/result.png')

 

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile, coordX: List[str], coordY: List[str]):
    print(coordX)
    async with aiofiles.open('./raw/{0}'.format(file.filename), 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    mainf('./raw/{}'.format(file.filename), './result/final_{}'.format(file.filename))
    my_file = open("./resultMeta/{}.json".format(file.filename), "w+")

    import json

    data = {
        "id": 1,
        "createdAt": "2023-06-1423:01:35.060Z",
        "X": "45.000555040404040",
        "Y": "42.00055504",
        "lightGrade": 8,
        "fileName": 'final_{}'.format(file.filename)
        }
    json_string = json.dumps(data)
    my_file.write(json_string)
    my_file.close()

    return {"Result": "OK"}