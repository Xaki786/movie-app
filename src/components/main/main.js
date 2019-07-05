import React from "react";
import "./main.css";
import Movies from "../main/movies/movies.js";
import Navigation from "../main/navigation/navigation.js";

const API_KEY = "6b475dc2fecebc9b755d7460aeba1c02";
const MoviesBaseURI = "https://api.themoviedb.org/3/discover/movie";
const baseURI = "https://api.themoviedb.org/3/genre/movie/list";
export default class Main extends React.Component {
  state = {
    page: 1,
    total_pages: 1,
    moviesURL: `${MoviesBaseURI}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    url: `${baseURI}?api_key=${API_KEY}&language=en-US`,
    genres: [],
    movies: [],
    genre: "Comedy",
    year: {
      label: "year",
      min: 1990,
      max: 2017,
      step: 1,
      value: { min: 2000, max: 2017 }
    },
    rating: {
      label: "rating",
      min: 0,
      max: 10,
      step: 1,
      value: { min: 8, max: 10 }
    },
    runtime: {
      label: "runtime",
      min: 0,
      max: 300,
      step: 15,
      value: { min: 60, max: 120 }
    }
  };
  componentDidMount() {
    this.searchMovies(this.state.moviesURL);
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.state.moviesURL !== nextState.moviesURL) {
      this.searchMovies(nextState.moviesURL);
    }
    if (this.state.page !== nextState.page) {
      this.generateURL(nextState.moviesURL);
    }
  }
  onGenreChange = event => this.setState({ genre: event.target.value });
  setGenres = genres => this.setState({ genres });
  onChange = data => {
    this.setState({
      [data.type]: {
        ...this.state[data.type],
        value: data.value
      }
    });
  };
  generateURL = () => {
    const { genres, page, year, rating, runtime } = this.state;
    const selectedGenre = genres.find(genre => genre.name === this.state.genre);
    const genreID = selectedGenre.id;
    const moviesURL =
      `https://api.themoviedb.org/3/discover/movie?` +
      `api_key=${API_KEY}&` +
      `language=en-US&sort_by=popularity.desc&` +
      `with_genres=${genreID}&` +
      `primary_release_date.gte=${year.value.min}-01-01&` +
      `primary_release_date.lte=${year.value.max}-12-31&` +
      `vote_average.gte = ${rating.value.min}&` +
      `vote_average.lte = ${rating.value.max}&` +
      `with_runtime.gte = ${runtime.value.min}&` +
      `with_runtime.lte = ${runtime.value.max}&` +
      `&page=${page}`;
    this.setState({ moviesURL });
  };
  searchButtonClickHandler = () => {
    this.setState({ page: 1 });
    this.generateURL();
  };
  searchMovies = url => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.storeMovies(data);
      })
      .catch(err => console.log(err));
  };
  storeMovies = data => {
    const movies = data.results.map(movie => {
      const {
        vote_count,
        id,
        genre_ids,
        poster_path,
        title,
        vote_average,
        release_date
      } = movie;
      console.log(movie);
      return {
        vote_count,
        id,
        genre_ids,
        poster_path,
        title,
        vote_average,
        release_date
      };
    });
    this.setState({
      movies: movies,
      total_pages: data.total_pages
    });
  };
  onPageIncrease = () => {
    const { page, total_pages } = this.state;
    const NextPage = page + 1;
    if (NextPage <= total_pages) {
      this.setState({
        page: NextPage
      });
    }
    // this.generateURL();
  };
  onPageDecrease = () => {
    const { page } = this.state;
    const prevPage = page - 1;
    if (prevPage > 0) {
      this.setState({
        page: prevPage
      });
    }
    // this.generateURL();
  };
  render() {
    return (
      <section className="main">
        <Navigation
          onChange={this.onChange}
          onGenreChange={this.onGenreChange}
          setGenres={this.setGenres}
          searchButtonClickHandler={this.searchButtonClickHandler}
          {...this.state}
        />
        <Movies
          moviesURL={this.state.moviesURL}
          page={this.state.page}
          movies={this.state.movies}
          onPageIncrease={this.onPageIncrease}
          onPageDecrease={this.onPageDecrease}
        />
      </section>
    );
  }
}
