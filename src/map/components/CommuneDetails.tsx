import { Typography } from "@mui/material"
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
      <Typography color="textPrimary" sx={{ width: "8rem" }}>
        {title}
      </Typography>
      <Typography color="textSecondary">{value}</Typography>
    </FlexBox>
  )
}

export const CommuneDetails = ({ feature: { properties } }: ICommuneDetailsProps) => (
  <FlexBox vertical gap>
    <InfoRow title="Nom" value={properties.nom} />
    <InfoRow title="Population" value={properties.population} />
  </FlexBox>
)
