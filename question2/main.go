package main

import (
	"example/byfood_q2/answer"
	"fmt"
)

func main() {
	for _, v := range answer.Divider(9) {
		fmt.Println(v)
	}
}
