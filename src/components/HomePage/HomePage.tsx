import React, { FunctionComponent } from 'react';
import { auth } from '../../redux/auth/actions';
import { connect } from 'react-redux';
import { State } from '../../redux/store';

export type HomePageProps = {
    path: string;
    logout: () => void;
}

const HomePage: FunctionComponent<HomePageProps> = ({ logout }) => {
    return (
        <>
            <h1>gwag</h1>
            <button onClick={logout}>signout</button>
        </>
    )
}

const mapStateToProps = (state: State) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({

    logout: () => dispatch(auth.actions.signoutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
