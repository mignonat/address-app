import { LngLatLike, Map, Popup } from "maplibre-gl"
import { Root, createRoot } from "react-dom/client"
import { ICommuneFeature } from "../../geo/model"
import { CommuneDetails } from "../components/CommuneDetails"
import { MAP_POPUP_ID } from "../model"

let popup: Popup
let root: Root | undefined

export function createMapPopupIfNeeded(map: Map): void {
  if (!popup) {
    popup = new Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "400"
    })
  }
}

export function closeMapPopup(): void {
  if (!popup) {
    return
  }
  unMountPopupContent()
  popup.remove()
}

export function openMapPopup(map: Map, position: LngLatLike, feature: ICommuneFeature): void {
  if (!popup) {
    console.warn("Map popup is not available")
    return
  }
  popup
    .setLngLat(position)
    .setHTML(`<div id="${MAP_POPUP_ID}" />`)
    .addTo(map)
    .on("close", () => unMountPopupContent())
  if (!root) {
    root = createRoot(document.getElementById(MAP_POPUP_ID) as Element)
  }
  root.render(<CommuneDetails feature={feature} />)
}

function unMountPopupContent(): void {
  if (root) {
    root.unmount()
    root = undefined
  }
}
