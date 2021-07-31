import React, { useState, ChangeEvent, useEffect } from "react";
import styles from "./SetCounter.module.scss";
import { Card } from "./Card";
import { Button } from "./Button";
import { saveState } from "../localStorage";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreType } from "../store/store";
import { setStartValuesAC, SetCounterStateType } from "../store/counterReducer";

type SetCounterPropsType = {
  onSetValues: (enteredMaxValue: number, enteredStartValue: number) => void;
  onSetWarning: (warning: string) => void;
}; // Props types

export type InitialValuesType = {
  enteredStartValue: number;
  enteredMaxValue: number;
}; // Initial state type

export const SetCounterRedux: React.FC<SetCounterPropsType> = ({
  onSetValues,
  onSetWarning,
}) => {
  const state = useSelector<AppStoreType, SetCounterStateType>(
    (state) => state
  );

  const dispatch = useDispatch();

  const [values, setValues] = useState<InitialValuesType>({
    enteredStartValue: 0,
    enteredMaxValue: 1,
  }); // Set values for two inputs

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const newValue = +value;
    setValues({
      ...values,
      [name]: newValue,
    });
  };

  useEffect(() => {
    dispatch(
      setStartValuesAC(values.enteredStartValue, values.enteredMaxValue)
    );
  }, [values.enteredStartValue, values.enteredMaxValue]);

  useEffect(() => {
    onSetWarning(state.warningMessage);
  }, [state.warningMessage]);

  useEffect(() => {
    let valueAsString = localStorage.getItem("max-value");
    let newValues = { ...values };
    if (valueAsString) {
      let newValue = JSON.parse(valueAsString);
      newValues.enteredMaxValue = newValue;
    }
    let valueAsString2 = localStorage.getItem("start-value");
    if (valueAsString2) {
      let newValue = JSON.parse(valueAsString2);
      newValues.enteredStartValue = newValue;
    }
    setValues(newValues);
  }, []); // Local storage

  const onClickHandler = () => {
    dispatch(
      setStartValuesAC(values.enteredStartValue, values.enteredMaxValue)
    );
    onSetValues(values.enteredStartValue, values.enteredMaxValue);
    saveState<number>("start-value", values.enteredStartValue);
    saveState<number>("max-value", values.enteredMaxValue);
  }; // Set button handler

  const validationStyles = `${styles.input} ${
    !state.isValid ? styles.inValid : ""
  }`;

  return (
    <Card className={styles.wrapper}>
      <form>
        <div>
          <label htmlFor="maxValue">Max value:</label>
          <input
            className={validationStyles}
            type="number"
            name="enteredMaxValue"
            onChange={handleInputChange}
            value={values.enteredMaxValue}
          />
        </div>
        <div>
          <label htmlFor="startValue">Start value:</label>
          <input
            className={validationStyles}
            type="number"
            name="enteredStartValue"
            onChange={handleInputChange}
            value={values.enteredStartValue}
          />
        </div>
      </form>
      <Card className={styles.btnWrapper}>
        <Button
          className={styles.setBtn}
          type="submit"
          disabled={state.disable}
          callback={onClickHandler}
          title="Set"
        />
      </Card>
    </Card>
  );
};
