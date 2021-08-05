import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import Home from "./components/Login";
import Signup from "./components/Signup";
import Main from "./components/Main";
export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/main" component={Main} />
        </Switch>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  textcolor: {
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#bdc1c6",
    alignItems: "center",
    justifyContent: "center",
  },
});
