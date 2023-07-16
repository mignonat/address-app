import { IReducerAction, IRegionByCode } from "../../app/model"
import { ACTIONS } from "../../app/store/actions"
import { ICommuneFeature, IRegion, MUNICIPALITY_TYPES } from "../model"
import { geoRPO } from "../repository"

export const getAllRegions = () => geoRPO.getAllRegions()

export const getAllDepartements = () => geoRPO.getAllDepartements()

export const getMunicipalityTypeTranslation = (type: MUNICIPALITY_TYPES): string => {
  switch (type) {
    case MUNICIPALITY_TYPES.HOUSE_NUMBER: {
      return "Numéro habitation"
    }
    case MUNICIPALITY_TYPES.STREET: {
      return "Rue"
    }
    case MUNICIPALITY_TYPES.LOCALITY: {
      return "Lieux-dit"
    }
    case MUNICIPALITY_TYPES.MUNICIPALITY: {
      return "Ville"
    }
    default: {
      throw Error(`Type ${type} not supported yet`)
    }
  }
}

export const getRegionByCode = (regionByCode: IRegionByCode, regionCode: string): IRegion => {
  const region = Object.values(regionByCode).find(r => r.code === regionCode)
  if (!region) {
    throw Error(`Region not found for code ="${regionCode}"`)
  }
  return region
}

export const selectSearchResult = async (
  cityCode: string,
  searchFeatureId: string,
  dispatch: React.Dispatch<IReducerAction>
) => {
  try {
    if (!cityCode) {
      dispatch({ type: ACTIONS.SELECT_SEARCH_COMMUNE, selectedSearchCommune: null })
      return
    }
    dispatch({ type: ACTIONS.SET_IS_LOADING_SEARCH_COMMUNE, isLoadingSearchCommune: true })
    let toDisplayCommune: ICommuneFeature | null = await geoRPO.getCommuneFeature(cityCode)
    if (!toDisplayCommune) {
      alert("Une erreur est survenue lors de la récupération des données de la ville")
      toDisplayCommune = null
    } else {
      toDisplayCommune.properties.searchFeatureId = searchFeatureId
    }
    dispatch({ type: ACTIONS.SELECT_SEARCH_COMMUNE, selectedSearchCommune: toDisplayCommune })
  } catch (error) {
    console.error(error)
    alert("Une erreur est survenue lors de la récupération des données de la ville")
    dispatch({ type: ACTIONS.SELECT_SEARCH_COMMUNE, selectedSearchCommune: null })
  }
}
