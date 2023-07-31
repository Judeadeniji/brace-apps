"esversion: 11";
"use this 🖕";

import { store } from "@app/store";


export const GET = (req) => {
  //console.log(req);
};

export const POST = async (req) => {
  const formData = await req.formData();
  store.dispatch({
    type: 'SET',
    value: Object.fromEntries(formData)
  });
};

export const PUT = (req) => {
  
};

export const PATCH = (req) => {
  
};

export const DELETE = (req) => {
  
};