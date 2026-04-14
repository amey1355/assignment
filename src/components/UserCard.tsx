import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { User } from '../types/User';

interface UserCardProps {
  user: User;
  onPress: (user: User) => void;
}

const AVATAR_COLORS = [
  '#4F46E5', '#7C3AED', '#DB2777', '#DC2626',
  '#D97706', '#059669', '#0891B2', '#2563EB',
  '#7C3AED', '#BE185D',
];

export const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  const avatarColor = AVATAR_COLORS[(user.id - 1) % AVATAR_COLORS.length];
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(user)}
      activeOpacity={0.85}
    >
      <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {user.name}
        </Text>

        <View style={styles.row}>
          <Text style={styles.icon}>✉</Text>
          <Text style={styles.detail} numberOfLines={1}>
            {user.email}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.icon}>📞</Text>
          <Text style={styles.detail} numberOfLines={1}>
            {user.phone}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.icon}>📍</Text>
          <Text style={styles.detail}>{user.address.city}</Text>
        </View>
      </View>

      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  icon: {
    fontSize: 11,
    marginRight: 5,
    width: 16,
  },
  detail: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  chevron: {
    fontSize: 24,
    color: '#D1D5DB',
    fontWeight: '300',
    marginLeft: 8,
  },
});
