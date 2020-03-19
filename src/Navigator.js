import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Home from './screens/Home'
import Pesquisa from './screens/Pesquisa'
import Voto from './screens/Voto'
import Confirmacao from './screens/Confirmacao'
import Menu from './screens/Menu'
import { Root } from "native-base";

const menuConfig = {
    initialRouteName: 'Home',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle: {
            color: '#4682B4',
            fontWeight: 'bold',
        }
    }
}

const menuRoutes = {
    Home: {
        name: 'Home',
        screen: props => <Home {...props} />,
        navigationOptions: {
            title: 'Home'
        }
    },
    Pesquisa: {
        name: 'Pesquisa',
        screen: props => <Root><Pesquisa {...props} /></Root>,
        navigationOptions: {
            title: 'Nova Pesquisa'
        }
    },
    Voto: {
        name: 'Voto',
        screen: props => <Root><Voto {...props} /></Root>,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
    Confirmacao: {
        name: 'Confirmacao',
        screen: props => <Root><Confirmacao {...props} /></Root>,
        navigationOptions: {
            drawerLabel: () => null
        }
    },
}

const menuNavigator = createDrawerNavigator(menuRoutes, menuConfig)

const mainRoutes = {
    Home: {
        name: 'Home',
        screen: menuNavigator
    }
}

const mainNavigator = createSwitchNavigator(mainRoutes, {
    initialRouteName: 'Home'
})
export default createAppContainer(mainNavigator)
