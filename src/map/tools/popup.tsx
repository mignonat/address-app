import { LngLatLike, Map, Popup } from "maplibre-gl"
import { Root, createRoot } from "react-dom/client"
import { ICommuneFeature } from "../../geo/model"
import { CommuneDetails } from "../components/CommuneDetails"
import { MAP_POPUP_ID } from "../model"

let popup: Popup
let popupIndex = 0
let root: Root | undefined

export function createMapPopupIfNeeded(): void {
  if (!popup) {
    popup = new Popup({
      closeButton: false,
      closeOnClick: false,
      maxWidth: "400"
    })
  }
}

export function closeMapPopup(): void {
  unMountPopupContent()
  if (!popup) {
    return
  }
  popup.remove()
}

export function openMapPopup(map: Map, position: LngLatLike, feature: ICommuneFeature): void {
  if (!popup) {
    createMapPopupIfNeeded()
  }
  const POPUP_ID = `${MAP_POPUP_ID}-${++popupIndex}`
  popup
    .setLngLat(position)
    .setHTML(`<div id="${POPUP_ID}" />`)
    .addTo(map)
    .on("close", () => unMountPopupContent())
  if (root) {
    root.unmount()
    root = undefined
  }
  root = createRoot(document.getElementById(POPUP_ID) as Element)
  root.render(<CommuneDetails feature={feature} />)
}

function unMountPopupContent(): void {
  if (root) {
    root.unmount()
    root = undefined
  }
}
