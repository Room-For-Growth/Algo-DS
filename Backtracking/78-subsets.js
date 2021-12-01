```
Array, Backtracking, Bit Manipulation

Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.


Example 1:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:
Input: nums = [0]
Output: [[],[0]]
```;
/*
* solution 1 from 91Algos:

* 分析
这道题第一眼是可以用搜索/回溯来做的，每进行一次搜索就把当前结果存入结果集。这种求子集的类型题其实还有另一种做法：

每个元素有两种状态，拿或者不拿，那么如果一共有NN个数，那就一共有2^N2 
N
 中可能，也就是有这么多个子集（子集包括全集和空集）。既然每一个数只有两种状态，那么我们不妨用一个 bit 来表示。这样题中的[1,2,3]，我们可以看成一个三个比特的组合：

比如 0 0 0 就代表空集，1 1 1 就代表全集， 1 0 0 就代表[1] (可正可反)。这样我们就可以进行位操作，0 - 2^n - 10−2 
n
 −1的数的二进制数位为 1 的位置，就把对应的元素填入集合中。

PS: ((1 << i )& sign) != 0 的意思是用第 i 位是 1 比特与当前 sign 相与，若结果不为 0 就代表第 i 位比是 1

进阶: 用回溯解法解决该问题

* 复杂度分析
令 N 为数组长度
时间复杂度：O( N * 2^N)
空间复杂度：O(N)，最长子集为整个数组长，不考虑返回结果。
*/
var subsets = function (nums) {
	const ans = [];
	const n = nums.length;
	for (let mask = 0; mask < 1 << n; ++mask) {
		const t = [];
		for (let i = 0; i < n; ++i) {
			if (mask & (1 << i)) {
				t.push(nums[i]);
			}
		}
		ans.push(t);
	}
	return ans;
};

/*
 * solution 2 from leetcode, 52ms, fastest
 */
var subsets = function (nums) {
	function ric(arr, res, i) {
		if (i <= arr.length) {
			if (!a.includes(res)) {
				a.push(res);
			}
			//x.add(res)
		} else {
			return;
		}

		ric(arr, [...res, arr[i]], i + 1);
		ric(arr, res, i + 1);
	}
	let x = new Set(),
		a = [];
	ric(nums, [], 0);
	return a;
};

/*
 * solution 3 from leetcode, 60ms
 */
var subsets = function (nums) {
	let result = [];

	const gen = (arr, idx) => {
		result.push(arr);
		for (let i = idx; i < nums.length; i++) {
			gen([...arr, nums[i]], i + 1);
		}
	};

	gen([], 0);

	return result;
};

/*
 * solution 4 with methods, 70ms
 */
var subsets = function (nums) {
	let result = [[]];

	nums.forEach((num) => {
		result = result.concat(result.map((arr) => [...arr, num]));
	});

	return result;
};

/*
 * solution 5 from leetcode, 80ms
 */
var subsets = function (nums) {
	let result = [[]];

	function backtrack(first, current) {
		// we iterate over the indexes i from 'first' to the length
		//of the entire sequence 'nums'
		for (let i = first; i < nums.length; i++) {
			current.push(nums[i]);

			// use distructure operator to clone 'current' value and save to 'result'
			result.push([...current]);

			// generate all other subsets for the current subset.
			// increasing the position by one to avoid duplicates in 'result'
			backtrack(i + 1, current);

			// BACKTRACK.
			current.pop();
		}
	}

	backtrack(0, []);
	return result;
};
