/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

function ModalSignUp({ signUpIsOpen, toggleSignUp, handleSignUp, handleChange, toggleSignIn }) {
    return (
        <Modal isOpen={signUpIsOpen} toggle={toggleSignUp}>
            <ModalHeader toggle={toggleSignUp}>
                <div className='container'>
                    <h3>Sign Up</h3>
                    <small className='text-muted'>Give us your email and password for signing up</small>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className='container'>
                    <form onSubmit={handleSignUp}>
                        <div className='form-group'>
                            <small id='emailHelp' className='form-text text-muted'>We'll never share your email with anyone else.</small>
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
                                className='form-control mb-2'
                                placeholder='Password'
                                onChange={handleChange}
                                required
                            />
                            <input
                                type='password'
                                name='samePassword'
                                className='form-control'
                                placeholder='Confirm your password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <small id='link-sign-up' className='form-text text-muted mb-3'>
                            ¿Do you already have an account?
                            <a href='#' onClick={toggleSignIn} className='ml-2'>
                                Sign in here
                            </a>
                        </small>
                        <button type='submit' className='btn btn-primary'>Sign Up</button>
                    </form>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ModalSignUp;
