import React, { useRef } from "react";
import styles from "./modal.module.css";
import Backdrop from "../../UI/backdrop/Backdrop";
import TextField from "@mui/material/TextField";
import useInput from "../hooks/use-input";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import itLocale from "date-fns/locale/it";
import axios from "axios";
import { useRouter } from "next/router";

function Modal(props) {
  const [value, setValue] = React.useState(null);
  const paeseRef = useRef();
  const provinciaRef = useRef();
  const indirizzoRef = useRef();
  const router = useRouter();

  const {
    value: enteredCF,
    valueIsValid: CFIsValid,
    hasError: CFHasError,
    valueHandler: CFHandler,
    inputBlur: CFBlurHandler,
    reset: CFReset,
  } = useInput((CF) => CF.trim().length === 0 || CF.trim().length === 16);

  const {
    value: enteredCAP,
    valueIsValid: CAPIsValid,
    hasError: CAPHasError,
    valueHandler: CAPHandler,
    inputBlur: CAPBlurHandler,
    reset: CAPReset,
  } = useInput((CAP) => CAP.trim().length === 0 || CAP.trim().length === 5);
  const {
    value: enteredTEL,
    valueIsValid: TELIsValid,
    hasError: TELHasError,
    valueHandler: TELHandler,
    inputBlur: TELBlurHandler,
    reset: TELReset,
  } = useInput((TEL) => TEL.trim().length === 0 || TEL.trim().length === 10);

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("/");
  }
  const submitHandler = () => {
    let date = null;
    const dateIsValid = false;
    if (value == null) {
      dateIsValid = true;
    } else if (value != "Invalid Date") {
      date = convertDate(value);
      dateIsValid = true;
    }

    if (CFIsValid && dateIsValid && CAPIsValid) {
      const country = paeseRef.current.value;
      const province = provinciaRef.current.value;
      const address = indirizzoRef.current.value;

      if (
        country ||
        province ||
        address ||
        date ||
        enteredCAP ||
        enteredTEL ||
        enteredCF
      ) {
        console.log("tutto giusto");
        const data = {
          email: props.email,
          country: country,
          province: province,
          address: address,
          birth: date,
          CAP: enteredCAP,
          telephone: enteredTEL,
          CF: enteredCF,
        };

        axios
          .post(
            "https://php-e-commerce-api.herokuapp.com/api/user/add-information.php",
            data
          )
          .then((res) => {
            router.push({ pathname: "../registrated" });
          })
          .catch((err) => console.log(err));
      }else{
        router.push({ pathname: "../registrated" });
      }
    }
  };

  return (
    <>
      <Backdrop onClick={props.onClick} />
      <div className={styles["modal"]}>
        <h1 className={styles["title"]}>Inserisci informazioni opzionali</h1>
        <div className={styles["input-container"]}>
          <div className={styles["inputs"]}>
            <TextField
              className={styles["input"]}
              label="Paese"
              variant="outlined"
              color="secondary"
              inputRef={paeseRef}
            />
            <TextField
              className={styles["input"]}
              label="Provincia"
              variant="outlined"
              color="secondary"
              inputRef={provinciaRef}
            />
            <TextField
              className={styles["input"]}
              label="Indirizzo"
              variant="outlined"
              color="secondary"
              inputRef={indirizzoRef}
            />
          </div>
          <div className={styles["inputs"]}>
            <TextField
              className={styles["input"]}
              label="CAP"
              variant="outlined"
              color="secondary"
              type="number"
              value={enteredCAP}
              onChange={CAPHandler}
              onBlur={CAPBlurHandler}
              error={CAPHasError}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 5);
              }}
            />
            <TextField
              className={styles["input"]}
              label="Numero di telefono"
              variant="outlined"
              color="secondary"
              type="number"
              value={enteredTEL}
              onChange={TELHandler}
              onBlur={TELBlurHandler}
              error={TELHasError}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
            <TextField
              className={styles["input"]}
              label="Codice fiscale"
              variant="outlined"
              color="secondary"
              value={enteredCF}
              onChange={CFHandler}
              onBlur={CFBlurHandler}
              error={CFHasError}
              inputProps={{ maxLength: 16 }}
            />
          </div>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={itLocale}>
          <DatePicker
            disableFuture
            label="Data di nascita"
            mask="__/__/____"
            views={["day", "month", "year"]}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                color="secondary"
                className={styles["date"]}
              />
            )}
          />
        </LocalizationProvider>
        <span onClick={submitHandler} className={styles["btn"]}>
          Invia
        </span>
      </div>
    </>
  );
}

export default Modal;
