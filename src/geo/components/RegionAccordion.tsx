import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { Accordion, AccordionDetails, AccordionSummary, Typography, alpha } from "@mui/material"
import React from "react"
import { IReducerAction } from "../../app/model"
import { ACTIONS } from "../../app/store/actions"
import { FlexBox } from "../../ui/components/FlexBox"
import { IDepartement, IRegion } from "../model"

interface IRegionAccordionProps {
  region: IRegion
  departements: IDepartement[]
  selectedRegion: IRegion | null
  dispatch: React.Dispatch<IReducerAction>
}

export const RegionAccordion = React.memo(
  ({ region, selectedRegion, departements, dispatch }: IRegionAccordionProps) => {
    const isExpanded = region.code === selectedRegion?.code
    return (
      <Accordion
        expanded={isExpanded}
        onChange={(_event: React.SyntheticEvent, newIsExpanded: boolean) => {
          if (newIsExpanded !== isExpanded) {
            dispatch({ type: ACTIONS.SELECT_REGION, selectedRegion: newIsExpanded ? region : null })
          }
        }}
        sx={{
          boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.1)",
          backgroundColor: theme => alpha(theme.palette.background.paper, 0.2)
        }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography color="textPrimary">
            {region.nom} ({departements.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FlexBox vertical ai="start" sx={{ p: "1rem", pt: 0 }}>
            <Typography color="textPrimary" sx={{ mb: "1rem" }}>
              Départements
            </Typography>
            {departements.map(d => (
              <Typography
                color="textSecondary"
                key={d.code}
                sx={{
                  "width": "100%",
                  "p": ".3rem",
                  "pl": "1rem",
                  "cursor": "pointer",
                  "transition": "all 300ms",
                  "border": "1px solid transparent",
                  "borderRadius": ".25rem",
                  "&:hover": {
                    color: theme => theme.palette.text.primary,
                    border: theme => `1px solid ${theme.palette.text.disabled}`
                  }
                }}
                onClick={() => dispatch({ type: ACTIONS.SELECT_DEPARTEMENT, selectedDepartement: d })}>
                {d.nom}
              </Typography>
            ))}
          </FlexBox>
        </AccordionDetails>
      </Accordion>
    )
  }
)
