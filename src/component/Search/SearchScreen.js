import React from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
// import styles from './styles';
import { SearchBar } from 'react-native-elements';
// import MenuImage from '../../user/components/BackButton/MenuImage/MenuImage';
// import {
//   getCategoryName,
//   getProductByProductName,
//   getProductByCategoryName,
//   getProductByIngredientName
// } from '../../user/data/MockDataAPI';

// export default class SearchScreen extends React.Component {
//   static navigationOptions = ({ navigation }) => {
//     const { params = {} } = navigation.state;
//     return {
//       headerRight: (
//         <MenuImage
//           onPress={() => {
//             navigation.openDrawer();
//           }}
//         />
//       ),
//       headerTitle: (
//         <SearchBar
//           containerStyle={{
//             backgroundColor: 'transparent',
//             borderBottomColor: 'transparent',
//             borderTopColor: 'transparent',
//             flex: 1
//           }}
//           inputContainerStyle={{
//             backgroundColor: '#EDEDED'
//           }}
//           inputStyle={{
//             backgroundColor: '#EDEDED',
//             borderRadius: 10,
//             color: 'black'
//           }}
//           searchIcond
//           clearIcon
//           //lightTheme
//           round
//           onChangeText={text => params.handleSearch(text)}
//           //onClear={() => params.handleSearch('')}
//           placeholder="Search"
//           value={params.data}
//         />
//       )
//     };
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       value: '',
//       data: []
//     };
//   }

//   componentDidMount() {
//     const { navigation } = this.props;
//     navigation.setParams({
//       handleSearch: this.handleSearch,
//       data: this.getValue
//     });
//   }

//   handleSearch = text => {
//     var productArray1 = getProductByProductName(text);
//     var productArray2 = getProductByCategoryName(text);
//     var productArray3 = getProductByIngredientName(text);
//     var aux = productArray1.concat(productArray2);
//     var productArray = [...new Set(aux)];
//     if (text == '') {
//       this.setState({
//         value: text,
//         data: []
//       });
//     } else {
//       this.setState({
//         value: text,
//         data: productArray
//       });
//     }
//   };

//   getValue = () => {
//     return this.state.value;
//   };

//   onPressProduct = item => {
//     this.props.navigation.navigate('Product', { item });
//   };

//   renderProduct = ({ item }) => (
//     <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={() => this.onPressProduct(item)}>
//       <View style={styles.container}>
//         <Image style={styles.photo} source={{ uri: item.photo_url }} />
//         <Text style={styles.title}>{item.title}</Text>
//         <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
//       </View>
//     </TouchableHighlight>
//   );

//   render() {
//     return (
//       <View>
//         <FlatList
//           vertical
//           showsVerticalScrollIndicator={false}
//           numColumns={2}
//           data={this.state.data}
//           renderItem={this.renderProduct}
//           keyExtractor={item => `${item.productId}`}
//         />
//       </View>
//     );
//   }
// }

const SearchScreen = () => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  )
}
export default SearchScreen;