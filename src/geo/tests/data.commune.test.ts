import { MUNICIPALITY_TYPES } from "../model"
import { geoRPO } from "../repository"

it("Toulouse commune exists and has correct attributes", async () => {
  // 31 is Haute-Garonne
  const communes = await geoRPO.getDepartementCommuneFeatures("31")
  expect(communes.features.length).toEqual(586)
  // check Toulouse is inside
  const toulouse = communes.features.find(f => f.properties.nom === "Toulouse")
  if (!toulouse) {
    throw Error("Unable to find Toulouse city")
  }
  const properties = toulouse.properties
  expect(properties.code).toEqual("31555")
  expect(properties.codeDepartement).toEqual("31")
  expect(properties.codeEpci).toEqual("243100518")
  expect(properties.codeRegion).toEqual("76")
  expect(typeof properties.population).toEqual("number")
  expect(properties.siren).toEqual("213105554")
  expect(properties.codesPostaux.join(", ")).toEqual("31000, 31100, 31200, 31300, 31400, 31500")
}, 70000)

it("Search for commune by name", async () => {
  const result = await geoRPO.searchAddress("labege")
  expect(result.features.length).toEqual(100)
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
  expect(properties.type).toEqual(MUNICIPALITY_TYPES.LOCALITY)
  expect(properties.x).toEqual(543211.94)
  expect(properties.y).toEqual(6284096.01)
})

it("Search for commune by postal code", async () => {
  const result = await geoRPO.searchAddress("31670")
  expect(result.features.length).toEqual(100)
  const firstFeature = result.features[0]
  expect(firstFeature).toBeDefined()
  const properties = firstFeature.properties
  expect(properties.city).toEqual("Labège")
  expect(properties.postcode).toEqual("31670")
})

it("Get one commune feature", async () => {
  const feature = await geoRPO.getCommuneFeature("31254")
  expect(feature).toBeDefined()
  const properties = feature.properties
  expect(properties.code).toEqual("31254")
  expect(properties.codesPostaux[0]).toEqual("31670")
  expect(properties.codeRegion).toEqual("76")
  expect(properties.codeDepartement).toEqual("31")
}, 70000)
