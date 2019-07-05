import React,{Component} from "react";
import "./movies.css";
import MovieListItem from './MovieListItem.js' ;
import Button from '../Button.js' ;
export default class Movies extends Component{                
  render(){
      return <section>
          <ul className="movies">
            { this.props.movies ? this.props.movies.map((movie, index) => {
              return( 
                <MovieListItem 
                  className="movie-item" 
                  key={index.toString()} 
                  movie={movie}                   
                />
              );
            })
            :null
          }
          </ul>  
          <div className="pagination">
            <Button onClick={this.props.onPageDecrease}>Previous</Button>
            <span>{`Page ${this.props.page}`}</span>
            <Button onClick={this.props.onPageIncrease}>Next</Button>
          </div>          
        </section>;
  }
}
