import { getAllDepartements, getAllRegions } from "../../geo/tools/common"
import { IAppState } from "../model"

export const getInitialData = async (onSuccess: (data: Partial<IAppState>) => any, onError: () => any) => {
  try {
    const initialData: Partial<IAppState> = {}
    const promises = [
      getAllRegions().then(regions => {
        initialData.regionByCode = {}
        for (const region of regions) {
          initialData.regionByCode[region.code] = region
        }
      }),
      getAllDepartements().then(departements => {
        initialData.departementByCode = {}
        for (const departement of departements) {
          initialData.departementByCode[departement.code] = departement
        }
      })
    ]
    const result = await Promise.allSettled(promises)
    if (result.find(r => r.status === "rejected")) {
      console.error("A promise reject")
      onError()
      return
    }
    onSuccess(initialData)
  } catch (error) {
    console.error(error)
    onError()
  }
}
