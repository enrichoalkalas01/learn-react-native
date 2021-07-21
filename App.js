import React from 'react'
import { 
    Text,
    View, 
    StatusBar,
    Image,
    TouchableOpacity,
    Switch,
    TextInput,
    Button,
    ScrollView,
    StyleSheet,
    FlatList,
    Alert,
    ToastAndroid,
    BackHandler,
} from 'react-native'

// Permission Android
import {
    PermissionsAndroid
} from 'react-native'

class App extends React.Component {
    state = {
        header: 'Home',
        value: true,
        username: null,
        data: [1,2,3,4,5,6,7],
        dataPembayaran: [
            { namaBarang: 'apel', harga: 10000 },
            { namaBarang: 'jeruk', harga: 15000 },
            { namaBarang: 'wortel', harga: 20000 }
        ]
    }

    constructor(props) {
        super(props);
    }

    backAction = () => {
        Alert.alert('Perhatian', 'apakah anda yakin untuk menutup aplikasi ?', [
            {
                text: 'cancel',
                onPress: () => null
            },
            {
                text: 'yes',
                onPress: () => BackHandler.exitApp()
            }
        ])

        return true
    }

    requestCameraPermission = async() => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Ijinkan Aplikasi',
                    message: 'Ijinkan Aplikasi untuk mengakses',
                    buttonNeutral: 'Nanti',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'Ok'
                }
            )

            if ( granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('permission diberikan')
            } else {
                console.log('permission tidak diberikan')
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.BackHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction)
    }
    
    componentWillUnmount() {
        this.BackHandler.remove()
    }

    render() {
        return(
            <>
            <View style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" backgroundColor="#4791db" />
                <View style={ styles.headers }>
                    <Text style={{ letterSpacing: 5, color: '#fff' }}>{ this.state.header }</Text>
                </View>
                <ScrollView>
                    <View style={{ backgroundColor: '#fff' }}>
                        <TouchableOpacity onPress={ 
                            () => {
                                this.requestCameraPermission
                                // Alert.alert('Penting', 'anda telah mengklik gambar', [
                                //     { 
                                //         text: 'Cancel',
                                //         onPress: () => console.log('cancel ditekan')
                                //     },
                                //     {
                                //         text: 'ok',
                                //         onPress: () => console.log('ok ditekan')
                                //     }
                                // ])
                            }
                        } >
                            <Image
                                source={ require('./src/images/image-1.jpg') }
                                style={{ width: '100%', height: 250 }}
                                // resizeMode="stretch"
                                resizeMode="cover"
                            />
                        </TouchableOpacity>

                        {/* <View>
                            <FlatList
                                style={{ flex: 1 }}
                                data={ this.state.dataPembayaran }
                                renderItem={
                                    ({item, index}) => (
                                        <View key={ index }>
                                            <Text>{ item.namaBarang }</Text>
                                            <Text>{ item.harga }</Text>
                                        </View>
                                    )
                                }
                                keyExtractor={ (item) => { item.namaBarang } }
                            /> 
                        </View> */}

                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
                            <Switch 
                                value={ this.state.value }
                                onValueChange={ () => { this.setState({ value: !this.state.value }) } }
                            />
                        </View>

                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput value={ this.state.username } style={{ borderBottomColor: '#000', borderBottomWidth: 1, width: '50%' }} onChangeText={ (value) => { this.setState({ username: value }); console.log(value) }} />
                        </View>

                        <View>
                            <TouchableOpacity style={{  paddingVertical: 25, paddingHorizontal: 25, borderBottomColor: '#000' }}>
                                <Text style={ styles.buttonOne } onPress={ () => { ToastAndroid.show('click me 1', ToastAndroid.SHORT) }} >Click Me</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{  paddingVertical: 25, paddingHorizontal: 25, borderBottomColor: '#000' }}>
                                <Text style={ styles.buttonTwo } onPress={ () => { ToastAndroid.show('click me 2', ToastAndroid.SHORT) }} >Click Me</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{  paddingVertical: 25, paddingHorizontal: 25, borderBottomColor: '#000' }}>
                                <Text style={ styles.buttonOne } onPress={ () => { ToastAndroid.show('click me 3', ToastAndroid.SHORT) }} >Click Me</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{  paddingVertical: 25, paddingHorizontal: 25, borderBottomColor: '#000' }}>
                                <Text style={ styles.buttonTwo } onPress={ () => { ToastAndroid.show('click me 4', ToastAndroid.SHORT) }} >Click Me</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    headers: {
        backgroundColor: 'crimson',
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    buttonOne: {
        backgroundColor: 'crimson',
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 5,
        paddingVertical: 25,
        borderRadius: 15,
    },
    buttonTwo: {
        backgroundColor: '#1e88e5',
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        letterSpacing: 5,
        paddingVertical: 25,
        borderRadius: 15,
    }
})

export default App;
