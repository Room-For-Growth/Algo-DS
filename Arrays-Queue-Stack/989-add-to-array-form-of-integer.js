```
数组形式的整数加法:
(https://leetcode.com/problems/add-to-array-form-of-integer/)
Difficulty: **Easy**  

对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。

给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。

The array-form of an integer num is an array representing its digits in left to right order.

   For example, for num = 1321, the array form is [1,3,2,1].

Given num, the array-form of an integer, and an integer k, return _the array-form of the integer_ num + k.
 

示例 1：
输入：A = [1,2,0,0], K = 34
输出：[1,2,3,4]
解释：1200 + 34 = 1234

示例 2：
输入：A = [9,9,9,9,9,9,9,9,9,9], K = 1
输出：[1,0,0,0,0,0,0,0,0,0,0]
解释：9999999999 + 1 = 10000000000

```;
/*
Similar Questions

Medium
https://leetcode.com/problems/add-two-numbers/

Easy
https://leetcode.com/problems/plus-one/
https://leetcode.com/problems/add-binary/
https://leetcode.com/problems/add-strings/
 */

// solution 1:
const addToArrayForm = (numArr, k) => {
	if (numArr.length < 1) return [];

	//convert numArr to string integer
	let numArrString = numArr.join('');
	// convert the string integer into number
	let num = BigInt(numArrString) + BigInt(k);

	//convert the number to array of strings
	let strArr = num.toString().split('');

	//convert it back to integer
	return strArr.map((i) => parseInt(i));
};

//let arr = [1, 2, 0, 0];
let arr2 = [1, 2, 6, 3, 0, 7, 1, 7, 1, 9, 7, 5, 6, 6, 4, 4, 0, 0, 6, 3];
//console.log(addToArrayForm(arr, 34));
console.log(addToArrayForm(arr2, 516));
/*
Runtime: 385 ms, faster than 5.26% of JavaScript online submissions for Add to Array-Form of Integer.
Memory Usage: 44.7 MB, less than 58.25% of JavaScript online submissions for Add to Array-Form of Integer.
 */

//solution 2:
/**
while ( A 没完 || B 没完)
    A 的当前位
    B 的当前位

    和 = A 的当前位 + B 的当前位 + 进位carry

    当前位 = 和 % 10;
    进位 = 和 / 10;

判断还有进位吗

 */
const addToArrayForm = function (num, k) {
	const ret = [];
	let i = num.length - 1,
		carry = 0;
	while (i >= 0 || k != 0) {
		let x = i >= 0 ? num[i] : 0;
		let y = k !== 0 ? k % 10 : 0;

		const sum = x + y + carry;

		ret.push(sum % 10);
		carry = Math.floor(sum / 10);

		i--;
		k = Math.floor(k / 10);
	}
	if (carry) {
		ret.push(carry);
	}
	return ret.reverse();
};
/*
Runtime: 197 ms, faster than 22.81% of JavaScript online submissions for Add to Array-Form of Integer.
Memory Usage: 45.5 MB, less than 31.23% of JavaScript online submissions for Add to Array-Form of Integer.
*/
// time complexity: O(n)
// space complexity: O(n)
