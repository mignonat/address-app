import { FeatureCollection, Polygon } from "geojson"
import {
  GEO_TABS,
  ICommuneFeature,
  ICommuneFeatureProperties,
  IDepartement,
  IRegion,
  ISearchFeature
} from "../geo/model"

export interface IAppContext {
  changeFeatures: (features: ISearchFeature[]) => void
}

export interface IRegionByCode {
  [code: string]: IRegion
}

export interface IDepartementByCode {
  [code: string]: IDepartement
}

export interface IAppState {
  isLoadingInitialData: boolean
  hasLoadingInitialDataError: boolean
  regionByCode: IRegionByCode
  departementByCode: IDepartementByCode
  activeTab: GEO_TABS
  isSearching: boolean
  search: string
  searchResult: ISearchFeature[]
  selectedFeatureId: string
  isLoadingSearchCommune: boolean
  isLoadingExploreCommune: boolean
  toDisplaySearchCommune: ICommuneFeature | null
  toDisplayExploreCommune: ICommuneFeature | null
  selectedRegion: IRegion | null
  selectedDepartement: IDepartement | null
  isLoadingDepartementCommunes: boolean
  departementCommuneFeatureCollection: FeatureCollection<Polygon, ICommuneFeatureProperties> | null
}

export interface IReducerAction extends Partial<IAppState> {
  type: string
}
