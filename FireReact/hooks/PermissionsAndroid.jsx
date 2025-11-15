import { PermissionsAndroid, Platform } from "react-native";
import { Camera } from "react-native-vision-camera";

const requestCameraPermission = async () => {
  if (Platform.OS === "android") {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  }
  const cameraPermission = await Camera.requestCameraPermission();
  return cameraPermission === "authorized";
};
