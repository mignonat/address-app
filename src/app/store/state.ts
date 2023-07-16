import { GEO_TABS } from "../../geo/model"
import { IAppState } from "../model"

export const getDefaultAppState: () => IAppState = () => ({
  isLoadingInitialData: true,
  hasLoadingInitialDataError: false,
  activeTab: GEO_TABS.SEARCH,
  searchResult: [],
  search: "",
  isSearching: false,
  selectedSearchCommune: null,
  selectedExploreCommune: null,
  isLoadingSearchCommune: false,
  isLoadingExploreCommune: false,
  regionByCode: {},
  departementByCode: {},
  selectedRegion: null,
  selectedDepartement: null,
  isLoadingDepartementCommunes: false,
  departementCommuneFeatureCollection: null
})
