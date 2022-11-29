package questionTwo

import (
	"reflect"
	"testing"
)

func TestRecursiveHalf(t *testing.T) {
	tests := []struct {
		input  int
		result []int
	}{
		{
			input:  9,
			result: []int{2, 4, 9},
		},
		{
			input:  10,
			result: []int{2, 5, 10},
		},
		{
			input:  24,
			result: []int{3, 6, 12, 24},
		},
	}

	for _, test := range tests {
		result := Divider(test.input)

		if !reflect.DeepEqual(result, test.result) {
			t.Errorf("HalfFloor(%v) FAILED. Expected %v, got %v", test.input, test.result, result)
		} else {
			t.Logf("HalfFloor(%v) PASSED. Expected %v, got %v", test.input, test.result, result)
		}
	}
}
