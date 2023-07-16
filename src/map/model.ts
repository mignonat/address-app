import { Map } from "maplibre-gl"
import { ICommuneFeature, ISearchFeature } from "../geo/model"

export const MAP_ID = "app-map"
export const SEARCH_LOCATION_IMAGE_ID: string = "coordinate-image"
export const SEARCH_SOURCE_ID: string = "search-source"
export const SEARCH_COMMUNE_SOURCE_ID: string = "search-commune-source"
export const EXPLORE_SOURCE_ID: string = "explore-source"
export const EXPLORE_SELECTION_SOURCE_ID: string = "explore-selection-source"
export const SEARCH_LAYER_ID: string = "search-layer"
export const SEARCH_COMMUNE_LAYER_ID: string = "search-commune-layer"
export const EXPLORE_FILL_LAYER_ID: string = "explore-fill-layer"
export const EXPLORE_LINE_LAYER_ID: string = "explore-line-layer"
export const EXPLORE_SELECTION_FILL_LAYER_ID: string = "explore-selection-fill-layer"
export const EXPLORE_SELECTION_LINE_LAYER_ID: string = "explore-selection-line-layer"
export const MARKER_ICON_HEIGHT: number = 40
export const MAP_POPUP_ID: string = "map-commune-popup"

export interface IUpdateSourceParams {
  map: Map
  sourceId: string
  features: ICommuneFeature[] | ISearchFeature[]
  avoidFit?: boolean
  avoidClosePopup?: boolean
}
