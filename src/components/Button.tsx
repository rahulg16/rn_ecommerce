import { View, Text, StyleSheet } from 'react-native'
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
    <View style={[styles.btn, isOutline ? styles.outlineBtn : styles.actionBtn, style]}>
      <Text
        style={{
          textAlign: 'center',
          color: isOutline ? '#2A4BA0' : 'white',
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </View>
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