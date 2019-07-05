import React, { Component } from 'react';
import Header from '../Header/Header.js' ;
import Main from '../main/main.js' ;
import Movie from '../main/movies/Movie/Movie.js' ;
import NotFound from '../../components/NotFound.js' ;
import { BrowserRouter, Route, Switch } from "react-router-dom";
class App extends Component {    
    render() {
        return <BrowserRouter>
            <div>
              <Header />
              <div>
              <Switch>                
                <Route exact path="/" component={Main} />                
                <Route path="/movies/:movieId" component={Movie} />
                <Route component={NotFound} />
              </Switch>
              </div>
            </div>
          </BrowserRouter>;
    }
}
export default App;