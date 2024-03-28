import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MainScreen = ({ navigation }) => {
    const handleLogout = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Main Screen</Text>
            <TouchableOpacity onPress={handleLogout} style={{ margin: 20 }}>
                <Text style={{ color: "blue" }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MainScreen;
