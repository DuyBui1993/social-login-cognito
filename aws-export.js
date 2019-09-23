import globalFetch from 'node-fetch';
// @ts-ignore
global.fetch = globalFetch;
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

let cognitoUser = null;
let currentUserName = null;

export function getCognitoUser() {
  return cognitoUser;
}

export function init(username) {
  if (currentUserName !== username) {
    const authenticationData = {
      Username: username,
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const poolData = {
      ClientId: '6p7hb5i9ildp1iorss4100hstl', // Your client id here
      UserPoolId: 'ap-southeast-1_Wysdhsqi1', // Your user pool id here
    };
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    const userData = {
      Pool: userPool,
      Username: username,
    };
    cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');
    cognitoUser.initiateAuth(authenticationDetails, {
      onSuccess(result) {
        // User authentication was successful
        console.log('result', result);
        debugger;
      },
      onFailure(err) {
        // User authentication was not successful
        console.log('err', err);
        debugger;
      },
      customChallenge(challengeParameters) {
        console.log(challengeParameters);
        debugger
        // User authentication depends on challenge response
        // const challengeResponses = 'CODE-374410'
        // cognitoUser.sendCustomChallengeAnswer(challengeResponses, this);
      },
    });
  }
}

export function login(otp) {
  debugger
  
  cognitoUser.sendCustomChallengeAnswer(`${otp}`, {
    onSuccess(result) {
      // User authentication was successful
      console.log('login result', result);
      debugger;
    },
    onFailure(err) {
      // User authentication was not successful
      console.log('login err', err);
      debugger;
    },
  })
}