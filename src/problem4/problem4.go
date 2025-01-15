package main

func sum_to_n_a(n int) int {
	// simple for loop, O(n) time, O(1) space
	sum := n
	for i:=1; i<n; i++ {
		sum += i
	}
	return sum
}

func sum_to_n_b(n int) int {
	// math formula for sum of 1 to n, O(1) time and space
	return n*(n+1)/2
}

func sum_to_n_c(n int) int {
	// recursion, O(n) time and space
	if n == 1 {
		return n
	}
	return n + sum_to_n_c(n-1)
}

func main() {
	// test cases
	// println(sum_to_n_a(10))
	// println(sum_to_n_b(10))
	// println(sum_to_n_c(10))
}