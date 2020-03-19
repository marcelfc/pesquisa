import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {

    initUser = async (token) => {

        await fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + token)
            .then((response) => response.json())
            .then((json) => {
                // Some user object has been set up somewhere, build that user here
                console.log(json)
                // user.name = json.name
                // user.id = json.id
                // user.user_friends = json.friends
                // user.email = json.email
                // user.username = json.name
                // user.loading = false
                // user.loggedIn = true
            })
            .catch(() => {
                reject('ERROR GETTING DATA FROM FACEBOOK')
            })

    }

    render() {
        return (
            <View>
                <LoginButton
                    publishPermissions={['publish_actions']}
                    readPermissions={['public_profile']}
                    onLoginFinished={
                        (error, result) => {
                            console.log(error, result)
                            if (error) {
                                alert("Login failed with error: " + error.message);
                            } else if (result.isCancelled) {
                                alert("Login was cancelled");
                            } else {
                                AccessToken.getCurrentAccessToken().then((data) => {
                                    const { accessToken } = data
                                    this.initUser(accessToken)
                                })
                            }
                        }
                    }
                    onLogoutFinished={() => alert("User logged out")} />
            </View>
        );
    }
};

module.exports = FBLoginButton;