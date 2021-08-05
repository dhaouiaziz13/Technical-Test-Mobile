import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import { apiurl } from "../vars";

export default ({ history }) => {
  //////////////////////////////////////////
  useEffect(() => {
    AsyncStorage.getItem("token").then((val) => {
      if (val !== null) {
        history.push("/main");
      }
    });
  }, []);
  ////////////////////////////////
  const [email, setemail] = useState("");
  const [password, setpass] = useState("");
  const [username, setusername] = useState("");
  const [notif, setnotif] = useState(false);
  const [data, setdata] = useState();
  const notify = () => {
    setnotif(true);
    setTimeout(() => {
      setnotif(false);
    }, 1500);
  };

  ////////////////////////////////
  //   const DismissKeyboard = ({ children }) => (
  //     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
  //       {" "}
  //       {children}
  //     </TouchableWithoutFeedback>
  //   );
  ////////////////////////////////
  const signup = async () => {
    const res = await axios.post(apiurl + "/api/users/signup", {
      email,
      username,
      password,
    });
    setdata(res.data);
    if (res.data.message === "User created!") {
      res.data;
      return history.push("/");
    }
    return notify();
  };
  return (
    <View>
      <Text style={styles.textcolor}>SIGNUP</Text>
      <View style={styles.textinpcont}>
        <TextInput
          placeholder="username"
          onChangeText={(val) => {
            setusername(val);
          }}
          style={styles.textinp}
        />
        <TextInput
          placeholder="email"
          onChangeText={(val) => {
            setemail(val);
          }}
          style={styles.textinp}
        />
        <TextInput
          placeholder="password"
          style={styles.textinp}
          onChangeText={(val) => {
            setpass(val);
          }}
        />
      </View>

      <View style={styles.textinpcont}>
        <TouchableOpacity onPress={() => signup()} style={styles.btn}>
          <Text>register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            history.push("/");
          }}
          style={styles.btn}
        >
          <Text>login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textinpcont}>
        {notif ? <Text style={styles.Notification}>{data.message}</Text> : null}
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  Notification: {
    textAlign: "center",
    position: "absolute",
    zIndex: 12,
    top: 20,
    backgroundColor: "red",
    borderRadius: 10,
    padding: 8,
  },
  textcolor: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
  },

  textinpcont: {
    justifyContent: "center",
    alignItems: "center",
  },
  textinp: {
    padding: 7,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#fcba03",
    borderRadius: 10,
    width: 250,
  },
  btn: {
    backgroundColor: "#fcba03",
    borderColor: "#fcba03",
    borderRadius: 10,
    width: 70,
    padding: 8,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
