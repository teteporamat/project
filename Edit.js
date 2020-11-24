import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import firestore from "./firebase/Firestore";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = { id: null, name: null, password: null };

    const { route } = this.props;
    this.id = route.params.id;
    this.name = route.params.name;
    console.log(this.id);
  }

  accept = async (querySnapshot) => {};

  reject = (error) => {};

  componentDidMount() {
    console.log("func: Edit/componentDidMount");
    console.log("func: Edit/componentDidMount pass");
  }

  on_change = () => {
    console.log("func: Edit/on_change");
    console.log(this.state.name + " " + this.state.password);
    firestore.update_users(
      this.id,
      this.state.name,
      this.state.password,
      this.accept,
      this.reject
    );
    console.log("func: Edit/on_change pass");
  };

  call = () => {
    console.log("\n\n\n\n\n\n\n");
  };

  check = () => {
    console.log(this.state.name);
    console.log(this.state.password);
  };

  Header = () => {
    return (
      <View style={styles.header}>
        <Text>Edit</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "gray",
            width: 50,
            height: "100%",
          }}
          onPress={this.call}
        >
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "lime",
            width: 50,
            height: "100%",
          }}
          onPress={this.check}
        >
          <Text>Check</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            width: 50,
            height: "100%",
          }}
          onPress={() => {
            this.props.navigation.navigate("Feed", {
              id: this.id,
              name: this.name,
            });
          }}
        >
          <Text>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "pink",
            width: 50,
            height: "100%",
          }}
          onPress={() => {
            this.props.navigation.navigate("Post", {
              id: this.id,
              name: this.name,
              count: this.state.count,
            });
          }}
        >
          <Text>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: 50,
            height: "100%",
          }}
          onPress={() => {
            this.props.navigation.navigate("Edit", {
              id: this.id,
              name: this.name,
            });
          }}
        >
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "cyan",
            width: 50,
            height: "100%",
          }}
          onPress={this.reload}
        >
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 8,
        }}
      />
    );
  };

  render(props) {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <this.Header />
        <View style={{ flex: 1 }}>
          <View style={styles.content}>
            <Text>Name</Text>
            <TextInput
              style={styles.text_input}
              onChangeText={(text) => this.setState({ name: text })}
            />
            <Text>Password</Text>
            <TextInput
              style={styles.text_input}
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry={true}
            />
            <TouchableOpacity onPress={this.on_change}>
              <Text>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  image: {
    width: "100%",
    height: Math.round(Dimensions.get("window").height) / 2,
    backgroundColor: "#dddddd",
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginTop: 50,
  },
  icon_like: {
    backgroundColor: "lime",
  },
  text_input: {
    backgroundColor: "#bbb",
  },
});

export default Edit;
