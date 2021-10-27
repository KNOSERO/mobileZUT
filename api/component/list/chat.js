import React from 'react'
import {Image, View, TouchableOpacity, Text, ScrollView, StyleSheet} from 'react-native'
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import actions from '../../redux/chat/duck/actions'

import RestAPI from "../../component/restApi";

const ChatList = (props) => {

    const navigation = useNavigation();

    const sort = () => {
        const temp = props.chat.sort((a, b) => {
            const aDate = new Date(a.chat.updatedAt);
            const bDate = new Date(b.chat.updatedAt);
            return bDate - aDate;
        });

        return temp;
    }

    const fetchChat = new RestAPI.RestChatlient();

    const printOneChat = () => {

        const temp = sort();

        return (
            <View>
                {
                    temp.map(el => {

                        const obj = (par) => {

                            const styletext = () => {
                                if (new Date(el.lastRefersh) - new Date(el.chat.updatedAt) > 0)
                                    return styles.text
                                else
                                    return styles.textLock
                            }

                            return (
                                <TouchableOpacity
                                    style={styles.mainView}
                                    key={el._id}
                                    onPress={async () => {
                                        await fetchChat.readChat(props.token, {id: el._id});
                                        navigation.navigate('Message', par);
                                    }}
                                >
                                    <Image style={styles.logo} source={require('../../asset/student.png')} />
                                    <View style={styles.textBox}>
                                        {el.name
                                            ?
                                            <Text numberOfLines={1} style={styletext()}>{el.name}</Text>
                                            :
                                            el.chat.private ?
                                                <Text numberOfLines={1} style={styletext()}>{el.chat.members[0].name} {el.chat.members[0].surname}</Text>
                                                :
                                                <View>
                                                    <Text numberOfLines={1} style={styletext()}> {el.chat.group[0].name} </Text>
                                                    <Text numberOfLines={1} style={styletext()}> {el.chat.group[0].year}  {el.chat.group[0].form} </Text>
                                                </View>
                                        }
                                    </View>
                                </TouchableOpacity>
                            )
                        }

                        return (
                            <View key={el._id}>
                                {
                                    el.chat.private ?
                                        obj({
                                            idChat: el._id,
                                            priv: true,
                                            memberID: el.chat.members[0]._id, 
                                            groupID: null,
                                        })
                                        :
                                        obj({
                                            idChat: el._id,
                                            priv: false,
                                            memberID: null, 
                                            groupID: el.chat.group[0]._id,
                                        })
                                }
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    return (
        <View>
            <ScrollView>
                {props.chat != null ?
                    <View>
                        {
                            printOneChat()
                        }
                    </View>
                    :
                    <View />
                }
            </ScrollView>
        </View>
    );
}

const mapStateToProps = state => ({
    chat: state.chat.chat,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    takeChat: item => dispatch(actions.addCatch(item)),
});


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
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
    logo: {
        width: 50,
        height: 50,
    },
    textBox: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
    },
    text: {
        flex: 1,
        fontSize: 15,
        color: 'black',
        overflow: 'hidden',
    },
    textLock: {
        flex: 1,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        overflow: 'hidden',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);