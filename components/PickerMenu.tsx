import React from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from "react-native-popup-menu";

// lib
import { substring } from "@/lib/helpers";

import stylesConstant from "@/constants/styles";
import Colors from "@/constants/Colors";
import { ScaledSheet } from "react-native-size-matters/extend";

const { FontFamily, FontSize } = stylesConstant;
const PickerMenu = (props: any) => {
  return (
    <View style={props?.big ? bigStyles.container : defaultStyles.container}>
      {props?.label && <Text style={defaultStyles.label}>{props?.label}</Text>}
      {/* <Menu>
        <MenuTrigger
          disabled={props?.disabled}
          text={substring(props?.value || "", 31)}
          style={
            props?.big
              ? bigStyles.inputContainer
              : props?.small
              ? smallStyles.inputContainer
              : props?.medium
              ? mediumStyles.inputContainer
              : defaultStyles.inputContainer
          }
        />
        <MenuOptions
          customStyles={
            props?.big
              ? bigStyles
              : props?.small
              ? smallStyles
              : props?.medium
              ? mediumStyles
              : defaultStyles
          }
        >
          <FlatList
            data={props?.data}
            keyExtractor={(index) => index.toString()}
            showsVerticalScrollIndicator={false}
            extraData={props?.data}
            renderItem={({ item }) => {
              return (
                <>
                  <MenuOption
                    style={
                      props?.big
                        ? bigStyles.item
                        : props?.medium
                        ? mediumStyles.item
                        : defaultStyles.item
                    }
                    onSelect={() => {
                      props?.onChoose(item);
                    }}
                  >
                    <Text
                      style={
                        props?.big ? bigStyles.listText : defaultStyles.listText
                      }
                    >
                      {substring(item?.label || "", 27)}
                    </Text>
                  </MenuOption>
                  <View style={defaultStyles.line} />
                </>
              );
            }}
            // Performance settings
            removeClippedSubviews={true} // Unmount components when outside of window
            initialNumToRender={5} // Reduce initial render amount
            maxToRenderPerBatch={1} // Reduce number in each render batch
            updateCellsBatchingPeriod={100} // Increase time between renders
            windowSize={7} // Reduce the window size
          />
        </MenuOptions>
        <View style={props?.big ? bigStyles.sideContainer : {}}>
          <Image
            source={require("@/assets/images/arrowBottom.png")}
            style={
              props?.big
                ? bigStyles.side
                : props?.small
                ? smallStyles.side
                : props?.medium
                ? mediumStyles.side
                : defaultStyles.side
            }
            resizeMode="contain"
          />
        </View>
      </Menu> */}
    </View>
  );
};

const defaultStyles = StyleSheet.create({
  container: {
    marginBottom: 22,
    marginLeft: 12,
  },
  label: {
    color: "#000",
    fontSize: FontSize.f13,
    fontFamily: FontFamily.poppinsRegular,
    marginBottom: 5,
  },
  inputContainer: {
    height: 56,
    width: 127,
    backgroundColor: Colors.light.white,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingLeft: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: FontSize.f13,
    fontFamily: FontFamily.poppinsRegular,
    color: "#000",
  },
  side: {
    width: 20,
    height: 20,
  },
  optionsContainer: {
    minHeight: 0,
    width: 127,
    backgroundColor: "#fff",
    marginTop: 60,
    borderRadius: 10,
  },
  item: {
    height: 36.5,
    width: 127,
    paddingLeft: 21,
    justifyContent: "center",
  },
  listText: {
    width: 150,
    fontSize: FontSize.f15,
    fontFamily: FontFamily.nextMedium,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#D8D8D8",
  },
});

const bigStyles = StyleSheet.create({
  container: {
    marginBottom: 19,
  },
  text: {
    fontSize: FontSize.f13,
    fontFamily: FontFamily.poppinsRegular,
    color: "#000",
    textAlign: "left",
  },
  optionsContainer: {
    minHeight: 0,
    width: 300,
    maxHeight: 200,
    backgroundColor: "#fff",
    marginTop: 65,
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
    paddingLeft: 17,
  },
  sideContainer: {
    position: "absolute",
    right: 25,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  side: {
    width: 20,
    height: 20,
  },
  listText: {
    fontSize: FontSize.f15,
    fontFamily: FontFamily.poppinsRegular,
    color: "#000",
  },
  item: {
    height: 50,
    width: 300,
    paddingLeft: 21,
    paddingRight: 21,
    justifyContent: "center",
  },
});

const smallStyles = StyleSheet.create({
  optionsContainer: {
    minHeight: 0,
    width: 109,
    backgroundColor: "#fff",
    marginTop: 60,
    borderRadius: 10,
  },
  inputContainer: {
    height: 60,
    width: 300,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingLeft: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  side: {
    marginLeft: 80,
    marginTop: -37,
    width: 22,
    height: 22,
  },
});

const mediumStyles = StyleSheet.create({
  optionsContainer: {
    minHeight: 0,
    width: 162,
    backgroundColor: "#fff",
    marginTop: 60,
    borderRadius: 10,
  },
  inputContainer: {
    height: 56,
    width: 162,
    backgroundColor: Colors.light.white,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingLeft: 17,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  side: {
    marginLeft: 130,
    marginTop: -37,
    width: 22,
    height: 22,
  },
  item: {
    height: 36.5,
    width: 162,
    paddingLeft: 21,
    justifyContent: "center",
  },
});

export default PickerMenu;
