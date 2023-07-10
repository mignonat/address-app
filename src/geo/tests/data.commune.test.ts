import { MUNICIPALITY_TYPE } from "../model"
import { geoRPO } from "../repository"

it("Toulouse commune exists and has correct attributes", async () => {
  // 31 is Haute-Garonne
  const communes = await geoRPO.getCommunesByDepartement("31")
  expect(communes.length).toEqual(586)
  // check Toulouse is inside
  const toulouse = communes.find(c => c.nom === "Toulouse")
  if (!toulouse) {
    throw Error("Unable to find Toulouse city")
  }
  expect(toulouse.code).toEqual("31555")
  expect(toulouse.codeDepartement).toEqual("31")
  expect(toulouse.codeEpci).toEqual("243100518")
  expect(toulouse.codeRegion).toEqual("76")
  expect(typeof toulouse.population).toEqual("number")
  expect(toulouse.siren).toEqual("213105554")
  expect(toulouse.codesPostaux.join(", ")).toEqual("31000, 31100, 31200, 31300, 31400, 31500")
})

it("Search for commune by name", async () => {
  const result = await geoRPO.searchCommune("labege")
  expect(result.features.length).toEqual(5)
  const firstFeature = result.features[0]
  expect(firstFeature).toBeDefined()
  const properties = firstFeature.properties
  expect(properties.city).toEqual("L'Isle-Jourdain")
  expect(properties.citycode).toEqual("32160")
  expect(properties.context).toEqual("32, Gers, Occitanie") // bonne charcutaille ici
  expect(properties.district).not.toBeDefined()
  expect(properties.housenumber).not.toBeDefined()
  expect(properties.id).toEqual("32160_0z65dg")
  expect(typeof properties.importance).toEqual("number")
  expect(properties.label).toEqual("Labège 32600 L'Isle-Jourdain")
  expect(properties.name).toEqual("Labège")
  expect(properties.oldcity).not.toBeDefined()
  expect(properties.oldcitycode).not.toBeDefined()
  expect(properties.postcode).toEqual("32600")
  expect(typeof properties.score).toEqual("number")
  expect(properties.street).not.toBeDefined()
  expect(properties.type).toEqual(MUNICIPALITY_TYPE.LOCALITY)
  expect(properties.x).toEqual(543211.94)
  expect(properties.y).toEqual(6284096.01)
})

it("Search for commune by postal code", async () => {
  const result = await geoRPO.searchCommune("31670")
  expect(result.features.length).toEqual(5)
  const firstFeature = result.features[0]
  expect(firstFeature).toBeDefined()
  const properties = firstFeature.properties
  expect(properties.city).toEqual("Labège")
  expect(properties.postcode).toEqual("31670")
})
