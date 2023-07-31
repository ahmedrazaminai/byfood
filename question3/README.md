# Find most common string in list

## Problem
Write a function which takes one parameter as an array/list.  Find most repeated data within a given array.  Test with different datasets.

## Example
```go
Input : ["apple","pie","apple","red","red","red"]
Output : "red"
```

## Solution
I turned the array into a string, then sorted the array by the number of occurances of each item and returned the first item in the sorted array.

```go
func ItemCounter(arr []string) string {
	// join the array into a string
	s := strings.Join(arr, ", ")

	// sort the array by the number of each item
	sort.Slice(arr, func(i, j int) bool {
		return dict[arr[i]] > dict[arr[j]]
	})

	// return the first item
	return arr[0]
}
```