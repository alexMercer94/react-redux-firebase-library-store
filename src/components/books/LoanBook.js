import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import SubscriberTicket from '../subscribers/subscriberTicket';

class LoanBook extends Component {
    state = {
        search: '',
        result: {},
        noResult: false
    };

    // Buscar alumno por Código
    searchStudent = e => {
        e.preventDefault();

        // Obtener el valor a buscar
        const { search } = this.state;
        // Extraer firesfotre
        const { firestore } = this.props;
        // Hacer la consulta
        const collection = firestore.collection('subscribers');
        const query = collection.where('code', '==', search).get();

        // leer los resultados
        query.then(response => {
            if (response.empty) {
                // No hay resultados
                this.setState({
                    noResult: true,
                    result: {}
                });
            } else {
                const data = response.docs[0];
                this.setState({
                    result: data.data(),
                    noResult: false
                });
            }
        });
    };

    // Almacena los datos del Alumnopara solicitar el libro
    applyForLoan = () => {
        const subscriber = this.state.result;
        // Fecha de alta
        subscriber.fecha_solicitud = new Date().toLocaleDateString();
        // Obetener el libro
        const bookUpdated = this.props.book;

        // Agregar el susbcriptor al libro
        bookUpdated.loans.push(subscriber);

        // Obtener firestore y history de props
        const { firestore, history, book } = this.props;
        // Almacenar en la BD
        firestore
            .update(
                {
                    collection: 'books',
                    doc: book.id
                },
                bookUpdated
            )
            .then(history.push('/'));
    };

    // Almacenar codigo en el state
    readData = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        // Extraerel libro
        const { book } = this.props;

        // Extraer los datos del alumno
        const { noResult, result } = this.state;

        let studentTicket, btnSolicit;
        if (result.name) {
            studentTicket = <SubscriberTicket student={result}></SubscriberTicket>;
            btnSolicit = (
                <button type="button" className="btn btn-primary btn-block mb-4" onClick={this.applyForLoan}>
                    Solicitar Prestamo
                </button>
            );
        } else {
            studentTicket = null;
            btnSolicit = null;
        }

        // Mostrar spinner
        if (!book) return <Spinner></Spinner>;
        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                        {''} Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i> {''} Solicitar Prestamo: {book.title}
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <form onSubmit={this.searchStudent} className="mb-4">
                                <legend className="color-primary text-center mt-5">
                                    Busca el Subscriptor por Código
                                </legend>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="search"
                                        className="form-control"
                                        onChange={this.readData}
                                    ></input>
                                </div>
                                <input
                                    type="submit"
                                    value="Buscar Alumno"
                                    className="btn btn-success btn-block"
                                ></input>
                            </form>
                            {/* Muestra la ficha del alumno y el boton para solicitar el prestamos */}
                            {studentTicket}
                            {btnSolicit}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    firestoreConnect(props => [
        {
            collection: 'books',
            storeAs: 'book',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        book: ordered.book && ordered.book[0]
    }))
)(LoanBook);
