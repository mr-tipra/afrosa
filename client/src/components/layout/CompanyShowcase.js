import React, {useRef, useEffect} from 'react'
import PropTypes from 'prop-types'

import isro from "../../assests/companies_logo/isro.png";
import borl from "../../assests/companies_logo/borl.png";
import bosch from "../../assests/companies_logo/bosch.jpg";
import csir from "../../assests/companies_logo/csir.png";
import hc from "../../assests/companies_logo/hc.jpg";
import ibm from "../../assests/companies_logo/ibm.jpg";
import ms from "../../assests/companies_logo/ms.png";
import nhai from "../../assests/companies_logo/nhai.png";
import ntpc from "../../assests/companies_logo/ntpc.png";
import nokia from "../../assests/companies_logo/nokia.png";
import tcs_tata from "../../assests/companies_logo/tcs-tata.jpg";
import wipro from "../../assests/companies_logo/wipro-logo.png";
import barc from "../../assests/companies_logo/barc.png";


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
                    <img src={isro} alt="isro"/>
                    <span>ISRO</span>
                </div>
                <div className="company">
                    <img src={borl} alt="borl"/>
                    <span>BORL</span>
                </div>
                <div className="company">
                    <img src={bosch} alt="bosch"/>
                    <span>BOSCH</span>
                </div>
                <div className="company">
                    <img src={csir} alt="csir"/>
                    <span>CSIR</span>
                </div>
                <div className="company">
                    <img src={hc} alt="hc"/>
                    <span>HC</span>
                </div>
                <div className="company">
                    <img src={ibm} alt="ibm"/>
                    <span>IBM</span>
                </div>
                <div className="company">
                    <img src={ms} alt="ms"/>
                    <span>Maruti</span>
                </div>
                <div className="company">
                    <img src={nhai} alt="nhai"/>
                    <span>NHAI</span>
                </div>
                <div className="company">
                    <img src={nokia} alt="nokia"/>
                    <span>NOKIA</span>
                </div>
                <div className="company">
                    <img src={ntpc} alt="ntpc"/>
                    <span>NTPC</span>
                </div>
                <div className="company">
                    <img src={tcs_tata} alt="tcs"/>
                    <span>TCS</span>
                </div>
                <div className="company">
                    <img src={wipro} alt="wipro"/>
                    <span>Wipro</span>
                </div>
                <div className="company">
                    <img src={barc} alt="barc"/>
                    <span>BARC</span>
                </div>
            </div>
        </div>
    )
}

CompanyShowcase.propTypes = {

}

export default CompanyShowcase
