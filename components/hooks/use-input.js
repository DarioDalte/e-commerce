import React, {useState} from 'react'

function useInput(validateValue) {

    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched ;



    const valueHandler = (event) => {
        setEnteredValue(event.target.value)
      };

      const inputBlur = () =>{
        setIsTouched(true);

      }

      const reset = () =>{
        setEnteredValue("");
        setIsTouched(false);
      }
    return {
        value: enteredValue,
        valueIsValid,
        hasError, 
        valueHandler,
        inputBlur,
        reset
    }
}

export default useInput;
