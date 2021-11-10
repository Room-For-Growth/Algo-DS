```
https://binarysearch.com/problems/Number-of-Operations-to-Decrement-Target-to-Zero

You are given a list of positive integers nums and an integer target. Consider an operation where we remove a number v from either the front or the back of nums and decrement target by v.

Return the minimum number of operations required to decrement target to zero. If it's not possible, return -1.

Constraints

n ≤ 100,000 where n is the length of nums
Example 1
Input
nums = [3, 1, 1, 2, 5, 1, 1]
target = 7
Output
3
Explanation
We can remove 1, 1 and 5 from the back to decrement target to zero.

Example 2
Input
nums = [2, 4]
target = 7
Output
-1
Explanation
There's no way to decrement target = 7 to zero.

前置知识：二分法，滑动窗口
similar problems:https://leetcode-cn.com/problems/maximum-points-you-can-obtain-from-cards/
difficulty: medium
```;
/*
* 思路
这道题的意思是给你一个数组，你只可以移除数组两端的数。求最小移除次数，使得移除的数字和为 target。

我们可以反向思考，删除和为 target 的若干数字等价于保留若干和为 sum(A) - target 的数。这样问题就转化为 求连续子数组和为 sum(A) - target 的最长子数组。这种问题可以使用滑动窗口来解决。
*注意抽象后的问题有“连续”关键字，就应该想到可能会用到滑动窗口优化。具体能不能用再根据题目信息做二次判断。

* 复杂度分析
令 n 为数组长度。
时间复杂度：O(n)O(n)
空间复杂度：1
*/
/*
 * solution 1 from online
find the longest subarray that sum up to sum(nums)-target
 */
class Solution {
	solve(nums, target) {
		// Get the sum of array
		let sum = 0;
		for (let num of nums) {
			sum += num;
		}
		// Edge cases
		if (sum < target) {
			return -1;
		} else if (sum === target) {
			return nums.length;
		}
		// target sum of window
		let targetSum = sum - target;
		// sliding window to find the longest sub array
		// find the starting left point
		let left = 0;
		while (nums[left] > targetSum) {
			left++;
			if (left == nums.length) {
				return -1;
			}
		}
		let right = left;
		let curSum = nums[left];
		let result = Math.pow(10, 1000);
		// move the window
		while (right < nums.length) {
			if (curSum == targetSum) {
				result =
					result > nums.length - (right - left + 1)
						? nums.length - (right - left + 1)
						: result;
				curSum -= nums[left];
				left++;
			} else if (curSum > targetSum) {
				curSum -= nums[left];
				left++;
			} else if (curSum < targetSum) {
				right++;
				if (right == nums.length) {
					return result == Math.pow(10, 1000) ? -1 : result;
				} else {
					curSum += nums[right];
				}
				if (left > right) {
					right = left;
					if (right == nums.length) {
						return -1;
					} else {
						curSum += nums[right];
					}
				}
			}
		}
	}
}

/*
 * solution 2 from online
 */
var minOperations = function (nums, x) {
	let sum = 0;
	for (let i of nums) {
		sum += i;
	}
	if (sum < x) return -1;
	if (sum === x) return nums.length;

	let left = 0;
	let curSum = 0;
	let target = sum - x;
	let ans = Number.MAX_SAFE_INTEGER;
	for (let i = 0; i < nums.length; i++) {
		curSum += nums[i];
		while (curSum >= target) {
			if (curSum === target) {
				ans = Math.min(ans, nums.length - 1 - i + left);
			}
			curSum -= nums[left++];
		}
	}
	return ans === Number.MAX_SAFE_INTEGER ? -1 : ans;
};

/*
 * solution 3 from online
 */
function solves(nums, target) {
	const sum = nums.reduce((a, b) => a + b);
	const newTarget = sum - target;
	if (newTarget == 0) return nums.length;
	let left = (right = 0);
	let newSum = 0;
	let res = 0;
	while (right < nums.length) {
		newSum += nums[right];

		while (newSum >= newTarget && right > left) {
			if (newSum === newTarget) {
				res = Math.max(res, right - left + 1);
			}
			newSum -= nums[left];
			left++;
		}
		right++;
	}
	return res == 0 ? '' : nums.length - res;
}
/*
 * solution 4 from online
时间复杂度 O(n)
空间复杂度 O(1)
 */
const minOperations = function (nums, x) {
	let len = nums.length,
		best = 0;
	for (let i = 1; i < len; i++) nums[i] += nums[i - 1];
	let y = nums[len - 1] - x;
	if (y < 0) return -1;
	if (y === 0) return len;
	for (let i = -1, j = (l = 0); i < len - best && l <= x; l = nums[++i]) {
		while (nums[j] - l < y) j++;
		if (nums[j] - l === y) best = Math.max(best, j - i);
	}
	return best > 0 ? len - best : -1;
};
