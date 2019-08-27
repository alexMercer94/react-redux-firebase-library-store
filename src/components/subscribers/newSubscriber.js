import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NewSubscriber extends Component {
    state = {
        name: '',
        surname: '',
        career: '',
        code: ''
    };

    // Extraer los valores del input y colocarlos en el state
    readData = e => {
        this.setState({
            [e.target.name]: [e.target.value]
        });
    };

    // Agregar un nuevo subscriptor a la db
    addSubscriber = e => {
        e.preventDefault();

        // Extraer los valos del State
        const newSubcriber = { ...this.state };

        // Extraer firestore de props
        const { firestore, history } = this.props;

        // Guardarlo en el bd
        firestore
            .add(
                {
                    collection: 'subscribers'
                },
                newSubcriber
            )
            .then(() => history.push('/subscribers'));
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-12 mb-4">
                    <Link to={'/subscribers'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                        {''} Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user-plus"></i> {''} Nuevo Subscriptor
                    </h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={this.addSubscriber}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Nombre del Subscriptor"
                                    required
                                    onChange={this.readData}
                                    value={this.state.name}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Apellido:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="surname"
                                    placeholder="Apellido del Subscriptor"
                                    required
                                    onChange={this.readData}
                                    value={this.state.surname}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Carrera:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="career"
                                    placeholder="Carrera del Subscriptor"
                                    required
                                    onChange={this.readData}
                                    value={this.state.career}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Código:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="code"
                                    placeholder="Código del Subscriptor"
                                    required
                                    onChange={this.readData}
                                    value={this.state.code}
                                ></input>
                            </div>
                            <input type="subtmit" value="Agregar subscriptor" className="btn btn-success"></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

NewSubscriber.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NewSubscriber);
