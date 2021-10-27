import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text , StyleSheet, ActivityIndicator} from "react-native";

import { connect } from 'react-redux';

const Route = (props) => {

    return (
        <View style={styles.box}>
            <View style={styles.boxNumber}>
                <Text style={styles.number}>{props.route[2]}</Text>
            </View>
            <View>
                <Text>{props.route[0]} {props.route[1]}</Text>
                <Text>{props.route[4]} {props.route[5]}</Text>
            </View>
        </View>
    )
}

const Transport = (props) => {
    return (
        <ScrollView>
            <View>
                {
                    props.route != null
                        ?
                        props.route.map(el => {
                            return (
                                <View 
                                    style={styles.element}
                                    key={el}
                                >
                                    {el.map(route => {
                                        return (
                                            <Route
                                                route={route}
                                                key={route}
                                            />
                                        )
                                    })}   
                                </View>
                            )
                        })
                        :
                        <View style={styles.loading}>
                            <ActivityIndicator size={100} color="#727EBF" />
                        </View>
                }
            </View>
        </ScrollView>
    );
}

const mapStateToProps = state => ({
    route: state.location.route,
    myPosition: state.location.myPosition,
    picture: state.location.picture,
});

const mapDispatchToProps = dispatch => ({
    transport: item => dispatch(actionsLocation.addRouts(item)),
});

const styles = StyleSheet.create({
    element: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#727EBF',
        padding: 10, 
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 8,
        backgroundColor: 'white',
        opacity: 1,
    },
    box: {
        flexDirection: 'row',
        alignContent: 'center',
        margin: 5,
    },
    boxNumber: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
    },
    number: {
        justifyContent: 'center',
        fontSize: 30,
        color: '#66B290',
    },
    loading: {
        alignSelf: 'center',
        margin: 200
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Transport);