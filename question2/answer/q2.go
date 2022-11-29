package answer

func Divider(x int) []int {
	if x > 1 {
		return append(Divider(x/2), x)
	}
	return nil
}
