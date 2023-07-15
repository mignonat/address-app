import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment, TextField, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import { IReducerAction } from "../../app/model"
import { ACTIONS } from "../../app/store/actions"
import { GlobalContext } from "../../app/store/context"
import { FlexBox } from "../../ui/components/FlexBox"
import { LinearLoader } from "../../ui/components/LinearLoader"
import { ISearchFeature } from "../model"
import { geoRPO } from "../repository"
import { SearchResult } from "./SearchResult"

interface ISearchPanelProps {
  isSearching: boolean
  search: string
  result: ISearchFeature[]
  selectedFeatureId: string
  dispatch: React.Dispatch<IReducerAction>
}

const SearchPanelFunction = React.memo(
  ({ isSearching, search, result, selectedFeatureId, dispatch }: ISearchPanelProps) => {
    const [searchFinished, setSearchFinished] = useState(true)
    const timeoutRef = useRef<any>(undefined)
    const hasResult = result.length > 0 && searchFinished && search
    return (
      <FlexBox vertical ai="start" gap sx={{ p: "1rem", maxHeight: "100%" }}>
        <FlexBox gap jc="space-between" fullWidth>
          <TextField
            variant="outlined"
            size="small"
            value={search}
            disabled={isSearching}
            label="Une commune"
            placeholder="Saisir l'adresse"
            onChange={event => {
              const newSearch = event.target.value
              dispatch({ type: ACTIONS.SET_SEARCH, search: newSearch })
              clearTimeout(timeoutRef.current)
              if (!newSearch) {
                dispatch({ type: ACTIONS.SET_SEARCH_RESULT, searchResult: [] })
                if (!searchFinished) {
                  setSearchFinished(true)
                }
                return
              }
              setSearchFinished(false)
              timeoutRef.current = setTimeout(async () => {
                dispatch({ type: ACTIONS.SET_IS_SEARCHING, isSearching: true })
                try {
                  const requestResult = await geoRPO.searchAddress(newSearch)
                  dispatch({ type: ACTIONS.SET_SEARCH_RESULT, searchResult: requestResult.features })
                } catch (error) {
                  console.error(error)
                  alert("Une erreur est survenue")
                  dispatch({ type: ACTIONS.SET_SEARCH_RESULT, searchResult: [] })
                } finally {
                  setSearchFinished(true)
                }
              }, 1000)
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
          {hasResult && <Typography color="textSecondary">{`${result.length} résultat(s)`}</Typography>}
        </FlexBox>
        {isSearching ? (
          <LinearLoader text="recherche en cours..." />
        ) : result.length === 0 && searchFinished && search ? (
          <Typography color="textSecondary">Aucun résultat</Typography>
        ) : hasResult ? (
          <>
            {!selectedFeatureId && (
              <Typography color="textSecondary">
                Sélectionner une ligne pour visualiser la commune sur la carte
              </Typography>
            )}
            <SearchResult features={result} dispatch={dispatch} selectedFeatureId={selectedFeatureId} />
          </>
        ) : null}
      </FlexBox>
    )
  }
)

export const SearchPanel = () => (
  <GlobalContext.Consumer>
    {([{ isSearching, search, searchResult: features, selectedFeatureId }, dispatch]) => (
      <SearchPanelFunction
        isSearching={isSearching}
        search={search}
        result={features}
        dispatch={dispatch}
        selectedFeatureId={selectedFeatureId}
      />
    )}
  </GlobalContext.Consumer>
)
