import { alpha } from "@mui/material"
import { FeatureCollection, Polygon } from "geojson"
import { Map as MapLibreMap } from "maplibre-gl"
import React, { useEffect, useRef } from "react"
import { GlobalContext } from "../../app/store/context"
import { GEO_TABS, ICommuneFeature, ICommuneFeatureProperties, ISearchFeature } from "../../geo/model"
import { FlexBox } from "../../ui/components/FlexBox"
import {
  EXPLORE_SELECTION_SOURCE_ID,
  EXPLORE_SOURCE_ID,
  MAP_ID,
  SEARCH_COMMUNE_SOURCE_ID,
  SEARCH_SOURCE_ID
} from "../model"
import { createMap, updateMapSource } from "../tools/common"
import { getCentroid } from "../tools/geo"
import { openMapPopup } from "../tools/popup"
import { onTabChange } from "../tools/tab"

interface IMapProps {
  searchResult: ISearchFeature[]
  searchCommune: ICommuneFeature | null
  selectedExploreCommune: ICommuneFeature | null
  exploreAllCommunes: FeatureCollection<Polygon, ICommuneFeatureProperties> | null
  tab: GEO_TABS
}

const MapFunction = React.memo(
  ({ searchResult, searchCommune, selectedExploreCommune, exploreAllCommunes, tab }: IMapProps) => {
    const mapRef = useRef<MapLibreMap | null>(null)
    // on first render only
    useEffect(() => {
      mapRef.current = createMap(MAP_ID)
      return () => (mapRef.current as MapLibreMap).remove()
    }, [])
    // when search result change
    useEffect(
      () =>
        updateMapSource({
          map: mapRef.current as MapLibreMap,
          sourceId: SEARCH_SOURCE_ID,
          features: searchResult,
          avoidFit: true,
          avoidClosePopup: searchResult.length > 0
        }),
      [searchResult]
    )
    // when selected search commune change
    useEffect(() => {
      updateMapSource({
        map: mapRef.current as MapLibreMap,
        sourceId: SEARCH_COMMUNE_SOURCE_ID,
        features: searchCommune ? [searchCommune] : [],
        avoidClosePopup: searchCommune !== null
      })
      if (searchCommune) {
        // display commune popup
        const searchFeature = searchResult.find(f => f.properties.id === searchCommune.properties.searchFeatureId)
        if (!mapRef.current || !searchFeature) {
          console.error("Missing search feature or map, should never happened")
          return
        }
        openMapPopup(
          mapRef.current,
          { lng: searchFeature.geometry.coordinates[0], lat: searchFeature.geometry.coordinates[1] },
          searchCommune
        )
      }
    }, [searchCommune])
    // when to selected explore commune change
    useEffect(() => {
      updateMapSource({
        map: mapRef.current as MapLibreMap,
        sourceId: EXPLORE_SELECTION_SOURCE_ID,
        features: selectedExploreCommune ? [selectedExploreCommune] : [],
        avoidClosePopup: selectedExploreCommune !== null
      })
      if (selectedExploreCommune) {
        // open popup centered on feature
        if (!mapRef.current) {
          console.error("Missing map, should never happened")
          return
        }
        const centroid = getCentroid(selectedExploreCommune)
        openMapPopup(
          mapRef.current,
          { lng: centroid.geometry.coordinates[0], lat: centroid.geometry.coordinates[1] },
          selectedExploreCommune
        )
      }
    }, [selectedExploreCommune])
    // when explore communes change
    useEffect(
      () =>
        updateMapSource({
          map: mapRef.current as MapLibreMap,
          sourceId: EXPLORE_SOURCE_ID,
          features: exploreAllCommunes ? exploreAllCommunes.features : []
        }),
      [exploreAllCommunes]
    )
    // when tab change
    useEffect(() => {
      if (!mapRef.current) {
        return
      }
      onTabChange(mapRef.current, tab)
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
          },
          "& .maplibregl-canvas-container": {
            width: "100%",
            height: "100%"
          },
          ".maplibregl-popup-content": { backgroundColor: theme => alpha(theme.palette.background.default, 0.9) }
        }}
      />
    )
  }
)

// Comme un react-redux, pour pouvoir utiliser React.memo au dessus et éviter au component de render pour rien
export const Map = () => (
  <GlobalContext.Consumer>
    {([
      {
        searchResult,
        selectedSearchCommune: toDisplaySearchCommune,
        selectedExploreCommune,
        departementCommuneFeatureCollection,
        activeTab
      }
    ]) => (
      <MapFunction
        searchResult={searchResult}
        searchCommune={toDisplaySearchCommune}
        selectedExploreCommune={selectedExploreCommune}
        exploreAllCommunes={departementCommuneFeatureCollection}
        tab={activeTab}
      />
    )}
  </GlobalContext.Consumer>
)
