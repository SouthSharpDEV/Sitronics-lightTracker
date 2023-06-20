import React, { useState} from 'react'
import axios from 'axios'
import { Typography, Button } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import TextField from '@mui/material/TextField';

export const HomePage:() => React.JSX.Element = (): React.JSX.Element => {
    const [x1, setx1] = useState<String | null>(null)
    const [x2, setx2] = useState<String | null>(null)

    const [y1, sety1] = useState<String | null>(null)
    const [y2, sety2] = useState<String | null>(null)

    const [selectedFile, setSelectedFile] = useState<File>();


    const handleChange = async () => {
        const formData = new FormData();
        if (selectedFile) {
            if (x1 && x2 && y1 && y2) {
                formData.append('file', selectedFile)
        
                const response = await axios({
                    method: "post",
                    url: "https://illumination.geryon.space/api/coordinates",
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }
            formData.append('file', selectedFile)
            formData.append('coordX', [x1, x2].toString())
            formData.append('coordY', [y1, y2].toString())
    
            const response = await axios({
                method: "post",
                url: "https://illumination.geryon.space/api/noCoordinates",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        }
    }

    const onFileInput = async (selectorFiles: FileList) => {
        setSelectedFile(selectorFiles[0])
    }

    return (
        <div style={{ marginTop: '50px', position: 'relative'}}>
        <Typography style={{ color: 'white', fontSize: '28px', marginBottom: '30px' }}>Определение освещеннности</Typography>
        <Typography style={{ color: 'white', fontSize: '20px', marginBottom: '20px' }}>Загрузить фотографию</Typography>
        <Button component="label" variant="contained" style={{ width: '154px', backgroundColor: '#760EDE', marginBottom: '20px' }} endIcon={<AddAPhotoIcon />}>
            <input
                type="file"
                // @ts-ignore
                onChange={ (e) => onFileInput(e.target.files) }
                hidden
            />    
        </Button>
        <Typography style={{ color: 'white', fontSize: '20px', marginBottom: '15px' }}>Координаты снимка</Typography>
        <div style={{ marginBottom: '15px' }}>
            <TextField onChange={(e) => setx1(e.target.value)} id="outlined-basic" label="X координата" variant="outlined" style={{ backgroundColor: '#FFFFFF' }} />
            <TextField onChange={(e) => sety1(e.target.value)} id="outlined-basic" label="Y координата" variant="outlined" style={{ backgroundColor: '#FFFFFF' }} />
        </div>
        <div>
            <TextField onChange={(e) => setx2(e.target.value)} id="outlined-basic" label="X координата" variant="outlined" style={{ backgroundColor: '#FFFFFF' }} />
            <TextField onChange={(e) => sety2(e.target.value)} id="outlined-basic" label="Y координата" variant="outlined" style={{ backgroundColor: '#FFFFFF' }} />
        </div>
            <Button variant="contained" style={{ width: '154px', backgroundColor: '#760EDE', marginTop: '30px' }} onClick={() => handleChange()} >Отправить</Button>
        </div>
    )
}