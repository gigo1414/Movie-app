import React, { useState } from "react";
import {BsSearch} from "react-icons/bs"
import {BiCameraMovie} from "react-icons/bi"
import image from "./homepage-image.png"
import "./App.css"

import Axios from "axios";
import styled from "styled-components";

import MovieComponent from "./components/MovieComponent";
import MovieInfoComponent from "./components/MovieInfoComponent";

export const API_KEY = "bceafb65";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  background-color: #3267C8;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 1.3%;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

    const AppName = styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 7px;
      font-size: 1.2rem;
      font-weigth: 500;
    `;

    const SearchBox = styled.div`
      display: flex;
      flex-direction: row;
      border-radius: 10px;
      width: 40%;
      background-color: white;
      padding: 0.5vh 0.5vh;
      margin-right: 2%;
      `;

        const SearchInput = styled.input`
          color: black;
          font-size: 0.8rem;
          border: none;
          outline: none;
          margin-left: 0.5vw;
        `;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;



function App() {

  const [searchQuery, updateSearchQuery] = useState("");

  const [timeoutId, updateTimeoutId] = useState();

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };

  return (
    <Container>
      <Header>
        <AppName>
        <BiCameraMovie size="1.5rem"/>
          React Movie App
        </AppName>
        <SearchBox>
          <BsSearch color="black"/> 
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
      {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <div className="flex">
          <img src={image} alt="No search found" />
          <p>Search movies ...</p>
          </div>
        )}
      </MovieListContainer>
      </Container>
  );
}

export default App;
