import React from "react";
import { Text, View, FlatList } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Link } from "expo-router";
import useCategoryStore from "@store/category.store";

export default function HomeScreen() {
  const { categoryList, setSelectedCategory } = useCategoryStore();

  return (
    <View className="p-4 flex gap-4 h-[92vh] justify-between pt-20">
      <View className="flex flex-row gap-4">
        <View className="flex-1">
          <FlatList
            data={categoryList}
            renderItem={({ item }) => (
              <Link
                className="mt-2"
                onPress={() => setSelectedCategory(item)}
                href={{
                  pathname: "./(mezmur)/mezmur-list",
                  params: { id: item.id, title: item.name },
                }}
              >
                <Card className="w-full">
                  <CardHeader className="flex flex-row justify-between">
                    <View>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      <CardDescription>
                        <Text>{item.number_of_mezmurs} {item.number_of_mezmurs === 1 ? 'መዝሙር' : 'መዝሙሮች'}</Text>
                      </CardDescription>
                    </View>
                  </CardHeader>
                  <CardContent className="flex flex-col items-end">
                    <Text>Last updated</Text>
                    <CardDescription>
                      <Text>{item.last_updated_at}</Text>
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            )}
          />
        </View>
      </View>
      <View></View>
    </View>
  );
}
