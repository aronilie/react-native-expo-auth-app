import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import colors from '../constants/colors';
import { ListItem, ListSeparator } from './ListItems';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
  logoutButton: {
    width: '95%',
    height: 70,
    alignSelf: 'center',
  },
});

type Props = {
  data: Array<any>;
  destination: string;
};

export const List = ({ data, destination }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<any>>();

  return (
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <ListItem
          key={item.id}
          title={item.name}
          subtitle={item.id}
          // @ts-ignore
          // Disabling the next line because all the item.targets are valid - that data just
          // isn't getting picked up by TypeScript
          onPress={() => navigate(destination, { data: item })}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};
