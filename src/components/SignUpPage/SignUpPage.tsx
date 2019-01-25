import React, { FunctionComponent, FormEvent } from 'react';
import { State } from '../..';
import { connect } from 'react-redux';
import { useInput } from './../../hooks/useInput';
import { auth } from '../../redux/auth/actions';

type SignUpPageProps = {
    path: string;
    signUp: (email: string, password: string) => void;
    signIn: (email: string, password: string) => void;
}

const SignUpPage: FunctionComponent<SignUpPageProps> = ({ signUp, signIn }) => {
    const signinEmail = useInput();
    const signinPassword = useInput();
    const loginEmail = useInput();
    const loginPassword = useInput();

    function signup(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        signUp(signinEmail.value, signinPassword.value)
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        signIn(loginEmail.value, loginPassword.value)
    }


    return (
        <>
            <h1>signup page</h1>
            <form onSubmit={signup}>
                <input {...signinEmail} type="email" />
                <input {...signinPassword} type="password" />
                <button type="submit">signup</button>
            </form>
            <br />
            <form onSubmit={login}>
                <input {...loginEmail} type="email" />
                <input {...loginPassword} type="password" />
                <button type="submit">log in</button>
            </form>
        </>
    )
}

const mapStateToProps = (state: State) => ({
    auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => ({
    signUp: (email: string, password: string) => dispatch(auth.actions.signUpRequest({ email, password })),
    signIn: (email: string, password: string) => dispatch(auth.actions.signInRequest({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
