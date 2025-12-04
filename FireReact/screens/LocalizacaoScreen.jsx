import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Share,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Circle } from "react-native-maps";
import LocalizacaoStyles, { createLocalizacaoStyles } from "../styles/LocalizacaoStyles";
import { useFontScale } from "../hooks/useFontScale";

const { width, height } = Dimensions.get("window");

const LocalizacaoScreen = () => {
  // Hook para escala de fonte
  const { scaleFont } = useFontScale();
  const dynamicStyles = React.useMemo(() => createLocalizacaoStyles(scaleFont), [scaleFont]);

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const mapRef = useRef(null);

  // Verificar e solicitar permissões
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permissão para acessar localização foi negada");
          return;
        }
      } catch (error) {
        console.error("Erro ao solicitar permissão:", error);
        setErrorMsg("Erro ao solicitar permissão de localização");
      }
    })();
  }, []);

  // Centralizar o mapa na localização
  const centerMapOnLocation = () => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  // Obter localização atual
  const getLocation = async () => {
    setLoading(true);
    setErrorMsg(null);

    try {
      // Verificar permissão novamente
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permissão Necessária",
          "Este app precisa de permissão para acessar sua localização.",
          [
            {
              text: "Configurar",
              onPress: () => Location.requestForegroundPermissionsAsync(),
            },
            { text: "Cancelar", style: "cancel" },
          ]
        );
        setLoading(false);
        return;
      }

      // Obter localização
      let locationData = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
      });

      const { latitude, longitude } = locationData.coords;

      const newLocation = {
        latitude,
        longitude,
        accuracy: locationData.coords.accuracy,
        timestamp: new Date().toLocaleString("pt-BR"),
      };

      setLocation(newLocation);

      // Centralizar mapa na nova localização
      setTimeout(() => {
        centerMapOnLocation();
      }, 500);

      // Tentar obter endereço reverso (opcional)
      try {
        let [reverseGeocode] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (reverseGeocode) {
          const { city, region, street, name, postalCode } = reverseGeocode;
          const formattedAddress = `${street || name || ""}${
            city ? `, ${city}` : ""
          }${region ? ` - ${region}` : ""}`;
          setAddress(formattedAddress);
        }
      } catch (geocodeError) {
        console.log("Não foi possível obter o endereço:", geocodeError);
      }
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      setErrorMsg(
        "Erro ao obter localização. Verifique se o GPS está ativado."
      );
      Alert.alert("Erro", "Não foi possível obter a localização");
    } finally {
      setLoading(false);
    }
  };

  // Compartilhar localização
  const shareLocation = async () => {
    if (!location) {
      Alert.alert("Aviso", "Obtenha a localização primeiro");
      return;
    }

    try {
      const message = `Minha localização:\nLatitude: ${location.latitude.toFixed(
        6
      )}\nLongitude: ${location.longitude.toFixed(6)}${
        address ? `\nEndereço: ${address}` : ""
      }\n\nEnviado via App Bombeiros`;

      const result = await Share.share({
        message: message,
        title: "Minha Localização",
      });

      if (result.action === Share.sharedAction) {
        console.log("Localização compartilhada com sucesso");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar a localização");
      console.error("Erro ao compartilhar:", error);
    }
  };

  // Região inicial do mapa: Recife
  const initialRegion = {
    latitude: -8.05428,
    longitude: -34.8813,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };

  return (
    <View style={dynamicStyles.container}>
      <ScrollView
        style={dynamicStyles.scrollView}
        contentContainerStyle={dynamicStyles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {errorMsg && (
          <View style={dynamicStyles.errorContainer}>
            <Text style={dynamicStyles.errorText}>{errorMsg}</Text>
          </View>
        )}

        {/* Mapa */}
        <View style={dynamicStyles.mapContainer}>
          <MapView
            ref={mapRef}
            style={dynamicStyles.map}
            initialRegion={initialRegion}
            showsUserLocation={false}
            showsMyLocationButton={false}
            showsCompass={true}
            zoomEnabled={true}
            scrollEnabled={true}
          >
            {location && (
              <>
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title="Sua Localização"
                  description={address || "Localização atual"}
                  pinColor="#BC010C"
                />
                {location.accuracy && (
                  <Circle
                    center={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                    radius={location.accuracy}
                    strokeColor="rgba(188, 1, 12, 0.3)"
                    fillColor="rgba(188, 1, 12, 0.1)"
                    strokeWidth={1}
                  />
                )}
              </>
            )}
          </MapView>

          {location && (
            <TouchableOpacity
              style={dynamicStyles.centerButton}
              onPress={centerMapOnLocation}
            >
              <Text style={dynamicStyles.centerButtonText}>⟲</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Botão de obter localização movido para abaixo do mapa */}
        <TouchableOpacity
          style={[dynamicStyles.button, dynamicStyles.obterLocalizacao]}
          onPress={getLocation}
          disabled={loading}
        >
          <View style={dynamicStyles.buttonContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#FFF" />
            ) : (
              <Text style={dynamicStyles.buttonText}>
                Obter Minha Localização
              </Text>
            )}
          </View>
        </TouchableOpacity>

        {loading && (
          <View style={dynamicStyles.loadingContainer}>
            <ActivityIndicator size="small" color="#3E4095" />
            <Text style={dynamicStyles.loadingText}>
              Obtendo localização...
            </Text>
          </View>
        )}

        {location && (
          <View style={dynamicStyles.locationContainer}>
            <Text style={dynamicStyles.locationText}>
              Localização Encontrada
            </Text>

            <View style={dynamicStyles.coordinatesContainer}>
              <View style={dynamicStyles.coordinateBox}>
                <Text style={dynamicStyles.coordinateLabel}>LATITUDE</Text>
                <Text style={dynamicStyles.coordinateValue}>
                  {location.latitude.toFixed(6)}
                </Text>
              </View>
              <View style={dynamicStyles.coordinateBox}>
                <Text style={dynamicStyles.coordinateLabel}>LONGITUDE</Text>
                <Text style={dynamicStyles.coordinateValue}>
                  {location.longitude.toFixed(6)}
                </Text>
              </View>
            </View>

            {address && (
              <View style={dynamicStyles.addressContainer}>
                <Text style={dynamicStyles.addressLabel}>
                  ENDEREÇO APROXIMADO
                </Text>
                <Text style={dynamicStyles.addressText}>{address}</Text>
              </View>
            )}

            {location.accuracy && (
              <View style={dynamicStyles.accuracyContainer}>
                <Text style={dynamicStyles.accuracyText}>
                  Precisão: ±{location.accuracy.toFixed(1)} metros
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={[
                dynamicStyles.actionButton,
                dynamicStyles.shareButton,
              ]}
              onPress={shareLocation}
            >
              <Text style={dynamicStyles.actionButtonText}>
                Compartilhar Localização
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LocalizacaoScreen;
