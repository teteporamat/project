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
        console.log("\n old guy\n");
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
    return <View style={styles.header}></View>;
  };
  render(props) {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <this.Header /> */}
        <View style={styles.top}></View>
        <View style={styles.content}>
          <View>
            <View style={{ flex: 1 }}>
              <Text>Name</Text>
              <TextInput
                style={styles.text_input}
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
            <Text>Password</Text>
            <TextInput
              style={styles.text_input}
              onChangeText={(text) => this.setState({ password: text })}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={this.on_login}>
              <Text>Login Google</Text>
            </TouchableOpacity>
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
    flex: 1,
  },
  content: {
    backgroundColor: "#bbb",
    flex: 2,
  },
  bottom: {
    backgroundColor: "#ccc",
    flex: 1,
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
  text_input: {
    backgroundColor: "#999",
  },
  button: {
    backgroundColor: "orange",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
