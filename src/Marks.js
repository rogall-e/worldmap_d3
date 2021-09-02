import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath().projection(projection);
const graticule = geoGraticule();

export const Marks = ({ worldMap: { land, interiors }, cities, sizeScale, sizeValue }) => (
    <>
    
        <g className="map">
            <path className="map-sphere"
                d={path({ type: 'Sphere' })}
            />
            <path className="graticules"
                d={path(graticule())}
            />  
            {land.features.map(feature => (
                <path
                    className="land" 
                    d= {path(feature)}
                />
            ))}    
            <path
                className="country-borders"
                d={path(interiors)}
            />
            {cities.map(d => {
                const [x, y] = projection([d.lng, d.lat]);
                return <circle
                            className="cities"
                            cx={x}
                            cy={y}
                            r={sizeScale(sizeValue(d))}
                        />
            })}
           
        </g>
    </>
);

