import { Typography } from "@mui/material"
import { DataGrid, GridColDef, frFR } from "@mui/x-data-grid"
import React from "react"
import { IReducerAction } from "../../app/model"
import { FlexBox } from "../../ui/components/FlexBox"
import { ICommuneFeature, ISearchFeature, ISearchResultFeatureProperties } from "../model"
import { getMunicipalityTypeTranslation, selectSearchResult } from "../tools/common"

interface ISearchResulttProps {
  isLoadingSearchCommune: boolean
  selectedSearchCommune: ICommuneFeature | null
  features: ISearchFeature[]
  dispatch: React.Dispatch<IReducerAction>
}

export const SearchResult = React.memo(
  ({ features, isLoadingSearchCommune, selectedSearchCommune, dispatch }: ISearchResulttProps) => {
    const columns: Array<GridColDef<ISearchResultFeatureProperties>> = [
      {
        field: "city",
        headerName: "Commune",
        minWidth: 150,
        maxWidth: 150,
        flex: 1,
        renderCell: ({ row: { city, postcode } }) => (
          <FlexBox vertical ai="start">
            <Typography color="textPrimary" fontSize=".8rem">
              {city}
            </Typography>
            <Typography color="textSecondary" fontSize=".8rem">
              {postcode}
            </Typography>
          </FlexBox>
        )
      },
      {
        field: "name",
        headerName: "Résultat",
        minWidth: 110,
        flex: 3,
        renderCell: ({ row: { label, name, type } }) =>
          `${label || name} - ${getMunicipalityTypeTranslation(type).toUpperCase()}`
      }
    ]
    const rows = features.map(f => f.properties)
    return (
      <DataGrid
        rows={rows}
        columns={columns}
        rowHeight={40}
        loading={isLoadingSearchCommune}
        autoPageSize
        rowSelection
        rowSelectionModel={selectedSearchCommune ? selectedSearchCommune.properties.searchFeatureId : ""}
        onRowSelectionModelChange={newSelection => {
          const newSelectedId = newSelection[0] as string
          if (selectedSearchCommune && selectedSearchCommune.properties.searchFeatureId === newSelectedId) {
            selectSearchResult("", "", dispatch)
            return
          }
          if (newSelectedId === undefined) {
            return
          }
          const row = rows.find(r => r.id === newSelectedId)
          if (!row) {
            console.error("Missing row, should never happened")
            return
          }
          selectSearchResult(row.citycode, newSelectedId, dispatch)
        }}
        localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
        onRowClick={({ row: { citycode, id } }) => selectSearchResult(citycode, id, dispatch)}
        sx={{
          "width": "100%",
          "minHeight": "20rem",
          "& .MuiDataGrid-selectedRowCount": {
            visibility: "hidden"
          },
          "& .MuiDataGrid-cellContent, & .MuiDataGrid-cell": {
            fontSize: ".8rem"
          }
        }}
      />
    )
  }
)
