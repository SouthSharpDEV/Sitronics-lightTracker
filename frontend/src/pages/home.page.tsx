import React from 'react'
import { Typography, Button } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import TextField from '@mui/material/TextField';

export const HomePage:() => React.JSX.Element = (): React.JSX.Element => {
    return (
        <div style={{ marginTop: '50px', position: 'relative'}}>
        <Typography style={{ color: 'white', fontSize: '28px', marginBottom: '30px' }}>Определение освещеннности</Typography>
        <Typography style={{ color: 'white', fontSize: '20px', marginBottom: '20px' }}>Загрузить фотографию</Typography>
        <Button variant="contained" style={{ width: '154px', backgroundColor: '#760EDE', marginBottom: '20px' }} endIcon={<AddAPhotoIcon />} />
        <Typography style={{ color: 'white', fontSize: '20px', marginBottom: '15px' }}>Координаты снимка</Typography>
        <div style={{ marginBottom: '15px' }}>
            <TextField id="outlined-basic" label="X координата" variant="outlined" style={{ backgroundColor: '#FFFFFF' }} />
        </div>
        <div>
            <TextField id="outlined-basic" label="Y координата" variant="outlined" style={{ backgroundColor: '#FFFFFF' }} />
        </div>
        <Button variant="contained" style={{ width: '154px', backgroundColor: '#760EDE', marginTop: '30px' }}>Отправить</Button>
        </div>
    )
}