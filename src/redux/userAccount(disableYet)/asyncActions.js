import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../utils/axios";
import axios from "axios";


export const fethUserData = createAsyncThunk('userData/fethUserData', async () => {
  const { data } = await axios.get(`https://6316f07e82797be77feea866.mockapi.io/user` )
  return data;
})

