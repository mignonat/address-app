/// <reference types="react-scripts" />

// Needed to import png image
declare module "*.png" {
  const value: any
  export = value
}
