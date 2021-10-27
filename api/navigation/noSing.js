import React from 'react';
import LoginScreen from '../screen/singIn/login'
import RegisterScreen from '../screen/singIn/register'

import { createStackNavigator } from '@react-navigation/stack';

const StackNoSing = createStackNavigator();

//MENU NIE ZAUTORYZOWANEGO URZYTKOWNIKA
const NoSing = () => {
    
    return (
        <StackNoSing.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <StackNoSing.Screen
                name="Login"
                component={LoginScreen}
            />
            <StackNoSing.Screen
                name="Register"
                component={RegisterScreen}
            />
        </StackNoSing.Navigator>
    );
}

export default NoSing;