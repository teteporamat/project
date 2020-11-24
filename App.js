import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";

import Feed from "./Feed";
import Post from "./Post";
import Init from "./Init";
import Edit from "./Edit";

const InitScreen = () => {
  const navigation = useNavigation();
  return <Init navigation={navigation} />;
};

const FeedScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Feed navigation={navigation} route={route} />;
};

const PostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Post navigation={navigation} route={route} />;
};

const EditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return <Edit navigation={navigation} route={route} />;
};

const Stack = createStackNavigator();
const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Init"
        component={InitScreen}
        options={{ headerShown: false, title: "Init" }}
      />
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false, title: "Feed" }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShown: false, title: "Post" }}
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={{ headerShown: false, title: "Edit" }}
      />
    </Stack.Navigator>
  );
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render(props) {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}
