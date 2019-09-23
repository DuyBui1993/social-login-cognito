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
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {authorize, refresh, revoke} from 'react-native-app-auth';

const config = {
  clientId: '6p7hb5i9ildp1iorss4100hstl',
  redirectUrl: 'surereserve://',
  serviceConfiguration: {
    authorizationEndpoint:
      'https://sure-development.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize',
    tokenEndpoint:
      'https://sure-development.auth.ap-southeast-1.amazoncognito.com/oauth2/token',
    revocationEndpoint:
      'https://sure-development.auth.ap-southeast-1.amazoncognito.com/oauth2/revoke',
  },
};

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import * as awsCognito from './aws-export';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  componentDidMount() {
    const SAMPLE_USERNAME = '00d2ddd8-7ffa-4a96-975f-d1c0a5e8a1e5'; // TODO: get user sub by phone number
    awsCognito.init(SAMPLE_USERNAME);
  }

  render() {
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
            <TouchableOpacity
              onPress={async () => {
                const authState = await authorize(config);
                console.log(authState);
                debugger;
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Social login</Text>
              </View>
            </TouchableOpacity>

            <TextInput
              style={{ borderWidth: 1, marginTop: 20, marginBottom: 10, padding: 10, backgroundColor: 'white' }}
              value={this.state.input}
              onChangeText={t => this.setState({input: t})}
            />
            <TouchableOpacity
              onPress={async () => {
                awsCognito.login(this.state.input);
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Reauth login</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  btn: {
    padding: 12,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {color: 'white', textAlign: 'center'},
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
