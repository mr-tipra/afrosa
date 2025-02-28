import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import template from "./images/template.gif";

//images import
import abhi_sr from "./images/abhi_sr.gif";
import anuj_sr from "./images/anuj_sr.gif";
import aryan_smh from "./images/aryan-smh.gif";
import avi_mng from "./images/avi-mng.gif";
import darpan_smh from "./images/darpan-smh.gif";
import dean from "./images/dean.gif";
import disha_ar from "./images/disha-ar.gif";
import harsh_orator from "./images/harsh_orator.gif";
import harsh_wd from "./images/harsh-wd.gif";
import harshg_ar from "./images/harshg-ar.gif";
import kartik_wd from "./images/kartik-wd.gif";
import kashish_orator from "./images/kashish_orator.gif";
import manan_mc from "./images/manan-mc.gif";
import manoram_mng from "./images/manoram-mng.gif";
import mentor from "./images/mentor.gif";
import mimansha_orator from "./images/mimansha_orator.gif";
import nimish_smh from "./images/nimish-smh.gif";
import nouman_wd from "./images/nouman-wd.gif";
import parth_content from "./images/parth_content.gif";
import prachi_content from "./images/prachi_content.gif";
import principal from "./images/principal.gif";
import samyak_ar from "./images/samyak-ar.gif";
import sandesh_content from "./images/sandesh-content.gif";
import sejal_ar from "./images/sejal-ar.gif";
import smiti_sr from "./images/smiti-sr.gif";
import sumit_mng from "./images/sumit_mng.gif";
import suryansh_orator from "./images/suryansh-orator.gif";
import vaibhavi_mng from "./images/vaibhavi_mng.gif";
import vivek_des from "./images/vivek-des.gif";
import yash_mng from "./images/yash-mng.gif";
import yathartha_ar from "./images/yathartha-ar.gif";

//founders
import vikram_cao from "./founders/vikram_cao.jpg";
import karan_cmo from "./founders/karan_cmo.jpg";
import adarsh_ceo from "./founders/adarsh_ceo.jpg";
import arpit_dev from "./founders/arpit_lead_dev.jpeg";
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
    const MEDIA_COORDINATOR = "MEDIA_COORDINATOR";

    const [active, setActive] = useState(MANAGEMENT);

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
        <div className="container team-founders">
            <h1>Founders</h1>
            <div className="founders">
                <div className="founder">
                    <div className="image">
                        <img src={adarsh_ceo} alt="ceo"/>
                    </div>
                    <span className="name">Adarsh Gupta</span>
                    <span className="role">Executive Head</span>
                </div>
                <div className="founder">
                    <div className="image">
                        <img src={karan_cmo} alt="cmo"/>
                    </div>
                    <span className="name">Karan Singh Tomar</span>
                    <span className="role">Management Head</span>
                </div>
                <div className="founder">
                    <div className="image">
                        <img src={vikram_cao} alt="cao"/>
                    </div>
                    <span className="name">Vikram Kesharwani</span>
                    <span className="role">Administrative Head</span>
                </div>
                <div className="founder">
                    <div className="image">
                        <img src={arpit_dev} alt="lead developer"/>
                    </div>
                    <span className="name">Arpit Singh</span>
                    <span className="role">Technical Head</span>
                </div>
            </div>
            <h1 >Our Team</h1>
            <div className="team">
                <div className="departments">
                    <ul>
                        <li onClick={() => setActive(MANAGEMENT)}>Management</li>
                        <li onClick={() => setActive(WEB_DEV)}>Web Development</li>

                        <li onClick={() => setActive(ALUMNI_RELATIONS)}>Alumni Relations</li>
                        <li onClick={() => setActive(STUDENT_RELATIONS)}>Student Relations</li>
                        <li onClick={() => setActive(ORATORS)}>Orators</li>
                        <li onClick={() => setActive(DESIGN)}>Design</li>
                        <li onClick={() => setActive(SOCIAL_MEDIA)}>Social Media</li>
                        <li onClick={() => setActive(CONTENT_WRITER)}>Content Writers</li>
                        <li onClick={() => setActive(MEDIA_COORDINATOR)}>Media Coordinator</li>
                    </ul>
                </div>

                <div className="team-members">

            
                    
                    {active === WEB_DEV &&
                    <div className={setActiveClass(WEB_DEV)}>
                        <div className="member">
                            <img src={harsh_wd} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={kartik_wd} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={nouman_wd} alt="pic"/>
                        </div>

                    </div>
                    }

            
                    {active === MANAGEMENT &&
                    <div className={setActiveClass(MANAGEMENT)}>
                        <div className="member">
                            <img src={manoram_mng} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={sumit_mng} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={vaibhavi_mng} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={yash_mng} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={avi_mng} alt="pic"/>
                        </div>
                    </div>
                    }

                    {active === ALUMNI_RELATIONS &&
                    <div className={setActiveClass(ALUMNI_RELATIONS)}>
                        <div className="member">
                            <img src={disha_ar} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={harshg_ar} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={samyak_ar} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={sejal_ar} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={yathartha_ar} alt="pic"/>
                        </div>
                    </div>
                    }

                    {active === STUDENT_RELATIONS &&
                    <div className={setActiveClass(STUDENT_RELATIONS)}>
                        <div className="member">
                            <img src={abhi_sr} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={anuj_sr} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={smiti_sr} alt="pic"/>
                        </div>
                    </div>
                    }

                    {active === ORATORS &&
                    <div className={setActiveClass(ORATORS)}>
                        <div className="member">
                            <img src={harsh_orator} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={kashish_orator} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={mimansha_orator} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={suryansh_orator} alt="pic"/>
                        </div>
                    </div>
                    }

                    {active === DESIGN &&
                    <div className={setActiveClass(DESIGN)}>
                        <div className="member">
                            <img src={vivek_des} alt="pic"/>
                        </div>
                    </div>
                    }

                    {active === SOCIAL_MEDIA &&
                    <div className={setActiveClass(SOCIAL_MEDIA)}>
                        <div className="member">
                            <img src={aryan_smh} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={darpan_smh} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={nimish_smh} alt="pic"/>
                        </div>
                    </div>
                    }   
                    {active === CONTENT_WRITER &&
                    <div className={setActiveClass(CONTENT_WRITER)}>
                        <div className="member">
                            <img src={parth_content} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={prachi_content} alt="pic"/>
                        </div>
                        <div className="member">
                            <img src={sandesh_content} alt="pic"/>
                        </div>
                    </div>
                    }

                    {active === MEDIA_COORDINATOR &&
                    <div className={setActiveClass(MEDIA_COORDINATOR)}>
                        <div className="member">
                            <img src={manan_mc} alt="pic"/>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

Teams.propTypes = {

}

export default Teams
