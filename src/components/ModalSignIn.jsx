/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function ModalSignIn({ signInIsOpen, toggleSignIn, handleSignIn, handleChange, toggleSignUp }) {
    return (
        <Modal isOpen={signInIsOpen} toggle={toggleSignIn}>
            <ModalHeader toggle={toggleSignIn}>
                <div className='container'>
                    <h3>Sign In</h3>
                    <small className='text-muted'>Give us your email and password for signing in</small>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className='container'>
                    <form onSubmit={handleSignIn}>
                        <div className='form-group'>
                            <input 
                                type='email'
                                name='email'
                                className='form-control mb-2'
                                placeholder='Email'
                                onChange={handleChange}
                                required
                            />
                            <input
                                type='password'
                                name='password'
                                className='form-control'
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <small id='link-sign-up' className='form-text text-muted mb-3'>
                            ¿Don't you have an account already?
                            <a href='#' onClick={toggleSignUp} className='ml-2'>
                                Sign up here
                            </a>
                        </small>
                        <button type='submit' className='btn btn-primary'>Sign In</button>
                    </form>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalSignIn
