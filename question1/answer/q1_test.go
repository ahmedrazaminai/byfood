package answer

import (
	"reflect"
	"testing"
)

func TestSorter(t *testing.T) {
	tests := []struct {
		input  []string
		result []string
	}{
		{
			input:  []string{"aaaa", "aaaaaaa", "aaa", "aa", "aaaaaaaa", "a"},
			result: []string{"aaaaaaaa", "aaaaaaa", "aaaa", "aaa", "aa", "a"},
		},
		{
			input:  []string{"edksd", "lms", "wfds", "sssfsfddfs", "d", "ll"},
			result: []string{"sssfsfddfs", "edksd", "wfds", "lms", "ll", "d"},
		},
		{
			input:  []string{"aaaasd", "a", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "aab", "lklklklklklklklkl", "l"},
			result: []string{"aaaasd", "aaabcd", "aab", "a", "lklklklklklklklkl", "cssssssd", "fdz", "ef", "kf", "zc", "l"},
		},
	}

	for _, test := range tests {
		result := Sorter(test.input)

		if !reflect.DeepEqual(result, test.result) {
			t.Errorf("Sorter(%v) FAILED. Expected %v, got %v", test.input, test.result, result)
		} else {
			t.Logf("Sorter(%v) PASSED. Expected %v, got %v", test.input, test.result, result)
		}
	}
}
