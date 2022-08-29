import React from "react";
import { View, StyleSheet, Platform, Image, Button } from "react-native";
import _ from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ImagesUploader(props) {
  return (
    <SafeAreaView>
      <View style={styles.images_wrapper}>
        <View style={{ width: 200, height: 200, marginTop: 40 }}>
          <Button
            title="Edit Logo"
            onPress={props.uploadLogo}
            style={{ width: 200 }}
          />
          {props.logoUri && (
            <View style={styles.product_tumb}>
              <Image
                source={{ uri: props.logoUri }}
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "stretch",
                }}
              />
            </View>
          )}
        </View>
        <View style={{ width: 200, height: 200, marginTop: 40 }}>
          <Button
            title="Edit Thumbnail"
            onPress={props.uploadThumbnail}
            style={{ width: 200 }}
          />
          {props.thumbnailUri && (
            <View style={styles.product_tumb}>
              <Image
                source={{ uri: props.thumbnailUri }}
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "stretch",
                }}
              />
            </View>
          )}
        </View>
        <View style={{ width: 200, height: 200, marginTop: 40 }}>
          <Button
            title="Edit Hero"
            onPress={props.uploadHero}
            style={{ width: 200 }}
          />
          {props.heroUri && (
            <View style={styles.product_tumb}>
              <Image
                source={{ uri: props.heroUri }}
                style={{
                  width: "100%",
                  height: 200,
                  resizeMode: "stretch",
                }}
              />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
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
  product_tumb: {
    display: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    // padding: "50px",
    background: "#f0f0f0",
  },
});
