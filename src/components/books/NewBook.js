import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NewBook extends Component {
    state = {
        title: '',
        ISBN: '',
        editorial: '',
        existence: ''
    };

    // Almacna lo que el usuario escribe
    readData = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // Guardar libro en la bd
    addBook = e => {
        e.preventDefault();
        //Tomar una copia del state
        const newBook = this.state;

        // Agregar un arreglo de prestados
        newBook.loans = [];

        // extraer firestore con sus metodos
        const { firestore, history } = this.props;

        // añadirlos a la base de datos y redireccionar
        firestore
            .add(
                {
                    collection: 'books'
                },
                newBook
            )
            .then(() => history.push('/'));
    };

    render() {
        return (
            <div className="row mb-5">
                <div className="col-12 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''} Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i> {''} Nuevo Libro
                    </h2>
                </div>
                <div className="row justify-content-center col-12">
                    <div className="col-md-9 mt-5">
                        <form onSubmit={this.addBook}>
                            <div className="form-group">
                                <label>Titulo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Titulo o Nombre de Libro"
                                    required
                                    value={this.state.title}
                                    onChange={this.readData}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Editoral:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="editorial"
                                    placeholder="Editorial de Libro"
                                    required
                                    value={this.state.editorial}
                                    onChange={this.readData}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>ISBN:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ISBN"
                                    placeholder="ISBN de Libro"
                                    required
                                    value={this.state.ISBN}
                                    onChange={this.readData}
                                ></input>
                            </div>
                            <div className="form-group">
                                <label>Existencia:</label>
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    name="existence"
                                    placeholder="Cantidad en Existencia"
                                    required
                                    value={this.state.existence}
                                    onChange={this.readData}
                                ></input>
                            </div>
                            <input type="submit" value="Agregar Libro" className="btn btn-success"></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

NewBook.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(NewBook);
