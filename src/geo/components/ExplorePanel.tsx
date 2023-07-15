import { Box, Typography } from "@mui/material"
import React from "react"
import { IDepartementByCode, IReducerAction, IRegionByCode } from "../../app/model"
import { GlobalContext } from "../../app/store/context"
import { FlexBox } from "../../ui/components/FlexBox"
import { ICommuneFeatureProperties, IDepartement, IRegion } from "../model"
import { CommuneList } from "./CommuneList"
import { RegionAccordion } from "./RegionAccordion"

interface IExplorePanelProps {
  regionByCode: IRegionByCode
  departementByCode: IDepartementByCode
  selectedRegion: IRegion | null
  selectedDepartement: IDepartement | null
  communes: ICommuneFeatureProperties[]
  dispatch: React.Dispatch<IReducerAction>
}

const ExplorePanelFunction = React.memo(
  ({
    regionByCode,
    departementByCode,
    selectedRegion,
    selectedDepartement,
    communes,
    dispatch
  }: IExplorePanelProps) => {
    const allDepartements = Object.values(departementByCode)
    return (
      <FlexBox
        ai="start"
        vertical
        gap
        sx={{
          p: "1rem",
          overflow: "auto",
          height: "100%",
          maxHeight: "100%",
          minHeight: "100%"
        }}>
        <Typography color="textPrimary">
          {selectedDepartement ? `Département "${selectedDepartement.nom}"` : "Régions"}
        </Typography>
        <Box sx={{ overflow: "auto" }}>
          {selectedDepartement ? (
            <CommuneList
              regionByCode={regionByCode}
              departement={selectedDepartement}
              communes={communes}
              dispatch={dispatch}
            />
          ) : (
            Object.values(regionByCode).map(r => (
              <RegionAccordion
                region={r}
                selectedRegion={selectedRegion}
                departements={allDepartements.filter(d => d.codeRegion === r.code)}
                key={r.code}
                dispatch={dispatch}
              />
            ))
          )}
        </Box>
      </FlexBox>
    )
  }
)

export const ExplorePanel = () => (
  <GlobalContext.Consumer>
    {([
      { regionByCode, departementByCode, selectedRegion, selectedDepartement, departementCommuneFeatureCollection },
      dispatch
    ]) => (
      <ExplorePanelFunction
        regionByCode={regionByCode}
        departementByCode={departementByCode}
        dispatch={dispatch}
        selectedRegion={selectedRegion}
        selectedDepartement={selectedDepartement}
        communes={
          departementCommuneFeatureCollection ? departementCommuneFeatureCollection.features.map(f => f.properties) : []
        }
      />
    )}
  </GlobalContext.Consumer>
)
