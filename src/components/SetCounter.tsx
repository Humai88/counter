import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./SetCounter.module.scss";
import { Card } from "./Card";
import { Button } from "./Button";

type PropsType = {
  onSetValues: (enteredMaxValue: number, enteredStartValue: number) => void;
  onSetWarning: (isValid: boolean) => void;
};

export const SetCounter: React.FC<PropsType> = ({
  onSetValues,
  onSetWarning,
}) => {
  const [enteredStartValue, setEnteredStartValue] = useState<number>(0);
  const [enteredMaxValue, setEnteredMaxValue] = useState<number>(
    enteredStartValue + 1
  );
  const [valueIsValid, setValueIsValid] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    let valueAsString = localStorage.getItem("max-value");
    if (valueAsString) {
      let newValue = JSON.parse(valueAsString);
      setEnteredMaxValue(newValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("max-value", JSON.stringify(enteredMaxValue));
  }, [enteredMaxValue]);

  useEffect(() => {
    let valueAsString = localStorage.getItem("start-value");
    if (valueAsString) {
      let newValue = JSON.parse(valueAsString);
      setEnteredStartValue(newValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("start-value", JSON.stringify(enteredStartValue));
  }, [enteredStartValue]);

  const maxValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let enteredMaxtVal = +e.currentTarget.value;
    setEnteredMaxValue(enteredMaxtVal);
    if (enteredMaxtVal <= enteredStartValue) {
      setValueIsValid(false);
    } else {
      setValueIsValid(true);
    }

    onSetWarning(valueIsValid);
    setDisable(false);
  };

  const startValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let enteredStartVal = +e.currentTarget.value;
    setEnteredStartValue(enteredStartVal);
    if (enteredStartVal < 0 || enteredStartVal >= enteredMaxValue) {
      setValueIsValid(false);
    } else {
      setValueIsValid(true);
    }
    onSetWarning(valueIsValid);
    setDisable(false);
  };

  const onClickHandler = () => {
    onSetValues(enteredStartValue, enteredMaxValue);
    setDisable(true);
  };

  const finalStyles = `${styles.input} ${!valueIsValid ? styles.inValid : ""}`;

  return (
    <Card className={styles.wrapper}>
      <div>
        <label htmlFor="maxValue">Max value:</label>
        <input
          className={finalStyles}
          type="number"
          id="maxValue"
          onChange={maxValueChangeHandler}
          value={enteredMaxValue}
        />
      </div>
      <div>
        <label htmlFor="startValue">Start value:</label>
        <input
          className={finalStyles}
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
