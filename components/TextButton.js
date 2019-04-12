import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from "../utils/styles";

export function TextButton({ title, onPress, accessibilityLabel, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress} accessibilityLabel={accessibilityLabel}>
      <Text style={[styles.textButton, style]}>{title}</Text>
    </TouchableOpacity>
  );
}
