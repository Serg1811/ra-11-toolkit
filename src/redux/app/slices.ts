import { createSlice } from "@reduxjs/toolkit";
import { AppSliceState } from "@/redux/app/slicesStateTypes";

const initialState: AppSliceState = {
  name: "",
  films: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setName: (state: AppSliceState, action) => {
      state.name = action.payload;
    },
    addFilm: (state: AppSliceState, action) => {
      state.films.push(action.payload);
    },
    removeFilm: (state: AppSliceState, action) => {
      state.films = state.films.filter(
        (film) => film.imdbID !== action.payload,
      );
    },
    reset: () => initialState,
  },
});

export const { setName, addFilm, removeFilm, reset } = appSlice.actions;
export default appSlice.reducer;
