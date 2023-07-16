import { Map } from "maplibre-gl"
import { GEO_TABS } from "../../geo/model"
import {
  EXPLORE_FILL_LAYER_ID,
  EXPLORE_LINE_LAYER_ID,
  EXPLORE_SELECTION_FILL_LAYER_ID,
  EXPLORE_SELECTION_LINE_LAYER_ID,
  SEARCH_COMMUNE_LAYER_ID,
  SEARCH_LAYER_ID
} from "../model"
import { setLayerVisibility } from "./common"

export const onTabChange = (map: Map, tab: GEO_TABS) => {
  if (tab !== GEO_TABS.EXPLORE) {
    setLayerVisibility(map, SEARCH_LAYER_ID, false)
    setLayerVisibility(map, SEARCH_COMMUNE_LAYER_ID, false)
    setLayerVisibility(map, EXPLORE_FILL_LAYER_ID, true)
    setLayerVisibility(map, EXPLORE_LINE_LAYER_ID, true)
    setLayerVisibility(map, EXPLORE_SELECTION_FILL_LAYER_ID, true)
    setLayerVisibility(map, EXPLORE_SELECTION_LINE_LAYER_ID, true)
  } else {
    setLayerVisibility(map, SEARCH_LAYER_ID, true)
    setLayerVisibility(map, SEARCH_COMMUNE_LAYER_ID, true)
    setLayerVisibility(map, EXPLORE_FILL_LAYER_ID, false)
    setLayerVisibility(map, EXPLORE_LINE_LAYER_ID, false)
    setLayerVisibility(map, EXPLORE_SELECTION_FILL_LAYER_ID, false)
    setLayerVisibility(map, EXPLORE_SELECTION_LINE_LAYER_ID, false)
  }
}
