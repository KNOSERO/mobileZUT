import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, TextInput, Text, StyleSheet, Alert} from "react-native";
import { connect } from 'react-redux';
import actions from '../../redux/auth/duck/actions'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { useNavigation } from '@react-navigation/native';

import RestAPI from "../../component/restApi";

const LoginScrean = (props) => {

    const [loading, setLoading] = useState();

    const [flag, setFlag] = useState({
        email: 0,
        password: 0,
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=> {
        setLoading(true)
    })

    const navigation = useNavigation();

    const reg = {
        email: /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=])(?=.*[A-Z])(?!.*\s).{8,}$/,
    }

    const makeLogin = async() => {

        const fetchUser = new RestAPI.RestUserClient(); 

        const resLogin = await fetchUser.login({
            email: email,
            password: password,
        });
        
        if (resLogin != null) {
            props.add({
                email: email,
                password: password,
            });
            props.newToken(resLogin.token);
            return 0;
        } 
        else {
            try{
                Alert.alert(
                    "Złe dane konta",
                    "Hasło lub Email",
                    [
                        { text: "OK", onPress: () => {} }
                    ],
                    { cancelable: false }
                );
            } finally {}
           
            return 1;
        }
    }

    const push = async () => {
        if(loading) {
            setLoading(false);

            const validation = () => {
                return new Promise(resolve => {
                    const temp = {
                        email: 0,
                        password: 0,
                    };

                    if (!reg.email.test(email))
                        temp.email = 1;
                    if (!reg.password.test(password))
                        temp.password = 1;

                    setFlag(temp);
                    resolve(temp.email + temp.password);
                })

            };

            await validation().then(async v => {
                if (!v) {
                    await makeLogin().then(() => {
                        try {
                            if (r == 1)
                                setLoading(true);
                        } finally { }
                    }).catch(() => {
                        try {
                            setLoading(true);
                        } finally { }
                    })
                }
                else {
                    try {
                        setLoading(true);
                    } finally { }
                }
            })
        }
    };

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={styles.keyboardBox}
        > 
            <View>
                <Image 
                    source={require('../../asset/tapeta.jpg')} 
                />
            </View>
            <View 
                style={styles.formBox}
            >
                <TextInput
                    style={styles.imput}
                    placeholder='e-mail'
                    onChangeText={(val) => setEmail(val)}
                    value={email}
                />
                {flag.email ? <Text style={styles.errText}>zly email</Text> : <Text />}
                
                <TextInput
                    style={styles.imput}
                    placeholder='hasło'
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword(val)}
                    value={password}
                />
                {flag.password ? <Text style={styles.errText}>zle hasło</Text> : <Text />}
                
                <TouchableOpacity
                    onPress={push}
                >
                    <View 
                        style={styles.buttonAccept}
                    >
                        <Text style={styles.buttonText}>Logowanie</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate('Register'); }}
                >
                    <Text style={styles.textLink}>Rejestracja</Text>
                </TouchableOpacity>
                
            </View>
        </KeyboardAwareScrollView>
    )
}

const mapDispatchToProps = dispatch => ({
    add: item => dispatch(actions.add(item)),
    newToken: item => dispatch(actions.newToken(item)),
})

const styles = StyleSheet.create({
    keyboardBox: {
        backgroundColor: 'white', 
        minHeight: '100%',
    },
    formBox: {
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25, 
        marginTop: -75, 
        backgroundColor: 'white', 
        padding: 25
    },
    imput: {
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
        elevation: 3,
        backgroundColor: '#c0c0c0',
    },
    errText: {
        marginLeft: 30,
        color: 'red',
    },
    buttonAccept: {
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        padding: 10, 
        marginTop: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 5,
        backgroundColor: '#66B290',
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center',
    },
    textLink: {
        fontSize: 15,
        color: '#727EBF',
        textAlign: 'center',
    },
});

export default connect(null, mapDispatchToProps)(LoginScrean)