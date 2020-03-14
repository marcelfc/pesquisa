import React from "react";
import { StatusBar } from "react-native";
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
            selected2: undefined
        };
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
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
                                <Textarea rowSpan={3} bordered placeholder="Vamos pesquisar o que ?" />
                                <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Selecione uma categoria"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selected2}
                                        onValueChange={this.onValueChange2.bind(this)}
                                    >
                                        <Picker.Item label="Qual é a categoria ?" value="key1" />
                                        <Picker.Item label="Política" value="key2" />
                                        <Picker.Item label="entretenimento" value="key3" />
                                    </Picker>
                                </Item>
                                <ListItem>
                                    <CheckBox checked={true} />
                                    <Body>
                                        <Text>A pesquisa vai ficar disponível para a geral ?</Text>
                                    </Body>
                                </ListItem>
                            </Form>

                        </CardItem>
                    </Card>
                    <Button full rounded warning
                        style={{ marginTop: 10 }}
                        onPress={() => this.props.navigation.navigate("Chat")}>
                        <Text>Criar</Text>
                    </Button>

                </Content>
            </Container>
        );
    }
}
