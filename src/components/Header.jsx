/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Swal from 'sweetalert2';
import '../assets/styles/components/Header.scss';

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            signUpIsOpen: false,
            signInIsOpen: false,
            email: '',
            password: '',
        }
        this.toggleSignIn = this.toggleSignIn.bind(this);
        this.toggleSignUp = this.toggleSignUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
    }

    toggleSignUp = () => {
        this.setState({
            signUpIsOpen: !this.state.signUpIsOpen,
            signInIsOpen: false,
        })
    }

    toggleSignIn = () => {
        this.setState({
            signInIsOpen: !this.state.signInIsOpen,
            signUpIsOpen: false,
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSignUp = async (e) => {
        e.preventDefault()
        delete this.state.signInIsOpen
        delete this.state.signUpIsOpen
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_PRODUCTION_LINK}/api/auth/sign-up`, options)
            const json = await res.json()
            const str = JSON.stringify(json)
            localStorage.setItem('user', str)
            await Swal.fire({
                icon: 'success',
                title: 'You have an account now with us',
                showConfirmButton: true,
            })
            window.location.reload()
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'So sorry! The service is down, try later!',
            })
            window.location.reload() 
        }
    }

    handleSignIn = async (e) => {
        e.preventDefault()
        delete this.state.signInIsOpen
        delete this.state.signUpIsOpen
        this.state['apiKeyToken'] = process.env.REACT_APP_PUBLIC_API_KEY
        const { email, password } = this.state;
        const token = Buffer.from(`${email}:${password}`, 'utf-8').toString('base64');
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `basic ${token}`,
            },
            body: JSON.stringify(this.state),
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_PRODUCTION_LINK}/api/auth/sign-in`, options)
            const json = await res.json()
            const str = JSON.stringify(json)
            localStorage.setItem('user', str)
            await Swal.fire({
                icon: 'success',
                title: 'You have logged in succesfully',
                showConfirmButton: true,
            })
            window.location.reload()
        } catch {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'So sorry! The service is down, try later!',
            })
            window.location.reload() 
        }
    }

    handleSignOut = async () => {
        localStorage.removeItem('user')
        await Swal.fire({
            icon: 'success',
            title: 'You have logged out succesfully',
            showConfirmButton: true,
        })
        window.location.reload()
    }

    render() {
        return (
            <Fragment>
                <ul className='nav justify-content-end header'>
                    <li className='nav-item'>
                        <a className='nav-link header-sign-up text-warning' href='#' onClick={this.toggleSignUp}>Sign up</a>
                    </li>
                    {localStorage.getItem('user') ?
                        <li className='nav-item'>
                            <a className='nav-link header-sign-out text-warning' onClick={this.handleSignOut} href='#'>Logout</a>
                        </li> :
                        <li className='nav-item'>
                            <a className='nav-link header-sign-in text-warning' href='#' onClick={this.toggleSignIn}>Sign in</a>
                        </li>
                    }
                </ul>
                
                <Modal isOpen={this.state.signUpIsOpen} toggle={this.toggleSignUp}>
                    <ModalHeader toggle={this.toggleSignUp}>
                        <div className='container'>
                            <h3>Sign Up</h3>
                            <small className='text-muted'>Give us your email and password for signing up</small>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <form onSubmit={this.handleSignUp}>
                                <div className='form-group'>
                                    <input 
                                        type='email'
                                        name='email'
                                        className='form-control mb-2'
                                        placeholder='Email'
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        placeholder='Password'
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <small id='link-sign-up' className='form-text text-muted mb-3'>
                                    ¿Do you already have an account?
                                    <a href='#' onClick={this.toggleSignIn} className='ml-2'>
                                        Sign in here
                                    </a>
                                </small>
                                <button type='submit' className='btn btn-primary'>Sign Up</button>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.signInIsOpen} toggle={this.toggleSignIn}>
                    <ModalHeader toggle={this.toggleSignIn}>
                        <div className='container'>
                            <h3>Sign In</h3>
                            <small className='text-muted'>Give us your email and password for signing in</small>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <div className='container'>
                            <form onSubmit={this.handleSignIn}>
                                <div className='form-group'>
                                    <input 
                                        type='email'
                                        name='email'
                                        className='form-control mb-2'
                                        placeholder='Email'
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <input
                                        type='password'
                                        name='password'
                                        className='form-control'
                                        placeholder='Password'
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <small id='link-sign-up' className='form-text text-muted mb-3'>
                                    ¿Don't you have an account already?
                                    <a href='#' onClick={this.toggleSignUp} className='ml-2'>
                                        Sign up here
                                    </a>
                                </small>
                                <button type='submit' className='btn btn-primary'>Sign In</button>
                            </form>
                        </div>
                    </ModalBody>
                </Modal>

            </Fragment>
        )
    }
}

export default Header
