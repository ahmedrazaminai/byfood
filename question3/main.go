package main

import (
	"example/byfood_q3/answer"
	"fmt"
)

func main() {
	arr := []string{"blue", "red", "blue", "yellow", "blue", "red", "red"}
	fmt.Printf(answer.ItemCounter(arr))
}
