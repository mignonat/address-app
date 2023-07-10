import { geoRPO } from "../repository"

it("First region departements count should be 8", async () => {
  const regions = await geoRPO.getAllRegions()
  const firstRegion = regions[0]
  const regionDepartements = await geoRPO.getDepartementsByRegion(firstRegion.code)
  expect(regionDepartements.length).toEqual(8)
})

it("First departement of first region has correct attributes", async () => {
  const regions = await geoRPO.getAllRegions()
  const firstRegion = regions[0]
  const regionDepartements = await geoRPO.getDepartementsByRegion(firstRegion.code)
  const firstDepartement = regionDepartements[0]
  expect(firstDepartement).toBeDefined()
  expect(firstDepartement.code).toEqual("75")
  expect(firstDepartement.nom).toEqual("Paris")
  expect(firstDepartement.codeRegion).toEqual(firstRegion.code)
})

it("Last departement of first region has correct attributes", async () => {
  const regions = await geoRPO.getAllRegions()
  const firstRegion = regions[0]
  const regionDepartements = await geoRPO.getDepartementsByRegion(firstRegion.code)
  const lastDepartement = regionDepartements.pop()
  if (!lastDepartement) {
    throw Error("Missing last departement")
  }
  expect(lastDepartement.code).toEqual("95")
  expect(lastDepartement.nom).toEqual("Val-d'Oise")
  expect(lastDepartement.codeRegion).toEqual(firstRegion.code)
})
