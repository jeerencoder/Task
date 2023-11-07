import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Vertical = () => {
  return (
    <View style={styles.item}>
    <Image source={url}/>
    <Text style={styles.title}>{title}</Text>
  </View>
  )
}

export default Vertical

const styles = StyleSheet.create({})