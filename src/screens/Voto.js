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
        this.state = {
            selectedItem: null,
            showToast: false
        };
    }

    renderItems(items) {
        const options = items.map((item, key) => {
            return (
                <ListItem key={key} selected={item.id == this.state.selectedItem} style={{width: '100%'}} onPress={() => this.setState({selectedItem: item.id})}>
                    <Left>
                        <Text>{item.item}</Text>
                    </Left>
                    <Right>
                        <Radio
                            onPress={() => this.setState({selectedItem: item.id})}
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

    sendForm() {
        // validando os campos
        const { navigation } = this.props;
        if(this.state.selectedItem == null){
            Toast.show({
                text: "Ops, faltou selecionar uma opção.",
                buttonText: "Vou selecionar!",
                type: "danger",
                duration: 4000
              })
            return false
        }

        this.props.navigation.navigate("Confirmacao", {pesquisa: navigation.getParam('pesquisa')})
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
                        <Title>Votação</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Body>
                                <Text>{navigation.getParam('pesquisa')}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card>
                        <CardItem>
                            <Body>
                                {this.renderItems(navigation.getParam('items'))}
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
