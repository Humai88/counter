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
    (state) => state
  );

  const dispatch = useDispatch();

  const increaseValue = () => {
    const nextValue = (state.value as number) + 1;
    dispatch(setValueAC(nextValue));
    if (nextValue === state.limit[1]) {
      dispatch(setErrorAC(true));
    }
  };

  const resetValue = () => {
    dispatch(setLimitAC([0, 0]));
    dispatch(setErrorAC(false));
    dispatch(setValueAC(0));
    dispatch(setDisableAC(false));
  };

  const onSetValues = (startValue: number, maxValue: number) => {
    dispatch(setValueAC(startValue));
    dispatch(setLimitAC([startValue, maxValue]));
    dispatch(setDisableAC(true));
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
          error={state.error}
          increaseValueCallback={increaseValue}
          resetValueCallback={resetValue}
          limit={state.error}
          value={state.value}
        />
      </Card>
    </div>
  );
}

export default App;
