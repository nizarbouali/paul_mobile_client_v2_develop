import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import stylesConstant from "@/constants/styles";
import Colors from "@/constants/Colors";
import { ScaledSheet } from "react-native-size-matters/extend";

const { FontFamily, FontSize } = stylesConstant;

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  big?: boolean;
  medium?: boolean;
  small?: boolean;
  additonalContainerStyle?: StyleProp<ViewStyle>;
  addionalTextStyle?: StyleProp<TextStyle>;
  content: string | ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled || props.loading}
      activeOpacity={1}
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0 }}
        colors={
          props.big
            ? ["#000", "#000"]
            : props.medium || props.small
            ? [Colors?.light.backgroundColor, Colors?.light.backgroundColor]
            : [Colors?.light.backgroundColor, Colors?.light.backgroundColor]
        }
        style={[
          props.big && styles.bigContainer,
          props.additonalContainerStyle && props.additonalContainerStyle,
          (props.disabled || props?.loading) && styles.disabled,
          props.medium && styles.mediumContainer,
          props.small && styles.smallContainer,
        ]}
      >
        {props.loading ? (
          <ActivityIndicator
            size="small"
            color={props?.big ? "#F3E4CC" : "#000000"}
          />
        ) : typeof props.content === "string" ? (
          <Text
            style={[
              props.big
                ? styles.bigText
                : props.medium
                ? styles.mediumText
                : props.small
                ? styles.smallText
                : styles.text,
              props.addionalTextStyle && props.addionalTextStyle,
            ]}
          >
            {props.content}
          </Text>
        ) : (
          props.content
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = ScaledSheet.create({
  bigContainer: {
    height: "60@vs",
    justifyContent: "center",
    alignItems: "center",
    width: "300@s",
    backgroundColor: "#000",
    borderRadius: "32@ms",
    alignSelf: "center",
  },
  mediumContainer: {
    height: "55@vs",
    justifyContent: "center",
    alignItems: "center",
    width: "158@s",
    backgroundColor: "#000",
    borderRadius: "25@ms",
    borderColor: "#000",
    borderWidth: "2@ms",
    alignSelf: "center",
  },
  smallContainer: {
    height: "40@vs",
    justifyContent: "center",
    alignItems: "center",
    width: "72@s",
    borderRadius: "25@ms",
    borderColor: "#000",
    borderWidth: "1@vs",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: FontFamily.poppinsMedium,
    color: "white",
    fontSize: FontSize.f17,
  },
  bigText: {
    fontFamily: FontFamily.EBGaramondSemiBold,
    color: Colors.light.appColor,
    fontSize: FontSize.f18,
  },
  mediumText: {
    fontFamily: FontFamily.poppinsRegular,
    color: "#000",
    fontSize: FontSize.f17,
  },
  smallText: {
    fontFamily: FontFamily.poppinsMedium,
    color: "#000",
    fontSize: FontSize.f14,
  },
});
