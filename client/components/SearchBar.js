import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChangeText, onSubmit, loading }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter tracking ID"
        autoCapitalize="characters"
        value={value}
        onChangeText={onChangeText}
      />
      <Pressable style={[styles.button, loading && styles.buttonDisabled]} onPress={onSubmit} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Searching...' : 'Track'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CAD3DF',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  button: {
    backgroundColor: '#1B6CA8',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center'
  },
  buttonDisabled: {
    opacity: 0.65
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700'
  }
});
