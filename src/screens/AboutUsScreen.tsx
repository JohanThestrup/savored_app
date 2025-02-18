import React from "react";
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  ScrollView,
  Text,
} from "react-native";
import { colorPalette, shadowStyle } from "../constants/ColorPalette";
import {
  header,
  slogan,
  noBoundaries,
  noLimits,
  swipeAndLook,
  savorToCook,
  noBoundariesContent,
  noLimitsContent,
  swipeAndLookContent,
  savorToCookContent,
  contactUsContent,
  email,
} from "../constants/AboutUsContent";

const _screen = Dimensions.get("screen");

export default function AboutUsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* <Text style={styles.title}>About Us</Text> */}
        <View style={styles.contentContainer}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.content}>{header}</Text>
            <View style={styles.sloganContainer}>
              <Text style={[styles.slogan, styles.content]}>{slogan}</Text>
            </View>
            <Text style={[styles.subTitle, styles.content]}>
              Savored Core Values:
            </Text>
            <Text style={[styles.subTitle2, styles.content]}>
              {noBoundaries}
            </Text>
            <Text style={styles.content}>{noBoundariesContent}</Text>
            <Text style={[styles.subTitle2, styles.content]}>{noLimits}</Text>
            <Text style={styles.content}>{noLimitsContent}</Text>
            <Text style={[styles.subTitle2, styles.content]}>
              {swipeAndLook}
            </Text>
            <Text style={styles.content}>{swipeAndLookContent}</Text>
            <Text style={[styles.subTitle2, styles.content]}>
              {savorToCook}
            </Text>
            <Text style={styles.content}>{savorToCookContent}</Text>
            <Text style={[styles.subTitle, styles.content]}>
              Contact Information:
            </Text>
            <Text style={styles.content}>{contactUsContent}</Text>
            <Text style={[styles.content, styles.email]}>{email}</Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colorPalette.background,
  },

  subContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.95,
    height: _screen.height * 0.9,
    borderRadius: 15,
    // backgroundColor: colorPalette.primary,
    ...shadowStyle,
  },

  title: {
    marginVertical: 8,
    fontSize: 28,
    fontWeight: "bold",
    // color: colorPalette.background,
  },

  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: _screen.width * 0.93,
    height: _screen.height * 0.86,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  scrollView: {
    padding: 8,
    marginVertical: Platform.OS === "android" ? 12 : 0,
    width: _screen.width * 0.93,
    borderRadius: 15,
    // backgroundColor: colorPalette.secondary,
  },

  content: {
    marginBottom: 6,
  },

  sloganContainer: {
    marginVertical: 6,
    paddingTop: 4,
    backgroundColor: colorPalette.popDark,
    borderRadius: 10,
  },

  slogan: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subTitle2: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  email: {
    fontWeight: "bold",
    color: colorPalette.alternate2,
  },
});
