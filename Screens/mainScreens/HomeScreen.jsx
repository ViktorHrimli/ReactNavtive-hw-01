import React, { useState, useEffect } from "react";
// icons
import { Feather } from "@expo/vector-icons";

import { readDataPosts } from "../../FireBase";

import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";

const HomeScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  const [width, setwidth] = useState(Dimensions.get("screen").width - 32);
  const [count, setCount] = useState(0);

  const userId = useSelector((state) => state.verify.userId);

  useEffect(() => {
    readDataPosts(userId).then((snapshoot) => {
      if (snapshoot.exists()) {
        setPosts((prev) => prev.concat([snapshoot.val()]));
      }
    });

    console.log(posts);
  }, []);
  return (
    <View style={styles.conteiner}>
      <View style={styles.profile_conteiner}>
        <Image
          style={styles.image}
          source={require("../../assets/img/photo_2022-12-27_02-15-19.jpg")}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.name}>Viktor Hrimli</Text>
          <Text style={styles.email}>ViktorHrimli@gmail.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <Image
              style={{ ...styles.conteiner_img, width }}
              borderRadius={8}
              source={{ uri: item.newPhoto }}
            ></Image>
            <Text style={styles.text_title}>{item.input.title}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                marginTop: 8,
              }}
            >
              <View style={styles.comment_conteiner}>
                <Feather
                  name="message-circle"
                  size={21}
                  color="#BDBDBD"
                  style={{ marginRight: 7 }}
                  onPress={() => navigation.navigate("Comment")}
                />
                <Text style={styles.count_comment}>0</Text>
              </View>
              <View style={styles.location_conteiner}>
                <Feather
                  style={{}}
                  name="map-pin"
                  size={18}
                  color="#BDBDBD"
                  onPress={() => navigation.navigate("Map", item.location)}
                />
                <Text style={{ marginLeft: 8, color: "#212121", fontSize: 16 }}>
                  {item.input.location}
                </Text>
              </View>
            </View>
          </View>
        )}
      ></FlatList>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  profile_conteiner: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "auto",
    marginBottom: 32,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 16,
  },
  name: {
    color: "#212121",
    fontSize: 15,
    lineHeight: 18,
    fontWeight: "700",
  },
  email: {
    color: "rgba(33, 33, 33, 0.8)",
    fontSize: 13,
    lineHeight: 15,
  },
  conteiner_img: {
    marginBottom: 8,
    width: 343,
    height: 250,
  },
  text_title: {
    fontFamily: "Silvana-1",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginRight: "auto",
  },
  comment_conteiner: {
    flexDirection: "row",
  },
  count_comment: {
    fontSize: 15,
    color: "#BDBDBD",
  },
  location_conteiner: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 65,
  },
});
