import React from "react";
import { StatusBar, View } from "react-native";
import {
    Container, Header, Title, Left,
    Icon, Right, Button, Body, Content,
    Text, Card, CardItem, ListItem, Radio, Toast

} from "native-base";
export default class VotoScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
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
                        <Title>Compartilhar</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                                <Icon name='ios-checkmark-circle' style={{ fontSize: 100, color: '#008000', alignSelf: 'center' }} />
                                <Text style={{
                                    color: "#008000", fontSize: 22,
                                    textAlign: 'center',
                                    alignSelf: 'center'
                                }}> {navigation.getParam('mensagem')} </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem >
                            <Body>
                                <Text style={{
                                    fontSize: 18,
                                    textAlign: 'center',
                                    alignSelf: 'center'
                                }}>Compartilhar Pesquisa! :) </Text>
                                <Button iconLeft full primary rounded style={{marginTop: 10}}>
                                    <Icon name='logo-facebook' />
                                    <Text>Facebook</Text>
                                </Button>
                                <Button iconLeft full success rounded style={{marginTop: 10}}>
                                    <Icon name='logo-whatsapp' />
                                    <Text>Whatsapp</Text>
                                </Button>
                                <Button iconLeft full rounded style={{marginTop: 10, backgroundColor: '#FF6F4A'}}>
                                    <Icon name='logo-instagram' />
                                    <Text>Instagram</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    </Card>

                </Content>
            </Container>
        );
    }
}
