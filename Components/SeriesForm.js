import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable";
import _ from "lodash";
import TextArea from "antd/lib/input/TextArea";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SeriesForm(props) {
  return (
    <>
      <SafeAreaView>
        <View style={styles.images_wrapper}>
          <View style={styles.inputs_wrapper}>
            <Text style={[styles.text_footer, { width: "320px" }]}>Name:</Text>
            <View style={[styles.action, { width: "320px" }]}>
              <TextInput
                value={props.name}
                placeholder="series name here"
                style={styles.textinput}
                autoCapitalize="none"
                onChangeText={(val) => {
                  props.handleNameInput(val);
                }}
              />
              {props.nameFlag ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
          </View>
          <View style={styles.inputs_wrapper}>
            <Text style={[styles.text_footer, { width: "320px" }]}>Slug:</Text>
            <View style={[styles.action, { width: "320px" }]}>
              <TextInput
                value={props.slug}
                style={styles.textinput}
                autoCapitalize="none"
              />
              {props.slugFlag ? (
                <Animatable.View animation="bounceIn">
                  <Feather
                    name={props.slugCrossFlag ? "x-circle" : "check-circle"}
                    color={props.slugCrossFlag ? "red" : "green"}
                    size={20}
                  />
                </Animatable.View>
              ) : null}
            </View>
          </View>
          <View style={styles.inputs_wrapper}>
            <Text style={[styles.text_footer, { width: "320px" }]}>
              Display Name:
            </Text>
            <View style={[styles.action, { width: "320px" }]}>
              <TextInput
                value={props.displayName}
                placeholder="Display name"
                style={styles.textinput}
                autoCapitalize="none"
                onChangeText={(val) => {
                  props.handleDisplayName(val);
                }}
              />
              {props.displayNameFlag ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
          </View>
        </View>
      </SafeAreaView>
      <SafeAreaView>
        <View style={{ padding: 10 }}>
          <Text style={[styles.text_footer, { width: "320px" }]}>
            Description:
          </Text>
          <View style={[styles.action, { width: "100%" }]}>
            <TextArea
              value={props.description}
              placeholder="description"
              autoCapitalize="none"
              onChange={(e) => {
                props.handleDescription(e.target.value);
              }}
              style={{ width: "100%", height: "100px" }}
            />
            {props.descriptionFlag ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.btns_wrspper}>
        {props.isloading ? (
          <View style={[styles.button, , { width: "150px" }]}>
            <LinearGradient
              colors={["#08d4c4", "#01ab9d"]}
              style={styles.signin}
            >
              <TouchableOpacity>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Loading...
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <>
            {props.saveFlag ? (
              <View
                style={[
                  styles.button,
                  ,
                  { width: "150px", marginRight: "10px" },
                ]}
              >
                <LinearGradient
                  colors={["#08d4c4", "#01ab9d"]}
                  style={styles.signin}
                >
                  <TouchableOpacity onPress={props.saveNewSeries}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            ) : null}
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
    // height:"50%",
    backgroundColor: "#fff",
    border: "solid 2px #009387",
    borderRadius: "15px",
    padding: 10,
    marginTop: 10,
  },
  textinput: {
    flex: 1,
    // Platform.OS === 'web' && { outlineWidth: 0 },
    marginTop: Platform.OS === "web" ? 0 : -12,
    paddingLeft: 20,
    color: "#05375a",
    outlineStyle: "none",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
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
  btns_wrspper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "end",
    marginBottom: 10,
  },
  inputs_wrapper: {
    marginBottom: 40,
    width: "320px",
  },
  images_wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    padding: 10,
    marginBottom: 30,
  },
  comtent_wrapper: {
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 59,
    marginBottom: 50,
  },
  textSign: {
    fontSize: 18,
    fontWaight: "bold",
  },
});
