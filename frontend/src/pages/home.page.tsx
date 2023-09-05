import React, { useState } from "react";
import axios from "axios";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Welcome from "../components/Welcome";

import { toast, ToastContainer, ToastOptions } from "react-toastify";

import "../styles/home.css";

interface HomePageProps {
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

const TOAST_OPTIONS = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
} as ToastOptions;

export const HomePage: React.FC<HomePageProps> = ({ isStarted, setIsStarted }) => {
  const [x1, setx1] = useState<string>("");
  const [x2, setx2] = useState<string>("");
  const [y1, sety1] = useState<string>("");
  const [y2, sety2] = useState<string>("");

  const notify = () => toast("Успех");

  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = React.useState(false);

  const failedToast = () => toast.error("Ошибка", TOAST_OPTIONS);
  const successToast = () => toast.success("Успешно", TOAST_OPTIONS);

  const handleChange = async () => {
    const formData = new FormData();
    if (selectedFile) {
      if (x1 && x2 && y1 && y2) {
        setIsLoading(true);
        formData.append("file", selectedFile);
        formData.append("file", selectedFile);
        formData.append("coordX", [x1, x2].toString());
        formData.append("coordY", [y1, y2].toString());
        console.log(formData);

        await axios({
          method: "post",
          url: "https://illumination.geryon.space/api/coordinates",
          // "https://illumination.geryon.space/api/coordinates",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(({ status }) => {
            if (status === 200) {
              successToast();
            }
          })
          .catch(() => {
            failedToast();
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
      formData.append("file", selectedFile);
      formData.append("coordX", [x1, x2].toString());
      formData.append("coordY", [y1, y2].toString());
      console.log(formData);

      setIsLoading(true);
      await axios({
        method: "post",
        url: "https://illumination.geryon.space/api/noCoordinates",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(({ status }) => {
          if (status === 200) {
            successToast();
          }
        })
        .catch(() => {
          failedToast();
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  React.useEffect(() => {}, []);

  const onFileInput = async (selectorFiles: FileList) => {
    setSelectedFile(selectorFiles[0]);
  };

  const numValidate = (value: string, prevValue: string) => {
    return /^(\d*)([,.]\d{0,40})?$/.test(value) ? value : prevValue;
  };

  return (
    <div className="container">
      {!isStarted && <Welcome start={() => setIsStarted(true)} />}

      <h1 className="title">Определение освещеннности</h1>
      <p className="second-title">Загрузить фотографию</p>

      {selectedFile ? (
        <img className="preview-img" src={URL.createObjectURL(selectedFile)} alt="" />
      ) : (
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
      )}

      <p className="second-title coords-title">Координаты снимка</p>
      <div style={{ marginBottom: "15px" }}>
        <div className="row">
          <div className="input-wrapper">
            <input
              value={x1}
              onChange={({ target }) => setx1((prev) => numValidate(target.value, prev))}
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
              onChange={({ target }) => sety1((prev) => numValidate(target.value, prev))}
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
              onChange={({ target }) => setx2((prev) => numValidate(target.value, prev))}
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
              onChange={({ target }) => sety2((prev) => numValidate(target.value, prev))}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && (
        <div className="loader">
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};
