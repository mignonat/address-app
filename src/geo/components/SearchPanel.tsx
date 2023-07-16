import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import { InputAdornment, TextField, Typography } from "@mui/material"
import React, { useRef, useState } from "react"
import { IReducerAction } from "../../app/model"
import { ACTIONS } from "../../app/store/actions"
import { GlobalContext } from "../../app/store/context"
import { FlexBox } from "../../ui/components/FlexBox"
import { LinearLoader } from "../../ui/components/LinearLoader"
import { ICommuneFeature, ISearchFeature, MIN_SEARCH_LENGTH } from "../model"
import { geoRPO } from "../repository"
import { selectSearchResult } from "../tools/common"
import { SearchResult } from "./SearchResult"

interface ISearchPanelProps {
  isLoadingSearchCommune: boolean
  isSearching: boolean
  search: string
  result: ISearchFeature[]
  selectedSearchCommune: ICommuneFeature | null
  dispatch: React.Dispatch<IReducerAction>
}

const SearchPanelFunction = React.memo(
  ({ isSearching, isLoadingSearchCommune, search, result, selectedSearchCommune, dispatch }: ISearchPanelProps) => {
    const [searchFinished, setSearchFinished] = useState(true)
    const timeoutRef = useRef<any>(undefined)
    const hasResult = result.length > 0 && searchFinished && search
    const clearMap = () => {
      dispatch({ type: ACTIONS.SET_SEARCH_RESULT, searchResult: [] })
      dispatch({ type: ACTIONS.SELECT_SEARCH_COMMUNE, selectedSearchCommune: null })
    }
    return (
      <FlexBox vertical ai="start" gap sx={{ p: "1rem", maxWidth: "35rem", maxHeight: "100%" }} fullWidth>
        <Typography color="textSecondary">Saisir une adresse pour trouver une commune</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={search}
          disabled={isSearching}
          label="Adresse"
          placeholder={`saisir au minimum ${MIN_SEARCH_LENGTH} caractères`}
          onChange={event => {
            const newSearch = event.target.value
            dispatch({ type: ACTIONS.SET_SEARCH, search: newSearch })
            if (newSearch.length < MIN_SEARCH_LENGTH) {
              if (search.length > 0) {
                dispatch({ type: ACTIONS.SET_SEARCH_RESULT, searchResult: [] })
              }
              return
            }
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
                if (requestResult.features.length > 0) {
                  // select the first result, the more relevant result
                  const { citycode, id } = requestResult.features[0].properties
                  selectSearchResult(citycode, id, dispatch)
                }
              } catch (error) {
                console.error(error)
                alert("Une erreur est survenue")
                clearMap()
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
            ),
            endAdornment: !search ? undefined : (
              <InputAdornment position="end">
                <CloseIcon
                  onClick={() => {
                    dispatch({ type: ACTIONS.SET_SEARCH, search: "" })
                    clearMap()
                  }}
                  sx={{ "cursor": "pointer", "&:hover": { color: theme => theme.palette.action.active } }}
                />
              </InputAdornment>
            )
          }}
          sx={{ width: "100%" }}
        />
        {isSearching ? (
          <LinearLoader text="recherche en cours..." />
        ) : result.length === 0 && searchFinished && search ? (
          <Typography color="textSecondary">
            {search.length < MIN_SEARCH_LENGTH ? `Saisir au minimum ${MIN_SEARCH_LENGTH} caractères` : "Aucun résultat"}
          </Typography>
        ) : hasResult ? (
          <>
            {!selectedSearchCommune && (
              <Typography color="textSecondary">
                Sélectionner une ligne pour visualiser la commune sur la carte
              </Typography>
            )}
            <Typography color="textSecondary" fontSize=".8rem">
              Sélectionnez un résultat pour visualiser la commune sur laquelle il se trouve.
            </Typography>
            <SearchResult
              features={result}
              dispatch={dispatch}
              isLoadingSearchCommune={isLoadingSearchCommune}
              selectedSearchCommune={selectedSearchCommune}
            />
            <Typography color="textSecondary" fontSize=".8rem">
              Cliquez sur la carte pour plus d'information.
            </Typography>
          </>
        ) : null}
      </FlexBox>
    )
  }
)

export const SearchPanel = () => (
  <GlobalContext.Consumer>
    {([{ isSearching, search, searchResult: features, selectedSearchCommune, isLoadingSearchCommune }, dispatch]) => (
      <SearchPanelFunction
        isSearching={isSearching}
        search={search}
        result={features}
        dispatch={dispatch}
        isLoadingSearchCommune={isLoadingSearchCommune}
        selectedSearchCommune={selectedSearchCommune}
      />
    )}
  </GlobalContext.Consumer>
)
