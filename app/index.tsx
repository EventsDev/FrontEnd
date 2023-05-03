import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Link href="/map" asChild>
        <Pressable style={styles.itemContainer}>
          <Text>
            Mapa
          </Text>
        </Pressable>
      </Link>

      <Link href="/register" asChild>
        <Pressable style={styles.itemContainer}>
          <Text>
            Registrar
          </Text>
        </Pressable>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: '#008000',
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
