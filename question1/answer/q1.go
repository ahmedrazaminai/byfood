package answer

import (
	"strings"
)

// swaps values in array
func swapper(arr []string, v1 int, v2 int) {
	arr[v1], arr[v2] = arr[v2], arr[v1]
}

// sorts array by the number of a's in each string and if the number of a's are equal, sorts by length
func Sorter(arr []string) []string {
	search := "a"

	for i := 0; i < len(arr)-1; i++ {
		for j := 0; j < len(arr)-1; j++ {
			if strings.Count(arr[j], search) < strings.Count(arr[j+1], search) {
				swapper(arr, j, j+1)
			} else if strings.Count(arr[j], search) == strings.Count(arr[j+1], search) {
				if len(arr[j]) < len(arr[j+1]) {
					swapper(arr, j, j+1)
				}
			}
		}
	}
	return arr
}
