import React from 'react'
import { useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux';
import actions from '../../redux/auth/duck/actions'

const logOut = (props) => {

    useEffect(() => {
        props.reset();
    });

    return <View/>
}

const mapDispatchToProps = dispatch => ({
    reset: () => dispatch(actions.reset(null)),
})

export default connect(null, mapDispatchToProps)(logOut);