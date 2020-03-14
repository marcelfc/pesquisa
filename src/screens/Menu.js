import React from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import {
    Container, Content, Text, Icon
} from "native-base";

import bgImage from "../../assets/bg.png";

export default props => {

    const logout = () => { }

    return (
        <Container>
            <Content padder>
                <Image
                    source={bgImage}
                    style={{
                        height: 120,
                    }} />
                <DrawerItems {...props} />
                <View style={{ position: 'absolute', top: 50, left: 50, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Icon name="search" style={{color: 'white'}}/>
                    <Text style={{color: 'white', fontSize: 22, fontStyle: 'italic', marginLeft: 10}}>Pesquisas</Text>
                </View>
            </Content>
        </Container>

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
