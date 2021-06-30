import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./SetCounter.module.scss";
import { Card } from "./Card";
import { Button } from "./Button";

type PropsType = {
  onSetValues: (enteredMaxValue: number, enteredStartValue: number) => void;
  onSetWarning: (warning: string) => void;
};

export const SetCounter: React.FC<PropsType> = ({
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
  let [warning, setWarning] = useState<string>("Enter values and press SET");

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
      setMaxValueIsValid(false);
      setStartValueIsValid(false);
      setWarning("Incorrect value!");
    } else {
      setMaxValueIsValid(true);
      setStartValueIsValid(true);
      setWarning("Enter values and press SET");
    }
    onSetWarning(warning);
    setDisable(false);
  };

  const startValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let enteredStartVal = +e.currentTarget.value;
    setEnteredStartValue(enteredStartVal);
    if (enteredStartVal < 0) {
      setStartValueIsValid(false);
      setWarning("Incorrect value!");
    } else {
      setStartValueIsValid(true);
      setWarning("Enter values and press SET");
      setMaxValueIsValid(true);
    }

    onSetWarning(warning);
    setDisable(false);
  };

  const onClickHandler = () => {
    onSetValues(enteredStartValue, enteredMaxValue);
    setDisable(true);
  };

  const finalMaxValueStyles = `${styles.input} ${
    !maxValueIsValid ? styles.inValid : ""
  }`;

  const finalStartValueStyles = `${styles.input} ${
    !startValueIsValid ? styles.inValid : ""
  }`;

  return (
    <Card className={styles.wrapper}>
      <div>
        <label htmlFor="maxValue">Max value:</label>
        <input
          className={finalMaxValueStyles}
          type="number"
          id="maxValue"
          onChange={maxValueChangeHandler}
          value={enteredMaxValue}
        />
      </div>
      <div>
        <label htmlFor="startValue">Start value:</label>
        <input
          className={finalStartValueStyles}
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
