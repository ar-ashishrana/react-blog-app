import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkTheme: true,
    lightTheme: false,
    primaryColor: "text-gray-100",
    secondaryColor: "text-gray-300",
    primaryBg: "bg-gray-900",
    secondaryBg: "bg-gray-800",
    textMuted: "text-gray-500"
}
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        dTheme: (state)=>{
            state.darkTheme = true;
            state.lightTheme = false;
            if(state.darkTheme){
                state.primaryColor = "text-gray-100",
                state.secondaryColor = "text-gray-300",
                state.primaryBg = "bg-gray-900",
                state.secondaryBg = "bg-gray-800",
                state.textMuted = "text-gray-500"
            }
        },
        lTheme: (state) => {
            state.darkTheme = false;
            state.lightTheme = true;
            if(state.lightTheme){
                state.primaryColor = "text-gray-900",
                state.secondaryColor = "text-gray-800",
                state.primaryBg = "bg-gray-200",
                state.secondaryBg = "bg-gray-300"
            }
        }
    }
});

export const { dTheme, lTheme } = themeSlice.actions;
export default themeSlice.reducer;