import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        let interval;
        if (isRunning && !isPaused) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 100);
            }, 100);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, isPaused]);

    const startTimer = () => {
        setIsRunning(true);
        setIsPaused(false);
    };

    const pauseTimer = () => {
        setIsPaused((prevIsPaused) => !prevIsPaused);
    };

    const resetTimer = () => {
        setTime(0);
        setIsRunning(false);
        setIsPaused(false);
    };

    const formatTime = (time) => {
        const milliseconds = Math.floor((time % 1000) / 100); // Tenths of a second
        const seconds = Math.floor((time / 1000) % 60);
        const minutes = Math.floor(time / 60000);
        return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds}`;
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            paddingTop: 50, 
        },
        timeText: {
            fontSize: 48,
            fontWeight: "bold",
            marginBottom: 40, 
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-around",
            width: "80%", 
            marginTop: 20,
        },
        buttonWrapper: {
            flex: 1,
            marginHorizontal: 5, 
        },
        startButton: {
            backgroundColor: "green",
        },
        pauseButton: {
            backgroundColor: "blue",
        },
        resetButton: {
            backgroundColor: "red",
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.timeText}>{formatTime(time)}</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Start"
                        onPress={startTimer}
                        disabled={isRunning}
                        color="green"
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title={isPaused ? "Resume" : "Pause"}
                        onPress={pauseTimer}
                        disabled={!isRunning}
                        color="blue"
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Reset"
                        onPress={resetTimer}
                        disabled={!isRunning}
                        color="red"
                    />
                </View>
            </View>
        </View>
    );
}
