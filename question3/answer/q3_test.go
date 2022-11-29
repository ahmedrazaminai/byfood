package answer

import (
	"reflect"
	"testing"
)

func TestArrayMode(t *testing.T) {
	tests := []struct {
		input  []string
		result string
	}{
		{
			input:  []string{"xx", "oo", "ll", "ww", "oo", "oo", "ll", "ww", "pp"},
			result: "oo",
		},
		{
			input:  []string{"apple", "pie", "apple", "red", "red", "red"},
			result: "red",
		},
	}

	for _, test := range tests {
		result := ItemCounter(test.input)

		if !reflect.DeepEqual(result, test.result) {
			t.Errorf("ArrayMode(%v) FAILED. Expected %v, got %v", test.input, test.result, result)
		} else {
			t.Logf("ArrayMode(%v) PASSED. Expected %v, got %v", test.input, test.result, result)
		}

	}
}
