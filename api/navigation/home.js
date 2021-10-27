import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CalendarScreen from '../screen/calendar/calendarScreen';
import ChatNavigation from '../screen/chat/chatListScreen';
import GroupListScreen from '../screen/group/groupListScreen';

import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconChat from '../component/element/chat';

const Bottom = createBottomTabNavigator();

const CalendarNav = () => <CalendarScreen />

const HomeNavigation = () => {
    return (
        <Bottom.Navigator
            tabBarOptions={{
                activeTintColor: '#727EBF',
            }} 
        >
            <Bottom.Screen
                name="Calendar"
                component={CalendarNav}
                options={{
                    tabBarLabel: 'Kalendarz',
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='calendar-today'
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Bottom.Screen
                name="Chat"
                component={ChatNavigation}
                options={{
                    tabBarLabel: 'Czat',
                    tabBarIcon: ({ color, size }) => (
                        <IconChat 
                            color={color} 
                            size={size}
                        />
                    ),
                }}
            />
            <Bottom.Screen
                name="Group"
                component={GroupListScreen}
                options={{
                    tabBarLabel: 'Grupy',
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            name='group'
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Bottom.Navigator>
    )
}

export default HomeNavigation;