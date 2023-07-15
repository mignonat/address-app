import { IRegionByCode } from "../../app/model"
import { IRegion, MUNICIPALITY_TYPES } from "../model"
import { geoRPO } from "../repository"

export const getAllRegions = () => geoRPO.getAllRegions()

export const getAllDepartements = () => geoRPO.getAllDepartements()

export const getMunicipalityTypeTranslation = (type: MUNICIPALITY_TYPES): string => {
  switch (type) {
    case MUNICIPALITY_TYPES.HOUSE_NUMBER: {
      return "Numéro"
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
