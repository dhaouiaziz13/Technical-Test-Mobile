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
  const [notif, setnotif] = useState(false);
  const [data, setdata] = useState();
  /////////////////////////////////////
  useEffect(() => {
    AsyncStorage.getItem("token").then((val) => {
      if (val === null) {
        history.push("/");
      }
    });

    AsyncStorage.getItem("userid").then((val) => {
      if (val !== null) {
        axios.post(apiurl + "/api/users/fetch", { id: val }).then((res) => {
          setdata(res.data);
        });
      }
    });
  }, []);
  /////////////////////////////////////
  const del = () => {
    axios
      .post(apiurl + "/api/users/delete", { id: data._id })
      .then(async (res) => {
        if (res.data === "deleted") {
          try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("userid");
          } catch (e) {
            // remove error
          }

          ("Done.");
          return history.push("/");
        }
      });
  };
  const notify = () => {
    setnotif(true);
    setTimeout(() => {
      setnotif(false);
    }, 1500);
  };
  ////////////////////////////////////
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userid");
    } catch (e) {
      // remove error
    }

    ("Done.");
    return history.push("/");
  };
  //////////////////////////////
  return (
    <View>
      {data ? (
        <Text style={styles.textcolor}>hello {data.username}</Text>
      ) : (
        <Text style={styles.textcolor}>hello there</Text>
      )}

      <View style={styles.textinpcont}>
        <TouchableOpacity
          style={styles.btndel}
          onPress={() => {
            del();
          }}
        >
          <Text>delete account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()} style={styles.btn}>
          <Text>Logout</Text>
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
  btndel: {
    backgroundColor: "red",
    borderColor: "#fcba03",
    borderRadius: 10,

    padding: 8,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
