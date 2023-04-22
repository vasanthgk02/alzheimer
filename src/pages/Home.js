import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const navigation = useNavigation();
    const handleRegisterPress = () => {
        navigation.navigate('Register');
    };

    const handleMonitorPress = () => {
        navigation.navigate("Monitor");
        // Handle monitor button press
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Neuro Guide</Text>
                <Text style={styles.subtitle}>Take care of your alzheimer friends</Text>
                <Image source={require("../images/home_image.png")} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.monitorButton} onPress={handleMonitorPress}>
                    <Text style={styles.buttonText}>Monitor</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        top: 100,
        // backgroundColor: "red",
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#aaa',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        height: 50,
        width: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    monitorButton: {
        backgroundColor: '#2196f3',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        height: 50,
        width: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    image: {
        height: 300,
        width: 300
    }
});

