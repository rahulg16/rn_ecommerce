import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Scale from './Scale'

interface ButtonProps {
    title: string;
    onPress?: () => void;
    isOutline?: boolean;
    style?: {};
}

const Button = (props: ButtonProps) => {

    const {title, onPress, isOutline, style} = props;

  return (
    <TouchableOpacity style={[styles.btn, isOutline ? styles.outlineBtn : styles.actionBtn, style]} onPress={onPress}>
      <Text
        style={{
          textAlign: 'center',
          color: isOutline ? '#2A4BA0' : 'white',
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outlineBtn: {
    borderColor: '#2A4BA0',
    borderWidth: 2,
    backgroundColor: 'white',
  },
  actionBtn: {
    backgroundColor: '#2A4BA0',
  },
  btn: {
    paddingHorizontal: Scale(15),
    paddingVertical: Scale(20),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default Button