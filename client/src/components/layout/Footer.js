import React from 'react'

const Footer = () => {
    return (
        <footer className="footer bg-dark">
            <div className="footer-left">
                <p className="logo lead text-primary">Afrosa</p>
                <ul >
                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                    <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fab fa-snapchat"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                </ul>
                <p className="copyright">&copy; Afrosa</p>
            </div>
            <div className="footer-right">
                <h2>Contact Us</h2>
                <div className="contacts">
                    <div className="contact">
                        <p>Head</p>
                        <p>Position</p>
                        <p>Contact</p>
                    </div>
                    <div className="contact">
                        <p>Head</p>
                        <p>Position</p>
                        <p>Contact</p>
                    </div>
                    <div className="contact">
                        <p>Head</p>
                        <p>Position</p>
                        <p>Contact</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;