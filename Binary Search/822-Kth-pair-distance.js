``` From Binary Search
https://binarysearch.com/problems/Kth-Pair-Distance
难度：困难
本题类似于 Leetcode 719. 找出第 k 小的距离对
区别在于:
本题的k是0-indexed的, 即k从0开始算。
Leetcode 719的k是1-indexed的, 即k从1开始算。

Given a list of integers nums and an integer k, return the k-th (0-indexed) smallest abs(x - y) for every pair of elements (x, y) in nums. Note that (x, y) and (y, x) are considered the same pair.

Constraints

n ≤ 100,000 where n is the length of nums
Example 1
Input
nums = [1, 5, 3, 2]
k = 3
Output
2
Explanation
Here are all the pair distances:

abs(1 - 5) = 4
abs(1 - 3) = 2
abs(1 - 2) = 1
abs(5 - 3) = 2
abs(5 - 2) = 3
abs(3 - 2) = 1
Sorted in ascending order we have [1, 1, 2, 2, 3, 4].
```;
/*
* 二分搜索
思路：
假如将这个第 k 小的距离 (k-th smallest )记作value,
假设我们知道这个value了，能不能通过什么方法判断这个value是取大了，还是取小了？

也就是在所有不同pair的距离组成的数组中，<= value 的有k个;
那么如果value给小了, <= value 将会少于k个; 如果value给大了, <= value 将会多于k个。

也可以反过来看:
如果 <= value 的少于k个, 说明value取小了,
如果 <= value 的多于k个, 说明value取大了。

先sort, 此时value的最大值为nums[N - 1] - nums[0], 最小值可以从0开始。
后面进行二分搜索~
*/

/*
 * 抄答案
 */
const kthPairDistance = function (nums, k) {
	nums.sort((a, b) => a - b);
	let maxDistance = nums[nums.length - 1] - nums[0];
	let distanceCounts = new Array(maxDistance + 1).fill(0);
	for (let i = 1; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			distanceCounts[nums[i] - nums[j]]++;
		}
	}
	let t = 0;
	for (let i = 0; i < distanceCounts.length; i++) {
		t += distanceCounts[i];
		if (t >= k) return i;
	}
};

console.log(kthPairDistance([1, 5, 3, 2], 1));
