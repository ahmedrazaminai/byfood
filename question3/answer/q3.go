package answer

import (
	"strings"
)

func ItemCounter(arr []string) string {
	stringedArray := strings.Join(arr, " ")

	//loops through array and sorts the array by the number of times a word appears in ascending order
	for i := 0; i < len(arr)-1; i++ {
		for j := 0; j < len(arr)-1; j++ {
			if strings.Count(stringedArray, arr[j]) < strings.Count(stringedArray, arr[j+1]) {
				arr[j], arr[j+1] = arr[j+1], arr[j]
			}
		}
	}
	//returns the most frequent word
	return arr[0]
}
