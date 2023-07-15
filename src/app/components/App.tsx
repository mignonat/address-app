import { useEffect, useReducer } from "react"
import { GeoPanel } from "../../geo/components/GeoPanel"
import { Map } from "../../map/components/Map"
import { FlexBox } from "../../ui/components/FlexBox"
import { ACTIONS } from "../store/actions"
import { GlobalContext } from "../store/context"
import { appReducer } from "../store/reducer"
import { getDefaultAppState } from "../store/state"
import { getInitialData } from "../tools/common"
import "./App.css"

export const App = () => {
  const [state, dispatch] = useReducer(appReducer, getDefaultAppState())
  // load data at startup
  useEffect(() => {
    getInitialData(
      initialData => dispatch({ type: ACTIONS.SET_INITIAL_DATA, ...initialData }),
      () => dispatch({ type: ACTIONS.SET_HAS_INIT_DATA_ERROR, hasLoadingInitialDataError: true })
    )
  }, [])
  return (
    <GlobalContext.Provider value={[state, dispatch]}>
      <FlexBox
        sx={{
          "position": "relative",
          "width": "100%",
          "minWidth": "100%",
          "maxWidth": "100%",
          "height": "100%",
          "minHeight": "100%",
          "maxHeight": "100%",
          "& .app-map": {
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            height: "100%",
            minHeight: "100%",
            maxHeight: "100%"
          }
        }}>
        <Map />
        <GeoPanel sx={{ position: "absolute", top: ".8rem", left: "1rem" }} />
      </FlexBox>
    </GlobalContext.Provider>
  )
}
