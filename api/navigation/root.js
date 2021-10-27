import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import actionsChat from '../redux/chat/duck/actions'
import actionsGroup from '../redux/group/duck/actions'
import actionsPlan from '../redux/plan/duck/actions'

import { NavigationContainer } from '@react-navigation/native';

import NoSing from './noSing';
import Sing from "./Sing";
import { View } from 'react-native';

//ROOT NAVIGACYJNY ZPRAWDZA CZY JESTEŚ ZALOGOWANY
const RootNavigaton = (props) => {

    return (
        <View style={{flex: 1}}>
            {props.token == null ?
                <NavigationContainer>
                    <NoSing />
                </NavigationContainer>
                :
                <NavigationContainer>
                    <Sing/>
                </NavigationContainer>
            }
        </View>
    );
}

const mapStateToProps = state => ({
    user: state.auth.user,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    addChat: item => dispatch(actionsChat.add(item)),
    addGroup: item => dispatch(actionsGroup.add(item)),
    addPlan: item => dispatch(actionsPlan.add(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigaton);