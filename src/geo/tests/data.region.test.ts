import { geoRPO } from "../repository"

it("Regions count should be 18", async () => {
  const regions = await geoRPO.getAllRegions()
  expect(regions.length).toEqual(18)
})

it("First region has correct attributes, and order doesn't changed", async () => {
  const regions = await geoRPO.getAllRegions()
  const firstRegion = regions[0]
  expect(firstRegion).toBeDefined()
  expect(firstRegion.code).toEqual("11")
  expect(firstRegion.nom).toEqual("Île-de-France")
  const lastRegion = regions.pop()
  if (!lastRegion) {
    throw Error("Missing last region")
  }
  expect(lastRegion.code).toEqual("06")
  expect(lastRegion.nom).toEqual("Mayotte")
  // TODO test all departements has been populated
})
