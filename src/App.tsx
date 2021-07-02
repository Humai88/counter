import { useState } from "react";
import { Counter } from "./components/Counter";
import { Card } from "./components/Card";
import styles from "./App.module.scss";
import { SetCounter } from "./components/SetCounter";

function App() {
  let [value, setValue] = useState<number | string>(0);
  let [error, setError] = useState<boolean>(false);
  let [limit, setLimit] = useState<number[]>([0, 5]);

  const increaseValue = () => {
    const nextValue = (value as number) + 1;
    setValue(nextValue);
    if (nextValue === limit[1]) {
      setError(true);
    }
  };

  const resetValue = () => {
    setValue(limit[0]);
    setError(false);
  };

  const onSetValues = (startValue: number, maxValue: number) => {
    setValue(startValue);
    setLimit([startValue, maxValue]);
  };

  const onSetWarning = (warning: string) => {
    setValue(warning);
  };

  return (
    <div className={styles.mainWrapper}>
      <Card className={styles.wrapper}>
        <SetCounter onSetWarning={onSetWarning} onSetValues={onSetValues} />
      </Card>
      <Card className={styles.wrapper}>
        <Counter
          error={error}
          increaseValueCallback={increaseValue}
          resetValueCallback={resetValue}
          limit={error}
          value={value}
        />
      </Card>
    </div>
  );
}

export default App;
