import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { postGeoblocking } from "../redux/reducers/geoblockingReducer";
import { getSeriesById } from "../redux/reducers/seriesReducer";

export default function GeoblockingModal(props) {
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const { countries } = useSelector((state) => state.geoblocking);
  const [only_in_country, setOnly_in_country] = useState("");
  const [excluded_from_country, setExcluded_from_country] = useState("");
  const [isloading, setIsloading] = useState(false);
  const { selectedSeries } = useSelector((state) => state.series);
  const { selectedSeriesRegions } = useSelector((state) => state.series);
  const { token } = useSelector((state) => state.user);
  const [availableRegions, setAvailableRegions] = useState([]);
  const [excludedRegions, setExcludedRegions] = useState([]);

  const filterRegions = () => {
    let availablelist = selectedSeriesRegions?.only_in_country?.split(",");
    let excludedlist = selectedSeriesRegions?.excluded_from_country?.split(",");
    availablelist?.forEach((country) => {
      countries?.filter((item) => {
        if (item.value === country) {
          availableRegions.push(item);
        }
      });
    });

    excludedlist?.forEach((country) => {
      countries?.filter((item) => {
        if (item.value === country) {
          excludedRegions.push(item);
        }
      });
    });
  };

  useEffect(() => {
    filterRegions();
  }, []);

  const onlyInCountrys = (val) => {
    let temp = [];
    val.forEach((c) => temp.push(c.value));
    setOnly_in_country(temp);
  };
  const excludedCountries = (val) => {
    let temp = [];
    val.forEach((c) => temp.push(c.value));
    setExcluded_from_country(temp);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: () => ({
      maxHeight: 200,
      overflowY: "scroll",
      display: "flex",
      placeItems: "flex-start",
      border: "2px solid #D5D5D5",
      borderRadius: "5px",
    }),
  };

  const handleGeoblocking = () => {
    let selectedCountries = {
      excluded_from_country:
        excluded_from_country && excluded_from_country
          ? excluded_from_country?.join()
          : selectedSeriesRegions?.excluded_from_country,
      only_in_country:
        only_in_country && only_in_country
          ? only_in_country?.join()
          : selectedSeriesRegions?.only_in_country,
    };

    if (selectedCountries) {
      dispatch(
        postGeoblocking({
          token: token,
          data: selectedCountries,
          id: selectedSeries.series_id,
        })
      ).then((res) => {
        if (res?.payload?.data?.body) {
          dispatch(
            getSeriesById({ token: token, id: selectedSeries.series_id })
          );
          setIsloading(false);
          props.setShow(!props.show);
        } else {
          setIsloading(false);
          props.setShow(!props.show);
        }
      });
    } else {
      props.setShow(!props.show);
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={props.show}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ alignItems: "end" }}>
            <TouchableOpacity onPress={() => props.setShow(!props.show)}>
              <Text style={styles.cross}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.modalText}>Manage Geoblocking</Text>
          <ScrollView>
            <View>
              <View style={styles.select_wrapper}>
                <View style={{ width: "310px", minHeight: "310px" }}>
                  <Text style={styles.select_text}>
                    Available only in these counties :
                  </Text>
                  <View style={styles.regions_wrapper}>
                    {availableRegions &&
                      availableRegions.map((item) => {
                        return (
                          <>
                            <Text style={styles.region}>{item.label}</Text>
                            <Text style={styles.region}>, </Text>
                          </>
                        );
                      })}
                  </View>
                </View>
                <View style={{ width: "310px", minHeight: "310px" }}>
                  <Text style={styles.select_text}>
                    Select available counties
                  </Text>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={(e) => onlyInCountrys(e)}
                    defaultValue={availableRegions}
                    isMulti
                    options={countries}
                    styles={customStyles}
                  />
                </View>
              </View>
              <View style={styles.select_wrapper}>
                <View style={{ width: "310px", minHeight: "310px" }}>
                  <Text style={styles.select_text}>
                    Excluded from in these counties :
                  </Text>
                  <View style={styles.regions_wrapper}>
                    {excludedRegions &&
                      excludedRegions.map((item) => {
                        return (
                          <>
                            <Text style={styles.region}>{item.label}</Text>
                            <Text style={styles.region}>, </Text>
                          </>
                        );
                      })}
                  </View>
                </View>
                <View style={{ width: "310px", minHeight: "310px" }}>
                  <Text style={styles.select_text}>
                    Select excluded counties
                  </Text>
                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    onChange={(e) => excludedCountries(e)}
                    defaultValue={excludedRegions}
                    isMulti
                    options={countries}
                    styles={customStyles}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.btns_wrspper}>
            {isloading ? (
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
                    <TouchableOpacity onPress={handleGeoblocking}>
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
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  regions_wrapper: {
    flex: 1,
    flexDirection: "row",
  },
  select_wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  cross: {
    backgroundColor: "#000",
    color: "#fff",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "95%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    //   alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
  },
  select_text: {
    fontSize: 18,
    fontWeight: 500,
    marginBottom: 12,
  },
  region: {
    fontWeight: 300,
    marginBottom: 10,
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
});
