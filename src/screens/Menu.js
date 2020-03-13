import React from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'


// import Icon from 'react-native-vector-icons/FontAwesome'
// import logoImage from "../../assets/imgs/logo.png";
// import transsolImage from "../../assets/imgs/transsol.png";

export default props => {

    const logout = () => {
        // delete axios.defaults.headers.common['Authorization']
        // AsyncStorage.removeItem('userData')
        // AsyncStorage.removeItem('linhaBusState')
        // AsyncStorage.removeItem('linhaBusTripState')
        // props.navigation.navigate('AuthOrApp')
    }

    return (
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
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
