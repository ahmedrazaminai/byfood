package answer

import (
	"sort"
	"strings"
)

func ItemCounter(arr []string) string {
	// join the array into a string
	s := strings.Join(arr, ", ")

	// sort the array by the number of each item
	sort.Slice(arr, func(i, j int) bool {
		return strings.Count(s, arr[i]) > strings.Count(s, arr[j])
	})

	// return the first item
	return arr[0]
}
