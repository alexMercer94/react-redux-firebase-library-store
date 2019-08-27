import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';

const Subscribers = ({ subcribers, firestore, history }) => {
    if (!subcribers) return <Spinner></Spinner>;

    // Delete subscribers
    const deleteSubscriber = id => {
        // Delete
        firestore.delete({
            collection: 'subscribers',
            doc: id
        });
    };
    return (
        <div className="row">
            <div className="col-md-12 mb-4">
                <Link to="/subscribers/new" className="btn btn-primary">
                    <i className="fas fa-plus"></i> {''} Nuevo Subscriptor
                </Link>
            </div>
            <div className="col-md-12 mb-8">
                <h2>
                    <i className="fas fa-users"></i> Subscriptores
                </h2>
            </div>
            <table className="table table-striped mt-4">
                <thead className="text-light bg-primary">
                    <tr>
                        <th>Nombre</th>
                        <th>Carrera</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {subcribers.map(subscriber => (
                        <tr key={subscriber.id}>
                            <td>
                                {subscriber.name} {subscriber.surname}
                            </td>
                            <td>{subscriber.career}</td>
                            <td>
                                <Link to={`/subscribers/show/${subscriber.id}`} className="btn btn-success btn-block">
                                    <i className="fas fa-angle-double-right"></i>
                                    {''} Más información
                                </Link>
                                <button
                                    onClick={() => deleteSubscriber(subscriber.id)}
                                    type="button"
                                    className="btn btn-danger btn-block"
                                >
                                    <i className="fas fa-trash"></i>
                                    {''} Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Subscribers.propTypes = {
    firestore: PropTypes.object.isRequired,
    subcribers: PropTypes.array
};

export default compose(
    firestoreConnect([{ collection: 'subscribers' }]),
    connect((state, props) => ({
        subcribers: state.firestore.ordered.subscribers
    }))
)(Subscribers);
