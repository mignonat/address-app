import { Box, LinearProgress, SxProps, Theme, Typography } from "@mui/material"
import React from "react"
import { FlexBox } from "./FlexBox"

interface ILinearLoaderProps {
  text: string | string[]
  id?: string
  className?: string
  sx?: SxProps<Theme> | undefined
}

export const LinearLoader = React.memo(({ id, text, className, sx }: ILinearLoaderProps) => (
  <Box
    id={id}
    sx={{
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "column",
      "justifyContent": "center",
      "width": "100%",
      "& .linear-progress": {
        width: "100%",
        marginTop: ".5rem",
        marginBottom: "1rem"
      },
      ...sx
    }}
    className={className || ""}>
    {Array.isArray(text) ? (
      <FlexBox vertical gap=".6rem">
        {text.map((t, index) => (
          <Typography color="textSecondary" component={"div"} key={index}>
            {t}
          </Typography>
        ))}
      </FlexBox>
    ) : (
      <Typography color="textSecondary">{text}</Typography>
    )}
    <LinearProgress color="secondary" className="linear-progress"></LinearProgress>
  </Box>
))
