import React, { Component } from 'react';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { Button, Icon, Text, Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class FBLoginButton extends Component {

    constructor(props){
        super(props)
    }

    confirm = () => {
        this.props.confirmAction()
    }

    loginFacebook() {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            result => {
                if (result.isCancelled) {
                    Toast.show({
                        text: 'Login cancelado. Para concluir a ação, é necessário efetuar o login.',
                        buttonText: "Ok!",
                        type: "warning",
                        duration: 8000
                    })
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data
                        fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + accessToken)
                            .then((response) => response.json())
                            .then((data) => {
                                try {
                                    const userData = { username: data.name, email: data.email }
                                    AsyncStorage.setItem('userData', JSON.stringify(userData))
                                } catch (error) {
                                    Toast.show({
                                        text: 'Falha ao realizar login',
                                        buttonText: "Ok!",
                                        type: "warning",
                                        duration: 8000
                                    })
                                }
                                
                            })
                            .catch(() => {
                                reject('ERROR GETTING DATA FROM FACEBOOK')
                            })
                    })
                    .then(() => this.confirm())
                }
            },
            error => {
                Toast.show({
                    text: 'Falha ao realizar login',
                    buttonText: "Ok!",
                    type: "warning",
                    duration: 8000
                })
            }
        );
    }

    render() {
        return (
            <Button rounded primary onPress={() => this.loginFacebook()} style={{ marginTop: 10, alignSelf: 'center' }}>
                <Icon name='logo-facebook' />
                <Text>Login com facebook</Text>
            </Button>
        );
    }
};

module.exports = FBLoginButton;