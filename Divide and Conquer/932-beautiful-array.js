```
An array nums of length n is beautiful if:

nums is a permutation of the integers in the range [1, n].
For every 0 <= i < j < n, there is no index k with i < k < j where 2 * nums[k] == nums[i] + nums[j].
Given the integer n, return any beautiful array nums of length n. There will be at least one valid answer for the given n.


Example 1:
Input: n = 4
Output: [2,1,4,3]

Example 2:
Input: n = 5
Output: [3,1,2,5,4]
```;
/*
* 解题思路
分治。参考官方题解。因为奇数 + 偶数 = 奇数。因此如果要使得：对于每个i < j，都不存在k满足i < k < j使得A[k] * 2 = A[i] + A[j]成立，我们可以令A[i]和A[j]一个为奇数，另一个为偶数即可。

这里还会用到两个重要性质，用于数组扩张。

性质1：如果数组A是漂亮数组，那么将A中的每一个数x进行kx + b的映射，其仍然为漂亮数组。其中k为不等于0的整数，b为整数。

性质2：如果数组A和B分别是不同奇偶性的漂亮数组，那么将A和B拼接起来仍为漂亮数组。

我们可以用性质1来构建同为奇数，或者同为偶数的漂亮数组。构建时我们先算出在[1, n]中奇数和偶数的个数，然后找到对应大小的漂亮数组进行构造即可。奇数个数为n - n / 2，找到大小为n - n / 2的漂亮数组，每一个元素进行y = 2 * x - 1的转换，即构建好漂亮数组的奇数部分。偶数个数为n / 2，找到大小为n / 2的漂亮数组，每一个元素进行y = 2 * x的变换，即构建好漂亮数组的偶数部分。利用性质2，将利用性质1构建好的奇数漂亮数组和偶数漂亮数组进行拼接，即构成最终大小为n的漂亮数组。

时间复杂度：O(nlogn)
空间复杂度：O(n)
*/

/*
 * solution 1 from leetcode, 72ms
 */
var beautifulArray = function (n) {
	let res = [];
	res.push(1);
	/*
  divide and conquer, why to divide to odd and even part (or merge odd and even part together)?
  that’s say, we have two part: odd = {1, 5, 3}, even = {2, 4, 6}
  
  any number from odd part and any number from even part will alway obey the rule A[k] * 2 != A[i] + A[j]

Ex: 5 from odd part, 6 from even part, for any k between 5 and 6, A[k] * 2 != 5 + 6

So merge two parts will form beautiful array!

odd (n * 2 - 1)  	even (n * 2)
1 (1*2-1)	 	2 (1*2)
1 3(2*2-1)  		2 4(2*2)
1 3 5(3*2-1)  	        2 4 6(3*2)

n = 4
res -> 1
res -> [1, 2]
res -> [1,3,2,4]
  */
	while (res.length < n) {
		let temp = [];
		for (let i = 0; i < res.length; i++) {
			let val = 2 * res[i] - 1;
			if (val <= n) temp.push(val);
		}
		for (let i = 0; i < res.length; i++) {
			let val = 2 * res[i];
			if (val <= n) temp.push(val);
		}
		res = temp;
	}

	return res;
};

/*
 * solution 2 from leetcode, 76ms
 */
var beautifulArray = function (n) {
	return helper(n);

	function helper(n) {
		if (n === 1) return [1];

		const lefts = helper(n >> 1);
		const rights = helper((n >> 1) + (n % 2));

		const res = [];

		for (let i = 0; i < lefts.length; i++) {
			res.push(lefts[i] * 2);
		}

		for (let i = 0; i < rights.length; i++) {
			res.push(rights[i] * 2 - 1);
		}

		return res;
	}
};

/*
 * solution 3 from leetcode, 80ms
 */
var beautifulArray = function (n) {
	const memo = {};
	const f = (n) => {
		if (n in memo) {
			return memo[n];
		}

		const res = new Array(n).fill(0);
		if (n === 1) {
			res[0] = 1;
		} else {
			let t = 0;
			for (const x of f(Math.floor((n + 1) / 2))) {
				res[t++] = 2 * x - 1;
			}
			for (const x of f(Math.floor(n / 2))) {
				res[t++] = 2 * x;
			}
		}
		memo[n] = res;
		return res;
	};

	return f(n);
};
