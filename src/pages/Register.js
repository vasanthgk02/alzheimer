import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { Image } from 'react-native';
import AXIOS from '../api/axios-config';
import * as Location from 'expo-location';

export default function RegistrationPage() {
    const [name, setName] = useState(null);
    const [contact, setContact] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [location, setLocation] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [sharing, setSharing] = useState("Stop Sharing");

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
        }

        setIntervalId(setInterval(() => {
            Location.getCurrentPositionAsync({})
                .then(location => {
                    setLocation(location);
                    console.log(location.coords.latitude);
                    console.log(location.coords.longitude);
                    if (location && location.coords) {
                        AXIOS.post("/update-location", {
                            email: email,
                            lat: location.coords.latitude,
                            long: location.coords.longitude
                        });
                    }
                })
                .catch(error => console.log(error));
        }, 10000));
    };

    const handleRegister = () => {
        if (name == null || email == null || contact == null || address == null) {
            Alert.alert(
                'Warning',
                'All input fields are required',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    }
                ]
            );

            return;
        }
        else {
            getLocation();
            AXIOS.post("/register", {
                name,
                email,
                contact,
                address,
                lat: "",
                long: ""
            })
            setIsRegistered(true);
        }
    }

    const stopSharing = () => {
        clearInterval(intervalId);
        setSharing("Sharing Stopped");
    }

    return (
        <View style={styles.container}>
            {!isRegistered && (
                <>
                    <View style={{
                        alignItems: "center",
                        backgroundColor: '#ccc',
                        width: "100%",
                        padding: 10,
                        borderRadius: 5,
                        marginBottom: 20
                    }}>
                        <Text style={styles.title}>Sign Up </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your contact number"
                        onChangeText={(text) => setContact(text)}
                        value={contact}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        onChangeText={(text) => setEmail(text)}
                        value={email}

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your address"
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </>
            )}
            {isRegistered && (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.registeredText}>Your device is now being monitored.</Text>
                    <Image source={require("../images/location.gif")} style={{ height: 300, width: 300 }} />
                    <TouchableOpacity style={{
                        backgroundColor: sharing == "Stop Sharing" ? "red" : "green", ...styles.stopSharing
                    }} onPress={stopSharing}>
                        <Text style={styles.stopText}>{sharing}</Text>
                    </TouchableOpacity>
                </View>

            )
            }
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: "white",
        marginTop: StatusBar.currentHeight + 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    registeredText: {
        width: " 100%",
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: 20,
    },
    stopSharing: {
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    stopText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    }
});
