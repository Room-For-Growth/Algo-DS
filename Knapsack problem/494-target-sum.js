```
You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1
```;
/*
* 思路 1: DP

简单理解一下题目就是，我们要从数组中选出一个正数集，然后剩下的数字自动变成了一个负数集，这两个集合的和要刚好等于目标数 S。

换句话说，我们要从原数组中选出一个子集，满足元素的和为 target(这个 target 不是原题中的 S)，只要确定这个 target，剩下就是 0-1 背包问题的套路了。

已知：

正数集 + 负数集 = S
正数集 - 负数集 = sum
sum 是原数组的和。

可得：

正数集 = (S + sum) / 2
所以 (S + sum) / 2 就是我们要找的 target。

复杂度
时间复杂度：$O(len*(sum+S)/2)$，len 是数组长度，sum 是数组元素和，S 是目标数。
空间复杂度：$O((sum+S)/2)$。
*/
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function (nums, S) {
	const sum = nums.reduce((a, b) => a + b, 0);
	if (sum < S) return 0;

	const sumOfPositives = (sum + S) / 2;
	if (sumOfPositives % 1 !== 0) return 0;

	const dp = Array(sumOfPositives + 1).fill(0);
	// target 为 0 时，正数集为空
	// 也就是只有给所有数字都加上 - 号这一种方法
	dp[0] = 1;
	for (const n of nums) {
		for (let i = sumOfPositives; i >= n; i--) {
			dp[i] = dp[i] + dp[i - n];
		}
	}
	return dp[sumOfPositives];
};

/*
* 思路 2: DFS

DFS 枚举所有排列组合，计算组合的和，如果满足和等于 S 则结果++。

复杂度
时间复杂度：$O(2^n)$，n 是数组长度。
空间复杂度：$O(logn)$。
*/
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function (nums, S) {
	const dfs = (nums, i, sum) => {
		if (sum === S && i === nums.length) return 1;
		if (i > nums.length) return 0;
		return dfs(nums, i + 1, sum + nums[i]) + dfs(nums, i + 1, sum - nums[i]);
	};
	return dfs(nums, 0, 0);
};

/*
 * solution 3 from leetcode, 72ms
 */
var findTargetSumWays = function (nums, target) {
	// since all nums are positive,
	// we first check if the sum of nums is larger than the target,
	// if not, then return false,
	// if true, we check how many nums to minus can we get target

	//     const max = nums.reduce((accum, curr) => accum + curr, 0);
	//     if (max < target) return 0;

	//     let ways = 0;

	//     backtrack(0, 0, 1);
	//     backtrack(0, 0, -1);

	//     function backtrack(idx, total, sign) {
	//         // if turning the current num to negative, the total is still larger,
	//         // continue, if not, pause
	//         const num = nums[idx];
	//         const updatedTotal = total + num * sign;

	//         if (idx === nums.length - 1 && updatedTotal === target) ways++;
	//         if (idx + 1 < nums.length){
	//             backtrack(idx + 1, updatedTotal, 1);
	//             backtrack(idx + 1, updatedTotal, -1);
	//         };
	//     }

	//     return ways;
	let sum = nums.reduce((acc, curr) => acc + curr, 0);

	let diff = sum - target;

	if (diff % 2 != 0 || diff < 0) return 0;

	let neg = Math.floor(diff / 2);

	let dp = new Array(neg + 1).fill(0);
	dp[0] = 1;

	for (const num of nums) {
		for (let i = neg; i >= num; i--) {
			dp[i] += dp[i - num];
		}
	}

	return dp[neg];
};

/*
 * solution 4 from leetcode, 80ms
 */
/* 
var findTargetSumWays = function(nums, target) {
  return targetSum(nums, 0, target, 0);
};

var targetSum = function(nums, index, target, sum) {
  if (index === nums.length) {
      if (sum === target) {
          return 1;          
      }
      
      return 0;
  }
  
  var positive = targetSum(nums, index+1, target, sum+nums[index]);
  var negative = targetSum(nums, index+1, target, sum-nums[index]);
  return positive + negative;
};*/

//dp
/*
for the set of values up to some value V in nums:\
  for some target sum S:\
      number of ways to attain S =
          number of ways to attain S without V\
          + number of ways to attain S-V with V
*/
var findTargetSumWays = function (nums, target) {
	var sum = 0;
	nums.forEach(function (num) {
		sum += num;
	});

	if (sum < Math.abs(target) || (target + sum) % 2 == 1) return 0;

	var dp = [1];
	for (var i = 1; i <= (target + sum) / 2; i++) {
		dp[i] = 0;
	}

	nums.forEach(function (num) {
		for (var i = dp.length - 1; i >= num; i--) {
			dp[i] += dp[i - num]; // Crux
		}
	});

	return dp[dp.length - 1];
};

/*
 * solution 5 from leetcode, 84ms
 */
var findTargetSumWays = function (nums, target) {
	/**
	 *   Divide nums into two subsets. One is for positive nums and the other is for negative nums.
	 *   sum(A) - sum(B) = target
	 *   sum(A) = (target + sum(nums)) / 2
	 *
	 *   subproblems => dp[i][j]: # of expressions that evaluate to j with the first i nums
	 *   choices => do or do not add num
	 *   recurrence relation => dp[i][j] = dp[i-1][j-nums[i]] + dp[i-1][j]
	 *
	 */

	let N = nums.length;
	let sum = 0;

	for (let n of nums) {
		sum += n;
	}

	if (sum < target || sum + target < 0 || (sum + target) % 2 === 1) {
		return 0;
	}

	let t = (target + sum) / 2;

	let dp = [...Array(N + 1)].map(() => Array(t + 1).fill(0));

	// base case
	for (let i = 0; i <= N; i++) {
		dp[i][0] = 1;
	}

	for (let i = 1; i <= N; i++) {
		for (let j = 0; j <= t; j++) {
			if (j >= nums[i - 1]) {
				dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]];
			} else {
				dp[i][j] = dp[i - 1][j];
			}
		}
	}

	return dp[N][t];
};

/*
 * solution 6 from others, fastest, 68ms
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
	let total = nums.reduce((a, b) => a + b, 0);
	let diff = total + target;
	if (diff % 2 || diff < 0) {
		return 0;
	}
	diff = diff / 2;
	let dp = Array(diff + 1).fill(0);
	dp[0] = 1;
	for (const n of nums) {
		for (let i = diff; i >= n; i--) {
			dp[i] += dp[i - n];
		}
	}
	return dp[diff];
};
