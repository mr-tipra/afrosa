import React,{useRef, useEffect, useState}from 'react'
import {loadModules} from "esri-loader";
import { Fragment } from 'react';
import Spinner from '../layout/Spinner';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import SpinnerImage from "../../assests/spinner.svg";
import  defaultImage from "../../assests/default.png";

const CompaniesMap = props => {

    const [isLoading, setIsLoading] = useState(true);

    const mapRef = useRef();

    //for routing
    const history = useHistory();

    useEffect(()=>{

        loadModules(["esri/Map","esri/views/MapView","esri/Graphic", "esri/layers/GraphicsLayer"])
        .then( async ([Map, Mapview, Graphic, GraphicsLayer]) => {

            let companies = [];
            
            try{
                const res = await axios.get("/api/maps/companies");
                companies = res.data.companies;
            }catch(err){
                console.log(err);
            }

            const map= new Map({
                basemap:"dark-gray-vector"
            });
            const view= new Mapview({
                container: mapRef.current,
                map:map,
                center:[78.9629,20.5937],
                zoom: 2
            });
            const graphicsLayer = new GraphicsLayer();
            
            const simpleMarkerSymbol = {
                type: "picture-marker",
                url: "https://developers.arcgis.com/labs/images/bluepin.png",
                width:'14px',
                height:"26px"


            };
            
            
            const gotoProfileAction = {
                title:"Go To Profile",
                id:'gotoProfile'
            };
            
            const createContent = feature => {
                const div = document.createElement("div");
                div.classList.add("map-popup");
                const atts = feature.graphic.attributes;

                const spinner = document.createElement("img");
                spinner.src=SpinnerImage;

                div.insertBefore(spinner, div.firstChild);

                axios.get(`/api/profile/${atts.user_id}`)
                .then(res => {
                    
                    //get exp
                    const profile = res.data.profile;
                    console.log(profile.experiences);
                    const exp = profile.experiences.find(exp => exp.company._id === atts.company_id);
                    const divUser = document.createElement("div");
                    divUser.classList.add("map-popup-user");
                    //redirect on click
                    divUser.addEventListener("click", () => {
                        history.push(`/profile/${atts.user_id}`);
                    });

                    const divLeft = document.createElement("div");
                    divLeft.classList.add("left");
                    const isDefault = res.data.profile.display_picture === "default";
                    divLeft.innerHTML += `<img src='${isDefault?defaultImage:res.data.profile.display_picture}'/>`
                    
                    const divRight = document.createElement("div");
                    divRight.classList.add("right");
                    divRight.innerHTML += `<p>${atts.user_name}</p>`;
                    divRight.innerHTML += `<p>${exp.title} <span class='text-primary'>at</span> ${exp.company_name || atts.name}</p>`;
                    divRight.innerHTML += `<p><span class='text-primary'>Joined in</span> ${new Date(exp.from).getFullYear()}</p>`;

                    divUser.insertBefore(divRight, null);
                    divUser.insertBefore(divLeft, divRight);
                    
                    div.removeChild(div.children[0]);
                    div.insertBefore(divUser,div.firstChild);
                })
                .catch(err => {

                });

                div.innerHTML += `<p>This company has ${atts.students} Students and ${atts.alumni} Alumni</span></p>`
             
                return div;
            }
            
            const popupTemplate = {
                title:"{name}",
                content: createContent,
                actions: [gotoProfileAction]
            };
            
            view.popup.on("trigger-action",e => {
                if(e.action.id === gotoProfileAction.id){
                    console.log(view.popup.selectedFeature.attributes.user_id);
                    history.push(`/profile/${view.popup.selectedFeature.attributes.user_id}`)
                }
            });

            companies.forEach(comp => {

                const attributes = {
                    name: comp.name,
                    students:comp.students,
                    alumni: comp.alumni,
                    addr: comp.formatted_adr,
                    user_id: comp.newest._id,
                    user_name:comp.newest.name,
                    company_id: comp._id
                };
                
                // Create a point
                const point = {
                    type: "point",
                    longitude: comp.geoData.coordinates[0],
                    latitude: comp.geoData.coordinates[1]
                };
                
                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol,
                    attributes: attributes,
                    popupTemplate  : popupTemplate   
                });
                
                graphicsLayer.add(pointGraphic);
            });
            
            
            map.add(graphicsLayer);  

            setIsLoading(false);
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
        <section className="container">
            <h1 className="large text-primary" htmlFor={mapRef.current}>Companies</h1>
            {isLoading && <Spinner/>}
            <div ref={mapRef} className="map" style={{width:"100%", height:"800px"}}></div>
        </section>
    )
}



export default CompaniesMap
