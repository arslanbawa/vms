import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Input, SearchBar, Switch } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import SeriesCard from "../Components/SeriesCard";
import { getAllSeries } from "../redux/reducers/seriesReducer";
import { logoutUser } from "../redux/reducers/authReducer";

export default function Series() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { token, loading, message } = useSelector((state) => state.user);
  const { series } = useSelector((state) => state.series);
  const [seriesData, setSeriesData] = React.useState([]);
  const [searchSeries, setSearchSeries] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    if (token) {
      dispatch(getAllSeries({ token: token }));
    } else {
      navigation.navigate("signin");
    }
  }, [token]);

  const liveSeries = () => {
    if (series) {
      const newData = series.filter((item) => {
        return item.episodeCount != 0;
      });
      setSeriesData(newData);
      setSearchSeries();
    }
  };

  React.useEffect(() => {
    liveSeries();
  }, [series]);

  const searchFilterFunction = (searchData) => {
    setSearch(searchData);
    if (!searchData) {
      if (checked === false) {
        liveSeries();
      } else {
        let value = false;
        switchLiveNonLive(value);
      }
    } else {
      const newData = seriesData.filter((item) => {
        const itemData = `${item.name.toUpperCase()}`;

        const textData = searchData.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      setSeriesData(newData);
    }
  };

  const handleSwitch = (value) => {
    setChecked(!checked);

    if (value === true) {
      switchLiveNonLive();
    } else {
      liveSeries();
    }
  };
  const switchLiveNonLive = () => {
    setSeriesData(series);
  };

  const logout = () => {
    dispatch(logoutUser());
  };

  const addNewSeries = () => {
    navigation.navigate("CreateNewSeries");
  };

  return (
    <>
      {token ? (
        <>
          <SafeAreaView>
            <View style={styles.container}>
              <View style={[styles.button, , { width: "150px" }]}>
                <LinearGradient
                  colors={["#08d4c4", "#01ab9d"]}
                  style={styles.signin}
                >
                  <TouchableOpacity onPress={addNewSeries}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Add Series
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
              <View style={styles.searchWrapper}>
                <TextInput
                  placeholder="Search Here..."
                  value={search}
                  onChangeText={(searchData) =>
                    searchFilterFunction(searchData)
                  }
                  style={styles.search}
                />
              </View>
              <View style={styles.switch_wrapper}>
                <Text style={styles.switch_lable}>Display non-live shows</Text>
                <Switch
                  value={checked}
                  onValueChange={(value) => handleSwitch(value)}
                />
              </View>
              <View style={[styles.button, , { width: "150px" }]}>
                <LinearGradient
                  colors={["#08d4c4", "#01ab9d"]}
                  style={styles.signin}
                >
                  <TouchableOpacity onPress={logout}>
                    <Text
                      style={[
                        styles.textSign,
                        {
                          color: "#fff",
                        },
                      ]}
                    >
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </SafeAreaView>
          {seriesData ? <SeriesCard series={seriesData} /> : null}
        </>
      ) : null}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#009387",
    flexWrap: "wrap",
  },
  searchWrapper: {
    width: "50%",
  },
  search: {
    outlineStyle: "none",
    border: "solid 2px #fff",
    borderRadius: "35px",
    backgroundColor: "#fff",
    width: "100%",
    height: 40,
    margin: 12,
    padding: 15,
  },
  signin: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
  },
  switch_wrapper: {
    alignItems: "center",
  },
  switch_lable: {
    marginBottom: 5,
  },
});
