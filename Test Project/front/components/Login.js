import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
} from "react-native";
import axios from "axios";
import { apiurl } from "../vars";
export default ({ history }) => {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [notif, setnotif] = useState(false);
  const [data, setdata] = useState();

  /////////////////////////////////////
  useEffect(() => {
    //check if user is logged in
    AsyncStorage.getItem("token").then((val) => {
      if (val !== null) {
        history.push("/main");
      }
    });
  }, []);
  /////////////////////////////////////
  //-----------------notification function------------------------
  const notify = () => {
    setnotif(true);
    setTimeout(() => {
      setnotif(false);
    }, 1500);
  };
  ////////////////////////////////////
  //-----------------------------login function----------------------------------
  const login = async () => {
    const res = await axios.post(apiurl + "/api/users/signin", {
      email,
      password: pass,
    });
    setdata(res.data);
    if (res.data.token) {
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("userid", res.data.userId);
      return history.push("/main");
    }
    return notify();
  };
  //////////////////////////////
  return (
    <View>
      <Text style={styles.textcolor}>LOGIN</Text>
      <View style={styles.textinpcont}>
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
        <TouchableOpacity style={styles.btn} onPress={() => login()}>
          <Text>login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            history.push("/signup");
          }}
          style={styles.btn}
        >
          <Text>sign up</Text>
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
    marginTop: 25,
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
