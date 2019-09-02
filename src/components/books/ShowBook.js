import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class ShowBook extends Component {
    render() {
        // Extraer libro
        const { book } = this.props;

        if (!book) return <Spinner />;

        // Botón para solicitar un libro
        let btnLoan;

        if (book.existence - book.loans.length > 0) {
            btnLoan = (
                <Link to={`/books/loan/${book.id}`} className="btn btn-success my-3">
                    Solictar Prestamo
                </Link>
            );
        } else {
            btnLoan = null;
        }

        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-cirle-left"></i> {''} Volver al Listado
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/books/edit/${book.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i> {''} Editar Libro
                    </Link>
                </div>
                <hr className="mx-5 w-100"></hr>

                <div className="col-12">
                    <h2 className="mb-4">{book.title}</h2>
                    <p>
                        <span className="font-weight-bold">ISBN:</span> {book.ISBN}
                    </p>
                    <p>
                        <span className="font-weight-bold">Editorial:</span> {book.editorial}
                    </p>
                    <p>
                        <span className="font-weight-bold">Existencia:</span> {book.existence}
                    </p>
                    <p>
                        <span className="font-weight-bold">Disponibles:</span> {book.existence - book.loans.length}
                    </p>

                    {/* Boton para solicitar un prestamo de libro */}
                    {btnLoan}
                </div>
            </div>
        );
    }
}

ShowBook.propTypes = {
    firestore: PropTypes.object.isRequired
};

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
)(ShowBook);
