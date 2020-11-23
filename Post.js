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
    this.count = route.params.count + 1;
    this.name = route.params.name;
    // console.log(this.name);
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
        <TouchableOpacity
          style={{
            backgroundColor: "gray",
            width: 50,
            height: "100%",
          }}
          onPress={this.call}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "lime",
            width: 50,
            height: "100%",
          }}
          onPress={this.check}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            width: 50,
            height: "100%",
          }}
          onPress={() => {
            this.props.navigation.navigate("Feed", {
              name: this.name,
            });
          }}
        ></TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "pink",
            width: 50,
            height: "100%",
          }}
          onPress={() => {
            this.props.navigation.navigate("Post");
          }}
        ></TouchableOpacity>
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
            <TouchableOpacity onPress={this.pick_image}>
              <Text style={{ fontSize: 15 }}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.uploadImage}>
              <Text style={{ fontSize: 15 }}>Upload Image</Text>
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
  },
  icon_like: {
    backgroundColor: "lime",
  },
});

export default Feed;
