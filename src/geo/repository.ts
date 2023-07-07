import { FeatureCollection, Point } from "geojson"
import { IAddressSearchParams, ICommune, ICommuneFeatureProps, IDepartement, IGeoRepository, IRegion } from "./model"

// Here I assume that methods parameters have been checked by services methods before

export const geoRPO: IGeoRepository = {
  async getAllRegions(): Promise<IRegion[]> {
    try {
      return Promise.resolve((await fetch("https://geo.api.gouv.fr/regions")).json())
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to fetch all regions")
    }
  },
  async getDepartementsByRegion(regionId: string): Promise<IDepartement[]> {
    try {
      return Promise.resolve((await fetch(`https://geo.api.gouv.fr/regions/${regionId}/departements`)).json())
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to fetch region's departements")
    }
  },
  async getCommunesByDepartement(departementId: string): Promise<ICommune[]> {
    try {
      return Promise.resolve((await fetch(`https://geo.api.gouv.fr/departements/${departementId}/communes`)).json())
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to fetch departement's communes")
    }
  },
  async searchCommune(params: IAddressSearchParams): Promise<FeatureCollection<Point, ICommuneFeatureProps>> {
    try {
      let queryParams = ""
      if (params.search) {
        queryParams = `?q=${encodeURIComponent(params.search.toLowerCase().trim().replaceAll(" ", "+"))}`
      }
      if (params.postalCode) {
        queryParams += `${!queryParams ? "?" : "&"}postcode=${encodeURIComponent(
          params.postalCode.toLowerCase().replaceAll(" ", "+").trim()
        )}`
      }
      return Promise.resolve((await fetch(`https://api-adresse.data.gouv.fr/search/${queryParams}`)).json())
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to search for communes")
    }
  }
}
