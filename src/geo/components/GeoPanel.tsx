import { Tab, Tabs, Typography, alpha } from "@mui/material"
import React from "react"
import { IReducerAction } from "../../app/model"
import { ACTIONS } from "../../app/store/actions"
import { GlobalContext } from "../../app/store/context"
import { FlexBox } from "../../ui/components/FlexBox"
import { LinearLoader } from "../../ui/components/LinearLoader"
import { GEO_TABS } from "../model"
import { ExplorePanel } from "./ExplorePanel"
import { SearchPanel } from "./SearchPanel"

interface IGeoPanelConnectProps {
  isLoadingInitialData: boolean
  hasInitialDataError: boolean
  activeTab: GEO_TABS
  dispatch: React.Dispatch<IReducerAction>
}

interface IGeoPanelProps {
  sx?: any
}

const GeoPanelFunction = React.memo(
  ({ sx, activeTab, isLoadingInitialData, hasInitialDataError, dispatch }: IGeoPanelProps & IGeoPanelConnectProps) => (
    <FlexBox
      vertical
      jc="start"
      sx={{
        maxHeight: "calc(100% - 3.5rem)",
        backgroundColor: theme => alpha(theme.palette.background.default, 0.75),
        borderRadius: ".25rem",
        ...sx
      }}>
      {hasInitialDataError ? (
        <Typography color="error" sx={{ p: "1rem" }}>
          Une erreur est survenue, des données requises au bon fonctionnement sont introuvables. Veuillez rafraîchir la
          page.
        </Typography>
      ) : isLoadingInitialData ? (
        <LinearLoader text="Chargement des données..." />
      ) : (
        <>
          <Tabs
            value={activeTab}
            onChange={(_event, newTab) => dispatch({ type: ACTIONS.SET_TAB, activeTab: newTab })}
            sx={{
              "& .MuiButtonBase-root": {
                textTransform: "initial",
                fontSize: "1.1rem"
              }
            }}>
            <Tab label="Rechercher" value={0} />
            <Tab label="Explorer" value={1} />
          </Tabs>
          {activeTab === GEO_TABS.SEARCH ? <SearchPanel /> : <ExplorePanel />}
        </>
      )}
    </FlexBox>
  )
)

export const GeoPanel = React.memo(({ sx }: IGeoPanelProps) => (
  <GlobalContext.Consumer>
    {([{ activeTab, isLoadingInitialData, hasLoadingInitialDataError }, dispatch]) => (
      <GeoPanelFunction
        dispatch={dispatch}
        activeTab={activeTab}
        isLoadingInitialData={isLoadingInitialData}
        hasInitialDataError={hasLoadingInitialDataError}
        sx={sx}
      />
    )}
  </GlobalContext.Consumer>
))
