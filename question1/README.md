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
I decided to go about solving this by using the sort.Slice function to sort the array of strings in descending order based on the number of occurrences of 'a's in each string, and for strings with the same count of 'a's I further sort them based on their length in descending order.

```go
func Sorter(arr []string) []string {
	sort.Slice(arr, func(i, j int) bool {
		istring := strings.Count(arr[i], "a")
		jstring := strings.Count(arr[j], "a")

		return istring > jstring || (istring == jstring && len(arr[i]) > len(arr[j]))
	})
	return arr
}
```