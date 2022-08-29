import React from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Notification from "../Components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../redux/reducers/authReducer";
import { useNavigation } from "@react-navigation/native";

export default function Signin() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const { loading, message } = useSelector((state) => state.user);
  let messages = [message];

  const handleEmailChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const secureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const signIn = async () => {
    await dispatch(
      signinUser({ email: data.email, password: data.password })
    ).then((res) => {
      if (
        res.payload.challengeName &&
        res.payload.challengeName === "NEW_PASSWORD_REQUIRED"
      ) {
        setData({
          ...data,
          password: "",
        });
        navigation.navigate("CreateNewPassword", {
          user: res.payload,
        });
      } else if (
        res &&
        res?.payload?.signInUserSession?.accessToken?.jwtToken
      ) {
        navigation.navigate("series");
      }
    });
  };
  return (
    <View style={styles.container}>
      {message ? (
        <Notification
          key={messages}
          message={messages}
          onHide={() => {
            messages = (messages) =>
              messages.filter((currentMessage) => currentMessage !== messages);
          }}
        />
      ) : null}

      <Animatable.View
        style={[styles.header, { alignItems: "center" }]}
        animation="fadeInDownBig"
      >
        <Image
          source={require("../assets/minno-logo-login.svg")}
          style={{ width: 300, height: 200, resizeMode: "stretch" }}
        />
      </Animatable.View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer, { width: "320px" }]}>Email</Text>
        <View style={[styles.action, { width: "320px" }]}>
          <FontAwesome name="user-o" color="#009387" size={20} />
          <TextInput
            placeholder="Your email"
            style={styles.textinput}
            autoCapitalize="none"
            onChangeText={(val) => handleEmailChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
              width: "320px",
            },
          ]}
        >
          Password
        </Text>
        <View style={[styles.action, { width: "320px" }]}>
          <FontAwesome name="lock" color="#009387" size={20} />
          <TextInput
            placeholder="Password"
            onChangeText={(val) => handlePasswordChange(val)}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textinput}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={secureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="gray" size={20} />
            ) : (
              <Feather name="eye" color="gray" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={[
                styles.text_forgot,
                {
                  marginTop: 25,
                  width: "104px",
                },
              ]}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.button, , { width: "150px" }]}>
          <LinearGradient colors={["#08d4c4", "#01ab9d"]} style={styles.signin}>
            <TouchableOpacity onPress={signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
  },

  text_header: {
    color: "#fff",
    fontWaight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  text_forgot: {
    color: "#009387",
    fontSize: 14,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textinput: {
    flex: 1,
    // Platform.OS === 'web' && { outlineWidth: 0 },
    marginTop: Platform.OS === "web" ? 0 : -12,
    paddingLeft: 20,
    color: "#05375a",
    outlineStyle: "none",
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
