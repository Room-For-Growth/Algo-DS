/**
You are given a large integer represented as an integer array digits, where each digits[i] is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

Example 1:

Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.
Incrementing by one gives 123 + 1 = 124.
Thus, the result should be [1,2,4].

Example 2:

Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.
Incrementing by one gives 4321 + 1 = 4322.
Thus, the result should be [4,3,2,2].

Example 3:

Input: digits = [0]
Output: [1]
Explanation: The array represents the integer 0.
Incrementing by one gives 0 + 1 = 1.
Thus, the result should be [1].
Example 4:

Input: digits = [9]
Output: [1,0]
Explanation: The array represents the integer 9.
Incrementing by one gives 9 + 1 = 10.
Thus, the result should be [1,0].

Constraints:

1 <= digits.length <= 100
0 <= digits[i] <= 9
digits does not contain any leading 0's.
*/
/*
思路:

在数组上做竖式加法，用 carry 来表示进位，反向遍历数组即可。

遍历结束条件：
1. 数组所有元素都遍历过了
2. 当 carry 为 0 的时候

需要注意的点：
如果遍历结束后 carry 大于 0，还需要在数组前面补一位。

Time complexity: O(n)
Space complexity: O(1)
*/
const plusOne = (digits) => {
	let carry = 1,
		sum = 0,
		index = digits.length - 1;

	while (carry > 0 && index > -1) {
		sum = digits[index] + 1;
		carry = Math.floor(sum / 10);
		digits[index] = sum % 10;
		index--;
	}

	carry && digits.unshift(carry);

	return digits;
};
