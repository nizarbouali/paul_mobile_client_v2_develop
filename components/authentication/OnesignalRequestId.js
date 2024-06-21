/**
 * Copyright (c) Flexi Apps.
 *
 * High Order Component to manually fetch user OneSignal Id
 *
 */
import React from "react";
import OneSignal from "react-native-onesignal";

import { ReactReduxContext } from "react-redux";

import { setOneSignalId } from "actions";

export default function withOneSignalIdRequest(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    static contextType = ReactReduxContext;

    async componentDidMount() {
      //Get OneSignal Device State
      const oneSignalState = await OneSignal.getDeviceState();

      //Get OneSiganlPlayerId from device state
      if (oneSignalState && oneSignalState.userId) {
        const oneSignalPlayerId = oneSignalState.userId;
        if (this.context !== null) {
          const { store } = this.context;
          store.dispatch(setOneSignalId(oneSignalPlayerId));
        }
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
