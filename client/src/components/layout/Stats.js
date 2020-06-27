import React, {useState, useEffect} from "react";
import axios from "axios";

const Stats = props => {

    const [stats, setStats] = useState({
        students:0,
        alumni:0,
        companies: 0
    });

    useEffect(() => {
        const ids = []

        axios.get("/api/users/stats")
        .then(res => {

            const id1 = setInterval( () => {
                setStats(state => {
                    if(state.students >= res.data.stats.students){
                        clearInterval(id1);
                        return {...state, students:res.data.stats.students};
                    }
                    return {...state, students: state.students+5}
                });
             }, 33);

             const id2 = setInterval( () => {
                setStats(state => {
                    if(state.alumni >= res.data.stats.alumni){
                        clearInterval(id2);
                        return {...state, alumni:res.data.stats.alumni};
                    }
                    return {...state, alumni: state.alumni+5}
                });
             }, 33);

             const id3 = setInterval( () => {
                setStats(state => {
                    if(state.companies >= res.data.stats.companies){
                        clearInterval(id3);
                        return {...state, companies:res.data.stats.companies};
                    }
                    return {...state, companies: state.companies+5}
                });
             }, 33);
             ids.push(id1);
             ids.push(id2);
             ids.push(id3);
        })
        .catch(err => {
            console.log(err.response.data.msg);
        });

        return () => {
            ids.map(id => clearInterval(id));
        }
       

    }, []);

    return (
        <div className="stats-block">
            <h2 className="x-large text-primary">Afrosa</h2>
            <h2>Stats</h2>

            <div className="stats">
                <div className="stat">
                    <i className="fas fa-pencil-alt"></i>
                    <span className="stat-value">{stats.students}</span>
                    <span>Students</span>
                </div>
                <div className="stat">
                    <i className="fas fa-graduation-cap"></i>
                    <span className="stat-value">{stats.alumni}</span>
                    <span>Alumni</span>
                </div>
                <div className="stat">
                    <i className="fas fa-industry"></i>
                    <span className="stat-value">{stats.companies}</span>
                    <span>Companies</span>
                </div>
            </div>

        </div>
    );
}


export default Stats;