import { FeatureCollection, Polygon } from "geojson"
import {
  GEO_TABS,
  ICommuneFeature,
  ICommuneFeatureProperties,
  IDepartement,
  IRegion,
  ISearchFeature
} from "../../geo/model"
import { IAppState, IDepartementByCode, IReducerAction, IRegionByCode } from "../model"
import { ACTIONS } from "./actions"
import { getDefaultAppState } from "./state"

export const appReducer = (state: IAppState = getDefaultAppState(), action: IReducerAction): IAppState => {
  switch (action.type) {
    case ACTIONS.SET_HAS_INIT_DATA_ERROR: {
      return {
        ...state,
        hasLoadingInitialDataError: action.hasLoadingInitialDataError as boolean,
        isLoadingInitialData: false
      }
    }
    case ACTIONS.SET_INITIAL_DATA: {
      return {
        ...state,
        isLoadingInitialData: false,
        regionByCode: action.regionByCode as IRegionByCode,
        departementByCode: action.departementByCode as IDepartementByCode
      }
    }
    case ACTIONS.SET_TAB: {
      return {
        ...state,
        activeTab: action.activeTab as GEO_TABS
      }
    }
    case ACTIONS.SET_SEARCH_RESULT: {
      return {
        ...state,
        searchResult: action.searchResult as ISearchFeature[],
        isSearching: false
      }
    }
    case ACTIONS.SELECT_SEARCH_COMMUNE: {
      return {
        ...state,
        selectedSearchCommune: action.selectedSearchCommune as ICommuneFeature | null,
        isLoadingSearchCommune: false
      }
    }
    case ACTIONS.SELECT_EXPLORE_COMMUNE: {
      return {
        ...state,
        selectedExploreCommune: action.selectedExploreCommune as ICommuneFeature | null,
        isLoadingExploreCommune: false
      }
    }
    case ACTIONS.SET_SEARCH: {
      return {
        ...state,
        search: action.search as string
      }
    }
    case ACTIONS.SET_IS_SEARCHING: {
      return {
        ...state,
        isSearching: action.isSearching as boolean
      }
    }
    case ACTIONS.SET_IS_LOADING_SEARCH_COMMUNE: {
      return {
        ...state,
        isLoadingSearchCommune: action.isLoadingSearchCommune as boolean
      }
    }
    case ACTIONS.SELECT_REGION: {
      return {
        ...state,
        selectedRegion: action.selectedRegion as IRegion | null
      }
    }
    case ACTIONS.SELECT_DEPARTEMENT: {
      return {
        ...state,
        selectedDepartement: action.selectedDepartement as IDepartement | null,
        departementCommuneFeatureCollection: null,
        isLoadingDepartementCommunes: action.selectedDepartement ? true : false
      }
    }
    case ACTIONS.SET_IS_LOADING_DEPARTEMENT_COMMUNES: {
      return {
        ...state,
        isLoadingDepartementCommunes: action.isLoadingDepartementCommunes as boolean
      }
    }
    case ACTIONS.SET_DEPARTEMENT_COMMUNES: {
      return {
        ...state,
        departementCommuneFeatureCollection: action.departementCommuneFeatureCollection as FeatureCollection<
          Polygon,
          ICommuneFeatureProperties
        >,
        isLoadingDepartementCommunes: false
      }
    }
    default:
      return state
  }
}
