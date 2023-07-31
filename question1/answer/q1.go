package answer

import (
	"sort"
	"strings"
)

// sorts array by the number of a's in each string and if the number of a's are equal, sorts by length
func Sorter(arr []string) []string {
	sort.Slice(arr, func(i, j int) bool {
		istring := strings.Count(arr[i], "a")
		jstring := strings.Count(arr[j], "a")

		return istring > jstring || (istring == jstring && len(arr[i]) > len(arr[j]))
	})
	return arr
}
