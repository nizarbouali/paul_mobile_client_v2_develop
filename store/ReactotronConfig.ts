import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { reactotronRedux } from 'reactotron-redux'


const reactotron = Reactotron
  .configure({ name: 'React Native Demo' })
  .setAsyncStorageHandler(AsyncStorage)
  .useReactNative({
    overlay: true,
    networking: {
      // optionally, you can turn it off with false.
      ignoreUrls: /symbolicate/,
    },
    errors: { veto: (stackFrame) => false }, // or turn it off with false
    editor: true, // there are more options to editor
  })
  .use(reactotronRedux()) //  <- here i am!
  .connect() //Don't forget about me!

export default reactotron;