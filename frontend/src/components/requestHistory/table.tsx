//@ts-nocheck
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from 'file-saver';

import axios from 'axios';

import './styles.css'

function createData(
  id: number,
  createdAt: string,
  X: string[],
  Y: string[],
  lightGrade: number,
  fileName: string
) {
  return { id, createdAt, X, Y, lightGrade, fileName };
}

export default function BasicTable() {
  const [data, setData] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const openAlert = (fileName) => {
    setSelectedFile(fileName);
  };

  const closeAlert = () => {
    setSelectedFile(null);
  };

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/');
    const fetchedData = response.data;
    const rowsData = fetchedData.map((data) =>
      createData(data.id, data.createdAt, data.X, data.Y, data.lightGrade, data.fileName)
    );
    setData(rowsData);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const downloadButtonHandler = async (imageName) => {
    let url = `http://localhost:8000/media/?imageName=${imageName}`;
    saveAs(url, 'Twitter-logo');
  };

  if (data.length === 0) {
    return <h1>Loading...</h1>;
  }

  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#111318' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: 'white' }}>ID</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>
              Дата
            </TableCell>
            <TableCell align="right" style={{ color: 'white' }}>
              Время
            </TableCell>
            <TableCell align="right" style={{ color: 'white' }}>
              Х координата
            </TableCell>
            <TableCell align="right" style={{ color: 'white' }}>
              Y координата
            </TableCell>
            <TableCell align="right" style={{ color: 'white' }}>
              Оценка
            </TableCell>
            <TableCell align="right" style={{ color: 'white' }}></TableCell>
            <TableCell align="right" style={{ color: 'white' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ color: 'white' }}>
                {row.id}
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                {row.id}
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                {row.createdAt}
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                {row.X}
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                {row.Y}
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                {row.lightGrade}
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                <Button
                  variant="contained"
                  style={{ backgroundColor: '#760EDE' }}
                  onClick={() => openAlert(row.fileName)}
                >
                  Подробнее
                </Button>
              </TableCell>
              <TableCell style={{ color: 'white' }} align="right">
                <Button
                  onClick={() => downloadButtonHandler(row.fileName)}
                  variant="contained"
                  style={{ backgroundColor: '#760EDE' }}
                  startIcon={<DownloadIcon />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedFile && (
        <CustomAlert fileName={selectedFile} onClose={closeAlert} />
      )}
    </TableContainer>
  );
}

function CustomAlert({ fileName, onClose }:any) {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <h2>Оценка освещенности: 10</h2>
        <div>{/* Your content goes here */}</div>
        <p>File Name: {fileName}</p>
        <img src={`http://localhost:8000/media/?imageName=${fileName}`} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}