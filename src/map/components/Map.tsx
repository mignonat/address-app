import { alpha } from "@mui/material"
import { Map as MapLibreMap } from "maplibre-gl"
import React, { useEffect, useRef } from "react"
import { GlobalContext } from "../../app/store/context"
import { GEO_TABS, ICommuneFeature, ISearchFeature } from "../../geo/model"
import { FlexBox } from "../../ui/components/FlexBox"
import {
  COMMUNE_LAYER_ID,
  COMMUNE_SOURCE_ID,
  EXPLORE_LAYER_ID,
  EXPLORE_SOURCE_ID,
  MAP_ID,
  SEARCH_LAYER_ID,
  SEARCH_SOURCE_ID
} from "../model"
import { createMap, setLayerVisibility, updateMapSource } from "../tools/common"

interface IMapProps {
  searchResult: ISearchFeature[]
  searchCommune: ICommuneFeature | null
  exploreCommune: ICommuneFeature | null
  tab: GEO_TABS
}

const MapFunction = React.memo(({ searchResult, searchCommune, exploreCommune, tab }: IMapProps) => {
  const map = useRef<MapLibreMap | null>(null)
  // first render effect
  useEffect(() => {
    map.current = createMap(MAP_ID)
    return () => (map.current as MapLibreMap).remove()
  }, [])
  // search result change
  useEffect(() => updateMapSource(map.current as MapLibreMap, SEARCH_SOURCE_ID, searchResult), [searchResult])
  // to display search commune change
  useEffect(
    () => updateMapSource(map.current as MapLibreMap, COMMUNE_SOURCE_ID, searchCommune ? [searchCommune] : []),
    [searchCommune]
  )
  // to display explore commune change
  useEffect(
    () => updateMapSource(map.current as MapLibreMap, EXPLORE_SOURCE_ID, exploreCommune ? [exploreCommune] : []),
    [exploreCommune]
  )
  // when tab change
  useEffect(() => {
    if (!map.current) {
      return
    }
    if (tab !== GEO_TABS.EXPLORE) {
      setLayerVisibility(map.current, SEARCH_LAYER_ID, false)
      setLayerVisibility(map.current, COMMUNE_LAYER_ID, false)
      setLayerVisibility(map.current, EXPLORE_LAYER_ID, true)
    } else {
      setLayerVisibility(map.current, SEARCH_LAYER_ID, true)
      setLayerVisibility(map.current, COMMUNE_LAYER_ID, true)
      setLayerVisibility(map.current, EXPLORE_LAYER_ID, false)
    }
  }, [tab])
  return (
    <FlexBox
      id={MAP_ID}
      className="app-map"
      sx={{
        "position": "relative",
        "width": "100%",
        "minWidth": "100%",
        "maxWidth": "100%",
        "height": "100%",
        "minHeight": "100%",
        "maxHeight": "100%",
        "& .maplibregl-ctrl-group": {
          backgroundColor: theme => alpha(theme.palette.background.default, 0.75)
        }
      }}
    />
  )
})

// Comme un react-redux, pour pouvoir utiliser React.memo au dessus et éviter au component de render pour rien
export const Map = () => (
  <GlobalContext.Consumer>
    {([{ searchResult, toDisplaySearchCommune, toDisplayExploreCommune, activeTab }]) => (
      <MapFunction
        searchResult={searchResult}
        searchCommune={toDisplaySearchCommune}
        exploreCommune={toDisplayExploreCommune}
        tab={activeTab}
      />
    )}
  </GlobalContext.Consumer>
)
