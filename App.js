/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import { authorize, refresh, revoke } from 'react-native-app-auth';

const config = {
  clientId: '178gkfp1fh5p726e7hqkfrjraj',
  redirectUrl: 'surereserve://',
  serviceConfiguration: {
    authorizationEndpoint: 'https://sure-development.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize',
    tokenEndpoint: 'https://sure-development.auth.ap-southeast-1.amazoncognito.com/oauth2/token',
    revocationEndpoint: 'https://sure-development.auth.ap-southeast-1.amazoncognito.com/oauth2/revoke'
  }
};


import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';


const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <TouchableOpacity onPress={async () => {
            const authState = await authorize(config);
            debugger
          }}>
            <View style={{ padding: 12, backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', textAlign: 'center' }}>Login boy</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
