import { geoRPO } from "../repository"

it("Get all departements count should be 8", async () => {
  const allDepartements = await geoRPO.getAllDepartements()
  expect(allDepartements.length).toEqual(108)
})

it("First departement has correct attributes", async () => {
  const regionDepartements = await geoRPO.getAllDepartements()
  const departement = regionDepartements.find(d => d.code === "75")
  if (!departement) {
    throw Error("Missing departement")
  }
  expect(departement.code).toEqual("75")
  expect(departement.nom).toEqual("Paris")
  expect(departement.codeRegion).toEqual("xx")
})
