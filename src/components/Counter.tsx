import styles from "./Counter.module.scss";
import { Card } from "./Card";

type PropsType = {
  value: number | string;
  limit: boolean;
  warning?: string | number;
};

export const Counter: React.FC<PropsType> = ({ value, limit, warning }) => {
  const finalStyles = `${styles.counter} ${limit ? styles.limit : ""}`;
  return (
    <Card className={styles.wrapper}>
      <h2 className={finalStyles}>{value}</h2>
    </Card>
  );
};
