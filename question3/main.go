package main

import (
	"example/byfood_q3/answer"
	"fmt"
)

func main() {
	arr := []string{"apple", "pie", "apple", "red", "red", "red"}
	fmt.Printf("%s", answer.ItemCounter(arr))
}
