import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, TextInput } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import AXIOS from "../api/axios-config";
import { Audio } from "expo-av";

export default function Monitor() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [radius, setRadius] = useState(25);
  const [points, setPoints] = useState([]);
  const [sound, setSound] = useState();
  const [color, setColor] = useState({
    fillColor: "rgba(0, 128, 0, 0.2)",
    strokeColor: "rgba(0, 128, 0, 0.5)",
  });
  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../audio/warn.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

    return distance;
  }
  useEffect(() => {
    let interval = setInterval(() => {
      AXIOS.get("/")
        .then((response) => {
          setPoints(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    for (let i = 0; i < points.length; i++) {
      let distance = calculateDistance(
        parseFloat(markerLocation.latitude),
        parseFloat(markerLocation.longitude),
        parseFloat(points[i].lat),
        parseFloat(points[i].long)
      );
      if (distance > radius) {
        setColor({
          fillColor: "rgba(255, 0, 0, 0.5)",
          strokeColor: "red",
        });
        playSound();
      } else if (color.fillColor != "rgba(0, 128, 0, 0.2)") {
        setColor({
          fillColor: "rgba(0, 128, 0, 0.2)",
          strokeColor: "rgba(0, 128, 0, 0.5)",
        });
      }
    }
  }, [points]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setMarkerLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setMarkerLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [location]);

  const onMapLayout = () => {
    setMapLoaded(true);
  };

  const handleRadiusChange = (text) => {
    if (text === "") {
      setRadius(25);
    } else {
      setRadius(parseInt(text));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        {region && (
          <MapView style={styles.map} region={region} onLayout={onMapLayout}>
            {mapLoaded && markerLocation && (
              <>
                {console.log(markerLocation)}
                <Marker
                  coordinate={markerLocation}
                  title={"Your Location"}
                  description="You are here"
                />
                <Circle
                  center={markerLocation}
                  radius={radius}
                  fillColor={color.fillColor}
                  strokeColor={color.strokeColor}
                />
                {points.map((data) => {
                  return (
                    <Marker
                      key={data.email}
                      coordinate={{
                        latitude: data.lat,
                        longitude: data.long,
                      }}
                      title={data.name}
                      description={data.email}
                    />
                  );
                })}
              </>
            )}
          </MapView>
        )}
      </View>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter radius ( default radius is 25m )"
          onChangeText={handleRadiusChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  radiusInputContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  radiusInputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  radiusInput: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
  },
  radiusInputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },
});
