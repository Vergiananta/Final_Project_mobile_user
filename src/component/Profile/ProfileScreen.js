import React, { useReducer, useContext, useState, useEffect } from 'react';
import { View, Text, ToastAndroid, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { userReducer, initialState } from './reducer/UserReducer';
import { AuthContext } from './context/AuthContext';
import { useForm } from 'react-hook-form';
import * as Services from './services/UserService'
import { Avatar } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import VectorIcon from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage';
import { SET_LOADING, FETCH_COMPLETE } from './reducer/UserAction';
import ImagePicker from "react-native-image-picker";

const ProfileScreen = () => {
    const { signOut } = useContext(AuthContext)
    const [state, dispatch] = useReducer(userReducer, initialState)
    const { form } = state
    const [text, setText] = useState('')
    const [editable, setEditable] = useState(true)
    const [localState, setLocalState] = useState({ action: 'list' });
    const [photo, setPhoto] = useState([])
    const [profile, setProfile] = useState(null)


    console.log('FORM PROFILE', profile);
    console.log('ID FORM', form);

    const handleEdit = (payload) => dispatch({ type: EDIT_USER, payload });
    const { register, setValue, handleSubmit, reset, watch } = useForm({ defaultValues })
    const value = watch();
    const defaultValues = {
        id: idProfile,
        name: nameProfile,
        username: userProfile,
        email: emailProfile,
        address: addressProfile,
        phone: phoneProfile,
        password: passwordProfile,
        photo: '',
    }

    const idProfile = form.id;
    const nameProfile = form.name;
    const userProfile = form.username;
    const emailProfile = form.email;
    const addressProfile = form.address;
    const phoneProfile = form.phone;
    const passwordProfile = form.password;

    const [data, setData] = React.useState({
        check_textInputChange: false,
        secureTextEntry: true,
        isValidPassword: true,
        checked: 'MALE'
    });

    const setLoading = () => dispatch({ type: SET_LOADING })
    const fetchComplete = payload => dispatch({ type: FETCH_COMPLETE, payload })

    const getProfileUser = async () => {
        try {
            const user = await AsyncStorage.getItem('userToken')
            console.log('USER GET SERVICE', user);

            setLoading()
            Services.getUserId(user).then(response => {
                console.log('PROFILE RESPONSE', response);
                setProfile(response)
                fetchComplete(response);
            })

        } catch (error) {
            console.log('ERROR RESPONSE', error);
        }
    }

    const showToast = message => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    };

    const onSubmit = (value) => {
        const { photo, ...body } = value;
        console.log('BODY HANDLE', body);
        console.log('EDIT HANDLE', photo);
        Services.updateUser({ photo, body }).then(response => {
            console.log('UPDATE USER', response);
            showToast('DATA UPDATED')
        })
    }

    // const handleClickSave = () => {
    //     handleClickEdit(text)
    //     setEditable(true)
    // }

    // const handleClick = () => {
    //     setEditable(false)
    // }

    const EditIcon = () => <VectorIcon name='edit' size={24} onPress={handleClick} />
    const SaveIcon = () => <VectorIcon name='check-square' size={24} onPress={handleClickSave} />

    useEffect(() => {
        getProfileUser();
    }, [])

    useEffect(() => {
        register('name')
        register('username')
        register('email', { pattern: /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i })
        register('address')
        register('phone')
        register('password')
        setLocalState({ action: 'list' })
    }, [register])

    const handleDelete = () => {
        alert('Under Maintenance')
    }

    const selectPhotoTapped = () => {
        const options = {
            title: 'Select Photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.uri;
                const type = response.type;
                const fileName = response.fileName;
                const source = {
                    uri,
                    type,
                    fileName,
                }
                console.log('SOURCE', source);
                setValue('photo', source)
                // setProfile({ photo: source })
                // console.log('image', value.photo);
            }
        });
        return options;
    }

    return (
        <View>
            <View style={styles.profileView}>
                <TouchableOpacity onPress={selectPhotoTapped}>
                    <Avatar.Image source={{ uri: `https://de332089ab3c.ngrok.io/user/photo/${form.id}` }} size={130} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={{ backgroundColor: 'white', width: 70, height: 40, borderRadius: 40, borderColor: 'blue', borderWidth: 1 }} onPress={handleSubmit(onSubmit)}>
                    <Text style={{ textAlign: 'center', marginTop: 9, fontWeight: 'bold' }} >EDIT</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.textInputView}>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Name</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={form.name}
                    // onChangeText={(value) => setText(value)}
                    // onChangeText={value => setProfile({ ...profile, name: value })}
                    />

                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Username</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={form.username}
                    // onChangeText={value => { setValue(value) }}
                    // onChangeText={value => setProfile({ ...profile, username: value })}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Email</Text>
                    <TextInput
                        style={styles.textInput}
                        value={form.email}
                    // onChangeText={value => { setValue(value) }}
                    // onChangeText={value => setProfile({ ...profile, email: value })}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Phone</Text>
                    <TextInput
                        style={styles.textInput}
                        value={form.phone}
                    // onChangeText={value => { setValue(value) }}

                    // onChangeText={value => setProfile({ ...profile, phone: value })}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Password</Text>

                    <TextInput
                        style={styles.textInput}
                        value={form.password}
                        secureTextEntry={data.secureTextEntry}
                    // onChangeText={value => { setValue(value) }}
                    // onChangeText={value => setProfile({ ...profile, password: value })}
                    />
                </View>
                <View style={styles.formStyle}>
                    <Text style={{ paddingTop: 12, marginLeft: 10 }}>Address</Text>
                    <TextInput
                        style={styles.textInput, { marginRight: 10 }}
                        value={form.address}
                    // onChangeText={value => { setValue(value) }}
                    // onChangeText={value => setProfile({ ...profile, address: value })}
                    />
                </View>
            </View >
            <View >
                <View style={styles.buttonStyle}>
                    <TouchableOpacity onPress={() => { signOut() }}>
                        <Text style={{ marginTop: 20, color: 'blue' }}><AntDesign name="logout" style={styles.signOut} size={20} />  SIGN OUT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={{ marginTop: 20, color: 'red' }}><AntDesign name="delete" style={styles.signOut} size={20} />  DELETE</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View >
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    background: {
        width: 400,
        height: 200,
        alignItems: 'center'
    },
    profileView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 25,

    },
    photoProfile: {
        paddingTop: 20
    },
    textInput: {
        fontSize: 15,

    },
    textInputView: {
        paddingTop: 10,
    },
    formStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    signOut: {
        width: 100,
        height: 30,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 10,
        justifyContent: 'center',
        marginTop: 10,
        paddingLeft: 20,
        // backgroundColor: '#ebe236'
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})