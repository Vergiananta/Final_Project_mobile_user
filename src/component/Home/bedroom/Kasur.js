import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableHighlight, Image, Dimensions, StyleSheet } from 'react-native';
import * as Services from '../services/UnitServices'
import { Card } from 'react-native-paper';
import { AsyncStorage } from 'react-native';


const Kasur = props => {

    const [unit, setUnit] = useState([]);

    const groupingKasur = async () => {
        Services.getAllType().then(response => {
            setUnit(response[2].units);
        })
    }

    const save = async (units) => {
        const unit = JSON.stringify(units);
        AsyncStorage.setItem('cart', JSON.stringify(unit));
        props.navigation.navigate('DetailProduct', { units })
    }
    console.log('tes');

    useEffect(() => {
        groupingKasur();
    }, [])

    return (
        <View>
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        unit.map((unit, index) => {
                            return (
                                <View style={{ flexWrap: 'wrap' }} key={index} >
                                    <View style={styles.container}>
                                        <TouchableHighlight onPress={() => save(unit)}>
                                            <Card>
                                                <Image style={styles.photo} source={{ uri: `https://de332089ab3c.ngrok.io/unit/photo/${unit.id}` }} />
                                                <Text style={styles.title}>{unit.name}</Text>
                                                <Text style={styles.price}>{unit.price}</Text>
                                            </Card>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default Kasur;

const { width, height } = Dimensions.get('window')

// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const productNumColums = 2;
// item size
const PRODUCT_ITEM_HEIGHT = 80;
const PRODUCT_ITEM_MARGIN = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: PRODUCT_ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15,
        // flexDirection: 'row'
    },
    photo: {
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

    },
    title: {
        flex: 1,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    price: {
        flex: 1,
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',
        marginTop: 10,
        marginRight: 5,
        marginLeft: 5,
    },
    cardStyle: {
        justifyContent: 'space-between',

    }
})