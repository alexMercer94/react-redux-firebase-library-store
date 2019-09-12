import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import SubscriberTicket from '../subscribers/subscriberTicket';

// Redux actions
import { searchUser } from '../../redux/actions/seachUserActions';

class LoanBook extends Component {
    state = {
        search: '',
        noResult: false
    };

    // Buscar alumno por Código
    searchStudent = e => {
        e.preventDefault();

        // Obtener el valor a buscar
        const { search } = this.state;
        // Extraer firesfotre
        const { firestore, searchUser } = this.props;
        // Hacer la consulta
        const collection = firestore.collection('subscribers');
        const query = collection.where('code', '==', search).get();

        // leer los resultados
        query.then(response => {
            if (response.empty) {
                // No hay resultados
                // Almacenar en redux un objeto vacio
                searchUser({});
                // Actualizar el state en base si hay resultados
                this.setState({
                    noResult: true
                });
            } else {
                const data = response.docs[0];
                // Colocar el resultado en el State de Redux
                searchUser(data.data());
                // Actualizar el state en base si hay resultados
                this.setState({
                    noResult: false
                });
            }
        });
    };

    // Almacena los datos del Alumnopara solicitar el libro
    applyForLoan = () => {
        const { user } = this.props;
        // Fecha de alta
        user.fecha_solicitud = new Date().toLocaleDateString();
        // No se pueden mutar los props, tomar una copia y crear un arreglo nuevo.ml-autolet
        let loans = [];
        loans = [...this.props.book.loans, user];

        // Copiar el objeto y agregar los prestados
        const book = { ...this.props.book };

        // Eliminar los prestado anteriores
        delete book.loans;
        // Asignar los prestados
        book.loans = loans;
        // Obtener firestore y history de props
        const { firestore, history } = this.props;
        // Almacenar en la BD
        firestore
            .update(
                {
                    collection: 'books',
                    doc: book.id
                },
                book
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

        // Mostrar spinner
        if (!book) return <Spinner></Spinner>;

        // Extraer los datos del alumno
        const { user } = this.props;

        let studentTicket, btnSolicit;
        if (user.name) {
            studentTicket = <SubscriberTicket student={user}></SubscriberTicket>;
            btnSolicit = (
                <button type="button" className="btn btn-primary btn-block mb-4" onClick={this.applyForLoan}>
                    Solicitar Prestamo
                </button>
            );
        } else {
            studentTicket = null;
            btnSolicit = null;
        }

        // Mostrar un mensaje de error
        let messageResult = '';
        const { noResult } = this.state;
        if (noResult) {
            messageResult = <div className="alert alert-danger text-center font-weight-bold">No hay resultados</div>;
        } else {
            messageResult = null;
        }

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
                            {/* Muestra un mensaje de no resultados */}
                            {messageResult};
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
    connect(
        ({ firestore: { ordered }, user }, props) => ({
            book: ordered.book && ordered.book[0],
            user: user
        }),
        { searchUser }
    )
)(LoanBook);
