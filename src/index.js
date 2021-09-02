import React, {useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { scaleSqrt, max } from 'd3';
import { useWorldMap } from './useWorldMap';
import { useCities } from './useCities';
import { Marks } from './Marks';
import './style.css';

const width = 960;
const height = 500;
const maxRadius = 15;

const App = () => {
    const worldMap = useWorldMap();
    const cities = useCities();


    if (!worldMap || !cities) {
        return <div>Loading...</div>;
    }
    const sizeValue = d => d.population;
    const sizeScale = scaleSqrt()
        .domain([0, max(cities, sizeValue)])
        .range([0, maxRadius]);

    return(
        <container className="plot-container">
            <p className="description">A Worldmap with all cities with a population greater than 50.000.</p>
            <h1 className="header">Worldmap</h1>  
            <svg className="plot" width={width} height={height}>
                <Marks 
                    worldMap={worldMap}
                    cities={cities}
                    sizeValue={sizeValue}
                    sizeScale={sizeScale} 
                />
            </svg>
        </container>
        );
    };
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);