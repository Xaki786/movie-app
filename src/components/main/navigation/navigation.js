import React from 'react';
import Selection from './Selection.js' ;
import './navigation.css';
import Slider from './Slider.js';
import Button from '../Button.js' ;
class Navigation extends React.Component{
    componentDidMount(){
        fetch(this.props.url)
            .then(response => response.json())
            .then(data => this.props.setGenres(data.genres))
            .catch(err => console.log(err));
    }
    render(){
        const { onGenreChange, onChange, genres, genre, searchButtonClickHandler,  year, rating, runtime } = this.props;
        return <section className="navigation">
            <Selection onGenreChange={onGenreChange} genres={genres} genre={genre} />
            <div>
              <Slider data={year} onChange={onChange} />
              <Slider data={rating} onChange={onChange} />
              <Slider data={runtime} onChange={onChange} />
              <Button onClick={searchButtonClickHandler}>Search</Button>
            </div>
          </section>;
    }
}
export default Navigation ;