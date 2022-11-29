package questionTwo

func Divider(x int) []int {
	if x > 1 {
		return append(Divider(x/2), x)
	}
	return nil
}

// func questionTwo() {
// 	fmt.Println(divider(9))
// }
