import React from "react";
import { Text, View, FlatList } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { EllipsisVertical } from "lucide-react-native";
import { Link } from "expo-router";
import FloatingTrackControl from "../components/floating-track-control";

export default function HomeScreen() {
  const [categories, setCategories] = React.useState([
    { name: "ልደት", key: "lidet", numberOfSongs: 10, lastUpdated: "2021-09-11" },
    {
      name: "ጥምቀት",
      key: "timket",
      numberOfSongs: 10,
      lastUpdated: "2021-09-11",
    },
  ]);

  return (
    <View className="p-4 flex gap-4 h-[92vh] justify-between pt-20">
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <Link
                className="mt-2"
                href={{
                  pathname: "/mezmur-list",
                  params: { id: item.key, title: item.name },
                }}
              >
                <Card className="w-full">
                  <CardHeader className="flex flex-row justify-between">
                    <View>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <CardDescription>
                        <Text>{item.numberOfSongs} መዝሙሮች</Text>
                      </CardDescription>
                    </View>
                    <EllipsisVertical color="black" size={18} />
                  </CardHeader>
                  <CardContent className="flex flex-col items-end">
                    <Text>Last updated</Text>
                    <CardDescription>
                      <Text>{item.lastUpdated}</Text>
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )}
          />
        </View>
      </View>
      <View>
        <FloatingTrackControl />
      </View>
    </View>
  );
}
