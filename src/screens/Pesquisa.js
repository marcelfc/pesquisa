import React from "react";
import { StatusBar, View } from "react-native";
import {
    Container, Header, Title, Left,
    Icon, Right, Button, Body, Content,
    Text, Card, CardItem, Form,
    Item, Label, Input, Picker, Textarea,
    CheckBox, ListItem

} from "native-base";
export default class PesquisaScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categoria_id: undefined,
            items: [
                { descricao: '' }
            ],
            titulo: '',
            is_public: false
        };
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
        this.setState({is_public: !is_public})
    }

    renderItens() {
        const items = this.state.items.map((item, index) => {
            return (
                <Item style={{ marginTop: 10 }}>
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

    sendForm() {
        // validar se todos os campos estão preenchidos

        console.log(this.state)
        alert('ok, enviar dados')
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
                                <Textarea rowSpan={3} bordered placeholder="Vamos pesquisar o que ?" onChangeText={val => this.setState({titulo: val})}/>
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Selecione uma categoria"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.categoria_id}
                                        onValueChange={val => this.setState({categoria_id: val})}
                                    >
                                        <Picker.Item label="Qual é a categoria ?" value="key1" />
                                        <Picker.Item label="Política" value="key2" />
                                        <Picker.Item label="entretenimento" value="key3" />
                                    </Picker>
                                </Item>
                                <ListItem onPress={this.updateIsPublic.bind(this)}>
                                    <CheckBox checked={this.state.is_public} onPress={this.updateIsPublic.bind(this)}/>
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
