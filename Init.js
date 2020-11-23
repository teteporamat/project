import React, { Component } from "react";
import { View, Text } from "react-native";

class Init extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "A",
    };
  }

  accept = () => {
    this.props.navigation.navigate("Feed", { name: this.state.name });
  };

  reject = (err) => {};

  componentDidMount() {
    setTimeout(() => {
      this.accept();
    }, 2000);
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
