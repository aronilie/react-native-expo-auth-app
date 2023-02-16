import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { TextInput } from '../components/Form';
import { User } from '../models/User';
import { AuthConsumer } from '../store/authContext';

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 20,
  },
  description: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 40,
  },
  editContainer: {
    marginTop: 30,
    alignSelf: 'center',
    width: '90%',
  },
});

type RootStackParamList = {
  Home: undefined;
  User: { data: User };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'User'>;

const UserDetails: React.FC<Props> = ({ route }: Props) => {
  const { data } = route.params;
  const { editUser } = AuthConsumer();

  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');

  return (
    <>
      <Text style={styles.title}>
        {data.name} {data.surname}
      </Text>
      <Text style={styles.description}>{data.email}</Text>
      <View style={styles.editContainer}>
        <TextInput
          label="Change name"
          onChangeText={text => setName(text)}
        ></TextInput>
        <TextInput
          label="Change surname"
          onChangeText={text => setSurname(text)}
        ></TextInput>
        <Button onPress={() => editUser({ name: name, surname: surname })}>
          Save
        </Button>
      </View>
    </>
  );
};

export default UserDetails;
