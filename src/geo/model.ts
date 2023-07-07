import { FeatureCollection, Point } from "geojson"

export enum MUNICIPALITY_TYPE {
  HOUSE_NUMBER = "housenumber", // numéro « à la plaque »
  STREET = "street", // position « à la voie », placé approximativement au centre de celle-ci
  LOCALITY = "locality", // lieu-dit
  MUNICIPALITY = "municipality" // numéro « à la commune »
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

export interface ICommuneFeatureProps {
  id: string // identifiant de l’adresse (clef d’interopérabilité)
  type: string // type de résultat trouvé
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

export interface IAddressSearchParams {
  search?: string
  postalCode?: string
}

export interface IGeoRepository {
  getAllRegions(): Promise<IRegion[]>
  getDepartementsByRegion(regionId: string): Promise<IDepartement[]>
  getCommunesByDepartement(departementId: string): Promise<ICommune[]>
  searchCommune(params: IAddressSearchParams): Promise<FeatureCollection<Point, ICommuneFeatureProps>>
}
