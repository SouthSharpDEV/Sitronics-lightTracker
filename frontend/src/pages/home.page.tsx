import React, { useState } from "react";
import axios from "axios";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Welcome from "../components/Welcome";

import "../styles/home.css";

interface HomePageProps {
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HomePage: React.FC<HomePageProps> = ({ isStarted, setIsStarted }) => {
  const [x1, setx1] = useState<string>("");
  const [x2, setx2] = useState<string>("");
  const [y1, sety1] = useState<string>("");
  const [y2, sety2] = useState<string>("");

  const [selectedFile, setSelectedFile] = useState<File>();

  const handleChange = async () => {
    const formData = new FormData();
    if (selectedFile) {
      if (x1 && x2 && y1 && y2) {
        formData.append("file", selectedFile);

        const response = await axios({
          method: "post",
          url: "https://illumination.geryon.space/api/coordinates",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      formData.append("file", selectedFile);
      formData.append("coordX", [x1, x2].toString());
      formData.append("coordY", [y1, y2].toString());

      const response = await axios({
        method: "post",
        url: "https://illumination.geryon.space/api/noCoordinates",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
  };

  const onFileInput = async (selectorFiles: FileList) => {
    setSelectedFile(selectorFiles[0]);
  };

  return (
    <div className="container">
      {!isStarted && <Welcome start={() => setIsStarted(true)} />}

      <h1 className="title">Определение освещеннности</h1>
      <p className="second-title">Загрузить фотографию</p>

      <div>
        <input
          id="upload-photo"
          type="file"
          // @ts-ignore
          onChange={(e) => onFileInput(e.target.files)}
          hidden
        ></input>
        <label className="upload-file-btn" htmlFor="upload-photo">
          <AddAPhotoIcon style={{ height: 50, width: 50 }} />
        </label>
      </div>

      <p className="second-title coords-title">Координаты снимка</p>
      <div style={{ marginBottom: "15px" }}>
        <div className="row">
          <div className="input-wrapper">
            <input
              value={x1}
              onChange={({ target }) => setx1(target.value)}
              type="text"
              id="input-x-1"
              required
            ></input>
            <label htmlFor="input-x-1" className="placeholder">
              X координата
            </label>
          </div>
          <div className="input-wrapper">
            <input
              value={y1}
              onChange={({ target }) => sety1(target.value)}
              type="text"
              id="input-y-1"
              required
            ></input>
            <label htmlFor="input-y-1" className="placeholder">
              Y координата
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-wrapper">
            <input
              value={x2}
              onChange={({ target }) => setx2(target.value)}
              type="text"
              id="input-x-2"
              required
            ></input>
            <label htmlFor="input-x-2" className="placeholder">
              X координата
            </label>
          </div>
          <div className="input-wrapper">
            <input
              value={y2}
              onChange={({ target }) => sety2(target.value)}
              type="text"
              id="input-y-2"
              required
            ></input>
            <label htmlFor="input-y-2" className="placeholder">
              Y координата
            </label>
          </div>
        </div>
      </div>
      <button className="send-btn" onClick={() => handleChange()}>
        Отправить
      </button>
    </div>
  );
};
