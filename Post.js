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

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = { image: "" };

    const { route } = this.props;
    this.id = route.params.id;
    this.name = route.params.name;
    this.count = route.params.count + 1;
    console.log(this.id);
  }

  accept_add_storage = async (querySnapshot) => {
    console.log("func: Post/accept_add_storage");
    console.log("\n" + this.state.image + "\n");
    await this.setState({ image: querySnapshot });
    await console.log("\n" + this.state.image + "\n");
    console.log("func: Post/accept_add_storage pass");
  };

  accept_get_storage = (querySnapshot) => {
    console.log("func: Post/accept_get_storage");
    console.log("func: Post/accept_get_storage pass");
  };

  accept_add_store = (querySnapshot) => {
    console.log("func: Post/accept_add_store");
    console.log("func: Post/accept_add_store pass");
  };

  reject = (error) => {};

  componentDidMount() {
    console.log("func: Post/componentDidMount");
    console.log("func: Post/componentDidMount pass");
  }

  uploadImage = async () => {
    console.log("func: Post/uploadImage");
    await firestore.add_post_storage(
      this.state.image,
      this.count,
      this.accept_add_storage,
      this.reject
    );
    await firestore.get_post_storage(
      this.count,
      this.accept_get_storage,
      this.reject
    );
    console.log("\n" + this.state.image + "\n");
    let datas = await {
      name: this.name,
      uri: this.state.image,
      like: 0,
      share: 0,
    };
    await firestore.add_post_store(datas, this.accept_add_store, this.reject);
    console.log("func: Post/uploadImage pass");
  };

  pick_image = async () => {
    console.log("func: Post/pick_image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result.uri);
      this.setState({ image: result.uri });
    }
    console.log("func: Post/pick_image pass");
  };

  call = () => {
    console.log("\n\n\n\n\n\n\n");
  };

  check = () => {
    console.log(this.state.image);
  };

  Header = () => {
    return (
      <View style={styles.header}>
        <Text>Post</Text>
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
              <TouchableOpacity style={styles.button} onPress={this.pick_image}>
                <Text>Choose Picture</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.uploadImage}
              >
                <Text>Upload</Text>
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
  button: {
    flex: 1,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Feed;
