import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  I18nManager,
  Platform,
  StyleSheet,
} from "react-native";

//styles
import stylesConstant from "@/constants/styles";
import Colors from "@/constants/Colors";

const { FontFamily, FontSize } = stylesConstant;

const Input = (props: any) => {
  return (
    <View style={styles.container}>
      {props.label ? (
        <Text style={[styles.label, props.style && props.style]}>
          {props.label}
        </Text>
      ) : null}

      <TouchableOpacity
        style={[
          props.small && styles.smallContainer,
          props.medium && styles.mediumContainer,
          props.big && styles.inputContainer,
          props.large && styles.largeInputContainer,
          props.style && props.style,
        ]}
        disabled={!props.onTouch || props?.editable}
        onPress={props.onTouch}
      >
        {props?.leftIcon && props?.leftIcon}
        {props.onTouch ? (
          <Text style={props.medium ? styles.mediumValue : styles.value}>
            {props.value}
          </Text>
        ) : props.onChangeText ? (
          <TextInput
            style={[
              props.small && styles.smallTextInput,
              props.medium && styles.mediumTextInput,
              props.big && styles.textInput,
              props.large && styles.largeInput,
            ]}
            placeholder={props?.placeholder || ""}
            placeholderTextColor={"#7e7e7e"}
            autoCapitalize={props?.autoCapitalize || "none"}
            returnKeyLabel={props?.returnKeyLabel}
            returnKeyType={props?.returnKeyType}
            autoCorrect={false}
            editable={props?.editable}
            value={props.value}
            onChangeText={(text) => props.onChangeText(text)}
            secureTextEntry={props.secureTextEntry}
            keyboardType={props.keyboardType}
            onEndEditing={props.onEndEditing}
            maxLength={props?.maxLength}
          />
        ) : null}
        {I18nManager.isRTL && !props.rightIcon && <View style={styles.side} />}
        {props.rightIcon && (
          <TouchableOpacity
            style={styles.side}
            disabled={props.onPressRight ? false : true}
            onPress={props.onPressRight}
          >
            {typeof props.rightIcon === "string" ? <View /> : props.rightIcon}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {props.error && <Text style={styles.error}>{props.errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 19,
  },
  label: {
    color: "#000",
    fontSize: FontSize.f14,
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: 5,
  },
  inputContainer: {
    height: 60,
    width: 300,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    borderColor: Colors.light.appColor,
    borderWidth: 1,
  },
  largeInputContainer: {
    height: 50,
    width: 343,
    backgroundColor: Colors.light.backgroundColor,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    borderColor: Colors.light.appColor,
    borderWidth: 1,
    marginBottom: -19,
  },
  smallContainer: {
    height: 50,
    width: 225,
    backgroundColor: Colors.light.backgroundColor,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 32,
    borderColor: Colors.light.appColor,
    borderWidth: 1,
    marginBottom: -19,
    marginRight: 6,
  },
  mediumContainer: {
    height: 56,
    width: 223,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    fontSize: FontSize.f15,
    fontFamily: FontFamily.poppinsRegular,
    paddingHorizontal: 17,
    height: 60,
    width: 300,
    color: "#000",
  },
  largeInput: {
    fontSize: FontSize.f12,
    fontFamily: FontFamily.poppinsRegular,
    paddingHorizontal: 17,
    height: 60,
    width: 343,
    color: "#000",
  },
  value: {
    height: 60,
    color: Colors.light.black_one,
    width: 300,
    fontSize: FontSize.f15,
    fontFamily: FontFamily.poppinsRegular,
    paddingHorizontal: 13,
    paddingTop: 17,
  },
  mediumValue: {
    height: 56,
    color: Colors.light.black_one,
    width: "86%",
    fontSize: FontSize.f15,
    fontFamily: FontFamily.poppinsRegular,
    paddingHorizontal: 13,
    paddingTop: Platform.OS === "ios" ? 22 : 17,
  },
  mediumTextInput: {
    fontSize: FontSize.f15,
    fontFamily: FontFamily.poppinsRegular,
    paddingHorizontal: 13,
    height: 56,
    color: Colors.light.black_one,
    width: "86%",
  },
  smallTextInput: {
    height: 60,
    fontSize: FontSize.f12,
    fontFamily: FontFamily.poppinsRegular,
    paddingLeft: 20,
    paddingRight: 20,
    color: Colors.light.black_one,
    width: "100%",
  },
  side: {
    position: "absolute",
    right: 5,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    height: 49,
  },
  error: {
    alignSelf: "center",
    color: "red",
    fontFamily: FontFamily.poppinsRegular,
    fontSize: FontSize.small,
  },
  leftIcon: {
    marginRight: 12.76,
  },
});

export default Input;
