import { GeoJSONSource, LngLat, Map, MapOptions, NavigationControl, ScaleControl } from "maplibre-gl"
import { ICommuneFeature } from "../../geo/model"
import markerRegular from "../../resources/images/pin-regular.png"
import {
  EXPLORE_FILL_LAYER_ID,
  EXPLORE_LINE_LAYER_ID,
  EXPLORE_SELECTION_FILL_LAYER_ID,
  EXPLORE_SELECTION_LINE_LAYER_ID,
  EXPLORE_SELECTION_SOURCE_ID,
  EXPLORE_SOURCE_ID,
  IUpdateSourceParams,
  MARKER_ICON_HEIGHT,
  SEARCH_COMMUNE_LAYER_ID,
  SEARCH_COMMUNE_SOURCE_ID,
  SEARCH_LAYER_ID,
  SEARCH_LOCATION_IMAGE_ID,
  SEARCH_SOURCE_ID
} from "../model"
import { fitFeaturesOnMap } from "./geo"
import { closeMapPopup, openMapPopup } from "./popup"

export const createMap = (containerId: string): Map => {
  const container = document.getElementById(containerId)
  if (!container) {
    throw Error(`Unable to get container "${containerId}"`)
  }
  container.style.position = "relative"
  const options: MapOptions = {
    container,
    maxZoom: 23,
    renderWorldCopies: true,
    trackResize: true,
    center: [2.358895047134297, 46.95496951339453],
    zoom: 5.652635189029413,
    style: "https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
  }
  const map = new Map(options)
  ;(window as any).mp = map
  map.addControl(new NavigationControl())
  map.addControl(new ScaleControl({ unit: "metric" }))
  const onStyleLoaded = () => {
    if (map.isStyleLoaded()) {
      map.addSource(SEARCH_COMMUNE_SOURCE_ID, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        },
        maxzoom: 24
      })
      map.addLayer({
        id: SEARCH_COMMUNE_LAYER_ID,
        type: "fill",
        source: SEARCH_COMMUNE_SOURCE_ID,
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.5
        }
      })
      map.addSource(SEARCH_SOURCE_ID, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        },
        maxzoom: 24
      })
      map.addLayer({
        id: SEARCH_LAYER_ID,
        type: "symbol",
        source: SEARCH_SOURCE_ID,
        paint: {
          "text-color": "#000000"
        },
        layout: {
          "icon-image": SEARCH_LOCATION_IMAGE_ID,
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "icon-offset": [0, -MARKER_ICON_HEIGHT / 2],
          "text-field": ["get", "name"],
          "text-anchor": "bottom",
          "text-offset": [0, 1]
        }
      })
      map.addSource(EXPLORE_SOURCE_ID, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        },
        maxzoom: 24
      })
      map.addLayer({
        id: EXPLORE_FILL_LAYER_ID,
        type: "fill",
        source: EXPLORE_SOURCE_ID,
        paint: {
          "fill-color": "#ff0000",
          "fill-opacity": 0.5
        }
      })
      map.addLayer({
        id: EXPLORE_LINE_LAYER_ID,
        type: "line",
        source: EXPLORE_SOURCE_ID,
        paint: {
          "line-color": "#020202",
          "line-width": 1
        }
      })
      map.addSource(EXPLORE_SELECTION_SOURCE_ID, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        },
        maxzoom: 24
      })
      map.addLayer({
        id: EXPLORE_SELECTION_FILL_LAYER_ID,
        type: "fill",
        source: EXPLORE_SELECTION_SOURCE_ID,
        paint: {
          "fill-color": "#dbff05",
          "fill-opacity": 0.5
        }
      })
      map.addLayer({
        id: EXPLORE_SELECTION_LINE_LAYER_ID,
        type: "line",
        source: EXPLORE_SELECTION_SOURCE_ID,
        paint: {
          "line-color": "#020202",
          "line-width": 3
        }
      })
    } else {
      setTimeout(() => onStyleLoaded(), 200)
    }
  }
  loadMapImage(map, SEARCH_LOCATION_IMAGE_ID, markerRegular).then(() => onStyleLoaded())
  const onMouseClick = (lngLat: LngLat, features: ICommuneFeature[] | undefined) => {
    // Populate the popup and set its coordinates based on the feature.
    if (!features || features.length === 0) {
      closeMapPopup()
      return
    }
    openMapPopup(map, lngLat, features[0] as any)
  }
  map.on("click", () => closeMapPopup())
  map.on("click", SEARCH_COMMUNE_LAYER_ID, event => onMouseClick(event.lngLat, event.features as any))
  map.on("click", EXPLORE_FILL_LAYER_ID, event => onMouseClick(event.lngLat, event.features as any))
  return map
}

export const setLayerVisibility = (map: Map, layerId: string, isVisible: boolean): void => {
  if (!map.getLayer(layerId)) {
    return
  }
  const visibility = isVisible ? "visible" : "none"
  if (map.getLayoutProperty(layerId, "visibility") !== visibility) {
    map.setLayoutProperty(layerId, "visibility", visibility)
  }
}

export const updateMapSource = ({ map, features, sourceId, avoidClosePopup, avoidFit }: IUpdateSourceParams): void => {
  if (!avoidClosePopup) {
    closeMapPopup()
  }
  const source: GeoJSONSource = map.getSource(sourceId) as GeoJSONSource
  if (!source) {
    return
  }
  source.setData({
    type: "FeatureCollection",
    features
  })
  if (features.length > 0 && !avoidFit) {
    fitFeaturesOnMap(map, features)
  }
}

const loadMapImage = (map: Map, imageName: string, iconUrl: string): Promise<void> =>
  new Promise<void>(resolve => {
    try {
      map.loadImage(iconUrl, (error, image: any) => {
        if (error) {
          console.error("An error occured while loading add coordinate icon", error)
          return resolve()
        }
        map.addImage(imageName, image)
        resolve()
      })
    } catch (error) {
      console.error("An error occured while loading add coordinate icon", error)
      return resolve()
    }
  })
