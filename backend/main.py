from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from os import listdir
from os.path import isfile, join
import json
import aiofiles
from typing import List
from algorithms.main_def import mainf, main2f
from datetime import datetime


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

 

@app.post("/noCoordinates")
async def noCoordinatesHandler(file: UploadFile):
    async with aiofiles.open('./raw/{0}'.format(file.filename), 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    grade = mainf('./raw/{}'.format(file.filename), './result/final_{}'.format(file.filename))
    my_file = open("./resultMeta/{}.json".format(file.filename), "w+")

    import json

    data = {
        "id": 1,
        "createdAt": datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
        "X": 'NaN',
        "Y": 'NaN',
        "lightGrade": grade,
        "fileName": 'final_{}'.format(file.filename)
        }
    json_string = json.dumps(data)
    my_file.write(json_string)
    my_file.close()

    return {"Result": "OK"}

@app.post("/coordinates")
async def noCoordinatesHandler(file: UploadFile, coordX: List[str], coordY: List[str]):
    print(float(coordX[0].split(',')[0]))
    async with aiofiles.open('./raw/{0}'.format(file.filename), 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    resultData = main2f('./raw/{}'.format(file.filename), './result/final_{}'.format(file.filename), [float(coordX[0].split(',')[0]), float(coordY[0].split(',')[0])], [float(coordX[0].split(',')[1]), float(coordY[0].split(',')[1])])
    # mainf('./raw/{}'.format(file.filename), './result/final_{}'.format(file.filename))
    my_file = open("./resultMeta/{}.json".format(file.filename), "w+")

    import json

    # data

    data = {
        "id": 1,
        "createdAt": datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
        "X": 'NaN',
        "Y": 'NaN',
        "lightGrade": resultData[0],
        "fileName": 'final_{}'.format(file.filename)
        }
    json_string = json.dumps(data)
    my_file.write(json_string)
    my_file.close()

    my_file = open("./resultExtended/{}.json".format(file.filename), "w+")
    json_string = json.dumps(resultData[1])
    my_file.write(json_string)
    my_file.close()

    return {"Result": "OK"}

@app.get('/downloadJson/')
async def getMedia(imageName:str):
    return FileResponse(path='./resultExtended/{}.json'.format(imageName), filename=imageName, media_type='application/json')