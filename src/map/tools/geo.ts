import { Feature, Point, Polygon } from "geojson"
import { Map } from "maplibre-gl"

let turf: typeof import("@turf/turf")

// Async load of turf lib, in order to lower startup bundle load time
import(/* webpackChunkName: "turf" */ "@turf/turf")
  .then(importedFile => {
    turf = importedFile
  })
  .catch(error => {
    console.error("An error occurred while async loading turf", error)
  })

export const fitFeaturesOnMap = (map: Map, features: Feature[]): void => {
  if (!features || features.length === 0) {
    return
  }
  const bbox = turf.bbox(turf.combine(turf.featureCollection(features) as any))
  map.fitBounds(
    [
      { lng: bbox[0], lat: bbox[1] },
      { lng: bbox[2], lat: bbox[3] }
    ],
    {
      padding: { top: 100, bottom: 100, left: 100, right: 100 },
      maxZoom: 12
    }
  )
}

export const getCentroid = (feature: Feature<Polygon>): Feature<Point> => turf.centroid(feature)
