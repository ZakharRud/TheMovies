import { Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { searchMovies } from "../Redux/search";
import Downshift from "downshift";
import { Link } from "react-router-dom";
import { COVER_PLACEHOLDER, IMAGES_PATH } from "../Config";
import { styled } from "@mui/system";
import { mapGenres } from "../lib/helper";

const PaperStyled = styled(Paper)({
  backgroundColor: "darkgoldenrod",
  top: -40,
  position: "relative",
});

const MenuItemstyled = styled(MenuItem)({
  paddingTop: 5,
  paddingBottom: 5,
});

const ImgStyled = styled("img")({
  height: "100%",
});

const LinkStyled = styled(Link)({
  display: "block",
  textDecoration: "none",
});

const TitleStyled = styled(Typography)({
  color: "black",
  paddingTop: 10,
});

const CaptionStyled = styled(Typography)({
  color: "black",
  paddingTop: 10,
});

function Suggetion({ movies, genres }) {
  
  const dispatch = useDispatch();

  const inputOnChange = (event) => {
    if (!event.target.value) {
      return;
    }
    dispatch(searchMovies(event.target.value));
  };

  const itemToString = () => "";
  return (
    <Downshift itemToString={itemToString}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        seletedItem,
      }) => (
        <div>
          <TextField
            id="search"
            placeholder="search"
            fullWidth={true}
            sx={{ mb: 5 }}
            variant="standard"
            color="success"
            inputProps={{
              ...getInputProps({
                onChange: inputOnChange,
              }),
            }}
          />
          {isOpen ? (
            <PaperStyled square={true} {...getMenuProps()}>
              {movies.results
                .slice(0, 10)
                .filter(
                  (item) =>
                    !inputValue ||
                    item.title
                      .toLowerCase()
                      .includes(inputValue.toLocaleLowerCase())
                )
                .map((item, index) => (
                  <MenuItemstyled
                    {...getItemProps({
                      item,
                      key: item.id,
                      selected: highlightedIndex === index,
                      style: {
                        fontWeight: seletedItem === item ? 500 : 400,
                      },
                    })}
                  >
                    <LinkStyled to={`/movie/${item.id}`}>
                      <Grid container={true} spacing={8}>
                        <Grid item={true}>
                          {item.poster_path ? (
                            <ImgStyled
                              src={`${IMAGES_PATH}/w92${item.poster_path}`}
                              alt={item.title}
                            />
                          ) : (
                            <ImgStyled
                              src={COVER_PLACEHOLDER}
                              alt={item.title}
                            />
                          )}
                        </Grid>
                        <Grid item={true}>
                          <TitleStyled variant="h4">{item.title}</TitleStyled>
                          <CaptionStyled variant="caption">
                            {mapGenres(item.genre_ids, genres)}
                          </CaptionStyled>
                        </Grid>
                      </Grid>
                    </LinkStyled>
                  </MenuItemstyled>
                ))}
            </PaperStyled>
          ) : null}
        </div>
      )}
    </Downshift>
  );
}

export default Suggetion;
