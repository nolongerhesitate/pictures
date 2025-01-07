"use client";

import { createContext, useContext, useReducer } from "react";

const DialogContext = createContext(null);

const DialogDispatchContext = createContext(null);

export function DialogProvider({ children }) {
  const [state, dispatch] = useReducer(dialogReducer, initialDialog);

  return (
    <DialogContext.Provider value={state}>
      <DialogDispatchContext.Provider value={dispatch}>
        {children}
      </DialogDispatchContext.Provider>
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}

export function useDialogDispatch() {
  return useContext(DialogDispatchContext);
}

export function showYesCancelDialog(content, setDialogResult = null, title = null) {
  return showDialog(content, setDialogResult, title, 1);

}

export function showYesNoCancelDialog(content, setDialogResult = null, title = null) {
  return showDialog(content, setDialogResult, title, 2);
}

const showDialog = (content, setDialogResult = null, title = null, buttonType = null) => {
  let state = {
    isOpen: true,
    content: content,
  };

  title && (state.title = title);
  buttonType && (state.buttonType = buttonType);
  setDialogResult && (state.setDialogResult = setDialogResult);

  return state;
};

export const closeDialog = () => ({ isOpen: false, setDialogResult: () => { }, });

function dialogReducer(dialog, action) {
  return {
    ...dialog,
    isOpen: action.isOpen,
    title: action.title,
    content: action.content,
    // buttonType: 1-Yes&Cancel, 2-Yes&No&Cancel
    buttonType: action.buttonType,
    // Callback function to get the result.
    // return true if Yes is clicked, false if No is clicked, otherwise cancel.
    setDialogResult: action.setDialogResult,
    // result: action.result,  // return true if Yes is clicked, false if No is clicked, otherwise cancel
  };
}

const initialDialog = {
  isOpen: false,
  title: "Warning",
  content: "",
  buttonType: 1,
  setDialogResult: () => { },
  // result: false,
};
