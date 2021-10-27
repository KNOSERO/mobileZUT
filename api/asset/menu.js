import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { useNavigation } from "@react-navigation/native";


const MenuBar = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.openDrawer()}>
            <Icon name='menu' size={35} />
        </TouchableOpacity>
    )
}

export default MenuBar;