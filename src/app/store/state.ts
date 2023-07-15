import { GEO_TABS } from "../../geo/model"
import { IAppState } from "../model"

export const getDefaultAppState: () => IAppState = () => ({
  isLoadingInitialData: true,
  hasLoadingInitialDataError: false,
  activeTab: GEO_TABS.SEARCH,
  searchResult: [],
  search: "",
  isSearching: false,
  toDisplaySearchCommune: null,
  toDisplayExploreCommune: null,
  isLoadingSearchCommune: false,
  isLoadingExploreCommune: false,
  regionByCode: {},
  departementByCode: {},
  selectedFeatureId: "",
  selectedRegion: null,
  selectedDepartement: null,
  isLoadingDepartementCommunes: false,
  departementCommuneFeatureCollection: null
})
