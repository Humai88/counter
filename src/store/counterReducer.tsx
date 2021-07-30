export type SetCounterStateType = {
  enteredStartValue: number;
  enteredMaxValue: number;
  isValid: boolean;
  warningMessage: string;
  disable: boolean;
  value: number | string;
  error: boolean;
  limit: number[];
};
const initialState: SetCounterStateType = {
  enteredStartValue: 0,
  enteredMaxValue: 1,
  isValid: true,
  warningMessage: "Enter values and press SET",
  disable: true,
  value: 0,
  error: false,
  limit: [0, 5],
};
export const reducer = (
  state = initialState,
  action: ActionTasksTypes
): SetCounterStateType => {
  switch (action.type) {
    case "SET_START_VALUES":
      return {
        ...state,
        enteredStartValue: action.payload.enteredStartVal,
        enteredMaxValue: action.payload.enteredMaxVal,
      };
    case "SET_START_VALIDATION":
      return {
        ...state,
        isValid:
          action.payload.enteredStartVal >= action.payload.enteredMaxVal ||
          action.payload.enteredStartVal < 0
            ? false
            : true,
      };
    case "SET_WARNING":
      return {
        ...state,
        warningMessage:
          action.payload.enteredStartVal >= action.payload.enteredMaxVal ||
          action.payload.enteredStartVal < 0
            ? "Incorrect value!"
            : "Enter values and press SET",
      };
    case "SET_DISABLE":
      return {
        ...state,
        disable: action.payload.disable,
      };
    case "SET_LIMIT":
      return {
        ...state,
        limit: action.payload.limit,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload.error,
      };
    case "SET_VALUE":
      return {
        ...state,

        value: action.payload.value,
      };
    default:
      return state;
  }
};

export type ActionTasksTypes =
  | ReturnType<typeof setStartValuesAC>
  | ReturnType<typeof setErrorAC>
  | ReturnType<typeof setLimitAC>
  | ReturnType<typeof setValueAC>
  | ReturnType<typeof setValidationAC>
  | ReturnType<typeof setWarningAC>
  | ReturnType<typeof setDisableAC>;

export const setStartValuesAC = (
  enteredStartVal: number,
  enteredMaxVal: number
) => {
  return {
    type: "SET_START_VALUES",
    payload: {
      enteredStartVal,
      enteredMaxVal,
    },
  } as const;
};

export const setErrorAC = (error: boolean) => {
  return {
    type: "SET_ERROR",
    payload: {
      error,
    },
  } as const;
};
export const setLimitAC = (limit: number[]) => {
  return {
    type: "SET_LIMIT",
    payload: {
      limit,
    },
  } as const;
};
export const setValueAC = (value: number | string) => {
  return {
    type: "SET_VALUE",
    payload: {
      value,
    },
  } as const;
};
export const setValidationAC = (
  enteredStartVal: number,
  enteredMaxVal: number
) => {
  return {
    type: "SET_START_VALIDATION",
    payload: {
      enteredStartVal,
      enteredMaxVal,
    },
  } as const;
};
export const setWarningAC = (
  enteredStartVal: number,
  enteredMaxVal: number
) => {
  return {
    type: "SET_WARNING",
    payload: {
      enteredStartVal,
      enteredMaxVal,
    },
  } as const;
};
export const setDisableAC = (disable: boolean) => {
  return {
    type: "SET_DISABLE",
    payload: {
      disable,
    },
  } as const;
};
