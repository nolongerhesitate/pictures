"use client";

import { createContext, useContext, useReducer } from "react";
import { SetUseState } from "../types";

const DialogContext = createContext<IDialog | null>(null);

const DialogDispatchContext = createContext<React.Dispatch<IDialog>>(null);

export function DialogProvider({ children }) {
  const [state, dispatch] = useReducer(dialogReducer, initialDialog);

  return (
    <DialogContext.Provider value={state} >
      <DialogDispatchContext.Provider value={dispatch}>
        {children}
      </DialogDispatchContext.Provider>
    </DialogContext.Provider>
  );
}

export function useDialog(): IDialog {
  return useContext(DialogContext);
}

export function useDialogDispatch() {
  return useContext(DialogDispatchContext);
}

export function showYesCancelDialog(content: string, setDialogResult: SetUseState<any> = null, title: string = null): IDialog {
  return showDialog(content, setDialogResult, title, ButtonType.YesCancel);
}

export function showYesNoCancelDialog(content: string, setDialogResult: SetUseState<any> = null, title: string = null): IDialog {
  return showDialog(content, setDialogResult, title, ButtonType.YesNoCancel);
}

const showDialog = (content: string, setDialogResult: SetUseState<any> = null, title: string = null, buttonType: ButtonType = null): IDialog => {
  let state: IDialog = {
    isOpen: true,
    content: content,
    title: title ?? "",
    buttonType: buttonType ?? 1,
    setDialogResult: setDialogResult
  };

  return state;
};

export const closeDialog = () => {
  const state: IDialog = {
    isOpen: false,
    title: "",
    content: "",
    buttonType: ButtonType.YesCancel,
    setDialogResult: () => { }
  };
  return state;
};

function dialogReducer(dialog: IDialog, action: IDialog) {
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

enum ButtonType {
  YesCancel = 1,
  YesNoCancel = 2,
}

interface IDialog {
  isOpen: boolean,
  title: string,
  content: string,
  buttonType: ButtonType,
  setDialogResult: React.Dispatch<React.SetStateAction<any>>
}


const initialDialog: IDialog = {
  isOpen: false,
  title: "Warning",
  content: "",
  buttonType: ButtonType.YesCancel,
  setDialogResult: () => { },
};
