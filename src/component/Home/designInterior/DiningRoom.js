import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableHighlight, Text, StyleSheet, Dimensions } from 'react-native';
import * as Services from '../services/UnitServices'
import { Card } from 'react-native-paper';
import { ImageBackground } from 'react-native';

const DiningRoom = props => {

    const [design, setDesign] = useState([]);

    const groupLiving = () => {
        Services.getAllRoom().then(response => {
            setDesign(response[2].designInteriors);
        })
    }


    useEffect(() => {
        groupLiving();
    }, [])

    return (
        <View style={{ marginTop: 20, marginLeft: 7 }}>
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
                    {
                        design.map((design, index) => {
                            return (
                                <View style={{ flexWrap: 'wrap' }} key={index}>
                                    <View >
                                        <TouchableHighlight onPress={() => props.navigation.navigate('DesignDeskripsi', { design })}>
                                            <ImageBackground style={styles.photo} source={{ uri: `https://de332089ab3c.ngrok.io/design/photo/${design.id}` }} >
                                                <View style={styles.blurImage}>
                                                    <Text style={styles.textDesign}>{design.theme}</Text>
                                                </View>
                                            </ImageBackground>

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

export default DiningRoom;

const { width, height } = Dimensions.get('window')

// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_WIDTH_ROOM = width < height ? width : height;

const productNumColums = 2;
const productNumColumsRoom = 10;
// item size
const PRODUCT_ITEM_HEIGHT = 150;
const PRODUCT_ITEM_MARGIN = 10;
const PRODUCT_ITEM_HEIGHT_ROOM = 120;
const PRODUCT_ITEM_MARGIN_ROOM = 10;
const PRODUCT_ITEM_HEIGHT_CAROUSEL = 50;
const PRODUCT_ITEM_MARGIN_CAROUSEL = 20;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        marginLeft: PRODUCT_ITEM_MARGIN,
        marginTop: 40,
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15,
    },
    photo: {
        width: (SCREEN_WIDTH - (productNumColums + 1) * PRODUCT_ITEM_MARGIN) / productNumColums,
        height: PRODUCT_ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

    },
    blurImage: {
        flex: 1,
        justifyContent: 'center',
        fontWeight: 'bold',
        alignItems: 'center',
        backgroundColor: 'rgba( 0, 0, 0, 0.6 )',
        color: 'white',
        fontSize: 16,
    },
    textDesign: {
        color: 'white',
    }
})