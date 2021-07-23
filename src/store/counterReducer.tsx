import { createStore, Store } from "redux";

export type SetCounterStateType = {
  enteredStartValue: number;
  enteredMaxValue: number;
  startValueValidation: boolean;
  maxValueValidation: boolean;
  warningMessage: string;
  disable: boolean;
  value: number | string;
  error: boolean;
  limit: number[];
};
const initialState = {
  enteredStartValue: 0,
  enteredMaxValue: 1,
  startValueValidation: true,
  maxValueValidation: true,
  warningMessage: "Enter values and press SET",
  disable: true,
  value: 0,
  error: false,
  limit: [0, 5],
};
export const reducer = (
  state: SetCounterStateType = initialState,
  action: ActionTasksTypes
): SetCounterStateType => {
  switch (action.type) {
    case "SET_START_VALUE":
      return {
        ...state,
        enteredStartValue: action.payload.enteredStartVal,
        enteredMaxValue: action.payload.enteredMaxVal,
        startValueValidation:
          action.payload.enteredStartVal >= action.payload.enteredMaxVal ||
          action.payload.enteredStartVal < 0
            ? false
            : true,
        maxValueValidation:
          action.payload.enteredStartVal >= action.payload.enteredMaxVal
            ? false
            : true,
        warningMessage:
          action.payload.enteredStartVal >= action.payload.enteredMaxVal ||
          action.payload.enteredStartVal < 0
            ? "Incorrect value!"
            : "Enter values and press SET",

        value: action.payload.enteredStartVal,
      };

    default:
      throw new Error("I dont understand this action type");
  }
};

export type ActionTasksTypes = ReturnType<typeof setStartValueAC>;

export const setStartValueAC = (
  enteredStartVal: number,
  enteredMaxVal: number
) => {
  return {
    type: "SET_START_VALUE",
    payload: {
      enteredStartVal: enteredStartVal,
      enteredMaxVal: enteredMaxVal,
    },
  } as const;
};

export type RootStateType = ReturnType<typeof reducer>;
const store: Store<RootStateType> = createStore(reducer);
export default store;
