import React from 'react'

const Footer = () => {
    return (
        <footer className="footer bg-dark">
            <div className="footer-left">
                <p className="logo lead text-primary">Afrosa</p>
                <ul >
                    <li><a href="https://www.youtube.com/channel/UCNmyez95vyTxeKEPVbhBWnw/about"><i className="fab fa-youtube"></i></a></li>
                    <li><a href="https://www.facebook.com/Afrosa_uecu-111444910516445/"><i className="fab fa-facebook"></i></a></li>
                    <li><a href="https://www.instagram.com/afrosa_uecu/"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="https://twitter.com/AfrosaUecu"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com/in/afrosa-uecu-a324561a8/"><i className="fab fa-linkedin"></i></a></li>
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