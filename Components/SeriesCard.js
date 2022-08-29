import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import LightTooltip from "@material-ui/core/Tooltip";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { getSeriesById } from "../redux/reducers/seriesReducer";
import { useDispatch, useSelector } from "react-redux";

export default function SeriesCard(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const editSeriesInfo = (info) => {
    dispatch(getSeriesById({ token: token, id: info.id })).then((res) => {
      if (res.payload.data.body) {
        navigation.navigate("EditSeriesInfo");
      }
    });
  };

  return (
    <>
      {props.series ? (
        <>
          <ScrollView>
            <SafeAreaView>
              <View style={styles.container}>
                {props?.series.map((item) => {
                  return (
                    <View
                      style={
                        item?.episodeCount
                          ? styles.product_card
                          : styles.product_card2
                      }
                    >
                      <View style={styles.product_tumb}>
                        <Image
                          source={{ uri: item?.imageUrl }}
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
                        <Text>{item?.episodeCount} Live Episodes</Text>
                        <TouchableOpacity onPress={() => editSeriesInfo(item)}>
                          <FontAwesome name="edit" color="#009387" size={20} />
                        </TouchableOpacity>
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
    marginTop: 10,
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
  },
});
