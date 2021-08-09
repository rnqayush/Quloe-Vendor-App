import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from "react-native-image-crop-picker";
import GetLocation from 'react-native-get-location'

import Geocoder from 'react-native-geocoder';
import axios from 'axios';


const width = Dimensions.get('screen').width
const SignInScreen = ({ navigation }) => {
    const [logo, setLogo] = useState(null)
    const [done, setDone] = useState(false)
    const [cname, setCname] = useState('')
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')
    const [workType, setworkType] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [IdProof, setIdProof] = useState(null)
    const [taxNumber, setTaxNumber] = useState('')
    const [address, setAddress] = useState('')
    const [addressProof, setAddressProof] = useState(null)
    const [location, setLocation] = useState()
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    // location

    function myposition() {


        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(async location => {
                setLat(location.latitude)
                setLon(location.longitude)

                console.log(location)





                /*** revrse geocoding */
                var NY = {
                    lat: location.latitude,
                    lng: location.longitude
                };
                await Geocoder.geocodePosition(NY).then(res =>
                    setLocation(res[0].locality)
                )
                    .catch(err => console.log(err))
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })


    }








    const takePicture2 = () => {


        ImagePicker.openCamera({
            width: width,
            height: 300,
            cropping: true,
            compressImageQuality: .5
        }).then(response => {
            if (!response.name || response.filename) {
                response.filename = response.path.split('/').pop()
            }
            if (!response.type) {
                response.type = 'image/jpeg'
            }
            if (!response.uri) {
                response.uri = response.path
            }
            const source = response;
            console.log(source);
            setIdProof(source)

            // this.setState({ avatarSource: source }, () => {
            //   that.joinData();
            // });
        }, error => {
            console.log(error);

        });


    }
    const takePicture = () => {


        ImagePicker.openPicker({
            width: width,
            height: 400,
            cropping: true,
            compressImageQuality: .5
        }).then(response => {
            if (!response.name || response.filename) {
                response.filename = response.path.split('/').pop()
            }
            if (!response.type) {
                response.type = 'image/jpeg'
            }

            if (!response.uri) {
                response.uri = response.path
            }
            const source = response;
            console.log(source);
            setLogo(source)


            // this.setState({ avatarSource: source }, () => {
            //   that.joinData();
            // });
        }, error => {

        });




    }

    const takePicture3 = () => {


        ImagePicker.openPicker({
            width: width,
            height: 400,
            cropping: true,
            compressImageQuality: .5
        }).then(response => {
            if (!response.name || response.filename) {
                response.filename = response.path.split('/').pop()
            }
            if (!response.type) {
                response.type = 'image/jpeg'
            }

            if (!response.uri) {
                response.uri = response.path
            }
            const source = response;
            console.log(source.filename);
            setAddressProof(source)
            // this.setState({ avatarSource: source }, () => {
            //   that.joinData();
            // });
        }, error => {

        });



    }


    async function Signup() {

        let param = {
            company_name: JSON.stringify(cname),
            work_type: JSON.stringify(workType),
            owner_name: JSON.stringify(ownerName),
            id_proof: JSON.stringify(IdProof.filename),
            tax_number: JSON.stringify(taxNumber),
            address: JSON.stringify(address),
            address_proof: JSON.stringify(addressProof.filename),
            get_gps_location: JSON.stringify(location),
            supplier_lat: JSON.stringify(lat),
            supplier_lon: JSON.stringify(lon),
            suplier_mobile: JSON.stringify(mobile),
            suplier_email: JSON.stringify(email),
            password: JSON.stringify(password),
            suplier_picture: JSON.stringify(logo.filename),
        }

        await axios.post('http://cmovi.quloe.info/api/suplier-register', param).
            then((res) => {
                console.log(res.data)
                if (res.data.success == "true") {
                    setDone(true)
                    setTimeout(() => {
                        navigation.goBack()
                    }, 2000);
                }

            }).catch((err) => console.log(err.response.data))
        /*  console.log(param); */
        /* console.log('parsed value is',JSON.parse(param.suplier_picture)); */


    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={{flex: 1, marginBottom: 30}}
                >
                    <View>
                        <Image
                            resizeMode='contain'
                            style={{ width: 65, height: 65, alignSelf: 'center' }}
                            source={require('../assets/logo1.png')}
                        />
                        <Image
                            resizeMode='contain'
                            style={{ width: '100%', height: 35, alignSelf: 'center' }}
                            source={require('../assets/Group555.png')}
                        />
                    </View>


                    <Text style={[styles.text_footer, { alignSelf: 'center' }]}>Create Supplier Profile</Text>
                    <View style={{marginTop:20, width: 90, height: 90, backgroundColor: 'gray', borderRadius: 45, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        {logo ? (
                            <Image
                                resizeMode='contain'
                                style={{ width: 90, height: 90, borderRadius: 45 }}
                                source={logo}
                            />

                        ) : (
                            <TouchableOpacity
                                onPress={() => takePicture()}
                               
                            >

                                <Image
                                    resizeMode='contain'
                                    style={{ height: 90 }}
                                    source={require('../assets/Group558.png')}
                                />

                            </TouchableOpacity>

                        )}



                    </View>
                    <Text style={[styles.text_footer, { alignSelf: 'center',fontSize:15,marginTop:5,marginBottom:10 }]}>Upload Logo</Text>


                    <View style={{

                        height: 45,
                        borderRadius: 5,
                        borderColor: "#009387",
                        borderWidth: 1,
                        backgroundColor: "#FAF9F9",
                        marginBottom: 0,
                        paddingLeft: 7,
                        marginTop: 10
                    }}>



                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",

                                letterSpacing: 0,
                                textAlign: "left",
                                color: "#000",
                            }}
                            placeholder='Company Name'
                            value={cname}
                            onChangeText={(value) => setCname(value)}




                        />
                    </View>
                    <View style={{

                        height: 45,
                        borderRadius: 5,
                        borderColor: "#009387",
                        borderWidth: 1,
                        backgroundColor: "#FAF9F9",
                        marginBottom: 0,
                        paddingLeft: 7,
                        marginTop: 25
                    }}>



                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",

                                letterSpacing: 0,
                                textAlign: "left",
                                color: "#000",
                            }}
                            placeholder='Work Type'
                            value={workType}
                            onChangeText={(value) => setworkType(value)}




                        />
                    </View>
                    <View style={{


                        height: 45,
                        borderRadius: 5,
                        borderColor: "#009387",
                        borderWidth: 1,
                        backgroundColor: "#FAF9F9",
                        marginBottom: 0,
                        paddingLeft: 7,
                        marginTop: 25
                    }}>



                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",

                                letterSpacing: 0,
                                textAlign: "left",
                                color: "#000",
                            }}
                            placeholder='Owner Name'
                            value={ownerName}
                            onChangeText={(value) => setOwnerName(value)}




                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => takePicture2()}
                        >
                            <View style={{
                                flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                                width: width / 2 - 30,
                                height: 45,
                                borderRadius: 5,
                                borderColor: "#009387",
                                borderWidth: 1,
                                backgroundColor: "#FAF9F9",
                                marginBottom: 0,
                                paddingLeft: 7,
                                marginTop: 25
                            }}>
                                {IdProof ? (
                                    <Text

                                        style={{ color: 'grey' }}



                                    >{IdProof.filename.substring(0,8)}.jpg</Text>

                                ) : (
                                    <Text

                                        style={{ color: 'grey' }}



                                    >ID Proof</Text>

                                )}




                                <Image
                                    resizeMode='contain'
                                    style={{ width: 19, height: 19, alignSelf: 'center', marginRight: 8 }}
                                    source={require('../assets/Group567.png')}
                                />
                            </View>
                        </TouchableOpacity>




                        <View style={{

                            width: width / 2 - 30,
                            height: 45,
                            borderRadius: 5,
                            borderColor: "#009387",
                            borderWidth: 1,
                            backgroundColor: "#FAF9F9",
                            marginBottom: 0,
                            paddingLeft: 7,
                            marginTop: 25
                        }}>



                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{
                                    fontSize: 15,
                                    fontWeight: "normal",
                                    fontStyle: "normal",

                                    letterSpacing: 0,
                                    textAlign: "left",
                                    color: "#000",
                                }}
                                placeholder='Tax Number'
                                value={taxNumber}
                                onChangeText={(value) => setTaxNumber(value)}




                            />
                        </View>



                    </View>
                    <View style={{

                        height: 45,
                        borderRadius: 5,
                        borderColor: "#009387",
                        borderWidth: 1,
                        backgroundColor: "#FAF9F9",
                        marginBottom: 0,
                        paddingLeft: 7,
                        marginTop: 25
                    }}>



                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",

                                letterSpacing: 0,
                                textAlign: "left",
                                color: "#000",
                            }}
                            placeholder='Address'
                            value={address}
                            onChangeText={(value) => setAddress(value)}




                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => takePicture3()}
                    >
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',

                            height: 45,
                            borderRadius: 5,
                            borderColor: "#009387",
                            borderWidth: 1,
                            backgroundColor: "#FAF9F9",
                            marginBottom: 0,
                            paddingLeft: 7,
                            marginTop: 25
                        }}>



                            {addressProof ? (
                                <Text

                                    style={{ color: 'grey' }}



                                >{addressProof.filename.substring(0, 8)}.jpg</Text>

                            ) : (
                                <Text

                                    style={{ color: 'grey' }}



                                >Address Proof</Text>

                            )}
                            <Image
                                resizeMode='contain'
                                style={{ width: 19, height: 19, alignSelf: 'center', marginRight: 8 }}
                                source={require('../assets/Group567.png')}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => myposition()}
                    >
                        <View style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',

                            height: 45,
                            borderRadius: 5,
                            borderColor: "#009387",
                            borderWidth: 1,
                            backgroundColor: "#FAF9F9",
                            marginBottom: 0,
                            paddingLeft: 7,
                            marginTop: 25
                        }}>

                            {location ? (
                                <Text

                                    style={{ color: 'grey' }}



                                >{location}</Text>


                            ) : (
                                <Text

                                    style={{ color: 'grey' }}



                                >location by gps</Text>

                            )}


                            <Image
                                resizeMode='contain'
                                style={{ width: 19, height: 19, alignSelf: 'center', marginRight: 8 }}
                                source={require('../assets/Group565.png')}
                            />
                        </View>
                    </TouchableOpacity>


                    <View style={{

                        height: 45,
                        borderRadius: 5,
                        borderColor: "#009387",
                        borderWidth: 1,
                        backgroundColor: "#FAF9F9",
                        marginBottom: 0,
                        paddingLeft: 7,
                        marginTop: 25
                    }}>



                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",

                                letterSpacing: 0,
                                textAlign: "left",
                                color: "#000",
                            }}
                            placeholder='Mobile'
                            value={mobile}
                            onChangeText={(value) => setMobile(value)}




                        />
                    </View>
                    <View style={{

                        height: 45,
                        borderRadius: 5,
                        borderColor: "#009387",
                        borderWidth: 1,
                        backgroundColor: "#FAF9F9",
                        marginBottom: 0,
                        paddingLeft: 7,
                        marginTop: 25
                    }}>



                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",

                                letterSpacing: 0,
                                textAlign: "left",
                                color: "#000",
                            }}
                            placeholder='Email Address'
                            value={email}
                            onChangeText={(value) => setEmail(value)}




                        />
                    </View>
                    <View style={{

                        height: 45,
                        borderRadius: 5,
                        borderColor: "#009387",
                        borderWidth: 1,
                        backgroundColor: "#FAF9F9",
                        marginBottom: 0,
                        paddingLeft: 7,
                        marginTop: 25
                    }}>



                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{
                                fontSize: 15,
                                fontWeight: "normal",
                                fontStyle: "normal",

                                letterSpacing: 0,
                                textAlign: "left",
                                color: "#000",
                            }}
                            placeholder='Password'
                            value={password}
                            onChangeText={(value) => setPassword(value)}




                        />
                    </View>



                    {/* <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={25}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={25}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={25}
                    />
                    }
                </TouchableOpacity>
            </View>
             */}<View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View>
                    <View style={styles.button}>
                        {done == true ? (
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Successful</Text>
                            </LinearGradient>

                        ) : (
                            <TouchableOpacity
                                style={styles.signIn}
                                onPress={() => Signup()}
                            >
                                <LinearGradient
                                    colors={['#08d4c4', '#01ab9d']}
                                    style={styles.signIn}
                                >
                                    <Text style={[styles.textSign, {
                                        color: '#fff'
                                    }]}>Create</Text>
                                </LinearGradient>
                            </TouchableOpacity>




                        )}
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={[styles.signIn, {
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >


                            <Text style={[styles.textSign, {
                                color: '#009387'
                            }]}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },

    footer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:10,
        paddingHorizontal: 25,

    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 25
    },
    color_textPrivate: {
        color: 'grey'
    }
});
