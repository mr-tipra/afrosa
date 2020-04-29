import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

import bhabhaLogo from "./companyLogos/bhabha.png";

const CompanyShowcase = props => {

    const showcaseRef = useRef(null);
    useEffect(() => {

        showcaseRef.current.style.left = "0px";
        const width = showcaseRef.current.offsetWidth;
        let offset = -1;
        
        if(width > 0 && width > window.innerWidth + 100){
            
            function move(){
                let currLeft = Number.parseInt(showcaseRef.current.style.left);
                if(Math.abs(currLeft) > width - window.innerWidth){
                    offset = 1;
                    currLeft = -(width - window.innerWidth);
                }
                else if(currLeft > 0){
                    offset = -1;
                    currLeft = 0;
                }
                showcaseRef.current.style.left  = (currLeft + offset) + "px";
                
                id = window.requestAnimationFrame(move);
            }
            let id = window.requestAnimationFrame(move);
            
            showcaseRef.current.addEventListener("mouseover", () => {
                window.cancelAnimationFrame(id);
            })
            showcaseRef.current.addEventListener("mouseleave", () => {
                id = window.requestAnimationFrame(move);
            });
            return () => {
                window.cancelAnimationFrame(id);
            }
        }
    }, [showcaseRef.current]);

    return (
        <div className="company-showcase">
            <h1 className="large text-primary">Companies</h1>
            <p>Our Alumni Connections</p>
            <div ref={showcaseRef} className="companies">
                <div className="company">
                    <img src={bhabhaLogo} alt="bhabha"/>
                    <span>Bhabha</span>
                </div>
                <div className="company">
                    <img src={bhabhaLogo} alt="bhabha"/>
                    <span>Bhabha</span>
                </div>
                <div className="company">
                    <img src={bhabhaLogo} alt="bhabha"/>
                    <span>Bhabha</span>
                </div>
                <div className="company">
                    <img src={bhabhaLogo} alt="bhabha"/>
                    <span>Bhabha</span>
                </div>
                <div className="company">
                    <img src={bhabhaLogo} alt="bhabha"/>
                    <span>Bhabha</span>
                </div>
                <div className="company">
                    <img src={bhabhaLogo} alt="bhabha"/>
                    <span>Bhabha</span>
                </div>
                <div className="company">
                    <img src={bhabhaLogo} alt="bhabha"/>
                    <span>Bhabha</span>
                </div>
             
            </div>
        </div>
    )
}

CompanyShowcase.propTypes = {

}

export default CompanyShowcase
