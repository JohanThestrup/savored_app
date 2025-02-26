import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  Image
} from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import { firebaseApp } from "../constants/Firebase";
import { postUserDb, postFiltersDb, postRecipeDb } from "../db/db";
import { initialState } from "../redux/reducers/filters";
const _screen = Dimensions.get("screen");

export interface SignupScreenProps {
  navigation: StackNavigationProp<ChefStackParamList, "SignupScreen">;
}

export default function SignupScreen({ navigation }: SignupScreenProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = React.useState(false);
  const [hidePassword, setHidePassword] = React.useState(true);
  const [blockSignup, setBlockSignup] = React.useState(false);

  const userRecipeListState = useSelector<RootState, UserRecipeListState>(
    (state) => state.userRecipeListState
  );

  React.useEffect(() => {
    if (/^\S+@\S+\.\S+$/.test(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }, [email]);

  function handleHidePassword() {
    setHidePassword(!hidePassword);
  }

  async function handleSignUp() {
    // Check that both email and password field are populated.
    // Also check that the email is somewhat valid
    setBlockSignup(true);

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email.");
      setBlockSignup(false);
    } else if (password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be 6 characters or longer."
      );
      setBlockSignup(false);
    } else {
      try {
        const resp = await firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password);

        const createUserResult = await postUserDb(
          resp.user?.uid,
          resp.user?.email
        );
        const createFiltersResult = await postFiltersDb(
          resp.user?.uid,
          initialState.filters
        );

        if (resp.additionalUserInfo?.isNewUser) {
          if (userRecipeListState.userRecipeList.length !== 0) {
            for (const savoredRcp of userRecipeListState.userRecipeList) {
              const swipeToDbResult = await postRecipeDb(
                resp.user?.uid,
                savoredRcp
              );
            }
          }
          navigation.goBack();
          setBlockSignup(false);
        }
      } catch (error) {
        Alert.alert("Invalid Request", error.message);
        setBlockSignup(false);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
      <Image 
        source={require("../../assets/header.png")}
        style={styles.headerImage}
        />
        <Text style={styles.subHeader}>Put on your apron and sharpen your knife, Heat up the pan and spice up your life!</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <View style={[styles.input, { justifyContent: "space-between" }]}>
              <View style={styles.passwordContainer}>
                <MaterialCommunityIcons name="account-outline" size={20} />
                <TextInput
                  style={{ width: _screen.width * 0.5 }}
                  placeholder="Your Email"
                  autoCapitalize="none"
                  onChangeText={(val) => setEmail(val)}
                />
              </View>

              {validEmail ? (
                <MaterialCommunityIcons
                  name="checkbox-marked-circle-outline"
                  color="green"
                  size={20}
                />
              ) : (
                <></>
              )}
            </View>

            <View style={[styles.input, { justifyContent: "space-between" }]}>
              <View style={styles.passwordContainer}>
                <MaterialCommunityIcons name="lock-outline" size={20} />
                <TextInput
                  style={{ width: _screen.width * 0.5 }}
                  placeholder="Your Password"
                  secureTextEntry={hidePassword ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => setPassword(val)}
                />
              </View>

              <TouchableOpacity onPress={handleHidePassword}>
                {hidePassword ? (
                  <MaterialCommunityIcons
                    name="eye-off"
                    color="grey"
                    size={20}
                  />
                ) : (
                  <MaterialCommunityIcons name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <Text style={{color: "gray", fontSize: 10, marginTop: 3}}>By signing up your are agreeing to our terms and conditions.</Text>

          <View style={styles.signInButtonContainer}>
            <TouchableOpacity
              onPress={
                blockSignup
                  ? () => {} // Fake function while blocked
                  : handleSignUp // Allow Register while unblocked
              }
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#5454FF", "#3B3BB3"]}
                style={styles.signUpButton}
              >
                <Text style={{ color: "white" }}>{blockSignup ? "Processing..." : "Sign Up"}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: colorPalette.background,
//   },

//   subContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: _screen.width * 0.9,
//     height: _screen.height * 0.6,
//     borderRadius: 15,
//     backgroundColor: colorPalette.primary,
//     ...shadowStyle,
//   },

//   form: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 48,
//     width: _screen.width * 0.8,
//     height: _screen.height * 0.3,
//     borderRadius: 15,
//     backgroundColor: colorPalette.secondary,
//   },

//   title: {
//     marginVertical: 8,
//     fontSize: 28,
//     fontWeight: "bold",
//     color: colorPalette.background,
//   },

//   inputContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 1,
//     padding: 6,
//     paddingBottom: 18,
//     width: _screen.width * 0.7,
//     borderRadius: 10,
//     backgroundColor: colorPalette.background,
//   },

//   input: {
//     flexDirection: "row",
//     marginTop: 10,
//     paddingHorizontal: 3,
//     width: _screen.width * 0.65,
//     borderBottomWidth: 1,
//     borderBottomColor: colorPalette.trim,
//   },

//   passwordContainer: {
//     flexDirection: "row",
//   },

//   signInButtonContainer: {
//     marginTop: 10,
//   },

//   signUpButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//     width: 200,
//     borderRadius: 10,
//     padding: 8,
//   },

//   signUp: {
//     margin: 8,
//     fontSize: 18,
//     textDecorationLine: "underline",
//     color: colorPalette.background,
//   },

//   aboutUsButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 8,
//     width: 120,
//     borderRadius: 10,
//     padding: 8,
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colorPalette.background,
  },

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.9,
    height: _screen.height * 0.6,
    borderRadius: 15,
    // backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  form: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 48,
    width: _screen.width * 0.8,
    height: _screen.height * 0.3,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  subHeader: {
    // marginVertical: 8,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    // color: "gray"
    // color: colorPalette.background,
  },

  headerImage: {
    flex: 1,
    resizeMode: "contain",
    width: 200,
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
    padding: 6,
    paddingBottom: 18,
    width: _screen.width * 0.8,
    borderRadius: 10,
    backgroundColor: colorPalette.background,
  },

  input: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 3,
    width: _screen.width * 0.7,
    borderBottomWidth: 1,
    borderBottomColor: colorPalette.trim,
  },

  passwordContainer: {
    flexDirection: "row",
  },

  signInButtonContainer: {
    marginTop: 10,
  },

  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: 200,
    borderRadius: 10,
    padding: 8,
  },

  signUp: {
    // margin: 8,
    // fontSize: 18,
    // color: "blue",
    textDecorationLine: "underline",
    color: "#5c5c5c",
    // color: colorPalette.background,
  },

  aboutUsButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginHorizontal: 8,
    width: 200,
    backgroundColor: "#FFAA54",
    borderRadius: 10,
    padding: 8,
    borderWidth: 0.2,
    borderStyle: "solid",
    shadowOpacity: 0.3,
    shadowRadius: 0.2,
    shadowOffset: { width: 0.2, height: 0.3 },
  },
});

