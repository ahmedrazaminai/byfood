# Find most common string in list

## Problem
Write a function which takes one parameter as an array/list.  Find most repeated data within a given array.  Test with different datasets.

## Example
```go
Input : ["apple","pie","apple","red","red","red"]
Output : "red"
```

## Solution
I turned the array into a string using `strings.Join()` and used `strings.Count()` to count each string in the array and decendingly sorted the array according to the number of occurces each string and returned the fist value of the new sorted array.

```go
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
```