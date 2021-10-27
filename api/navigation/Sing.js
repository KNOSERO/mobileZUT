import React, {useEffect} from 'react';
import { createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import LogoHeder from '../asset/logoHeder';
import { connect } from 'react-redux';

import MenuNavigation from "./menu";
import GroupDataScreen from "../screen/group/groupDataScreen";
import MessageListScreen from "../screen/chat/messageListScreen";

import actionsChat from '../redux/chat/duck/actions'
import actionsGroup from '../redux/group/duck/actions'
import actionsPlan from '../redux/plan/duck/actions'

import DiagramScreen from "../screen/hour/diagram";
import MapScreen from "../screen/hour/map";
import Transport from "../screen/hour/transport";

import RestAPI from "../component/restApi";

import { View } from "react-native";

const StackNoSing = createStackNavigator();

const MapNav = ({ navigation, route }) => {
    return (
        <MapScreen />
    );
}

const TransportNav = ({ navigation, route }) => {
    return (
        <Transport />
    );
}

const DiagramNav = ({ navigation, route }) => {
    return (
        <DiagramScreen />
    );
}

//MENU ZAUTORYZOWANEGO URZYTKOWNIKA
const Sing = (props) => {
    
    const fetchChat = new RestAPI.RestChatlient();
    const fetchCalendar = new RestAPI.RestCalendarClient();
    const fetchUser = new RestAPI.RestUserClient();

    (async () => {
        if(props.token != null){
            const temp = await fetchChat.getChat(props.token);
            props.addChat(temp.chats);
        }
    })();
    useEffect(()=> {
        const temp = setInterval(async () => {
            if(props.token != null){
                const tempC = await fetchChat.getChat(props.token);
                props.addChat(tempC.chats);
                const tempP = await fetchCalendar.getPlan(props.token);
                props.addPlan(tempP);
                const tempG = await fetchUser.getGroup(props.token);
                props.addGroup(tempG.groups);    
            }
        }, 5000);
        return () => {
            clearInterval(temp);
        }
    }, []);

    return (
        <StackNoSing.Navigator>
            <StackNoSing.Screen
                name="Menu"
                component={MenuNavigation}
                options={{headerShown: false}}
            />
            <StackNoSing.Screen
                name="Message"
                component={MessageListScreen}
                options={{
                    headerTitle: () => <LogoHeder />,
                    headerRight: () => <View />,
                }}
            />
            <StackNoSing.Screen
                name="Members"
                component={GroupDataScreen}
                options={{
                    headerTitle: () => <LogoHeder />,
                    headerRight: () => <View />,
                }}
            />
            <StackNoSing.Screen
                name="Map"
                component={MapNav}
                options={{
                    headerTitle: () => <LogoHeder />,
                    headerRight: () => <View />,
                }}
            />
            <StackNoSing.Screen
                name="Transport"
                component={TransportNav}
                options={{
                    headerTitle: () => <LogoHeder />,
                    headerRight: () => <View />,
                }}
            />
            <StackNoSing.Screen
                name="Diagram"
                component={DiagramNav}
                options={{
                    headerTitle: () => <LogoHeder />,
                    headerRight: () => <View />,
                }}
            />
        </StackNoSing.Navigator>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sing);