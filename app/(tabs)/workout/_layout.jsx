import { Stack } from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
            {/* This is for the workout screen */}
            <Stack.Screen
              name="index"
              options={{
                headerTitle: 'Workout',
                headerShown: false,
              }}
            />
            {/* This is for the animation screen */}
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