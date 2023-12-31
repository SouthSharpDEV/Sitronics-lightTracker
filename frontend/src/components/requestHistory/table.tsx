//@ts-nocheck
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";

import axios from "axios";

import "./styles.css";

function createData(id: number, createdAt: string, X: string[], Y: string[], lightGrade: number, fileName: string) {
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
    const response = await axios.get("https://illumination.geryon.space/api/");
    const fetchedData = response.data;
    const rowsData = fetchedData.map((data) =>
      createData(data.id, data.createdAt, data.X, data.Y, data.lightGrade, data.fileName)
    );
    console.log(rowsData.map((item) => item.createdAt));
    setData(rowsData);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const downloadButtonHandler = async (imageName) => {
    let url = `https://illumination.geryon.space/api/media/?imageName=${imageName}`;
    saveAs(url, "Twitter-logo");
  };

  const downloadJSONHandler = async (imageName) => {
    let url = `https://illumination.geryon.space/api/downloadJson/?imageName=${imageName}`;
    const data = await axios.get(url);
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(data.data))}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  if (data.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "85vh" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const newDateStr = dateStr.slice(0, 10) + " " + dateStr.slice(10);
    const [date, time] = new Date(newDateStr).toLocaleString("ru-RU").split(", ");

    return { date, time };
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: "#111318",
        marginTop: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Table sx={{ minWidth: 650, maxWidth: "96vw" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>ID</TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Дата
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Время
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Х координата
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Y координата
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Оценка
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}></TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Скачать изображение
            </TableCell>
            <TableCell align="right" style={{ color: "white" }}>
              Скачать geoJSON
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.reverse().map((row, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row" style={{ color: "white" }}>
                {data.length - index}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {formatDate(row.createdAt).date}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {formatDate(row.createdAt).time}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {row.X}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {row.Y}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                {row.lightGrade}
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#31e981", color: "#111318" }}
                  onClick={() => openAlert(row.fileName)}
                >
                  Подробнее
                </Button>
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                <Button
                  onClick={() => downloadButtonHandler(row.fileName)}
                  variant="contained"
                  style={{ backgroundColor: "#31e981", color: "#111318" }}
                  startIcon={<DownloadIcon style={{ fill: "#111318" }} />}
                />
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                <Button
                  onClick={() => downloadJSONHandler(row.fileName)}
                  variant="contained"
                  style={{ backgroundColor: "#31e981", color: "#111318" }}
                  startIcon={<DownloadIcon style={{ fill: "#111318" }} />}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedFile && <CustomAlert fileName={selectedFile} onClose={closeAlert} />}
    </TableContainer>
  );
}

function CustomAlert({ fileName, onClose, lightGrade }: any) {
  return (
    <>
      <div class="modal-overlay" id="modal-overlay"></div>
      <div className="custom-alert" style={{ borderRadius: 20 }}>
        <div className="custom-alert-content" style={{ padding: 15, borderRadius: 20 }}>
          <p style={{ marginBottom: 15 }}>Подробнее: {fileName}</p>
          <img src={`https://illumination.geryon.space/api/media/?imageName=${fileName}`} />
          <span onClick={onClose} className="close-button" />
        </div>
      </div>
    </>
  );
}
