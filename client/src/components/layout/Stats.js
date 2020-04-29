import React, {useState, useEffect} from "react";
import axios from "axios";

const Stats = props => {

    const [stats, setStats] = useState({
        students:0,
        alumni:0,
        companies: 0
    });

    useEffect(() => {

        axios.get("/api/users/stats")
        .then(res => {

            const id1 = setInterval( () => {
                setStats(state => {
                    if(state.students >= res.data.stats.students){
                        clearInterval(id1);
                        return {...state, students:res.data.stats.students};
                    }
                    return {...state, students: state.students+1}
                });
             }, 33);

             const id2 = setInterval( () => {
                setStats(state => {
                    if(state.alumni >= res.data.stats.alumni){
                        clearInterval(id2);
                        return {...state, alumni:res.data.stats.alumni};
                    }
                    return {...state, alumni: state.alumni+1}
                });
             }, 33);

             const id3 = setInterval( () => {
                setStats(state => {
                    if(state.companies >= res.data.stats.companies){
                        clearInterval(id3);
                        return {...state, companies:res.data.stats.companies};
                    }
                    return {...state, companies: state.companies+1}
                });
             }, 33);
        })
        .catch(err => {
            console.log(err.response.data.msg);
        });

    


    }, []);

    return (
        <div className="stats-block">
            <h2 className="x-large text-primary">Afrosa</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis veniam corrupti amet modi nemo ab dicta unde accusantium aspernatur sapiente pariatur facilis laudantium accusamus veritatis possimus, optio iure! Dolorum ea, explicabo, excepturi deserunt debitis quae id, quas commodi neque perspiciatis recusandae? Suscipit accusantium illo, ratione quisquam itaque fuga vero consequatur.</p>

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