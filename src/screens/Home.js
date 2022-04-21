import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Alert,
    Button,
    TextInput
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

export default function Home({navigation}){
    const [name,setName]=useState('')
    const [age, setAge]=useState('')

    useEffect(()=>{
        getData()
    },[])



    const getData=()=>{
        try{
            db.transaction((tx)=>{
                tx.executeSql(
                    "SELECT Name, Age FROM Users",
                    [],
                    (tx, results)=>{
                        var len=results.rows.length
                        console.log(results.rows.item(0).Name)
                        if(len>0){
                            var userName=results.rows.item(0).Name
                            var userAge=results.rows.item(0).Age
                            setName(userName)
                            setAge(userAge)
                        }
                    }
                )
            })
        }catch(error){
            console.log(error)
        }
    }

    const updateData=async()=>{
        if(name.length==0){
            Alert.alert('Warning!','please write your data')
        }else{
            try{
                db.transaction((tx)=>{
                    tx.executeSql(
                        "UPDATE Users SET Name=?",
                        [name],
                        ()=>{Alert.alert('success!','Your data has been updated.')},
                        error=>{console.log(error)}
                    )
                })
                
            }catch(error){
                console.log(error)
            }
        }
    }
    const removeDate=async()=>{
        try{
            db.transaction((tx)=>{
                tx.executeSql(
                    "DELETE FROM Users",
                    [],
                    ()=>{navigation.navigate('Login')},
                    error=>{console.log(error)}
                )
            })
            
        }catch(error){
            console.log(error)
        }
    }

    return(
        <View style={styles.body}>
            <Text style={styles.text}>
                Welcome {name}!
            </Text>
            <Text style={styles.text}>
                your age is {age}
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your name'
                value={name}
                onChangeText={(value)=>setName(value)}
            />
            <View style={styles.btn}>
                <Button
                    style={styles.btn}
                    title='Update'
                    color='#ff7f00'
                    onPress={updateData}
                />
            </View>
            <View style={styles.btn}>
                <Button
                    title='Remove'
                    color='#f40100'
                    onPress={removeDate}
                />
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    body:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:40,
        fontWeight:"bold",
        margin: 10
    },
    input:{
        width:300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign:'center',
        fontSize: 20,
        marginTop:130,
        marginBottom: 10,
    },
    btn:{
        marginBottom:10,
        width:200,
    }
})
