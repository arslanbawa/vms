import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signin from "./Screens/SigninScreen";
import ForgotPassword from "./Screens/ForgotPasswordScreen";
import SubmitNewPassword from "./Screens/SubmitNewPasswordScreen";
import CreateNewPassword from "./Screens/CreateNewPasswordScreen";
import CreateNewSeries from "./Screens/CreateNewSeriesScreen";
import EditSeriesInfo from "./Screens/EditSeriesScreen";
import Series from "./Screens/SeriesScreen";
import { StrictMode } from "react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  REACT_APP_REGION,
  REACT_APP_USER_POOL_ID,
  REACT_APP_CLIENT_ID,
} from "@env";
import Amplify from "aws-amplify";
const Stack = createNativeStackNavigator();

Amplify.configure({
  Auth: {
    region: REACT_APP_REGION,
    userPoolId: REACT_APP_USER_POOL_ID,
    userPoolWebClientId: REACT_APP_CLIENT_ID,
  },
});

export default function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="series">
              <Stack.Screen name="signin" component={Signin} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen
                name="SubmitNewPassword"
                component={SubmitNewPassword}
              />
              <Stack.Screen
                name="CreateNewPassword"
                component={CreateNewPassword}
              />
              <Stack.Screen name="series" component={Series} />
              <Stack.Screen
                name="CreateNewSeries"
                component={CreateNewSeries}
              />
              <Stack.Screen name="EditSeriesInfo" component={EditSeriesInfo} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}
