package env

import (
	"os"
	"strconv"
)

func GetEnvString(key string, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func GetEnvInt(key string, defaultValue int) int {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	valInt, err := strconv.Atoi(value)

	if err != nil {
		return defaultValue
	}

	return valInt
}
