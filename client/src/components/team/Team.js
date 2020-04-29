import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import template from "./images/template.gif";;


const Team = props => {

    const WEB_DEV = "WEB_DEV";
    const CONTENT_WRITER = "CONTENT_WRITER";
    const [active, setActive] = useState(WEB_DEV);

    useEffect(() => {
        const page = document.querySelector(".page-container");
        const initial = page.style.background;
        page.style.background="#2F2A29";

        return () => {
            page.style.background = initial;
        }
    }, []);
    const setActiveClass = (name) => {
        if(active === name)
            return `members active`;
        else
            return "members";
    }
    return (
        <div className="container team">
            <div className="departments">
                <ul>
                    <li onClick={() => setActive(WEB_DEV)}>Content Writer</li>
                    <li onClick={() => setActive(CONTENT_WRITER)}>Web Development</li>
                   
                </ul>
            </div>

            <div className="team-members">

                <div className={setActiveClass(WEB_DEV)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>

                </div>
                <div className={setActiveClass(CONTENT_WRITER)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>
         
            </div>
        </div>
    )
}

Team.propTypes = {

}

export default Team
