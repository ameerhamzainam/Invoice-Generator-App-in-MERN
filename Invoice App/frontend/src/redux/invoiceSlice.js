import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { useState } from "react";
import getForwardDate from "../functions/forwardDate";




const invoiceSlice = createSlice({
  name: "invoces",

  initialState: {
    //allInvoice: data,
    filteredInvoice: [],
    
  },
});

export default invoiceSlice;
