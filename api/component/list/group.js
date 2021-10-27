import React, { useEffect } from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native";

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import actions from '../../redux/group/duck/actions'

import RestAPI from "../restApi";

import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const ListGroup = (props) => {

    const navigation = useNavigation();

    const fetchUser = new RestAPI.RestUserClient();

    useEffect(() => {
        const k = async () => {
            const temp = await fetchUser.getGroup(props.token);
            props.add(temp.groups);
        };
        k();
        return () => {

        };
    }, []);

    return (
        <View>
            <ScrollView>
                {props.group != null ?
                    props.group.map(el => {
                        return (
                            <TouchableOpacity
                                key={el._id}
                                style={styles.mainTouch}
                                onPress={async () => {
                                    const temp = await fetchUser.getMembers(props.token, { groupId: el._id })
                                    props.addUser(temp);
                                    navigation.navigate('Members');
                                }}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text numberOfLines={1} style={styles.text}>{el.name}</Text>
                                    <Text>{el.professor}</Text>
                                    <Text>{el.year}   {el.form}</Text>
                                    <Text>{el.group}</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.secondTouch}
                                    onPress={() => {
                                        if (!props.chat)
                                            props.chat.filter(elem => {
                                                return elem.chat.group._id == el._id
                                            }).then(group => {
                                                if (!group)
                                                    navigation.navigate('Message', {
                                                        idChat: group[0]._id,
                                                        priv: false,
                                                        memberID: null,
                                                        groupID: el._id,
                                                    });
                                                else
                                                    navigation.navigate('Message', {
                                                        idChat: null,
                                                        priv: false,
                                                        memberID: null,
                                                        groupID: el._id
                                                    });
                                            });
                                        else
                                            navigation.navigate('Message', {
                                                idChat: null,
                                                priv: false,
                                                memberID: null,
                                                groupID: el._id,
                                            });

                                    }}
                                >
                                    <Icon name='message' size={30} color={'#66B290'} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    })
                    :
                    <View />
                }
            </ScrollView>
        </View>
    );
}

const mapStateToProps = state => ({
    group: state.group.group,
    token: state.auth.token,
    chat: state.chat.chat,
});

const mapDispatchToProps = dispatch => ({
    addUser: item => dispatch(actions.addUsers(item)),
    add: item => dispatch(actions.add(item)),
})

const styles = StyleSheet.create({
    mainTouch: {
        justifyContent:'space-between',
        flexDirection: 'row',
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
    secondTouch: {
        marginRight:10, 
        justifyContent:'center', 
        right: 10,
        width: 30,
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#727EBF',
        overflow: 'hidden',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListGroup);