import React from "react";
import ListMessage from "../../component/list/message";
import { View } from "react-native";

const MessageListScreen = ({ route, navigation }) => {

    const { idChat, priv, memberID, groupID} = route.params;
    return (
        <View>
            <ListMessage
                idChat={idChat}
                priv={priv}
                memberID={memberID}
                groupID={groupID}
            />
        </View>
    )
}

export default MessageListScreen;