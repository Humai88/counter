import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./SetCounter.module.scss";
import { Card } from "./Card";
import { Button } from "./Button";
import { saveState } from "./../localStorage";

type SetCounterPropsType = {
  onSetValues: (enteredMaxValue: number, enteredStartValue: number) => void;
  onSetWarning: (warning: string) => void;
};

export const SetCounter: React.FC<SetCounterPropsType> = ({
  onSetValues,
  onSetWarning,
}) => {
  const [enteredStartValue, setEnteredStartValue] = useState<number>(0);
  const [enteredMaxValue, setEnteredMaxValue] = useState<number>(
    enteredStartValue + 1
  );
  const [maxValueIsValid, setMaxValueIsValid] = useState<boolean>(true);
  const [startValueIsValid, setStartValueIsValid] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(true);
  const [warningMessage, setWarningMessage] = useState<string>(
    "Enter values and press SET"
  );

  const maxValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let enteredMaxtVal = +e.currentTarget.value;
    setEnteredMaxValue(enteredMaxtVal);
    let isError = false;
    if (enteredMaxtVal <= enteredStartValue) {
      setMaxValueIsValid(false);
      setStartValueIsValid(false);
      isError = true;
    } else {
      setMaxValueIsValid(true);
      setStartValueIsValid(true);
    }
    setWarningMessage(
      isError ? "Incorrect value!" : "Enter values and press SET"
    );
    setDisable(isError);
  };

  const startValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let enteredStartVal = +e.currentTarget.value;
    setEnteredStartValue(enteredStartVal);
    let isError = false;
    if (enteredStartVal < 0) {
      setStartValueIsValid(false);
      isError = true;
    } else if (enteredStartVal >= enteredMaxValue) {
      setMaxValueIsValid(false);
      setStartValueIsValid(false);
      isError = true;
    } else {
      setStartValueIsValid(true);
      setMaxValueIsValid(true);
    }
    setWarningMessage(
      isError ? "Incorrect value!" : "Enter values and press SET"
    );
    setDisable(isError);
  };

  useEffect(() => {
    onSetWarning(warningMessage);
  }, [warningMessage]);

  useEffect(() => {
    let valueAsString = localStorage.getItem("max-value");
    if (valueAsString) {
      let newValue = JSON.parse(valueAsString);
      setEnteredMaxValue(newValue);
    }
    let valueAsString2 = localStorage.getItem("start-value");
    if (valueAsString2) {
      let newValue = JSON.parse(valueAsString2);
      setEnteredStartValue(newValue);
    }
  }, []);

  const onClickHandler = () => {
    onSetValues(enteredStartValue, enteredMaxValue);
    saveState<number>("start-value", enteredStartValue);
    saveState<number>("max-value", enteredMaxValue);
    setDisable(true);
  };

  const maxStyles = `${styles.input} ${!maxValueIsValid ? styles.inValid : ""}`;
  const startStyles = `${styles.input} ${
    !startValueIsValid ? styles.inValid : ""
  }`;

  return (
    <Card className={styles.wrapper}>
      <div>
        <label htmlFor="maxValue">Max value:</label>
        <input
          className={maxStyles}
          type="number"
          id="maxValue"
          onChange={maxValueChangeHandler}
          value={enteredMaxValue}
        />
      </div>
      <div>
        <label htmlFor="startValue">Start value:</label>
        <input
          className={startStyles}
          type="number"
          id="startValue"
          onChange={startValueChangeHandler}
          value={enteredStartValue}
        />
      </div>
      <Card className={styles.btnWrapper}>
        <Button
          className={styles.setBtn}
          type="submit"
          disabled={disable}
          callback={onClickHandler}
          title="Set"
        />
      </Card>
    </Card>
  );
};
