import { geoRPO } from "../repository"

it("Get all departements count should be 101", async () => {
  const allDepartements = await geoRPO.getAllDepartements()
  expect(allDepartements.length).toEqual(101)
})

it("First departement has correct attributes", async () => {
  const regionDepartements = await geoRPO.getAllDepartements()
  const departement = regionDepartements.find(d => d.code === "75")
  if (!departement) {
    throw Error("Missing departement")
  }
  expect(departement.code).toEqual("75")
  expect(departement.nom).toEqual("Paris")
  expect(departement.codeRegion).toEqual("11")
})

it("Get departement communes works", async () => {
  const communes = await geoRPO.getDepartementCommuneFeatures("31")
  expect(communes.features.length).toEqual(586)
  const labegeFeature = communes.features.find(c => c.properties.nom === "Labège")
  if (!labegeFeature) {
    throw Error("Missing feature in feature collection")
  }
  expect(labegeFeature.properties.siren).toEqual("213102544")
}, 70000)
