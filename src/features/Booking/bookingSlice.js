import { produce } from "immer";
const initialState = {
  banners: [],
  movies: {},
  selectedScheduleDetail: null
};

export const bookingReducer = (state = initialState, { type, payload }) => {
  return produce(state, (draft) => {
    if (type === "SET_BANNER") {
      draft.banners = payload;
    }
    if (type === "SET_MOVIES") {
      draft.movies = payload;
    }
    if(type === "SET_SCHEDULE"){
      draft.selectedScheduleDetail = payload
      console.log(payload);
  }
  });
};
