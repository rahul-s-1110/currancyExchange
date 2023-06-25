import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import { Currency } from "./src/assets/data";
import { useState } from "react";
// import Snac

export default function App() {
  const [inputCurrancy, setInputCurrancy] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");

  const RenderItem = ({ flag, name}) => {
    return (
      <View style={styles.buttonContainer}>
        <Text style={styles.flag}>{flag}</Text>
        <Text style={styles.country}>{name}</Text>
      </View>
    );
  };

  const buttonPressed = (item) => {
    const convertedValue = inputCurrancy * item.value;
    const result = `${item.symbol} ${convertedValue.toFixed(2)}`;
    setResultValue(result);
    setTargetCurrency(item.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.inptView}
      >
        <Text>Enter Rupees</Text>
        <TextInput
          style={styles.txtInpt}
          keyboardType="number-pad"
          placeholder="Enter Amount in Rupees"
          value={inputCurrancy}
          onChangeText={setInputCurrancy}
        />
      </View>
      {resultValue && (
            <Text style={styles.resultTxt} >
              {resultValue}
            </Text>
          )}
      <View style={styles.bottomContainer}>
        <FlatList
          numColumns={3}
          data={Currency}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.button, targetCurrency === item.name && styles.selected]}
              onPress={() => buttonPressed(item)}
            >
              <RenderItem {...item} />
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  flag: {
    fontSize: 28,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: "#2d3436",
  },
  bottomContainer: {
    width: 400,
    height: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 60,
    height: 70,
    margin: 25,
    backgroundColor: "#fff",
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: "#ffeaa7",
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  inptView:{
    width: 300,
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  txtInpt:{
    width: 200, height: 50,marginLeft:20
  }
});
