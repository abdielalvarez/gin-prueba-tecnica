/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component, Fragment } from 'react'
import ModalSignUp from './ModalSignUp';
import ModalSignIn from './ModalSignIn';
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
            samePassword: '',
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
        if (this.state.password !== this.state.samePassword) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password should be the same in both cases!',
            })
            window.location.reload()
        }
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }
        try {
            const res = await fetch('https://gin-backend.now.sh/api/auth/sign-up', options)
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
        this.state['apiKeyToken'] = '58479db83b67add9b3531ed78756128c8790c61b50b7fa00be7fd8c94b3ec330'
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
            const res = await fetch('https://gin-backend.now.sh/api/auth/sign-in', options)
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
                
                <ModalSignUp 
                    signUpIsOpen={this.state.signUpIsOpen}
                    toggleSignUp={this.toggleSignUp}
                    handleSignUp={this.handleSignUp}
                    handleChange={this.handleChange}
                    toggleSignIn={this.toggleSignIn}
                />

                <ModalSignIn 
                    signInIsOpen={this.state.signInIsOpen}
                    toggleSignIn={this.toggleSignIn}
                    handleSignIn={this.handleSignIn}
                    handleChange={this.handleChange}
                    toggleSignUp={this.toggleSignUp}
                />

            </Fragment>
        )
    }
}

export default Header
