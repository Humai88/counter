import styles from "./Counter.module.scss";
import { Card } from "./Card";

type PropsType = {
  value: number;
  limit: boolean;
};

export const Counter: React.FC<PropsType> = ({ value, limit }) => {
  const finalStyles = `${styles.counter} ${limit ? styles.limit : ""}`;
  return (
    <Card className={styles.wrapper}>
      <h2 className={finalStyles}>{value}</h2>
    </Card>
  );
};
