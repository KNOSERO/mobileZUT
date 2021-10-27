import React, { useEffect } from 'react'
import { Image, View, TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const UsersList = (props) => {

    const navigation = useNavigation();

    return (
        <View>
            <ScrollView>
                {props.users.map(el => {
                    return (
                        <View style={styles.mainView} key={el._id}>
                            <View style={styles.secondView}>
                                <Image source={require('../../asset/student.png')} style={styles.logo} />
                                <View style={styles.textBox}>
                                    <Text>{el.name}   {el.surname}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={async () => {
                                if (!props.chat) 
                                    props.chat.filter(elem => {
                                        return elem.chat.members[0]._id == el._id
                                    }).then(group => {
                                        if (!group)
                                            navigation.navigate('Message', {
                                                idChat: group[0]._id,
                                                priv: true,
                                                memberID: el._id, 
                                                groupID: null,
                                            });
                                        else
                                            navigation.navigate('Message', {
                                                idChat: null,
                                                priv: true,
                                                memberID: el._id, 
                                                groupID: null,
                                            });
                                    });
                                else
                                    navigation.navigate('Message', {
                                        idChat: null,
                                        priv: true,
                                        memberID: el._id, 
                                        groupID: null,
                                    });
                            }}
                                style={styles.icon}>
                                <Icon name='message' size={30} color={'#66B290'} />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    );
}

const mapStateToProps = state => ({
    users: state.group.users,
    chat: state.chat.chat,
});

const styles = StyleSheet.create({
    mainView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#727EBF',
        padding: 10, 
        marginTop: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 8,
        backgroundColor: 'white',
        opacity: 1,
    },
    secondView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    logo: {
        width: 50,
        height: 50,
    },
    textBox: {
        justifyContent: 'center',
        marginLeft: 20,
    },
    icon: {
        justifyContent: 'center',
        marginRight: 20,
    }
});


export default connect(mapStateToProps, {})(UsersList);