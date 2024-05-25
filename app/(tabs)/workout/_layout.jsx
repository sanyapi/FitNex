import { Stack } from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerTitle: 'Workout',
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="animation"
              options={{
                headerTitle: 'Workout',
                headerShown: false,
              }}
            />
        </Stack>
    )
}

export default StackLayout;