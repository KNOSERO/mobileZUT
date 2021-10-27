import React, { useState, useEffect } from 'react'
import { Calendar } from 'react-native-calendars';
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, PermissionsAndroid } from "react-native";

import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import actionsPlan from '../../redux/plan/duck/actions'
import actionsLocation from "../../redux/location/duck/actions";

import fun from "../../component/fuction";
import RestAPI from "../../component/restApi";

import dateformat from 'dateformat'
import {LocaleConfig} from 'react-native-calendars';

import Geolocation from '@react-native-community/geolocation';

LocaleConfig.locales['pl'] = {
  monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
  monthNamesShort: ['Sty.','Luty','Marz.','Kwie.','Maj','Czer.','Lip.','Sier.','Wrze.','Paź.','List.','Grudz.'],
  dayNames: ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
  dayNamesShort: ['N','Pon','Wto','Śr','Czw','Piąt','Sob'],
  today: 'Dzisiaj'
};
LocaleConfig.defaultLocale = 'pl';


const FutureHour = (props) => {

    return (
        <View
            style={styles.futureBox}
        >
            <Text style={styles.futureText}>{props.el.group.name}</Text>
            <Text style={styles.futureText}>{props.el.group.professor}</Text>
            <Text style={styles.futureText}>{dateformat(new Date(props.el.start), 'HH:MM') + '-' + dateformat(new Date(props.el.end), 'HH:MM')}          {props.el.group.form}</Text>
            <Text style={styles.futureText}>{props.el.group.group}</Text>
            <View style={styles.futureBoxOption}>
                <TouchableOpacity onPress={props.mapPress}>
                    <Text>    Mapa    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.transportPress}>
                    <Text>  Transport </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.diagramPress}>
                    <Text>   Diagram  </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

const CacelHour = (props) => {

    return (
        <View
            style={styles.futureBox}
        >
            <Text style={styles.cacelText}>{props.el.group.name}</Text>
            <Text style={styles.cacelText}>{props.el.group.professor}</Text>
            <Text style={styles.cacelText}>{dateformat(new Date(props.el.start), 'HH:MM') + '-' + dateformat(new Date(props.el.end), 'HH:MM')}          {props.el.group.form}</Text>
            <Text style={styles.cacelText}>{props.el.group.group}</Text>
        </View>
    )

}

const OldHour = (props) => {

    return (
        <View
            style={styles.oldBox}
        >
            <Text style={styles.oldText}>{props.el.group.name}</Text>
            <Text style={styles.oldText}>{props.el.group.professor}</Text>
            <Text style={styles.oldText}>{dateformat(new Date(props.el.start), 'HH:MM') + '-' + dateformat(new Date(props.el.end), 'HH:MM')}          {props.el.group.form}</Text>
            <Text style={styles.oldText}>{props.el.group.group}</Text>
        </View>
    )

}

const CalendarScreen = (props) => {

    const fetchCalendar = new RestAPI.RestCalendarClient();
    const fetchLocation = new RestAPI.RestLocationClient();
    const fetchTransport = new RestAPI.RestTransportClient();

    const [days, setDay] = useState(() => {
        const temp = fun.formatDate(new Date(Date.now()));
        return { 
            [temp]: { 
                selectedColor: '#727EBF'
            } 
        };
    });

    const navigation = useNavigation();

    useEffect(() => {
        props.setDays(fun.formatDate(new Date(Date.now())));
        const k = async () => {
            const temp = await fetchCalendar.getPlan(props.token);
            props.add(temp);
        };
        k();
        return () => {

        };
    }, []);

    return (
        <View>
            <ScrollView>
                <View>
                    <Calendar
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: '#b6c1cd',
                            textSectionTitleDisabledColor: '#d9e1e8',
                            selectedDayBackgroundColor: '#00adf5',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#727EBF',
                            dayTextColor: '#2d4150',
                            textDisabledColor: '#d9e1e8',
                            dotColor: '#00adf5',
                            selectedDotColor: '#ffffff',
                            arrowColor: '#727EBF',
                            disabledArrowColor: '#727EBF',
                            monthTextColor: '#727EBF',
                            indicatorColor: '#727EBF',
                            textDayFontFamily: 'monospace',
                            textMonthFontFamily: 'monospace',
                            textDayHeaderFontFamily: 'monospace',
                            textDayFontWeight: '300',
                            textMonthFontWeight: 'bold',
                            textDayHeaderFontWeight: '300',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}
                        markedDates={days}
                        firstDay={1}
                        onDayPress={(day) => {
                            setDay({ [day.dateString]: { selected: true, selectedColor: '#727EBF' } });
                            props.setDays(day.dateString);
                        }}
                    />

                    {
                        props.plan.filter(el => {
                            let date = fun.formatDate(el.start);
                            let flag = props.mday;
                            return (flag == date);
                        })
                            .map(el => {
                                if((new Date(el.start) - new Date(fun.formatDate(Date.now())))  >  0) {
                                    if((new Date(new Date(el.updatedAt)) - new Date(new Date(el.group.updatedAt).getTime() - 1000 * 60) > 0)) {
                                        return (
                                            <FutureHour
                                                el={el}
                                                mapPress={async () => {
                                                    props.resetLocation(null);

                                                    const granted = await PermissionsAndroid.request(
                                                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                                                        {
                                                            title: "Cool Photo App Camera Permission",
                                                            message:
                                                                "Cool Photo App needs access to your camera " +
                                                                "so you can take awesome pictures.",
                                                            buttonNeutral: "Ask Me Later",
                                                            buttonNegative: "Cancel",
                                                            buttonPositive: "OK"
                                                        }
                                                    );
                                                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                                        Geolocation.getCurrentPosition(info => props.mylocation({
                                                            lat: info.coords.latitude,
                                                            lng: info.coords.longitude,
                                                        }));
                                                    }

                                                    const location = await fetchLocation
                                                        .findLocation(el.location.department);
                                                    props.addLocation(location);

                                                    navigation.navigate('Map');
                                                }}
                                                transportPress={async () => {
                                                    props.resetLocation(null);

                                                    const granted = await PermissionsAndroid.request(
                                                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                                                        {
                                                            title: "Cool Photo App Camera Permission",
                                                            message:
                                                                "Cool Photo App needs access to your camera " +
                                                                "so you can take awesome pictures.",
                                                            buttonNeutral: "Ask Me Later",
                                                            buttonNegative: "Cancel",
                                                            buttonPositive: "OK"
                                                        }
                                                    );
                                                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                                        Geolocation.getCurrentPosition(info => props.mylocation({
                                                            lat: info.coords.latitude,
                                                            lng: info.coords.longitude,
                                                        }));
                                                    }

                                                    navigation.navigate('Transport');

                                                    const transport = await fetchTransport
                                                        .getTransport(el.location.department, {
                                                            lat: props.myPosition.lat,
                                                            lng: props.myPosition.lng,
                                                            date: el.start,
                                                        });
                                                    props.transport(transport);
                                                }}
                                                diagramPress={async () => {
                                                    props.resetLocation(null);

                                                    props.picture({
                                                        locName: el.location.department,
                                                        roomName: el.location.room,
                                                    });

                                                    navigation.navigate('Diagram');
                                                }}
                                                key={el._id}
                                            />
                                        )
                                    }
                                    else {
                                        return (
                                            <CacelHour
                                                el={el}
                                                key={el._id}
                                            />
                                        )
                                    }
                                }
                                else {
                                    return (
                                        <OldHour
                                            el={el}
                                            key={el._id}
                                        />
                                    )
                                }
                            })
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const mapStateToProps = state => ({
    mday: state.plan.mday,
    plan: state.plan.plan,
    token: state.auth.token,
    myPosition: state.location.myPosition,
});

const mapDispatchToProps = dispatch => ({
    add: item => dispatch(actionsPlan.add(item)),
    setDays: item => dispatch(actionsPlan.setDay(item)),
    resetLocation: item => dispatch(actionsLocation.reset(item)),
    addLocation: item => dispatch(actionsLocation.location(item)),
    transport: item => dispatch(actionsLocation.addRouts(item)),
    picture: item => dispatch(actionsLocation.addPicture(item)),
    mylocation: item => dispatch(actionsLocation.mylocation(item)),
});

const styles = StyleSheet.create({
    oldBox: {
        borderRadius: 15,
        padding: 10, 
        marginTop: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        elevation: 4,
        backgroundColor: 'grey',
    },
    futureBox: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#727EBF',
        padding: 10, 
        marginTop: 10,
        margin: 10,
        shadowColor: 'black',
        shadowOpacity: 0.30,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
    },
    futureBoxOption: {
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        flexDirection: 'row',
    },
    cacelText : {
        color: 'red'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);