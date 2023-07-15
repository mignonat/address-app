import { Feature, FeatureCollection, Point, Polygon } from "geojson"
import {
  ICommuneFeature,
  ICommuneFeatureProperties,
  IDepartement,
  IGeoRepository,
  IRegion,
  ISearchResultFeatureProperties
} from "./model"

// Here I assume methods parameters have already been checked

// http caching should be better but it's better than nothing...
const cachedCommuneFeatureByCode: { [code: string]: ICommuneFeature } = {}

export const geoRPO: IGeoRepository = {
  async getAllRegions(): Promise<IRegion[]> {
    try {
      return Promise.resolve((await fetch("https://geo.api.gouv.fr/regions")).json())
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to fetch all regions")
    }
  },
  async getAllDepartements(): Promise<IDepartement[]> {
    try {
      return Promise.resolve((await fetch("https://geo.api.gouv.fr/departements")).json())
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to fetch all departements")
    }
  },
  async searchAddress(search: string): Promise<FeatureCollection<Point, ISearchResultFeatureProperties>> {
    try {
      const queryParams = `?q=${encodeURIComponent(search.toLowerCase().trim().replaceAll(" ", "+"))}`
      const featureCollection: FeatureCollection<Point, ISearchResultFeatureProperties> = await (
        await fetch(`https://api-adresse.data.gouv.fr/search/${queryParams}&limit=100`)
      ).json()
      return Promise.resolve(featureCollection)
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to search for communes")
    }
  },
  async getCommuneFeature(cityCode: string): Promise<Feature<Polygon, ICommuneFeatureProperties>> {
    try {
      let feature = cachedCommuneFeatureByCode[cityCode]
      if (feature) {
        return Promise.resolve(feature)
      }
      feature = await (
        await fetch(`https://geo.api.gouv.fr/communes/${cityCode}?format=geojson&geometry=contour`)
      ).json()
      cachedCommuneFeatureByCode[cityCode] = feature
      return Promise.resolve(feature)
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to get commune")
    }
  },
  async getDepartementCommuneFeatures(
    departementCode: string
  ): Promise<FeatureCollection<Polygon, ICommuneFeatureProperties>> {
    try {
      return Promise.resolve(
        await (
          await fetch(
            `https://geo.api.gouv.fr/departements/${departementCode}/communes?format=geojson&geometry=contour`
          )
        ).json()
      )
    } catch (error) {
      console.error(error)
      return Promise.reject("Unable to get commune")
    }
  }
}
