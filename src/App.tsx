import { useState, useEffect } from "react";
import { Counter } from "./components/Counter";
import { Card } from "./components/Card";
import styles from "./App.module.scss";
import { Button } from "./components/Button";
import { SetCounter } from "./components/SetCounter";

function App() {
  let [value, setValue] = useState<number>(0);
  let [error, setError] = useState<boolean>(false);
  let [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    let valueAsString = localStorage.getItem("counterValue");
    if (valueAsString) {
      let newValue = JSON.parse(valueAsString);
      setValue(newValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("counterValue", JSON.stringify(value));
  }, [value]);

  const increaseValue = () => {
    const nextValue = value + 1;
    setValue(nextValue);
    if (nextValue === limit) {
      setError(true);
    }
  };

  const resetValueCallback = () => {
    setValue(0);
    setError(false);
  };

  const onSetValues = (
    startValue: number,
    maxValue: number,
    warning: string
  ) => {
    setValue(startValue);
    setLimit(maxValue);
  };

  return (
    <div className={styles.mainWrapper}>
      <Card className={styles.wrapper}>
        <SetCounter onSetValues={onSetValues} />
      </Card>
      <Card className={styles.wrapper}>
        <Counter limit={error} value={value} />
        <Card className={styles.buttonsWrapper}>
          <Button disabled={error} callback={increaseValue} title="Increase" />
          <Button
            disabled={value === 0}
            callback={resetValueCallback}
            title="Reset"
          />
        </Card>
      </Card>
    </div>
  );
}

export default App;
