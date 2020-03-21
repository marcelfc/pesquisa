import React from "react";
import { StatusBar, View } from "react-native";
import {
    Container, Header, Title, Left,
    Icon, Right, Button, Body, Content,
    Text, Card, CardItem, Form,
    Item, Label, Input, Picker, Textarea,
    CheckBox, ListItem, Toast

} from "native-base";
import AsyncStorage from "@react-native-community/async-storage";
import ModalLogin from "./ModalLogin";
import Axios from "axios";
import { server } from "../config/common";
export default class PesquisaScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoria_id: undefined,
            items: [
                { descricao: '' }
            ],
            titulo: '',
            is_public: false,
            categories: [],
            messagesError: [],
            showModalLogin: false
        };
    }

    componentDidMount = async () => {
        await this.loadCategories()
    }

    addRowItem() {
        const items = this.state.items;
        items.push({ descricao: '' })
        this.setState({ items })
    }

    changeTextOpcao(val, index) {
        const items = this.state.items.map((item, key) => {
            return index == key ? { descricao: val } : { ...item }
        })
        this.setState({ items })
    }

    deleteOpcao(index) {
        const items = this.state.items.filter((item, key) => {
            return index != key
        })
        this.setState({ items })
    }

    updateIsPublic() {
        const is_public = this.state.is_public
        this.setState({ is_public: !is_public })
    }

    renderItens() {
        const items = this.state.items.map((item, index) => {
            return (
                <Item style={{ marginTop: 10 }} key={index}>
                    <Input
                        placeholder='Escreva a opção'
                        value={item.descricao}
                        onChangeText={val => this.changeTextOpcao(val, index)}
                    />
                    <Icon active name='ios-close' onPress={() => this.deleteOpcao(index)} />
                </Item>
            )
        })
        return items
    }

    loadCategories = async () => {
        const stringCategories = await AsyncStorage.getItem('categories')
        const categories = JSON.parse(stringCategories) || []
        this.setState({ categories })
    }

    sendForm = async () => {
        // validar se todos os campos estão preenchidos
        if (this.isValid()) {
            // verificar se usuário está logado
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
        await Axios.post(`${server}/pesquisas`, {
            titulo: this.state.titulo,
            categoria_id: this.state.categoria_id,
            is_public: this.state.is_public,
            items: this.state.items,
            username: userData.username,
            email: userData.email
        }).then(res => {

            Toast.show({
                text: 'Pesquisa realizada com sucesso',
                buttonText: "Ok!",
                type: "success",
                duration: 8000
            })

            this.props.navigation.navigate("Confirmacao", {pesquisa: res.data, mensagem: 'Aeeeee! Seu pesquisa foi registrada com sucesso!'})

            // TODO -> encaminhar para tela de compartilhamento
        }).catch(error => {
            console.log(error)
            Toast.show({
                text: 'Erro ao salvar pesquisa.',
                buttonText: "Ok!",
                type: "danger",
                duration: 8000
            })
        })

    }

    onConfirmation = (userData) => {
        this.setState({ showModalLogin: false })
        this.sendData(userData)
    }

    isValid() {
        if (this.state.titulo.trim() == '') {
            const messagesError = this.state.messagesError
            messagesError.push('Por favor, descreva sua pesquisa.')
            this.setState({ messagesError })
            return false
        }

        if (this.state.categoria_id == null) {
            const messagesError = this.state.messagesError
            messagesError.push('Por favor, selecione uma categoria.')
            this.setState({ messagesError })
            return false
        }

        if (this.state.items.length == 0) {
            const messagesError = this.state.messagesError
            messagesError.push('Por favor, descreva opções para sua pesquisa.')
            this.setState({ messagesError })
            return false
        }

        const itemsBlank = this.state.items.filter(item => item.descricao.trim() == '')

        if (itemsBlank.length > 0) {
            const messagesError = this.state.messagesError
            messagesError.push('Por favor, descreva todas as suas opções.')
            this.setState({ messagesError })
            return false
        }

        if (this.state.items.length < 2) {
            const messagesError = this.state.messagesError
            messagesError.push('A pesquisa deve conter pelo menos duas opções.')
            this.setState({ messagesError })
            return false
        }

        return true
    }

    render() {
        return (
            <Container>
                <ModalLogin
                    isVisible={this.state.showModalLogin}
                    onCancel={() => this.setState({ showModalLogin: false })}
                    onConfirmation={this.onConfirmation}
                    textLogin="publicar sua pesquisa."
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
                        <Title>Nova Pesquisa</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>Crie sua pesquisa e compartilhe com a galera!</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Text style={{ fontSize: 22 }}>Detalhes</Text>
                        </CardItem>
                        <CardItem>

                            <Form style={{ width: '100%' }}>
                                <Textarea rowSpan={3} bordered placeholder="Vamos pesquisar o que ?" onChangeText={val => this.setState({ titulo: val })} />
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Selecione uma categoria"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.categoria_id}
                                        onValueChange={val => this.setState({ categoria_id: val })}
                                    >
                                        <Picker.Item label="Qual será a categoria ?" value={null} />
                                        {
                                            this.state.categories.map((item, index) => {
                                                return (
                                                    <Picker.Item label={item.categoria} value={item.id} key={index} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </Item>
                                <ListItem onPress={this.updateIsPublic.bind(this)}>
                                    <CheckBox checked={this.state.is_public} onPress={this.updateIsPublic.bind(this)} />
                                    <Body>
                                        <Text>Pesquisa pública </Text>
                                    </Body>
                                </ListItem>
                            </Form>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem header bordered>
                            <Text style={{ fontSize: 22 }}>Opções</Text>
                            <Button
                                style={{ marginLeft: 10 }}
                                rounded
                                primary
                                onPress={() => this.addRowItem()}>
                                <Icon name="ios-add" />
                            </Button>
                        </CardItem>
                        <CardItem style={{ flexDirection: 'column' }}>
                            {this.renderItens()}
                        </CardItem>
                    </Card>
                    <Button full rounded warning
                        style={{ marginTop: 10 }}
                        onPress={() => this.sendForm()}>
                        <Text>Criar</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}
