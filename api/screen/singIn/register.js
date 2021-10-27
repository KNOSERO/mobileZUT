import React, { useState , useEffect } from 'react'
import { Image, View, TextInput, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import { connect } from 'react-redux';
import actions from '../../redux/auth/duck/actions'

import RestAPI from "../../component/restApi";

const RegisterScreen = (props) => {

    const [loading, setLoading] = useState();

    const [flag, setFlag] = useState({
        email: 0,
        password: 0,
        name: 0,
        surname: 0,
    });
    
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    
    useEffect(() => {
        setLoading(true)
    })

    const reg = {
        email: /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[\!\@\#\$\%\^\&\*\(\)\_\+\-\=])(?=.*[A-Z])(?!.*\s).{8,}$/,
    }

    const makeRegister = async () => {

        const fetchUser = new RestAPI.RestUserClient(); 

        const resRegister = await fetchUser.register({
            email: email,
            password: password1,
            name: name,
            surname: surname,
        });

        if(!resRegister.status) {
            const resLogin = await fetchUser.login({
                email: email,
                password: password1,
            });
            if (resLogin != null) {
                props.add({
                    email: email,
                    password: password1,
                });
                props.newToken(resLogin.token);
                return 0;
            }
            else {
                return 1;
            }
        }
        else {
            try {
                Alert.alert(
                    "Konto już istnieje",
                    "Istnieje konto o takim email",
                    [
                        { text: "OK", onPress: () => { } }
                    ],
                    { cancelable: false }
                );
            } finally { }
            return 1;
        }
    }

    const push = async() => {
        if (loading) {
            setLoading(false);

            const validation = () => {
                return new Promise(resolve => {
                    const temp = {
                        email: 0,
                        password: 0,
                        name: 0,
                        surname: 0,
                    };

                    if (!reg.email.test(email))
                        temp.email = 1;
                    if (!reg.password.test(password1))
                        temp.password = 1;
                    if (password1 !== password2)
                        temp.password = 1;
                    if ('' === name)
                        temp.name = 1;
                    if ('' === surname)
                        temp.surname = 1;

                    setFlag(temp);
                    resolve(temp.email + temp.password + temp.name + temp.surname)
                })
            }

            await validation().then(async v => {
                if (!v) {
                    await makeRegister().then(r => {
                        try{
                            if(r == 1)
                                setLoading(true);
                        } finally {}
                    }).catch(() => {
                        try{
                            setLoading(true);
                        } finally {}
                    })
                }
                else {
                    try{
                        setLoading(true);
                    } finally {}
                }
            });
        }
    }

    return(
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
                    onChangeText={(val) =>
                        setEmail(val)}
                    value={email}
                />
                {flag.email ? <Text style={styles.errText}>zly email</Text> : <Text />}
                
                <TextInput
                    style={styles.imput}
                    placeholder='hasło'
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword1(val)}
                    value={password1}
                />
                <TextInput
                    style={styles.imput}
                    placeholder='powtórz hasło'
                    secureTextEntry={true}
                    onChangeText={(val) => setPassword2(val)}
                    value={password2}
                />
                {flag.password ? <Text style={styles.errText}>złe hasło</Text> : <Text />}

                <TextInput
                    style={styles.imput}
                    placeholder='Imię'
                    onChangeText={(val) => setName(val)}
                    value={name}
                />
                {flag.name ? <Text style={styles.errText}>brak</Text> : <Text />}
                
                <TextInput
                    style={styles.imput}
                    placeholder='Nazwisko'
                    onChangeText={(val) => setSurname(val)}
                    value={surname}
                />
                {flag.surname ? <Text style={styles.errText}>brak</Text> : <Text />}

                <TouchableOpacity
                    onPress={push}
                >
                    <View 
                        style={styles.buttonAccept}
                    >
                        <Text style={styles.buttonText}>Rejestracja</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </KeyboardAwareScrollView>
    )
}


const mapDispatchToProps = dispatch => ({
    add: item => dispatch(actions.add(item)),
    newToken: item => dispatch(actions.newToken(item)),
});


const styles = StyleSheet.create({
    keyboardBox: {
        backgroundColor: 'white', 
        minHeight: '100%',
    },
    formBox: {
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25, 
        marginTop: -220, 
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
    errText: {
        marginLeft: 30,
        color: 'red',
    },
});

export default connect(null, mapDispatchToProps)(RegisterScreen)