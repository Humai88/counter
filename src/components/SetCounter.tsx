import React, { useState, ChangeEvent } from "react";
import styles from "./SetCounter.module.scss";
import { Card } from "./Card";
import { Button } from "./Button";

type PropsType = {
  onSetValues: (
    enteredMaxValue: number,
    enteredStartValue: number,
    warningMessage: string
  ) => void;
};

export const SetCounter: React.FC<PropsType> = ({ onSetValues }) => {
  const [enteredStartValue, setEnteredStartValue] = useState<number>(0);
  const [enteredMaxValue, setEnteredMaxValue] = useState<number>(
    enteredStartValue + 1
  );
  const [maxValueIsValid, setMaxValueIsValid] = useState<boolean>(true);
  const [startValueIsValid, setStartValueIsValid] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(true);
  let [warning, setWarning] = useState<string>("Enter values and press SET");

  const finalMaxValueStyles = `${styles.input} ${
    !maxValueIsValid ? styles.inValid : ""
  }`;

  const finalStartValueStyles = `${styles.input} ${
    !startValueIsValid ? styles.inValid : ""
  }`;

  const maxValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredMaxValue(+e.currentTarget.value);
    if (+e.currentTarget.value <= enteredStartValue) {
      setMaxValueIsValid(false);
      setWarning("Incorrect value!");
    } else {
      setMaxValueIsValid(true);
      setWarning("Enter values and press SET");
    }
    setDisable(false);
  };

  const startValueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredStartValue(+e.currentTarget.value);
    if (+e.currentTarget.value < 0) {
      setStartValueIsValid(false);
      setWarning("Incorrect value!");
    } else {
      setStartValueIsValid(true);
      setWarning("Enter values and press SET");
    }

    setDisable(false);
  };

  const onClickHandler = () => {
    onSetValues(enteredStartValue, enteredMaxValue, warning);
    console.log(warning);
  };
  const onBlurHandler = () => {
    setDisable(true);
  };
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
