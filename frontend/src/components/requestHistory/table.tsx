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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#111318' }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: 'white' }}>ID</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>Дата</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>Время</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>Х координата</TableCell>
            <TableCell align="right" style={{ color: 'white' }}>Y координата</TableCell>
            <TableCell align="right" style={{ color: 'white' }}></TableCell>
            <TableCell align="right" style={{ color: 'white' }}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ color: 'white' }}>
                {row.name}
              </TableCell>
                <TableCell style={{ color: 'white' }} align="right">{row.calories}</TableCell>
                <TableCell style={{ color: 'white' }} align="right">{row.fat}</TableCell>
                <TableCell  style={{ color: 'white' }}align="right">{row.carbs}</TableCell>
                <TableCell style={{ color: 'white' }} align="right">{row.protein}</TableCell>
                <TableCell style={{ color: 'white' }} align="right">
                    <Button variant="contained" style={{ backgroundColor: '#760EDE'}}>Подробнее</Button>
                </TableCell>
                <TableCell style={{ color: 'white' }} align="right">
                    <Button variant="contained" style={{ backgroundColor: '#760EDE'}} startIcon={<DownloadIcon />}/>
                </TableCell>
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}