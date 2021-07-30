import { Counter } from "./components/Counter";
import { Card } from "./components/Card";
import styles from "./App.module.scss";
import { SetCounterRedux } from "./components/SetCounterRedux";
import { AppStoreType } from "./store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  SetCounterStateType,
  setDisableAC,
  setErrorAC,
  setLimitAC,
  setValueAC,
} from "./store/counterReducer";

function App() {
  const state = useSelector<AppStoreType, SetCounterStateType>(
    (state) => state.counter
  );
  const value = state.value;
  const error = state.error;
  const limit = state.limit;
  const dispatch = useDispatch();

  const increaseValue = () => {
    const nextValue = (value as number) + 1;
    dispatch(setValueAC(nextValue));
    if (nextValue === limit[1]) {
      dispatch(setErrorAC(true));
    }
  };

  const resetValue = () => {
    dispatch(setLimitAC([0, 0]));
    dispatch(setErrorAC(false));
    dispatch(setValueAC(0));
    dispatch(setDisableAC(true));
  };

  const onSetValues = (startValue: number, maxValue: number) => {
    dispatch(setValueAC(startValue));
    dispatch(setLimitAC([startValue, maxValue]));
  };

  const onSetWarning = (warning: string) => {
    dispatch(setValueAC(warning));
  };

  return (
    <div className={styles.mainWrapper}>
      <Card className={styles.wrapper}>
        <SetCounterRedux
          onSetWarning={onSetWarning}
          onSetValues={onSetValues}
        />
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
