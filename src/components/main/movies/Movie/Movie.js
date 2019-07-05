import React, { Component } from "react";
import "./Movie.css";
const API_KEY = process.env.REACT_APP_API_KEY;
export default class Movie extends Component {
  state = {
    movie: {},
    isLoading: true
  };

  componentDidMount() {
    const movieId = this.props.match.params.movieId;
    const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(movieUrl)
      .then(response => response.json())
      .then(movie => this.setState({ movie, isLoading: false }))
      .catch(err => console.log(err));
  }
  render() {
    const {
      title,
      backdrop_path,
      release_date,
      genres,
      overview,
      vote_average,
      runtime
    } = this.state.movie;
    const releaseYear = release_date ? release_date.substring(0, 4) : null;
    const imgUrl = `http://image.tmdb.org/t/p/w1280${backdrop_path}`;
    console.log(imgUrl);
    const backgroundStyle = {
      backgroundImage: `url(${imgUrl})`
    };
    return (
      <div>
        {this.state.isLoading ? (
          <div>Movie Is Loading</div>
        ) : (
          <div className="movie-page">
            <div className="movie-image">
              <img src={imgUrl} style={{ width: "100%" }} />
            </div>
            <div className="movie-details">
              <h1>
                {title}
                <span>({releaseYear})</span>
              </h1>
              <section className="genres">
                {genres.map((genre, index) => (
                  <div key={genre.id}>
                    <span>{genre.name}</span>
                    {index < genres.length - 1 && (
                      <span className="separator">|</span>
                    )}
                  </div>
                ))}
              </section>
              <h5>
                Rating:<span>{vote_average}</span>
              </h5>
              <h5>
                Runtime:<span>{`${runtime} min`}</span>
              </h5>
              <h4>Overview</h4>
              <p>{overview}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
