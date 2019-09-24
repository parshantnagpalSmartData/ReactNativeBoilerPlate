/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import { registerScreens } from "./src/config/routes";
import setup from "./src/store/setup";
Navigation.events().registerAppLaunchedListener(() => {
  const store = setup();
  registerScreens(store);
  Navigation.setDefaultOptions({
    topBar: {
      visible: false,
      drawBehind: true
    },
    bottomTabs: {
      visible: false,
      drawBehind: false
    }
  });
});