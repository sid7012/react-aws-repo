import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
UserPoolId: "ap-south-1_kjlSEASbH",
ClientId: "2a4rqhtj25uu8jnc4ffkt5k80f"
};

export default new CognitoUserPool(poolData);