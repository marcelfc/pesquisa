import React from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import {
    Container, Content, Text, Icon, Button, Toast, Root
} from "native-base";

import bgImage from "../../assets/bg.png";
import AsyncStorage from '@react-native-community/async-storage';

export default props => {

    const logout = () => {
        try {
            AsyncStorage.removeItem('userData')
            Toast.show({
                text: 'Logout realizado com sucesso',
                buttonText: "Ok!",
                type: "success",
                duration: 8000
            })
        } catch (error) {
            Toast.show({
                text: 'Erro ao realizar logout',
                buttonText: "Ok!",
                type: "danger",
                duration: 8000
            })
        }

    }

    return (
        <Root>
            <Container>
                <Content padder>
                    <Image
                        source={bgImage}
                        style={{
                            height: 120,
                        }} />
                    <DrawerItems {...props} />
                    <Button warning small onPress={logout} style={{ width: 150 }}>
                        <Text>Logout</Text>
                        <Icon name='ios-exit'></Icon>
                    </Button>
                    <View style={{ position: 'absolute', top: 50, left: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <Icon name="search" style={{ color: 'white' }} />
                        <Text style={{ color: 'white', fontSize: 22, fontStyle: 'italic', marginLeft: 10 }}>Pesquisas</Text>
                    </View>
                </Content>
            </Container>
        </Root>


    )
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        color: '#000',
        fontSize: 22,
        paddingTop: 15,
        padding: 10

    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {

        fontSize: 20,
        marginLeft: 10,
    },
    email: {
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 10,
    },

    logoutIcon: {
        marginLeft: 10,
        marginBottom: 10
    },
    logoPrefeitura: {
        width: '90%',
        height: 70,
        marginTop: 10,
        marginBottom: 5,
        padding: 10
    },
    logo: {
        width: '70%',
        height: 100,
        marginTop: 10,
        marginBottom: 5,
        padding: 10
    }

})
