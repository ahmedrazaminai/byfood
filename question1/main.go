package main

import (
	"example/byfood_q1/answer"
	"fmt"
)

func main() {
	arr := []string{"aaaasd", "a", "aab", "aaabcd", "ef", "cssssssd", "fdz", "kf",
		"zc", "lklklklklklklklkl", "l"}
	fmt.Println(answer.Sorter(arr))
}
