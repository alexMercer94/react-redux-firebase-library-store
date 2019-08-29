import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

class EditSubscriber extends Component {
    // Create Refs
    nameInput = React.createRef();
    surnameInput = React.createRef();
    careerInput = React.createRef();
    codeInput = React.createRef();

    // Edit subscriber en DB
    editSubscriber = e => {
        e.preventDefault();

        //Crear el objeto que va a actualizar
        const subscriberUpdated = {
            name: this.nameInput.current.value,
            surname: this.surnameInput.current.value,
            career: this.careerInput.current.value,
            code: this.codeInput.current.value
        };

        // Extract firestore and history from props
        const { subscriber, firestore, history } = this.props;

        // Almacenar en la base de datos con firestore
        firestore
            .update(
                {
                    collection: 'subscribers',
                    doc: subscriber.id
                },
                subscriberUpdated
            )
            .then(history.push('/subscribers'));
    };

    render() {
        const { subscriber } = this.props;

        if (!subscriber) return <Spinner></Spinner>;

        return (
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to={'/subscribers'} className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>
                        {''} Volver al Listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-user"></i> {''} Editar Subscriptor
                    </h2>
                </div>
                <div className="row col-12 justify-content-center mb-5">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={this.editSubscriber}>
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Nombre del Subscriptor"
                                    required
                                    ref={this.nameInput}
                                    defaultValue={subscriber.name}
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
                                    ref={this.surnameInput}
                                    defaultValue={subscriber.surname}
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
                                    ref={this.careerInput}
                                    defaultValue={subscriber.career}
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
                                    ref={this.codeInput}
                                    defaultValue={subscriber.code}
                                ></input>
                            </div>
                            <input
                                type="button"
                                onClick={this.editSubscriber}
                                value="Editar subscriptor"
                                className="btn btn-success"
                            ></input>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditSubscriber.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        {
            collection: 'subscribers',
            storeAs: 'subscriber',
            doc: props.match.params.id
        }
    ]),
    connect(({ firestore: { ordered } }, props) => ({
        subscriber: ordered.subscriber && ordered.subscriber[0]
    }))
)(EditSubscriber);
