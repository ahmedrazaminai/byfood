package answer

import (
	"reflect"
	"strings"
)

// sorts array by the number of a's in each string and if the number of a's are equal, sorts by length
func Sorter(arr []string) []string {
	search := "a"
	swap := reflect.Swapper(arr)

	for i := 0; i < len(arr)-1; i++ {
		for j := 0; j < len(arr)-1; j++ {
			if strings.Count(arr[j], search) < strings.Count(arr[j+1], search) {
				swap(j, j+1)
			} else if strings.Count(arr[j], search) == strings.Count(arr[j+1], search) {
				if len(arr[j]) < len(arr[j+1]) {
					swap(j, j+1)
				}
			}
		}
	}
	return arr
}
