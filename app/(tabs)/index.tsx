import React from "react";
import { Text, View, FlatList } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { EllipsisVertical } from 'lucide-react-native';


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
    <View className="mt-8 p-4 pt-8 flex gap-4 bg-d h-full">
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <Card className="flex-1 mt-2">
                <CardHeader className="flex flex-row justify-between">
                  <View>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                  <CardDescription>
                    <Text>{item.numberOfSongs} መዝሙሮች</Text>
                  </CardDescription>
                  </View>
                  <EllipsisVertical />
                </CardHeader>
                <CardContent>
                  <Text>Last updated</Text>
                  <CardDescription>
                    <Text>{item.lastUpdated}</Text>
                  </CardDescription>
                </CardContent>
              </Card>
            )}
          />
        </View>
      </View>
    </View>
  );
}
