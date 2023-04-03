import {
  Grid,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const Movies = () => {
  const [search, setSearch] = useState<string>("");
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState<{ id: number; title: string }[]>();
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`
      );

      result.json().then((json) => {
        setMovies(json.results);
      });
    };
    if (search.length >= 3) {
      fetchData();
    }
  }, [search]);

  useEffect(() => {
    if (localStorage.getItem("favorites") || "" || favorites?.length) {
      setFavorites(JSON.parse(localStorage.getItem("favorites") || ""));
    }
  }, [favorites?.length]);

  const setFavorite = (id: number, title: string) => {
    if (!favorites) {
      localStorage.setItem("favorites", JSON.stringify([{ id, title }]));
    } else {
      if (!favorites.find((fav) => fav.id === id)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...favorites, { id, title }])
        );
      } else {
        localStorage.setItem(
          "favorites",
          JSON.stringify(favorites.filter((fav: any) => fav.id !== id))
        );
      }
      setFavorites(JSON.parse(localStorage.getItem("favorites") || ""));
    }
  };

  console.log(movies);
  return (
    <Grid
      container
      justifyContent="center"
      alignContent="space-between"
      direction="row"
    >
      <TextField
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        label="Search"
        variant="outlined"
      />
      {!!localStorage.getItem("favorites") && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Favorites Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {JSON.parse(localStorage.getItem("favorites") || "").map(
                (movie: any) => (
                  <TableRow
                    key={movie.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {movie.title}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {!!movies.length && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Language</TableCell>
                <TableCell align="right">Release Date</TableCell>
                <TableCell align="right">Popularity</TableCell>
                <TableCell align="right">Favorite</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie: any) => (
                <TableRow
                  key={movie.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {movie.title}
                  </TableCell>
                  <TableCell align="right">{movie.original_language}</TableCell>
                  <TableCell align="right">{movie.release_date}</TableCell>
                  <TableCell align="right">{movie.popularity}</TableCell>
                  <TableCell align="right">
                    <Button onClick={() => setFavorite(movie.id, movie.title)}>
                      Set favorites
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
};

export default Movies;
