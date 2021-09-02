import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson-client';


const jsonUrl = 
    'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const useWorldMap = () => {
    const [data, setData] = useState(null);
    console.log(data);
    useEffect(() => {
        json(jsonUrl).then(topojsonData => {
            const { countries, land } = topojsonData.objects;
            setData({
                land: feature(topojsonData, land),
                interiors: mesh(topojsonData,countries, (a, b) => a !== b)
            });
        });
        }, []);

    return data;
};