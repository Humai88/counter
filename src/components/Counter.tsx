import styles from "./Counter.module.scss";
import { Card } from "./Card";
import React from "react";
import { Button } from "./Button";

type CounterPropsType = {
  value: number | string;
  limit: boolean;
  error: boolean;
  increaseValueCallback: () => void;
  resetValueCallback: () => void;
};

export const Counter: React.FC<CounterPropsType> = ({
  value,
  limit,
  error,
  increaseValueCallback,
  resetValueCallback,
}) => {
  const finalStyles = `${styles.counter} ${limit ? styles.limit : ""} ${
    value === "Incorrect value!" ? styles.textRed : ""
  } ${value === "Enter values and press SET" ? styles.text : ""}`;
  return (
    <Card className={styles.wrapper}>
      <div className={styles.counterWrapper}>
        <h2 className={finalStyles}>{value}</h2>
      </div>
      <Card className={styles.buttonsWrapper}>
        <Button
          disabled={
            error ||
            value === "Incorrect value!" ||
            value === "Enter values and press SET"
          }
          callback={increaseValueCallback}
          title="Increase"
        />
        <Button
          disabled={
            value === "Incorrect value!" ||
            value === "Enter values and press SET"
          }
          callback={resetValueCallback}
          title="Reset"
        />
      </Card>
    </Card>
  );
};
