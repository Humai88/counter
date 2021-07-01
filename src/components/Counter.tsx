import styles from "./Counter.module.scss";
import { Card } from "./Card";
import React from "react";

type PropsType = {
  value: number | string;
  limit: boolean;
};

export const Counter: React.FC<PropsType> = ({ value, limit }) => {
  const finalStyles = `${styles.counter} ${limit ? styles.limit : ""} ${
    value === "Incorrect value!" ? styles.textRed : ""
  } ${value === "Enter values and press SET" ? styles.text : ""}`;
  return (
    <Card className={styles.wrapper}>
      <h2 className={finalStyles}>{value}</h2>
    </Card>
  );
};
