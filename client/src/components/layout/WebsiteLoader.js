import React from 'react'
import PropTypes from 'prop-types'
import loaderImage from "../../assests/loaderImage.png";
const WebsiteLoader = props => {
    return (
    <div className="site-loader">
        <img src={loaderImage} alt="loaderSite" />
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40"/>
        </svg>
      <h2>"It always seems impossible until it is done"</h2>        
      <p>Nelson Mandela</p>
    </div>
    )
}

WebsiteLoader.propTypes = {

}

export default WebsiteLoader
