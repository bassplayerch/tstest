import React, { FunctionComponent } from 'react';
import { useInput } from '../../hooks/useInput';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

type ActivateEmailPageProps = {
    path: string;
}

const ActivateEmailPage: FunctionComponent<ActivateEmailPageProps> = props => {

    const emailInput = useInput();


    return (
        <>
            <h1> activate email</h1>
            <form>
                <input {...emailInput} type="email"/>
                <button type="submit">Send Email</button>
            </form>
        </>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export default connect(null, mapDispatchToProps)(ActivateEmailPage);