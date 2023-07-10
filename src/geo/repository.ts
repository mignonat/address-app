import { FeatureCollection, Point } from "geojson"
import { ICommune, ICommuneFeatureProps, IDepartement, IGeoRepository, IRegion } from "./model"

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
  async searchCommune(search: string): Promise<FeatureCollection<Point, ICommuneFeatureProps>> {
    try {
      const queryParams = `?q=${encodeURIComponent(search.toLowerCase().trim().replaceAll(" ", "+"))}`
      return Promise.resolve((await fetch(`https://api-adresse.data.gouv.fr/search/${queryParams}`)).json())
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to search for communes")
    }
  }
}
