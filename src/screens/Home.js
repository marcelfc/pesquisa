import React from "react";
import { StatusBar, View } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem, ListItem, Badge } from "native-base";
import FBLoginButton from "../components/FBLoginButton";
import { server } from "../config/common";
import AsyncStorage from "@react-native-community/async-storage"
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";
export default class HomeScreen extends React.Component {

    state = {
        lastFive: [],
        topThree: []
    }

    constructor(props) {
        super(props)
    }

    componentDidMount = async () => {
        try {
            await this.loadCategories()
            await this.loadLastFive()
            await this.loadTopThree()
        } catch (error) {
            console.log(error)
        }
    }

    loadCategories = async () => {
        try {
            const res = await axios.get(`${server}/categorias`)
            AsyncStorage.setItem('categories', JSON.stringify(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    loadLastFive = async () => {
        try {
            const res = await axios.get(`${server}/lastFive`)
            this.setState({ lastFive: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    loadTopThree = async () => {
        try {
            const res = await axios.get(`${server}/topThree`)
            this.setState({ topThree: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    renderLastFive = () => {
        const items = this.state.lastFive.map((item, index) => {
            return (
                <ListItem icon style={{ width: '100%' }} key={index} onPress={() => this.props.navigation.navigate("Voto", item)}>
                    <Left>
                        <Button style={{ backgroundColor: "#0000CD" }}>
                            <Icon active name="ios-paper" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{item.titulo}</Text>
                    </Body>
                    <Right>
                        <Text>Votar</Text>
                        <Icon active name="ios-open" />
                    </Right>
                </ListItem>)
        })

        return items

    }

    renderTopThree = () => {
        const items = this.state.topThree.map((item, index) => {
            return (
                <ListItem icon style={{ width: '100%' }} key={index} onPress={() => this.props.navigation.navigate("Voto", item)}>
                    <Left>
                        <Badge primary>
                            <Text>{index + 1}</Text>
                        </Badge>
                    </Left>
                    <Body>
                        <Text>{item.titulo}</Text>
                    </Body>
                    <Right>
                        <Text>Votar</Text>
                        <Icon active name="ios-open" />
                    </Right>
                </ListItem>)
        })

        return items

    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>home</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>Crie sua própria pesquisa, compartilhe com a galera e aguarde o resultado!</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Button full rounded warning
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate("Pesquisa")}>
                        <Text>Nova Pesquisa</Text>
                    </Button>
                    <Card style={{ marginTop: 10 }}>
                        <CardItem header bordered>
                            <Icon name="md-trophy" style={{ color: '#FFD700' }} />
                            <Text style={{ fontSize: 25, color: '#333' }}>Top #3</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                {this.renderTopThree()}
                            </Body>
                        </CardItem>
                        <CardItem footer button bordered onPress={() => alert("This is Card Body")}>
                            <Text>Ver mais</Text>
                            <Icon style={{ marginLeft: 10, color: "#0000CD" }} name="ios-arrow-round-forward" />
                        </CardItem>
                    </Card>

                    <Card style={{ marginTop: 10 }}>
                        <CardItem header bordered>
                            <Icon name="ios-photos" style={{ color: '#FFD700' }} />
                            <Text style={{ fontSize: 25, color: '#333' }}>Últimas #5</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                {this.renderLastFive()}
                            </Body>
                        </CardItem>
                        <CardItem footer button bordered onPress={() => alert("This is Card Body")}>
                            <Text>Buscar mais pesquisas</Text>
                            <Icon style={{ marginLeft: 10, color: "#0000CD" }} name="ios-arrow-round-forward" />
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
