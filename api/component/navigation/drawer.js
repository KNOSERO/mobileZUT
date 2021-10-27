import React from "react";
import { ImageBackground, Image, View, Text, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import LogoProfile from "../element/profile";

export default function  DraverContent(props){

    const navigation = useNavigation();

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {... props}>
                <LogoProfile />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='home'
                            color={'#727EBF'}
                            size={size}
                        />
                    )}
                    label='Home'
                    onPress={() => { navigation.navigate('Home'); }}
                />
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='backup'
                            color={'#727EBF'}
                            size={size}
                        />
                    )}
                    label='Połącz z ZUT'
                    onPress={() => { navigation.navigate('ZutIn'); }}
                />
            </DrawerContentScrollView>
            <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name='logout'
                            color={'#727EBF'}
                            size={size}
                        />
                    )}
                    label='Wyloguj'
                    onPress={() => { navigation.navigate('LogOut'); }}
                />
        </View>
    )
}
