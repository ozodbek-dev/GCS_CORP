import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ModalStore } from "./modal.types";

const initialState: ModalStore = {
	type: null,
	data: {},
	isOpen: false,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		onOpen: (state, { payload }: PayloadAction<ModalStore>) => {
			state.isOpen = true;
			state.type = payload.type;
			state.data = payload.data;
		},
		onClose: state => {
			state.isOpen = false;
			state.type = null;
		},
	},
});

export const { onClose, onOpen } = modalSlice.actions;

export default modalSlice.reducer;
