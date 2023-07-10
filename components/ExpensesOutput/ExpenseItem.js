import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { getDateFormatted } from "../../utils/date";
import { useNavigation } from "@react-navigation/core";

function ExpenseItem({ description, amount, date, id }) {
  const navigation = useNavigation();
  function expressPressHandler() {
    navigation.navigate("ManageExpense", { eId: id });
  }
  return (
    <Pressable
      onPress={expressPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getDateFormatted(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            ${amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: Colors.secondary800,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
    shadowColor: Colors.secondary800,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  pressed: { opacity: 0.75 },
  textBase: {
    color: Colors.primary400,
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.primary400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: Colors.secondary800,
    fontWeight: "bold",
  },
});

export default ExpenseItem;
