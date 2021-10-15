```
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]


```;
/*
* solution 1
* HashMap

*/

const twoSum = (nums, target) => {
	const map = new Map();
	for (let i = 0; i < nums.length; i++) {
		const diff = target - nums[i];
		if (map.has(diff)) {
			return [map.get(diff), i];
		}
		map.set(nums[i], i);
	}
};

/*
 * solution 2 from leetcode, fastest, 48 ms
 */
var twoSum = function (nums, target) {
	lookUp = {};
	for (count in nums) {
		let n = nums[count];
		if (lookUp[target - n]) {
			return [count, lookUp[target - n]];
		}
		lookUp[n] = count;
	}
};

/*
 * solution 3 from leetcode, 52 ms
 */
var twoSum = function (nums, target) {
	let hash = {};

	for (let i = 0; i < nums.length; i++) {
		if (hash[target - nums[i]] !== undefined) {
			return [hash[target - nums[i]], i];
		}
		hash[nums[i]] = i;
	}
	return [];
};
