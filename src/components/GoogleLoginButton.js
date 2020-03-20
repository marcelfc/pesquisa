import React, { Component } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { Button, Text, Icon, Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class GoogleLoginButton extends Component {

    signIn = async () => {
        try {
            GoogleSignin.configure({
                androidClientId: '771042060111-oqbhsomo7njqhb2aq4e8gju08bfcv6og.apps.googleusercontent.com'
            });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const userData = {username: userInfo.user.name, email: userInfo.user.email}
            await AsyncStorage.setItem('userData', JSON.stringify(userData))
            this.props.confirmAction()
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Toast.show({
                    text: 'Login cancelado, é necessário realizar o login para concluir sua ação',
                    buttonText: "Ok!",
                    type: "warning",
                    duration: 8000
                })
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    render() {
        return (
            <Button rounded danger onPress={ () => this.signIn() } style={{marginTop: 10, alignSelf: 'center'}}>
                <Icon name='logo-google' />
                <Text>Login com google</Text>
            </Button>
        );
    }
};
