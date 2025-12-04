// components/BottomNav.styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#bc010c',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#a0010a',
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  centralNavItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 5,
  },
  iconWrapper: {
    marginBottom: 4,
  },
  centralIconWrapper: {
    marginBottom: 4,
  },
  navText: {
    color: '#f8f8f8',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default styles;