import React from 'react'
import {View} from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigation from './home'
import LoginZutScreen from "../screen/connect/loginZut";
import LogOut from "../screen/singIn/logout";

import LogoHeder from '../asset/logoHeder';
import MenuBar from "../asset/menu";
import DraverContent from '../component/navigation/drawer';


const Drawer = createDrawerNavigator();

const MenuNavigation = () => {
    return (
        <Drawer.Navigator
            drawerContent={props => <DraverContent {... props} />}
            screenOptions={{
                headerShown: true
            }}
        >
            <Drawer.Screen
                name='Home'
                component={HomeNavigation}
                options={{
                    headerTitle: () => <LogoHeder />,
                    headerLeft:  () => <MenuBar />,
                    headerRight: () => <View />,
                }}
            />
            <Drawer.Screen
                name="ZutIn"
                component={LoginZutScreen}
                options={{
                    headerTitle: () => <LogoHeder />,
                    headerLeft:  () => <MenuBar />,
                    headerRight: () => <View />,
                }}
            />
            <Drawer.Screen
                name="LogOut"
                component={LogOut}
                options={{
                    headerTitle: () => <LogoHeder />,
                    headerLeft:  () => <MenuBar />,
                    headerRight: () => <View />,
                }}
            />
        </Drawer.Navigator>
    )
}

export default MenuNavigation;