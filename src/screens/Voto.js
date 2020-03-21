import React from "react";
import { StatusBar, View } from "react-native";
import {
    Container, Header, Title, Left,
    Icon, Right, Button, Body, Content,
    Text, Card, CardItem, ListItem, Radio, Toast

} from "native-base";
import ModalLogin from "./ModalLogin";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { server } from "../config/common";
export default class VotoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: null,
            showToast: false,
            selectedSearch: null,
            messagesError: [],
            showModalLogin: false
        };
    }

    componentDidMount = () => {
        const { navigation } = this.props;
        this.setState({ selectedSearch: { titulo: navigation.getParam('titulo'), items: navigation.getParam('items'), pesquisa_id: navigation.getParam('id') } })
    }

    renderItems(items) {
        const options = items.map((item, key) => {
            return (
                <ListItem key={key} selected={item.id == this.state.selectedItem} style={{ width: '100%' }} onPress={() => this.setState({ selectedItem: item.id })}>
                    <Left>
                        <Text>{item.descricao}</Text>
                    </Left>
                    <Right>
                        <Radio
                            onPress={() => this.setState({ selectedItem: item.id })}
                            color={"#f0ad4e"}
                            selectedColor={"#5cb85c"}
                            selected={item.id == this.state.selectedItem}
                        />
                    </Right>
                </ListItem>
            )
        })

        return options
    }

    sendForm = async () => {
        // validando os campos
        if(this.isValid()){
            const stringuserData = await AsyncStorage.getItem('userData')
            const userData = JSON.parse(stringuserData) || null
            if (userData == null) {
                this.setState({ showModalLogin: true })
            } else {
                await this.sendData(userData)
            }
        } else {
            const messages = this.state.messagesError.map(item => item)
            Toast.show({
                text: messages.join(';'),
                buttonText: "Ok!",
                type: "danger",
                duration: 8000
            })
            this.setState({ messagesError: [] })
            return false
        }
    }

    sendData = async (userData) => {
        await Axios.post(`${server}/votos`, {
            pesquisa_id: this.state.selectedSearch.pesquisa_id,
            item_id: this.state.selectedItem,
            username: userData.username,
            email: userData.email
        }).then(res => {
            this.props.navigation.navigate("Confirmacao", {pesquisa: res.data, mensagem: 'Aeeeee! Seu voto foi registrado com sucesso!'})
            // TODO -> encaminhar para tela de compartilhamento
        }).catch(error => {
            console.log(error)
            Toast.show({
                text: 'Erro ao salvar voto.',
                buttonText: "Ok!",
                type: "danger",
                duration: 8000
            })
        })
    }

    isValid = () => {
        if (this.state.selectedItem == null) {
            const messagesError = this.state.messagesError
            messagesError.push('Por favor, selecione uma opção para realizar seu voto')
            this.setState({ messagesError })
            return false
        }

        return true
    }

    onConfirmation = (userData) => {
        this.setState({ showModalLogin: false })
        this.sendData(userData)
    }

    render() {
        return (
            <Container>
                <ModalLogin
                    isVisible={this.state.showModalLogin}
                    onCancel={() => this.setState({ showModalLogin: false })}
                    onConfirmation={this.onConfirmation}
                    textLogin="computar seu voto"
                ></ModalLogin>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Votação</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                                {this.state.selectedSearch && <Text>{this.state.selectedSearch.titulo}</Text>}
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                {this.state.selectedSearch && this.renderItems(this.state.selectedSearch.items)}
                            </Body>
                        </CardItem>
                    </Card>

                    <Button full rounded warning
                        style={{ marginTop: 10 }}
                        onPress={() => this.sendForm()}>
                        <Text>Votar</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}
