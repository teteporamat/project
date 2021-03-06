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
    this.state = { users: [], id: null, name: null };

    const { route } = this.props;
    this.id = route.params.id;
    this.name = route.params.name;
    console.log(this.id);
  }

  accept = async (querySnapshot) => {};

  reject = (error) => {};

  componentDidMount() {
    console.log("func: Edit/componentDidMount");
    this.setState({ name: this.name });
    console.log("func: Edit/componentDidMount pass");
  }

  on_change = () => {
    console.log("func: Edit/on_change");
    console.log(this.state.name);
    firestore.update_users(this.id, this.state.name, this.accept, this.reject);
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
        <View style={styles.top}></View>
        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <View style={styles.box}>
              <Text style={styles.text}>Name</Text>
              <TextInput
                style={styles.text_input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
              />
            </View>
            <View style={styles.box}>
              <TouchableOpacity style={styles.button} onPress={this.on_change}>
                <Text>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottom}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    backgroundColor: "#aaa",
    flex: 3,
  },
  content: {
    backgroundColor: "#bbb",
    flex: 2,
    padding: 20,
  },
  bottom: {
    backgroundColor: "#ccc",
    flex: 3,
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
  box: {
    backgroundColor: "#666",
    flex: 1,
    flexDirection: "row",
    marginBottom: 20,
  },
  text: {
    backgroundColor: "cyan",
    flex: 2,
    alignSelf: "center",
  },
  text_input: {
    backgroundColor: "#999",
    flex: 6,
    borderRadius: 50,
  },
  button: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Edit;
