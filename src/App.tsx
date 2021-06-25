import { useState, useEffect } from "react";
import { Counter } from "./components/Counter";
import { Card } from "./components/Card";
import styles from "./App.module.scss";
import { Button } from "./components/Button";

function App() {
  let [value, setValue] = useState<number>(0);
  let [limit, setLimit] = useState<boolean>(false);

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

  const setValueCallback = () => {
    const nextValue = value + 1;
    setValue(nextValue);
    if (nextValue >= 5) {
      setLimit(true);
    }
  };

  const resetValueCallback = () => {
    setValue(0);
    setLimit(false);
  };

  return (
    <div className={styles.mainWrapper}>
      <Card className={styles.wrapper}>
        <Counter limit={limit} value={value} />
        <Card className={styles.buttonsWrapper}>
          <Button
            disabled={limit}
            callback={setValueCallback}
            title="Increase"
          />
          <Button
            disabled={value === 0}
            callback={resetValueCallback}
            title="Reset"
          />
        </Card>
      </Card>
      <Card className={styles.wrapper}>
        <Counter limit={limit} value={value} />
        <Card className={styles.buttonsWrapper}>
          <Button
            disabled={limit}
            callback={setValueCallback}
            title="Increase"
          />
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
