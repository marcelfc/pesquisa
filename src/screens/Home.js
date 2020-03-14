import React from "react";
import { StatusBar, View } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem, ListItem, Badge } from "native-base";
export default class HomeScreen extends React.Component {
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
                                <ListItem icon style={{ width: '100%' }}>
                                    <Left>
                                        <Badge primary>
                                            <Text>1</Text>
                                        </Badge>
                                    </Left>
                                    <Body>
                                        <Text>pesquisa tal sobre tal coisa</Text>
                                    </Body>
                                    <Right>
                                        <Text>Votar</Text>
                                        <Icon active name="ios-open" />
                                    </Right>
                                </ListItem>
                                <ListItem icon style={{ width: '100%' }} onPress={() => this.props.navigation.navigate("Voto", {pesquisa: 'Quem deve ser o prefeito de banabuiú ?', items: [{id: 1, item: 'Edinho Nobre'}, {id: 2, item: 'Veridiano Sales'}]})}>
                                    <Left>
                                        <Badge primary>
                                            <Text>2</Text>
                                        </Badge>
                                    </Left>
                                    <Body>
                                        <Text>pesquisa tal sobre tal coisa</Text>
                                    </Body>
                                    <Right>
                                        <View  style={{flexDirection: 'row'}}>
                                            <Text>Votar</Text>
                                            <Icon active name="ios-open" />
                                        </View>
                                    </Right>
                                </ListItem>
                                <ListItem icon style={{ width: '100%' }}>
                                    <Left>
                                        <Badge primary>
                                            <Text>3</Text>
                                        </Badge>
                                    </Left>
                                    <Body>
                                        <Text>pesquisa tal sobre tal coisa</Text>
                                    </Body>
                                    <Right>
                                        <Text>Votar</Text>
                                        <Icon active name="ios-open" />
                                    </Right>
                                </ListItem>
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
                                <ListItem icon style={{ width: '100%' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#0000CD" }}>
                                            <Icon active name="ios-paper" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>pesquisa tal sobre tal coisa</Text>
                                    </Body>
                                    <Right>
                                        <Text>Votar</Text>
                                        <Icon active name="ios-open" />
                                    </Right>
                                </ListItem>
                                <ListItem icon style={{ width: '100%' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#0000CD" }}>
                                            <Icon active name="ios-paper" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>pesquisa tal sobre tal coisa</Text>
                                    </Body>
                                    <Right>
                                        <Text>Votar</Text>
                                        <Icon active name="ios-open" />
                                    </Right>
                                </ListItem>
                                <ListItem icon style={{ width: '100%' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#0000CD" }}>
                                            <Icon active name="ios-paper" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>pesquisa tal sobre tal coisa</Text>
                                    </Body>
                                    <Right>
                                        <Text>Votar</Text>
                                        <Icon active name="ios-open" />
                                    </Right>
                                </ListItem>
                                <ListItem icon style={{ width: '100%' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#0000CD" }}>
                                            <Icon active name="ios-paper" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>pesquisa tal sobre tal coisa</Text>
                                    </Body>
                                    <Right>
                                        <Text>Votar</Text>
                                        <Icon active name="ios-open" />
                                    </Right>
                                </ListItem>
                                <ListItem icon style={{ width: '100%' }}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#0000CD" }}>
                                            <Icon active name="ios-paper" />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>pesquisa tal sobre tal coisa</Text>
                                    </Body>
                                    <Right>
                                        <Text>Votar</Text>
                                        <Icon active name="ios-open" />
                                    </Right>
                                </ListItem>
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
