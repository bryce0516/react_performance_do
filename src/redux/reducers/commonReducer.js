const PLUS = "COMMON/PLUS";
const MINUS = "COMMON/MINUS";
const PLUS_RANDOM = "COMMON/PLUS_RANDOM";
const PLUS_AFTER_ONE_SECONDS = "COMMON/PLUS_AFTER_ONE_SECONDS";

export const plus = (diff) => {
  return {
    type: PLUS,
    payload: diff,
  };
};

export const minus = (diff) => {
  return {
    type: MINUS,
    payload: diff,
  };
};

export const plusRandom = () => {
  return {
    type: PLUS_RANDOM,
  };
};

export const plusAfterOneSeconds = () => {
  return {
    type: PLUS_AFTER_ONE_SECONDS,
  };
};
// export const plus = createAction(PLUS);
// export const minus = createAction(MINUS);
// export const plus_random = createAction(PLUS_RANDOM);
// export const plus_after_one_seconds = createAction(PLUS_AFTER_ONE_SECONDS);

const initialState = {
  number: 0,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLUS:
      return {
        ...state,
        number: state.number + action.payload,
      };

    case MINUS:
      return {
        ...state,
        number: state.number + action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
