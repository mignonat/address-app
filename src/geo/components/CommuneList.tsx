import { Button, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { IReducerAction, IRegionByCode } from "../../app/model"
import { ACTIONS } from "../../app/store/actions"
import { FlexBox } from "../../ui/components/FlexBox"
import { ICommuneFeatureProperties, IDepartement } from "../model"
import { geoRPO } from "../repository"
import { getRegionByCode } from "../tools/common"

interface ICommuneListProps {
  regionByCode: IRegionByCode
  departement: IDepartement
  communes: ICommuneFeatureProperties[]
  dispatch: React.Dispatch<IReducerAction>
}

export const CommuneList = React.memo(({ departement, regionByCode, communes, dispatch }: ICommuneListProps) => {
  const goBack = () => dispatch({ type: ACTIONS.SELECT_DEPARTEMENT, selectedDepartement: null })
  useEffect(() => {
    ;(async () => {
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
  const region = getRegionByCode(regionByCode, departement.codeRegion)
  return (
    <FlexBox vertical>
      <Button onClick={goBack}>Retour</Button>
      <FlexBox gap ai="start">
        <Typography color="textPrimary">Région</Typography>
        <Typography color="textSecondary">{region.nom}</Typography>
      </FlexBox>
      <FlexBox gap ai="start">
        <Typography color="textPrimary">Département</Typography>
        <Typography color="textSecondary">{departement.nom}</Typography>
      </FlexBox>
      <Typography color="textPrimary">Communes</Typography>
      {communes.length}
      TODO: - display commune list - display all commune on the map (+ selected commune in an other color)
    </FlexBox>
  )
})
