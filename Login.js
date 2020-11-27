import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";

import firestore from "./firebase/Firestore";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: null,
      name: null,
      email: null,
      password: null,
      auth_first: true,
    };
  }

  accept_auth = (querySnapshot) => {
    console.log("func: Login/accept_authen");
    // var user = firestore.firebase.auth().currentUser;
    if (this.state.auth_first) {
      let datas = {
        email: this.state.email,
        name: this.state.email,
      };
      firestore.add_users(datas, this.accept_add_store, this.reject);
    }
    console.log("current <ID>: " + this.state.id);
    console.log("current <Name>: " + this.state.name);
    console.log("current <Email>: " + this.state.email);
    this.props.navigation.navigate("Feed", {
      id: this.state.id,
      name: this.state.name,
    });
    console.log("func: Login/accept_authen pass");
  };

  accept_get_init = (querySnapshot) => {
    console.log("func: Login/accept_get_init");
    this.setState({ users: [] });
    var users = [];
    querySnapshot.forEach(function (doc) {
      var user = doc.data();
      // console.log(user.name);
      user["id"] = doc.id;
      users = users.concat(user);
    });
    this.setState({ users: this.state.users.concat(users) });
    // console.log(users);
    console.log("func: Login/accept_get_init pass");
  };

  reject = (err) => {};

  componentDidMount() {
    console.log("func: Login/componentDidMount");
    firestore.get_init(this.accept_get_init, this.reject);
    console.log("func: Login/componentDidMount pass");
  }

  // RELOAD 1 TIME BEFORE FIRST LOGIN
  on_login = () => {
    console.log("func: Login/on_login");
    this.state.users.forEach((element) => {
      console.log("Check: " + this.state.email + " & " + element.email);
      if (element.email === this.state.email) {
        console.log("\nold guy\n");
        this.setState({ id: element.id });
        this.setState({ name: element.name });
        this.setState({ auth_first: false });
        firestore.auth(
          this.state.email,
          this.state.password,
          this.accept_auth,
          this.reject
        );
      }
    });
    if (this.state.auth_first) {
      firestore.auth_first(
        this.state.email,
        this.state.password,
        this.accept_auth,
        this.reject
      );
    }
    console.log("func: Login/on_login pass");
  };

  call = () => {
    console.log("\n\n\n\n\n\n\n");
  };

  check = () => {
    console.log(this.state.email);
    console.log(this.state.password);
  };

  Header = () => {
    return (
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={{
            uri:
              "https://firebasestorage.googleapis.com/v0/b/myproject-75fab.appspot.com/o/image%2Flogo-removebg-preview.png?alt=media&token=fb8a3f57-ff29-4f72-be8f-9ff4c0616380",
          }}
        ></Image>
        <TouchableOpacity
          style={{ backgroundColor: "gray", width: 50, height: "100%" }}
          onPress={this.call}
        >
          <Text>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "lime", width: 50, height: "100%" }}
          onPress={this.check}
        >
          <Text>Check</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "orange", width: 50, height: "100%" }}
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
          style={{ backgroundColor: "pink", width: 50, height: "100%" }}
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
          style={{ backgroundColor: "white", width: 50, height: "100%" }}
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
          style={{ backgroundColor: "cyan", width: 50, height: "100%" }}
          onPress={this.reload}
        >
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  };
  render(props) {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {/* <this.Header /> */}
        <View style={styles.top}>
          <ImageBackground
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/myproject-75fab.appspot.com/o/image%2Fbg.jpg?alt=media&token=10d220af-9e31-46de-a845-523366e257d8",
            }}
            style={styles.image}
          ></ImageBackground>
        </View>
        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <View style={styles.box}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.text_input}
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
            <View style={styles.box}>
              <Text style={styles.text}>Password</Text>
              <TextInput
                style={styles.text_input}
                onChangeText={(text) => this.setState({ password: text })}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.box}>
              <TouchableOpacity style={styles.button} onPress={this.on_login}>
                <Text style={{ fontSize: 18 }}>Login Google</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          {/* <ImageBackground
            source={{
              uri:
                "https://firebasestorage.googleapis.com/v0/b/myproject-75fab.appspot.com/o/image%2Fbg2.jpg?alt=media&token=40efdec1-ecde-4195-9cd3-f765b9df7249",
            }}
            style={styles.image}
          ></ImageBackground> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    //backgroundColor: "#aaa",
    flex: 4,
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#bbb",
    flex: 2,
    padding: 20,
    margin: 20,
  },
  bottom: {
    backgroundColor: "black",
    flex: 2,
  },
  image: {
    width: "100%",
    height: Math.round(Dimensions.get("window").height) / 2,
    backgroundColor: "#dddddd",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#929392",
    alignItems: "center",
    //height: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginTop: 30,
  },
  box: {
    // backgroundColor: "#666",
    flex: 1,
    flexDirection: "row",
    //alignItems: 'center',
    //justifyContent:"space-around",
    borderRadius: 5,
    margin: 10,
  },
  text: {
    //backgroundColor: "cyan",
    fontSize: 18,
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 3,
  },
  text_input: {
    backgroundColor: "#999",
    fontSize: 16,
    flex: 0.7,
    borderRadius: 50,
    margin: 2,
    padding: 4,
  },
  button: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    width: "20%",
    height: "90%",
  },
});

export default Login;
