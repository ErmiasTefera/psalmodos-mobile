import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';


export default function NotFoundScreen() {
  const pathname = usePathname(); // Gets the attempted path
  const router = useRouter();

  useEffect(() => {
    console.log('Route not found:', pathname); 
    // Example: "/nonexistent-route" → Logs "/nonexistent-route"
  }, [pathname]);
  
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/(tabs)/mezmurs" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
