import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  StyleSheet,
} from "react-native";

//styles
import stylesConstant from "@/constants/styles";
import Colors from "@/constants/Colors";

const { FontFamily, FontSize } = stylesConstant;

const Header = (props: any) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={
            props?.back ? styles.userIconContainer1 : styles.userIconContainer
          }
          onPress={() =>
            props?.back
              ? props?.back()
              : props?.leftIcon
              ? props?.leftIcon()
              : null
          }
        >
          {props?.back ? (
            <Image
              source={require("@/assets/images/blackBack.png")}
              style={styles.back}
              resizeMode="contain"
            />
          ) : (
            <>
              <Image
                source={require("@/assets/images/userIcon.png")}
                style={styles.userIcon}
                resizeMode="contain"
              />

              {props?.name ? (
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{props?.name?.toUpperCase()}</Text>
                </View>
              ) : null}
            </>
          )}
        </TouchableOpacity>
      </View>
      {props?.title ? (
        <Text style={styles.title}>{props?.title}</Text>
      ) : (
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
          resizeMode={"contain"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 90,
    paddingLeft: 10,
    paddingRight: 6,
    alignItems: "center",
  },
  userIconContainer: {
    padding: 7,
    marginTop: 6,
  },
  userIconContainer1: {
    height: 35,
    width: 35,
    borderWidth: 1,
    borderColor: "#C3C3C3",
    borderRadius: 25,
    justifyContent: "center",
  },
  userIcon: {
    height: 29,
    width: 29,
    alignSelf: "center",
  },
  back: {
    height: 20,
    width: 20,
    alignSelf: "center",
    marginTop: 2,
  },
  title: {
    fontFamily: FontFamily.EBGaramondSemiBold,
    fontSize: FontSize.f24,
    color: Colors.light.white,
    textAlign: "center",
    paddingLeft: 30,
  },
  imagesearch: {
    height: 30,
    width: 30,
  },
  cadeauContainer: {
    paddingLeft: 3.5,
    paddingVertical: 7,
    paddingRight: 3.5,
    marginTop: 2,
  },
  deleteContainer: {
    justifyContent: "center",
    padding: 7,
    marginTop: 2,
  },
  logo: {
    height: 42,
    width: 110.49,
    marginTop: 16,
  },
  cadeauTxtContainer: {
    position: "absolute",
    right: 0,
    backgroundColor: "#1EBE5D",
    borderRadius: 21,
    height: 19,
    width: 19,
    top: Platform.OS === "android" ? 5 : 6,
  },
  cadeauTxt: {
    fontFamily: FontFamily.EBGaramondMedium,
    fontSize: FontSize.f14,
    color: "#fff",
    textAlign: "center",
    marginTop: -2,
  },
  nameContainer: {
    position: "absolute",
    right: Platform.OS === "android" ? -6.5 : -7.5,
    backgroundColor: "#85DA42",
    borderRadius: 23,
    height: 23,
    width: 23,
    justifyContent: "center",
    bottom: 3,
  },
  name: {
    fontFamily: FontFamily.EBGaramondMedium,
    fontSize: FontSize.f11,
    color: "#000",
    textAlign: "center",
  },
});

export default Header;
