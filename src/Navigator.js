import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Home from './screens/Home'
import Pesquisa from './screens/Pesquisa'
import Menu from './screens/Menu'

const menuConfig = {
    initialRouteName: 'Home',
    contentComponent: Menu,
    contentOptions: {
        labelStyle: {
            fontWeight: 'normal',
            fontSize: 20
        },
        activeLabelStyle: {
            color: '#080',
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
        screen: props => <Pesquisa {...props} />,
        navigationOptions: {
            title: 'Nova Pesquisa'
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
