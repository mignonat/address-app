import { Typography } from "@mui/material"
import React from "react"
import { ICommuneFeature } from "../../geo/model"
import { FlexBox } from "../../ui/components/FlexBox"

interface ICommuneDetailsProps {
  feature: ICommuneFeature
}

interface IInfoRowProps {
  title: string
  value: string | number
}

const InfoRow = ({ title, value }: IInfoRowProps) => {
  if (value === undefined || value === "") {
    return null
  }
  return (
    <FlexBox fullWidth jc="start">
      <Typography color="textPrimary" sx={{ width: "7rem" }}>
        {title}
      </Typography>
      <Typography color="textSecondary" sx={{ maxWidth: "30rem" }}>
        {value}
      </Typography>
    </FlexBox>
  )
}

export const CommuneDetails = React.memo(({ feature: { properties } }: ICommuneDetailsProps) => (
  <FlexBox
    vertical
    gap=".3rem"
    ai="start"
    sx={{
      pl: ".5rem",
      pr: ".5rem"
    }}>
    <Typography color="textPrimary" fontWeight="bold" sx={{ mb: ".5rem" }}>
      Commune
    </Typography>
    <InfoRow title="Nom" value={properties.nom} />
    <InfoRow title="Code" value={properties.code} />
    <InfoRow title="Population" value={properties.population} />
    <InfoRow title="Siren" value={properties.siren} />
    <InfoRow
      title="Code postaux"
      value={(Array.isArray(properties.codesPostaux)
        ? properties.codesPostaux
        : JSON.parse(properties.codesPostaux as any)
      ).join(", ")}
    />
  </FlexBox>
))
