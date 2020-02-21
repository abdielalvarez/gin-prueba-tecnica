import React, { Component, Fragment } from 'react';
import Result from '../components/Result';
import Binary from '../components/Binary';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../assets/styles/containers/Home.scss';

class Home extends Component {

    constructor () {
        super()
        this.state = {
            palindromic: '',
            loading: false,
            results: [],
            error: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.total = this.total.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        });
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            // ESTE IF EXISTE POR LA INDICACIÓN DEL NÚMERO DEFAULT 1,000,000
            if (!this.state.palindromic || this.state.palindromic === []) {
                const defaultNumber = '1000000'
                const res = await fetch(`https://gin-backend.now.sh/result/${defaultNumber}`, options)
                const json = await res.text()
                const data =  JSON.parse(json)
                this.setState({
                    loading: false,
                    results: data,
                });
            } else {
                const res = await fetch(`https://gin-backend.now.sh/result/${this.state.palindromic}`, options)
                const json = await res.text()
                const data =  JSON.parse(json)
                this.setState({
                    loading: false,
                    results: data,
                });
            }
        } catch {
            this.setState({
                error: 'Hubo un problema con tu servicio, Favor de intentarlo más tarde',
                loading: false,
            })
        }
    }

    total = () => {
        const { results } = this.state;
        if (results.length !== 0) {
            const mapped = results.map((item) => {
                if (item.pal === undefined) {
                    return 0
                }
                return item.pal
            })
            const reduced = mapped.reduce((acc, cur) => {
                const sum = acc + cur;
                return sum;
            })
            return reduced
        }
    }

    render() {
        const { results, loading, error } = this.state;
        return (
            <Fragment>
                <Header />
                <div className='container home_container'>
                    <div className='row home_row-1 text-center mt-3 mb-3'>
                        <h1 className=''>Define your superior limit to know palindromic decimal and binaries</h1>
                        <small>App made by Abdiel Álvarez</small>
                    </div>
                    <div className='row home_row-2 mb-5'>
                        <form onSubmit={this.handleSubmit} className='home_form'>
                            <input
                                type='text'
                                className='form-control home_input'
                                name='palindromic'
                                placeholder='Write a limit'
                                onChange={this.handleChange}
                            />
                            <button 
                                type='submit'
                                className='btn btn-warning home_button'
                            >
                            Show palindromics
                            </button>
                        </form>
                    </div>
                    <div className='row home_row-3 mb-5'>
                        <div className='col-12 col-sm-12 col-lg-3'>
                            {/* {loading ?
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> :
                                null
                            } */}
                            {!results.length ?
                                null : loading ? 
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> :
                                <>
                                    <h4 className='text-center'>Sum of decimal palindromics</h4>
                                    <h3 className='alert alert-info text-center'>{this.total()}</h3>
                                </>
                            }
                        </div>
                        <div className='col-12 col-sm-12 col-lg-3'>
                            {!results.length ?
                                null : loading ?
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> :
                                <>
                                    <h4 className='text-center'>Sum of palindromic matches</h4>
                                    <h3 className='alert alert-info text-center'>{results.length}</h3>
                                </>
                            }
                        </div>
                        <div className='col-12 col-sm-6 col-lg-3 mb-3'>
                            {!results.length ?
                                null :
                                <h4 className='text-center'>Decimals</h4>
                            }
                            {loading ?
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : error !== '' ? 
                                <h3>{error}</h3> :
                                (results.map((item, index) => {
                                    const { pal } = item;
                                    return <Result palindromic={pal} key={index} />
                                }))}
                        </div>
                        <div className='col-12 col-sm-6 col-lg-3'>
                            {!results.length ?
                                null :
                                <h4 className='text-center'>Binaries</h4>
                            }
                            {loading ?
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : error !== '' ? 
                                <h3>{error}</h3> :
                                (results.map((item, index) => {
                                    const { bin } = item;
                                    return <Binary binary={bin} key={index} />
                                }))}
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
}

export default Home

