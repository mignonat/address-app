import React from "react"
import { IAppState, IReducerAction } from "../model"
import { getDefaultAppState } from "./state"

export const GlobalContext = React.createContext<[IAppState, React.Dispatch<IReducerAction>]>([
  getDefaultAppState(),
  () => console.info("Empty function")
])
