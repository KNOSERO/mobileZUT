import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import actionsChat from '../../redux/chat/duck/actions'
import dateformat from 'dateformat'

import RestAPI from "../restApi";

const MyMassage = (props) =>
    <View style={styles.myMassageBox}>
        <View style={styles.myMassage}>
            <Text style={styles.myMassageTitle}> {props.el.autor.name}  {props.el.autor.surname} </Text>
            <Text style={styles.context}>
                {props.el.context}
            </Text>
            <Text style={styles.textdata}> { dateformat(new Date(props.el.createdAt), 'dd.mm.yyyy    HH:MM') } </Text>
        </View>
    </View>

const Massage = (props) =>
    <View style={styles.massageBox}>
        <View style={styles.massage}>
            <Text style={styles.massageTitle}> {props.el.autor.name}  {props.el.autor.surname} </Text>
            <Text style={styles.context}>
                {props.el.context}
            </Text>
            <Text style={styles.textdata}> { dateformat(new Date(props.el.createdAt), 'dd.mm.yyyy    HH:MM') } </Text>
        </View>
    </View>

const ListMessage = (props) => {

    const [message, setMessage] = useState("");

    const [idChat, setID] = useState(null);

    const fetchChat = new RestAPI.RestChatlient();

    useEffect(() => {
        setID(props.idChat);
    });
    const newMessage = async () => {
        if (props.priv) {
            const temp = await fetchChat.addMassagePrivate(props.token, {
                context: message,
                memberID: props.memberID,
            });
            setID(temp);
        }
        else {
            const temp = await fetchChat.addMassagePublic(props.token, {
                context: message,
                groupID: props.groupID,
            })
            setID(temp);
        }
        setMessage('');
        const temp = await fetchChat.getChat(props.token);
        props.addChat(temp.chats);
    };

    const filter = () => {

        const temp = props.chat.filter(f => {
            if (f.chat.private == true)
                return f.chat.members[0]._id == props.memberID;
            else
                return f.chat.group[0]._id == props.groupID;
        })

        return temp[0];
    }

    const printMassage = () => {

        const temp = filter();

        return (
            <View>
                {
                    temp ?
                        temp.chat.message.map(el => {
                            if(el.autor._id == temp.user)
                                return (
                                    <MyMassage key={el._id} el={el}/>
                                )
                            else
                                return (
                                    <Massage key={el._id} el={el}/>
                                )
                        })
                        :
                        <View />
                }
            </View>
        )
    }
    const scrollViewRef = useRef();
    return (
        <KeyboardAwareScrollView

            contentContainerStyle={styles.keyboardBox}
            keyboardShouldPersistTaps="always"
        >
            <View
                style={styles.list}
            >
                <ScrollView
                    style={styles.scroll}
                    ref={scrollViewRef}
                    onContentSizeChange={() => {
                        scrollViewRef.current.scrollToEnd({ animated: true })
                    }}
                >
                    {props.chat ?
                        printMassage()
                        :
                        <View />
                    }
                </ScrollView>
            </View>
            <View
                style={styles.formBox}
            >
                <TextInput
                    placeholder='message'
                    style={styles.imput}
                    onChangeText={(val) => setMessage(val)}
                    multiline={true}
                    onTouchStart={() => {
                        setTimeout(() => {
                            scrollViewRef.current.scrollToEnd({ animated: true })
                        }, 500);
                    }}
                    value={message}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={newMessage}
                >
                    <Text style={styles.buttonText}>Wyślij</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = state => ({
    chat: state.chat.chat,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => ({
    takeChat: item => dispatch(actions.addCatch(item)),
    addChat: item => dispatch(actionsChat.add(item)),
})

const styles = StyleSheet.create({
    keyboardBox: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    formBox: {
        backgroundColor: 'white',
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: '#727EBF',
        height: 70,
    },
    button: {
        justifyContent: 'center',
        backgroundColor: '#727EBF',
        width: '20%',
        height: '100%',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    imput: {
        backgroundColor: '#c0c0c0',
        width: '78%',
        borderRadius: 10,
        margin: '1%',
    },
    myMassageBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    massageBox: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    myMassage: {
        alignContent: 'center',
        borderRadius: 15, 
        padding: 10, 
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        elevation: 4,
        backgroundColor: '#66B290',
        maxWidth: '75%',
    },
    massage: {
        alignContent: 'flex-start',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#727EBF',
        padding: 10, 
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        maxWidth: '75%',
    },
    massageTitle: {
        fontSize: 15,
        color: '#727EBF',
        fontWeight: 'bold',
    },
    myMassageTitle: {
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',     
        alignItems: 'flex-end',
    },
    textdata: {
        fontSize: 10,
        alignSelf: 'flex-end',
        fontWeight: 'bold',
    },
    context: {
        textAlign: 'auto',
        padding: 2,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ListMessage);