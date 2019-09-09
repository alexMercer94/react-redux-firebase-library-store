import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditBook extends Component {
    // refs
    titleInput = React.createRef();
    editorialInput = React.createRef();
    ISBNInput = React.createRef();
    existenceInput = React.createRef();

    // Update a book in firebase
    updateBook = e => {
        e.preventDefault();
        // Built new object
        const bookUpdated = {
            title: this.titleInput.current.value,
            editorial: this.titleInput.current.value,
            ISBN: this.titleInput.current.value,
            existence: this.titleInput.current.value
        };
        // leer firestore y history
        const { firestore, history, book } = this.props;
        // Update in firestore
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

    render() {
        // Obetener el libro
        const { book } = this.props;
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
                        <i className="fas fa-book"></i> {''} Editar Libro
                    </h2>
                </div>
                <div className="row col-12 justify-content-center mb-5">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={this.updateBook}>
                            <div className="form-group">
                                <label>Titulo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Titulo o Nombre de Libro"
                                    required
                                    defaultValue={book.title}
                                    ref={this.titleInput}
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
                                    defaultValue={book.editorial}
                                    ref={this.editorialInput}
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
                                    defaultValue={book.ISBN}
                                    ref={this.ISBNInput}
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
                                    defaultValue={book.existence}
                                    ref={this.existenceInput}
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
)(EditBook);
