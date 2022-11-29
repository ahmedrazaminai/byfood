# Algorithm

## Problem
Write a recursive function which takes one integer parameter.  Please bear in mind that finding the algorithm needed to generate the output below is the main point of the question. Please do not ask which algorithm to use.


## Example
```go
Input: 9
Output:
2
4
9

Input: 10
Output:
2
5
10

Input: 24
Output:
3
6
12
24
```



## Solution
Using the examples, I formulated an equation for the algorithm, Tn > 1 = (n/2) ↓≈ 1.0 <br> 
When dividing an int resulting in a float, the value is automatically rounded down returning the new int value.
To achive the result I made a resursive function that divides the input value by 2 if the value equals greater than 1 else returns the value 


```go
func Divider(x int) []int {
	if x > 1 {
		return append(Divider(x/2), x)
	}
	return nil
}
```