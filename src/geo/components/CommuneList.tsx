import ArrowBack from "@mui/icons-material/ArrowBack"
import { Button, Typography } from "@mui/material"
import { DataGrid, GridColDef, frFR } from "@mui/x-data-grid"
import React, { useEffect } from "react"
import { IReducerAction, IRegionByCode } from "../../app/model"
import { ACTIONS } from "../../app/store/actions"
import { FlexBox } from "../../ui/components/FlexBox"
import { LinearLoader } from "../../ui/components/LinearLoader"
import { ICommuneFeature, ICommuneFeatureProperties, IDepartement } from "../model"
import { geoRPO } from "../repository"
import { getRegionByCode } from "../tools/common"

interface ICommuneListProps {
  regionByCode: IRegionByCode
  departement: IDepartement
  communes: ICommuneFeature[]
  selectedCommune: ICommuneFeature | null
  isLoading: boolean
  dispatch: React.Dispatch<IReducerAction>
}

export const CommuneList = React.memo(
  ({ departement, regionByCode, communes, isLoading, selectedCommune, dispatch }: ICommuneListProps) => {
    const goBack = () => dispatch({ type: ACTIONS.SELECT_DEPARTEMENT, selectedDepartement: null })
    useEffect(() => {
      ;(async () => {
        if (departement && communes.length > 0) {
          return
        }
        dispatch({ type: ACTIONS.SET_IS_LOADING_DEPARTEMENT_COMMUNES, isLoadingDepartementCommunes: true })
        try {
          const featureCollection = await geoRPO.getDepartementCommuneFeatures(departement.code)
          dispatch({ type: ACTIONS.SET_DEPARTEMENT_COMMUNES, departementCommuneFeatureCollection: featureCollection })
        } catch (error) {
          console.error(error)
          alert("Impossible de charger les données du département")
          goBack()
        }
      })()
    }, [])
    const columns: Array<GridColDef<ICommuneFeatureProperties>> = [
      {
        field: "nom",
        headerName: "Nom",
        minWidth: 110,
        flex: 2
      },
      {
        field: "population",
        headerName: "Population",
        minWidth: 110,
        flex: 2
      },
      {
        field: "siren",
        headerName: "Siren",
        minWidth: 110,
        flex: 2
      }
    ]
    const region = getRegionByCode(regionByCode, departement.codeRegion)
    if (isLoading) {
      return (
        <FlexBox sx={{ minWidth: "20rem", minHeight: "4rem" }}>
          <LinearLoader text={`Chargement département "${departement.nom}"`} />
        </FlexBox>
      )
    }
    const getFeatureFromCityCode = (citycode: string) => communes.find(c => c.properties.code === citycode)
    return (
      <FlexBox gap=".5rem" vertical ai="start">
        <Button variant="outlined" onClick={goBack} sx={{ textTransform: "none" }} startIcon={<ArrowBack />}>
          Retour aux régions
        </Button>
        <Typography color="textPrimary">
          Région{" "}
          <Typography color="textPrimary" fontWeight="bold" component="span">
            {region.nom}
          </Typography>
        </Typography>
        <FlexBox fullWidth jc="space-between">
          <Typography color="textPrimary">
            Département{" "}
            <Typography color="textPrimary" fontWeight="bold" component="span">
              {departement.nom}
            </Typography>
          </Typography>
          <Typography color="textPrimary">{communes.length} communes</Typography>
        </FlexBox>
        <DataGrid
          rows={communes.map(f => f.properties)}
          columns={columns}
          initialState={{
            sorting: { sortModel: [{ field: "population", sort: "desc" }] }
          }}
          rowHeight={40}
          autoPageSize
          getRowId={({ code }) => code}
          rowSelection
          rowSelectionModel={selectedCommune ? selectedCommune.properties.code : ""}
          onRowSelectionModelChange={newSelection => {
            const selectedCityCode = newSelection[0] as string
            let newSelectedExploreCommune: ICommuneFeature | null = null
            if (!selectedCommune || selectedCityCode !== selectedCommune.properties.code) {
              newSelectedExploreCommune = getFeatureFromCityCode(selectedCityCode) || null
            }
            dispatch({
              type: ACTIONS.SELECT_EXPLORE_COMMUNE,
              selectedExploreCommune: newSelectedExploreCommune
            })
          }}
          localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
          sx={{
            "width": "100%",
            "minHeight": "20rem",
            "& .MuiDataGrid-selectedRowCount": {
              visibility: "hidden"
            }
          }}
        />
        <Typography color="textSecondary" fontSize=".9rem">
          Cliquez sur la carte pour plus d'information
        </Typography>
      </FlexBox>
    )
  }
)
