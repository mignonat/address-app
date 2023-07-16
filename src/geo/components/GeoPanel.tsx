import Explore from "@mui/icons-material/Explore"
import Search from "@mui/icons-material/Search"
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
  isLoadingDepartementCommunes: boolean
  activeTab: GEO_TABS
  dispatch: React.Dispatch<IReducerAction>
}

interface IGeoPanelProps {
  sx?: any
}

const GeoPanelFunction = React.memo(
  ({
    sx,
    activeTab,
    isLoadingInitialData,
    hasInitialDataError,
    isLoadingDepartementCommunes,
    dispatch
  }: IGeoPanelProps & IGeoPanelConnectProps) => (
    <FlexBox
      vertical
      jc="start"
      sx={{
        "minWidth": "25rem",
        "maxWidth": "calc(100% - 2rem)",
        "maxHeight": "calc(100% - 3.5rem)",
        "backgroundColor": theme => alpha(theme.palette.background.default, 0.9),
        "borderRadius": ".25rem",
        "& > *": {
          width: "100%"
        },
        ...sx
      }}>
      {hasInitialDataError ? (
        <Typography color="error" sx={{ p: "1rem" }}>
          Une erreur est survenue, des données requises au bon fonctionnement sont introuvables. Veuillez rafraîchir la
          page.
        </Typography>
      ) : isLoadingInitialData ? (
        <LinearLoader text="Chargement des données..." sx={{ p: "2rem" }} />
      ) : (
        <>
          <Tabs
            value={activeTab}
            centered
            onChange={(_event, newTab) => dispatch({ type: ACTIONS.SET_TAB, activeTab: newTab })}
            sx={{
              "minHeight": "4rem",
              "& .MuiButtonBase-root": {
                textTransform: "initial",
                fontSize: "1.1rem"
              }
            }}>
            <Tab
              label="Rechercher"
              disabled={isLoadingDepartementCommunes}
              value={0}
              icon={<Search />}
              iconPosition="start"
            />
            <Tab
              label="Explorer"
              disabled={isLoadingDepartementCommunes}
              value={1}
              icon={<Explore />}
              iconPosition="start"
            />
          </Tabs>
          {activeTab === GEO_TABS.SEARCH ? <SearchPanel /> : <ExplorePanel />}
        </>
      )}
    </FlexBox>
  )
)

export const GeoPanel = React.memo(({ sx }: IGeoPanelProps) => (
  <GlobalContext.Consumer>
    {([{ activeTab, isLoadingInitialData, hasLoadingInitialDataError, isLoadingDepartementCommunes }, dispatch]) => (
      <GeoPanelFunction
        dispatch={dispatch}
        activeTab={activeTab}
        isLoadingInitialData={isLoadingInitialData}
        hasInitialDataError={hasLoadingInitialDataError}
        isLoadingDepartementCommunes={isLoadingDepartementCommunes}
        sx={sx}
      />
    )}
  </GlobalContext.Consumer>
))
