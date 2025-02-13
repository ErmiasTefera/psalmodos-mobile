import { FlatList, View } from "react-native";
import React from "react";
import MezmurListItem from "~/components/MezmurListItem";

export default function MezmurList() {
  const [mezmurs, setMezmurs] = React.useState([
    {
      id: "1",
      artist: "Abel",
      title: "Temesgen",
      createdDate: "2021-09-01",
      duration: "3:43",
      isPlaying: false,
    },
    {
      id: "2",
      artist: "Mirtinesh",
      title: "እሴብሕ ጸጋኪ",
      createdDate: "2021-09-01",
      duration: "5:01",
      isPlaying: false,
    },
  ]);

  const togglePlay = (id: string) => {
    setMezmurs((prevMezmurs) =>
      prevMezmurs.map((mezmur) => {
        // if the mezmur is the one we want to toggle
        if (mezmur.id === id) {
          mezmur.isPlaying = !mezmur.isPlaying;
        } else {
          // if the mezmur is not the one we want to toggle
          mezmur.isPlaying = false;
        }
        
        return mezmur;
      }
      )
    );
  };

  return (
    <View className="p-3">
      <FlatList
        data={mezmurs}
        renderItem={({ item }) => (
          <MezmurListItem item={item} togglePlay={togglePlay} />
        )}
      />
    </View>
  );
}
