import React, { Component } from "react";
import { View, Text } from "react-native";

import firestore from "./firebase/Firestore";

class Init extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: null,
      name: null,
    };
    this.id = "R5Q63vXg4TT3gmdwETl9";
    this.name = "Atiwitch";
  }

  accept = () => {
    this.props.navigation.navigate("Feed", {
      id: this.state.id,
      name: this.state.name,
    });
  };

  accept_init = (querySnapshot) => {
    console.log("func: Init/accept_init");
    this.setState({ users: [] });
    var users = [];
    querySnapshot.forEach(function (doc) {
      var user = doc.data();
      // console.log(user.name);
      user["id"] = doc.id;
      users = users.concat(user);
    });
    this.setState({ users: this.state.users.concat(users) });
    this.state.users.forEach(function (doc) {
      console.log(doc);
      if (doc.id === this.id) {
        this.setState({ id: doc.id, name: doc.name });
      }
    });
    console.log("func: Init/accept_init pass");
  };

  reject = (err) => {};

  componentDidMount() {
    console.log("func: Init/componentDidMount");
    setTimeout(() => {
      firestore.get_init(this.accept_init, this.reject);
      this.accept();
    }, 2000);
    console.log("func: Init/componentDidMount pass");
  }

  render(props) {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "black", fontSize: 32 }}>Splash Screen</Text>
      </View>
    );
  }
}

export default Init;
