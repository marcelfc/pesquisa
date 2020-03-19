import React, { Component } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import { Container, Content, Text, Card, CardItem, Body, Button } from 'native-base'
import FBLoginButton from '../components/FBLoginButton'
import { LoginManager, AccessToken } from "react-native-fbsdk";

export default class ModalLogin extends Component {

    confirm = () => {
        this.props.confirmCancel()
    }

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

    loginFacebook() {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data
                            fetch('https://graph.facebook.com/v2.5/me?fields=email,name&access_token=' + accessToken)
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
                    })
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <Container>
                    <Content>
                        <Card>
                            <CardItem header>
                                <Text>Realize o login para {this.props.textLogin}</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Button onPress={() => this.loginFacebook()}>
                                        <Text>facebook</Text>
                                    </Button>
                                </Body>
                            </CardItem>
                            <CardItem footer>
                                <Text>Botão de Cancelar</Text>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
})
