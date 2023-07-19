import { Box, SxProps, Theme } from "@mui/material"
import React from "react"

interface IFlexBoxProps {
  id?: string
  vertical?: boolean // flex-direction: column
  ai?: string // align-items
  jc?: string // justify-content
  sx?: SxProps<Theme>
  fullWidth?: boolean
  wrap?: boolean
  gap?: boolean | string
  className?: string
  onClick?: (event: any) => any
  onDoubleClick?: (event: MouseEvent) => any
}

export const FlexBox = React.memo(
  ({
    children,
    id,
    jc,
    ai,
    className,
    fullWidth,
    gap,
    onClick,
    onDoubleClick,
    sx,
    vertical,
    wrap
  }: React.PropsWithChildren<IFlexBoxProps>) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: vertical ? "column" : undefined,
        alignItems: ai ? ai : "center",
        justifyContent: jc ? jc : "center",
        width: fullWidth ? "100%" : undefined,
        gap: typeof gap === "string" ? gap : gap ? "1rem" : undefined,
        flexWrap: wrap ? "wrap" : undefined,
        ...sx
      }}
      id={id}
      className={className}
      onClick={event => (onClick ? onClick(event as any) : undefined)}
      onDoubleClick={event => (onDoubleClick ? onDoubleClick(event as any) : undefined)}>
      {children}
    </Box>
  )
)
