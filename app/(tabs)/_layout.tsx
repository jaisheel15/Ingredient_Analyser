import { Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs >
        <Tabs.Screen name="index"/>
        <Tabs.Screen name='scanning' options={{headerShown: false , }}/>
    </Tabs>;
}
