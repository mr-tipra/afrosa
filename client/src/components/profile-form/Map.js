import React,{useRef, useEffect}from 'react'
import {setDefaultOptions,loadModules} from "esri-loader";
import { Fragment } from 'react';


const Map = props => {
    const mapRef = useRef();


    useEffect(()=>{
        setDefaultOptions({css: true});

        loadModules(["esri/Map","esri/views/MapView","esri/widgets/Search"])
        .then( ([Map, Mapview, Search]) => {
            const map= new Map({
                basemap:"dark-gray-vector"
            });
            const view= new Mapview({
                container: mapRef.current,
                map:map,
                center:[78.9629,20.5937],
                zoom: 5
            });

            const search= new Search({
                view: view
            });
            view.ui.add(search, "top-right");
            
            search.on("search-complete", (res) => {
                const geom = res.results[0].results[0].feature.geometry;
                const data = {addr_line: res.searchTerm, geoData:{coordinates:[geom.longitude, geom.latitude]}};

                props.onEnter(data);
            });

            return ()=>{
                if(view){
                    view.container = null;
                }
            }

        }).catch(err => {
            console.log(err);
        })
    },[]);
    return (          
        <Fragment>
            <label htmlFor={mapRef.current}>*Company Location</label>
            <div ref={mapRef} style={{width:"100%", height:"600px"}}></div>
        </Fragment>
    )
}



export default Map
