package answer

import (
	"sort"
	"strings"
)

// sorts array by the number of a's in each string and if the number of a's are equal, sorts by length
func Sorter(arr []string) []string {
	sort.Slice(arr, func(i, j int) bool {
		return compare(arr[i], arr[j])
	})
	return arr
}

// compares two strings and returns true if the first string should be swapped with the second
func compare(i, j string) bool {
	istring := strings.Count(i, "a")
	jstring := strings.Count(j, "a")

	return istring > jstring || (istring == jstring && len(i) > len(j))
}
