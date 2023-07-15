/// <reference types="react-scripts" />

// Needed to import json file
declare module "*.json" {
  const value: any
  export default value
}

// Needed to import png image
declare module "*.png" {
  const value: any
  export = value
}
