```
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

示例 1:
输入: [1,3,5,6], 5
输出: 2

示例 2:
输入: [1,3,5,6], 2
输出: 1

示例 3:
输入: [1,3,5,6], 7
输出: 4

示例 4:
输入: [1,3,5,6], 0
输出: 0
```;
/*
* solution 1 from leetcode, 52 ms

*/

var searchInsert = function (nums, target) {
	let left = 0;
	let right = nums.length - 1;
	if (nums[0] > target) {
		return 0;
	}
	if (nums[right] < target) {
		return right + 1;
	}
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		if (target === nums[mid]) {
			return mid;
		} else if (target === nums[mid] + 1 && nums[mid + 1] !== target) {
			return mid + 1;
		} else if (target === nums[mid] - 1 && nums[mid - 1] !== target) {
			return mid;
		} else if (target > nums[mid]) {
			left = mid + 1;
		} else if (target < nums[mid]) {
			right = mid - 1;
		}
	}
};

/*
* solution 2 from leetcode, 56 ms

*/
let searchInsert = function (nums, target) {
	let h = nums.length - 1;
	let s = 0;
	let m;

	while (s <= h) {
		m = Math.floor((s + h) / 2);
		if (nums[m] === target) {
			return m;
		} else if (nums[m] > target) {
			h = m - 1;
		} else {
			s = m + 1;
		}
	}

	return nums[m] > target ? m : m + 1;
};

/*
* solution 3 from leetcode, 59 ms

*/
var searchInsert = function (nums, target) {
	let l = 0,
		r = nums.length - 1;

	while (l <= r) {
		let i = l + Math.floor((r - l) / 2);
		let curr = nums[i];
		if (curr === target) return i;

		if (curr < target) {
			l = i + 1;
		} else {
			r = i - 1;
		}
	}

	return l;
};

/*
* solution 4 from leetcode, 60 ms

*/
var searchInsert = function (nums, target) {
	let result = 0;
	nums.forEach((x, i) => {
		if (x === target) {
			return i;
		} else if (x < target) {
			result = i + 1;
		}
	});
	return result;
};
