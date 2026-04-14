import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type UserDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'UserDetail'>;
  route: RouteProp<RootStackParamList, 'UserDetail'>;
};

const AVATAR_COLORS = [
  '#4F46E5', '#7C3AED', '#DB2777', '#DC2626',
  '#D97706', '#059669', '#0891B2', '#2563EB',
  '#7C3AED', '#BE185D',
];

const DetailRow: React.FC<{ icon: string; label: string; value: string; onPress?: () => void }> = ({
  icon, label, value, onPress,
}) => (
  <View style={styles.detailRow}>
    <View style={styles.iconBox}>
      <Text style={styles.rowIcon}>{icon}</Text>
    </View>
    <View style={styles.rowContent}>
      <Text style={styles.rowLabel}>{label}</Text>
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.rowValue, styles.link]}>{value}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.rowValue}>{value}</Text>
      )}
    </View>
  </View>
);

export const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ route, navigation }) => {
  const { user } = route.params;

  const avatarColor = AVATAR_COLORS[(user.id - 1) % AVATAR_COLORS.length];
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const openWebsite = () => {
    const url = user.website.startsWith('http')
      ? user.website
      : `https://${user.website}`;
    Linking.openURL(url);
  };

  const openPhone = () => {
    Linking.openURL(`tel:${user.phone}`);
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Hero Header */}
        <View style={[styles.header, { backgroundColor: avatarColor }]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>@{user.username}</Text>
        </View>

        {/* Details Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Contact Info</Text>

          <DetailRow
            icon="✉️"
            label="Email"
            value={user.email}
          />
          <DetailRow
            icon="📞"
            label="Phone"
            value={user.phone}
            onPress={openPhone}
          />
          <DetailRow
            icon="🌐"
            label="Website"
            value={user.website}
            onPress={openWebsite}
          />
        </View>

        {/* Company Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Company</Text>
          <DetailRow icon="🏢" label="Name" value={user.company.name} />
          <DetailRow icon="💬" label="Tagline" value={user.company.catchPhrase} />
        </View>

        {/* Address Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Address</Text>
          <DetailRow
            icon="📍"
            label="Street"
            value={`${user.address.street}, ${user.address.suite}`}
          />
          <DetailRow icon="🏙️" label="City" value={user.address.city} />
          <DetailRow icon="📮" label="Zipcode" value={user.address.zipcode} />
        </View>

      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scroll: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 36,
    paddingHorizontal: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  avatarText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  username: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
      },
      android: { elevation: 3 },
    }),
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  iconBox: {
    width: 36,
    alignItems: 'center',
    paddingTop: 2,
  },
  rowIcon: {
    fontSize: 16,
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  rowValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  link: {
    color: '#4F46E5',
    textDecorationLine: 'underline',
  },
});
