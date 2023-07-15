import { DataGrid, GridColDef, frFR } from "@mui/x-data-grid"
import React from "react"
import { IReducerAction } from "../../app/model"
import { ACTIONS } from "../../app/store/actions"
import { ICommuneFeature, ISearchFeature, ISearchResultFeatureProperties } from "../model"
import { geoRPO } from "../repository"
import { getMunicipalityTypeTranslation } from "../tools/common"

interface ISearchResulttProps {
  selectedFeatureId: string
  features: ISearchFeature[]
  dispatch: React.Dispatch<IReducerAction>
}

export const SearchResult = React.memo(({ features, selectedFeatureId, dispatch }: ISearchResulttProps) => {
  const columns: Array<GridColDef<ISearchResultFeatureProperties>> = [
    {
      field: "type",
      headerName: "Type",
      minWidth: 110,
      maxWidth: 250,
      flex: 2,
      renderCell: ({ row: { type } }) => getMunicipalityTypeTranslation(type)
    },
    {
      field: "name",
      headerName: "Nom",
      minWidth: 110,
      flex: 2,
      renderCell: ({ row: { label, name } }) => label || name
    },
    {
      field: "postcode",
      headerName: "Code postal",
      minWidth: 110,
      flex: 2
    },
    {
      field: "city",
      headerName: "Ville",
      minWidth: 110,
      flex: 2
    }
  ]
  const rows = features.map(f => f.properties)
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        sorting: { sortModel: [{ field: "type", sort: "asc" }] }
      }}
      rowHeight={40}
      autoPageSize
      rowSelection
      rowSelectionModel={selectedFeatureId}
      onRowSelectionModelChange={newSelection =>
        dispatch({ type: ACTIONS.SELECT_SEARCH_FEATURE, selectedFeatureId: (newSelection[0] as string) || "" })
      }
      localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
      onRowClick={async ({ row: { citycode } }) => {
        try {
          dispatch({ type: ACTIONS.SET_IS_LOADING_SEARCH_COMMUNE, isLoadingSearchCommune: true })
          let toDisplayCommune: ICommuneFeature | null = await geoRPO.getCommuneFeature(citycode)
          if (!toDisplayCommune) {
            alert("Une erreur est survenue lors de la récupération des données de la ville")
            toDisplayCommune = null
          }
          dispatch({ type: ACTIONS.SET_SEARCH_COMMUNE_TO_DISPLAY, toDisplaySearchCommune: toDisplayCommune })
        } catch (error) {
          console.error(error)
          alert("Une erreur est survenue lors de la récupération des données de la ville")
          dispatch({ type: ACTIONS.SET_SEARCH_COMMUNE_TO_DISPLAY, toDisplaySearchCommune: null })
        }
      }}
      sx={{
        "width": "100%",
        "minHeight": "20rem",
        "& .MuiDataGrid-selectedRowCount": {
          visibility: "hidden"
        }
      }}
    />
  )
})
