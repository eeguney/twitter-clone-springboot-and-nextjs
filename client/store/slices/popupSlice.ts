import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  centerTopPopup: null,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    setCenterTopPopup: (state, action: PayloadAction<{text: string, type: string}>) => {
      state.centerTopPopup = action.payload;
    },
    removeCenterTopPopup: (state) => {
      state.centerTopPopup = null;
    },
  },
});

export const { setCenterTopPopup, removeCenterTopPopup } =
popupSlice.actions;

export default popupSlice.reducer;
