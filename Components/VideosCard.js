import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import LightTooltip from "@material-ui/core/Tooltip";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function VideosCard(props) {
  return (
    <>
      {props.selectedSeriesVideos ? (
        <>
          <ScrollView>
            <SafeAreaView>
              <View style={styles.container}>
                {props?.selectedSeriesVideos.map((item) => {
                  return (
                    <View style={styles.product_card}>
                      <View style={styles.product_tumb}>
                        <Image
                          source={{ uri: item?.image_url }}
                          style={{
                            width: "100%",
                            height: 200,
                            resizeMode: "stretch",
                            borderRadius: 15,
                          }}
                        />
                      </View>
                      <View style={styles.product_details}>
                        <Text>{item?.name}</Text>
                        <LightTooltip
                          title={item?.description}
                          disableFocusListener
                          arrow
                          placement="bottom-end"
                        >
                          <View>
                            <FontAwesome
                              name="info"
                              color="#009387"
                              size={20}
                            />
                          </View>
                        </LightTooltip>
                      </View>
                      <View style={styles.product_details}>
                        <Text>Episode: {item?.episode}</Text>
                        <View>
                          <FontAwesome
                            name={item?.is_live ? "check" : "times"}
                            color={item?.is_live ? "#009387" : "#FF0000"}
                            size={20}
                          />
                        </View>
                      </View>
                      <View style={styles.product_details}>
                        <Text>
                          Age Group: {item?.ageGroups?.min} -{" "}
                          {item?.ageGroups?.max}
                        </Text>
                        <View>
                          <FontAwesome
                            name={item?.featured ? "star" : "star-o"}
                            color={item?.featured ? "#FFD700" : "#e6e6e6"}
                            size={20}
                          />
                        </View>
                      </View>
                      <View style={styles.product_details}>
                        {item?.genres
                          ? item.genres.map((genres, ind) => {
                              return (
                                <Text>
                                  Gener: {genres}{" "}
                                  {item?.genres?.length != ind ? "," : null}
                                </Text>
                              );
                            })
                          : null}
                      </View>
                    </View>
                  );
                })}
              </View>
            </SafeAreaView>
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator size="small" color="#0000ff" />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    marginTop: 50,
  },
  product_card: {
    width: "300px",
    position: "relative",
    shadowColor: "0 2px 7px #dfdfdf",
    margin: "50px auto",
    background: "#fafafa",
    border: "solid 2px #009387",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },
  product_card2: {
    width: "300px",
    position: "relative",
    shadowColor: "0 2px 7px #dfdfdf",
    margin: "50px auto",
    background: "#fafafa",
    border: "solid 2px #ff0000",
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },
  product_tumb: {
    display: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    // padding: "50px",
    background: "#f0f0f0",
  },
  product_tumb_img: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  product_details: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 7,
  },
});
