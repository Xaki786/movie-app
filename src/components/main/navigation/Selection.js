import React from 'react';
import './Selection.css';
export default ({onGenreChange, genre, genres}) => {
    return (
        <div className='selection'>
            <label>Genre</label>
            <select onChange={onGenreChange} value={genre}>
                {
                    genres ? 
                        genres.map(genre => <option value={genre.name} key={genre.id}>{genre.name}</option>)
                        : null
                }
            </select>
        </div>
    );
}