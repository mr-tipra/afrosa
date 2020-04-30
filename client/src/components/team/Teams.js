import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import template from "./images/template.gif";;


const Teams = props => {

    const MENTORS = "MENTORS";
    const WEB_DEV = "WEB_DEV";
    const CONTENT_WRITER = "CONTENT_WRITER";
    const MANAGEMENT = "MANGEMENT";
    const DEVELOPERS = "DEVELOPERS";
    const ALUMNI_RELATIONS = "ALUMNI_RELATIONS";
    const STUDENT_RELATIONS = "STUDENT_RELATIONS";
    const ORATORS = "ORATORS";
    const SOCIAL_MEDIA = "SOCIAL_MEDIA";
    const DESIGN = "DESIGN";
    const DATA_COLLECTIOn = "DATA_COLLECTIOn";

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
                    <li onClick={() => setActive(MENTORS)}>Mentor</li>
                    <li onClick={() => setActive(DEVELOPERS)}>Developers</li>
                    <li onClick={() => setActive(MANAGEMENT)}>Management</li>
                    <li onClick={() => setActive(ALUMNI_RELATIONS)}>Alumni Relations</li>
                    <li onClick={() => setActive(STUDENT_RELATIONS)}>Student Relations</li>
                    <li onClick={() => setActive(ORATORS)}>Orators</li>
                    <li onClick={() => setActive(DESIGN)}>Design</li>
                    <li onClick={() => setActive(SOCIAL_MEDIA)}>Social Media</li>
                    <li onClick={() => setActive(CONTENT_WRITER)}>Cotent Writers</li>
                    <li onClick={() => setActive(DATA_COLLECTIOn)}>Data Collection</li>
                </ul>
            </div>

            <div className="team-members">

                <div className={setActiveClass(MENTORS)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(WEB_DEV)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(DEVELOPERS)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(MANAGEMENT)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(ALUMNI_RELATIONS)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(STUDENT_RELATIONS)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(ORATORS)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(DESIGN)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(SOCIAL_MEDIA)}>
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
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

                <div className={setActiveClass(DATA_COLLECTIOn)}>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                    <div className="member">
                        <img src={template} alt="pic"/>
                    </div>
                </div>

            </div>
        </div>
    )
}

Teams.propTypes = {

}

export default Teams
