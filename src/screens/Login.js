import React, {useState, useEffect} from 'react'
import {
    View,
    StyleSheet,
    Image,
    Text,
    TextInput,
    Button,
    Alert
} from 'react-native'
import SQLite from 'react-native-sqlite-storage'

const db=SQLite.openDatabase(
    {
        name:'MainDB',
        location:'default',
    },
    ()=>{
        error=>{console.log(error)}
    }
)

export default function Login({navigation}){
    const [name, setName]=useState('')
    const [age, setAge]=useState('')

    useEffect(()=>{
        createTable()
    },[])

    const createTable=()=>{
        db.transaction((tx)=>{
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                +"Users "
                +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER)"
            )
        })
    }
    const setData=async()=>{
        if(name.length==0){
            Alert.alert('Warning!','please write your data')
        }else{
            try{
                await db.transaction(async(tx)=>{
                    await tx.executeSql(
                        //"INSERT INTO Users (Name, Age) VALUES ('"+name+"',"+age+")"
                        "INSERT INTO Users (Name, Age) VALUES (?,?)",
                        [name, age]
                    )
                })
                navigation.navigate('Home')
            }catch(error){
                console.log(error)
            }
        }
    }

    return(
        <View style={styles.body}>
            <Image
                style={styles.logo}
                source={require('../../assets/sqlite.png')}
            />
            <Text style={styles.text}>
                SQLite Storage
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                onChangeText={(value)=>setName(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter your age'
                onChangeText={(value)=>setAge(value)}
            />
            <View style={styles.btn}>
                <Button
                    title="Login"
                    color="#1eb900"
                    onPress={setData}
                />
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    body:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#0080ff'
    },
    logo:{
        width: 100,
        height: 100,
        margin: 20,
    },
    text:{
        fontSize:30,
        color:'#ffffff',
        marginBottom:130,
    },
    input:{
        width:300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign:'center',
        fontSize: 20,
        marginBottom: 10,
    },
    btn:{
        marginBottom:10,
        width:200,
    }
})
