import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    // Almacenar lo que el usuario escriba en el state
    readData = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // Iniciar sesión en firebase
    login = e => {
        e.preventDefault();
        //Extraer firebase de props
        const { firebase } = this.props;
        // Extraer data del state
        const { email, password } = this.state;

        // Autenticar el usuario
        firebase
            .login({
                email,
                password
            })
            .then(result => {
                console.log('Iniciaste Sesión');
            })
            .catch(error => console.log('Error'));
    };

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h2 className="text-center py-4">
                                <i className="fas fa-lock"></i> {''}
                                Iniciar Sesión
                            </h2>
                            <form onSubmit={this.login}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        required
                                        value={this.state.email}
                                        onChange={this.readData}
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        required
                                        value={this.state.password}
                                        onChange={this.readData}
                                    ></input>
                                </div>
                                <input
                                    type="submit"
                                    className="btn btn-success btn-block"
                                    value="Iniciar Sesión"
                                ></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propType = {
    firebase: PropTypes.object.isRequired
};

export default firebaseConnect()(Login);
