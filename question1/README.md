# List sorting by number of a's in string

## Problem
Write a function that sorts a bunch of words by the number of
character “a”s within the word (decreasing order). If some words
contain the same amount of character “a”s then you need to sort
those words by their lengths.

## Example
```go
Input :
["aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf", "zc", "lklklklklklklklkl", "l"]
Output :
["aaaasd", "aaabcd", "aab", "a", "lklklklklklklklkl", "cssssssd", "fdz", "ef", "kf", "zc", "l"]
```


## Solution
I decided to go about solving this is by sorting the list by the the strings contianing the most values of a and when the number of a's are equal it sorts by the length

```go
	func Sorter(arr []string) []string {
	search := "a"

	for i := 0; i < len(arr)-1; i++ {
		for j := 0; j < len(arr)-1; j++ {
			//count number of a and sort by most
			if strings.Count(arr[j], search) < strings.Count(arr[j+1], search) {
				swapper(arr, j, j+1)
				//if the number of a's are the same then sort by the length
			} else if strings.Count(arr[j], search) == strings.Count(arr[j+1], search) {
				if len(arr[j]) < len(arr[j+1]) {
					swapper(arr, j, j+1)
				}
			}
		}
	}
	return arr
}
```
All the string not containing an a value returned 0, thus they were only needed to be sorted by their lengths 

### Swapper
The swapper funtion takes an array and two indexes and swaps the values. 

```go
func swapper(arr []string, v1 int, v2 int) {
	arr[v1], arr[v2] = arr[v2], arr[v1]
}
```