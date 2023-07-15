import { Feature, FeatureCollection, Point, Polygon } from "geojson"

export enum MUNICIPALITY_TYPES {
  HOUSE_NUMBER = "housenumber", // numéro « à la plaque »
  STREET = "street", // position « à la voie », placé approximativement au centre de celle-ci
  LOCALITY = "locality", // lieu-dit
  MUNICIPALITY = "municipality" // numéro « à la commune »
}

export enum GEO_TABS {
  SEARCH = 0,
  EXPLORE = 0
}

export interface IRegion {
  nom: string
  code: string // that is a number
}

export interface IDepartement {
  nom: string
  code: string
  codeRegion: string
}

export interface ICommune {
  nom: string
  code: string
  codeDepartement: string
  siren: string
  codeEpci: string
  codeRegion: string
  codesPostaux: string[]
  population: number
}

export interface ISearchResultFeatureProperties {
  id: string // identifiant de l’adresse (clef d’interopérabilité)
  type: MUNICIPALITY_TYPES // type de résultat trouvé
  score: string // valeur de 0 à 1 indiquant la pertinence du résultat
  housenumber: string // numéro avec indice de répétition éventuel (bis, ter, A, B)
  street: string // nom de la voie
  name: string // numéro éventuel et nom de voie ou lieu dit
  postcode: string // code postal
  citycode: string // code INSEE de la commune
  city: string // nom de la commune
  district: string // nom de l’arrondissement (Paris/Lyon/Marseille)
  oldcitycode: string // code INSEE de la commune ancienne (le cas échéant)
  oldcity: string // nom de la commune ancienne (le cas échéant)
  context: string // n° de département, nom de département et de région
  label: string // libellé complet de l’adresse
  x: number // coordonnées géographique en projection légale
  y: number // coordonnées géographique en projection légale
  importance: string // indicateur d’importance (champ technique)
}

export interface ICommuneFeatureProperties {
  nom: string
  code: string
  codeDepartement: string
  siren: string
  codeEpci: string
  codeRegion: string
  codesPostaux: string[]
  population: number
}

export type ISearchFeature = Feature<Point, ISearchResultFeatureProperties>
export type ICommuneFeature = Feature<Polygon, ICommuneFeatureProperties>

export interface IGeoRepository {
  getAllRegions(): Promise<IRegion[]>
  getAllDepartements(): Promise<IDepartement[]>
  searchAddress(search: string): Promise<FeatureCollection<Point, ISearchResultFeatureProperties>>
  getCommuneFeature(cityCode: string): Promise<ICommuneFeature>
  // max 895 communes per departement
  getDepartementCommuneFeatures(departementCode: string): Promise<FeatureCollection<Polygon, ICommuneFeatureProperties>>
}

export type OnFeatureChangeFunction = (features: ISearchFeature[]) => void
