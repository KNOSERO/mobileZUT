import React, {useState} from "react"
import { connect } from 'react-redux'
import { View } from "react-native"
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { Badge } from 'react-native-elements'

const IconChat = (props) => {

    const change = (chat) => {
        let count = 0
        if(chat != null)
            chat.forEach(el => {
                if(new Date(el.lastRefersh) - new Date(el.chat.updatedAt) < 0)
                    count = count + 1;
            });
        return count 
    }

    return (
        <View>
            <Icon
                name='chat'
                color={props.color}
                size={props.size}
            />
            { change(props.chat) ?
                <Badge
                    value={change(props.chat)}
                    status="error"
                    containerStyle={{ position: 'absolute', top: -5, right: -6 }}
                />
                :
                null
            }
            
        </View>
    )
}

const mapStateToProps = state => ({
    chat: state.chat.chat,
});

export default connect(mapStateToProps, {})(IconChat);