import React, { Component } from 'react'
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'
import { Container, Content, Text, Card, CardItem, Body, Button, Icon } from 'native-base'
import FBLoginButton from '../components/FBLoginButton'
import GoogleLoginButton from '../components/GoogleLoginButton'
import AsyncStorage from '@react-native-community/async-storage'


export default class ModalLogin extends Component {

    confirm = async () => {
        // confirmação e envio
        const stringuserData = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(stringuserData) || null
        if (userData == null) {
            // erro ou cancelado
            this.props.onCancel()
        } else {
            // sucesso login
            this.props.onConfirmation()
        }        
    }
    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide' >
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <Container>
                    <Content>
                        <Card>
                            <CardItem header bordered>
                                <Text style={{ fontWeight: '700' }}>Realize o login para {this.props.textLogin}</Text>
                                <Icon name='ios-close' onPress={this.props.onCancel} style={{ color: 'red', marginLeft: 10 }} />
                            </CardItem>
                            <CardItem>
                                <Body center>
                                    <FBLoginButton confirmAction={this.confirm}></FBLoginButton>
                                    <GoogleLoginButton confirmAction={this.confirm}></GoogleLoginButton>
                                </Body>
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
