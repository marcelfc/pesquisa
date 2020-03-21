import React from 'react'
import { View, Image, Alert } from 'react-native'
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
            Alert.alert('Sucesso', 'Logout realizado com sucesso')
        } catch (error) {
            Alert.alert('Ops', 'Erro ao realizar logout')
        }
    }

    return (

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

    )
}
