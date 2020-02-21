import React from 'react'
import '../assets/styles/components/Footer.scss'

function Footer() {
    return (
        <div className='footer-container'>
            <div className="row footer-row pt-5 pl-4 pr-4">
                <div className="col-12 col-sm-6 col-lg-3 text-center">
                    <h3 className='text-warning'>About the project</h3>
                    <p className='text-light'>
                        This project has a login, logout and sign up that directly interact with a custom backend
                        made by me, that backend is already connected to mongo to keep your data and was deployed on now.
                        Hopefully you'll enjoy my project, Regards!
                    </p>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 text-center">    
                    <h3 className='text-warning'>Techs</h3>
                    <ul className='footer-list-1 text-light'>
                        <li>Javascript (ES7)</li>
                        <li>React</li>
                        <li>Bootstrap</li>
                        <li>Reactstrap</li>
                        <li>Sass</li>
                        <li>Node</li>
                        <li>Express</li>
                        <li>Passport</li>
                        <li>MongoDB</li>
                        <li>Git/GitHub</li>
                        <li>Now</li>
                    </ul>  
                </div>
                <div className="col-12 col-sm-6 col-lg-3 text-center">    
                    <h3 className='text-warning'>Tools</h3>
                    <ul className='footer-list-2 text-light'>
                        <li>Node-Sass</li>
                        <li>Sweetalert2</li>
                        <li>Eslint</li>
                        <li>Cors</li>
                        <li>@Hapi/Joi</li>
                        <li>@Hapi/Boom</li>
                        <li>Dotenv</li>
                        <li>Bcryptjs</li>
                        <li>Postman</li>
                        <li>Robo3T</li>
                    </ul>
                </div>
                <div className="col-12 col-sm-6 col-lg-3 text-center">
                    <h3 className='text-warning'>Stay with me</h3>
                    <p className='text-light'>
                        github.com/abdielalvarez
                        www.linkedin.com/in/abdielalvarezrojas
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
