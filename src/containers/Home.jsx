import React, { Component } from 'react';
import Result from '../components/Result';

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
            const res = await fetch(`https://gin-backend.now.sh/result/${this.state.palindromic}`, options)
            // const res = await fetch(`http://localhost:3001/result/${this.state.palindromic}`, options)
            const json = await res.text()
            const data =  JSON.parse(json)
            this.setState({
                loading: false,
                results: data,
            });
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
            <div className='container'>
                <div className="row">
                    <h1>Define your superior limit to know palindromic numbers</h1>
                </div>
                <div className="row">
                    <div className="col-6">
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type='text'
                                name='palindromic'
                                onChange={this.handleChange}
                            />
                            <button 
                                type='submit'
                            >
                            Know how many palindromics can give you this limit
                            </button>
                        </form>
                    </div>
                    <div className="col-3">
                        <h1>Result</h1>
                        {loading ?
                            <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> : error !== '' ? 
                            <h3>{error}</h3> :
                            (results.map((item, index) => {
                                const { pal } = item;
                                return <Result palindromic={pal} key={index} />
                            }))
                            }
                    </div>
                    <div className="col-3">
                        {!results ?
                            null :
                            <h3>{this.total()}</h3>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Home

