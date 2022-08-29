import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import _ from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import GeoblockingModal from "../Modals/GeoblockingModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../redux/reducers/geoblockingReducer";

export default function SeriesMetadata() {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const { token } = useSelector((state) => state.user);

  const manageGeoblocking = () => {
    dispatch(getAllCountries({ token: token }));
    setShow(true);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          height: 1,
          backgroundColor: "#979797",
          alignSelf: "stretch",
        }}
      />
      <View style={styles.heading_wrapper}>
        <Text style={styles.heading}>Manage Series Metadata</Text>
      </View>
      <View style={styles.buttons_wrapper}>
        <View
          style={[styles.button, , { width: "250px", marginRight: "10px" }]}
        >
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signin}>
            <TouchableOpacity>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Manage Contract info
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={[styles.button, , { width: "250px", marginRight: "10px" }]}
        >
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signin}>
            <TouchableOpacity onPress={manageGeoblocking}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Manage Geoblocking
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View
          style={[styles.button, , { width: "250px", marginRight: "10px" }]}
        >
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signin}>
            <TouchableOpacity>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Manage Character Groups
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        {show ? <GeoblockingModal show={show} setShow={setShow} /> : null}
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "#979797",
          alignSelf: "stretch",
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading_wrapper: {
    alignItems: "center",
    marginTop: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: 800,
  },
  buttons_wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 25,
    marginBottom: 25,
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  signin: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWaight: "bold",
  },
});
