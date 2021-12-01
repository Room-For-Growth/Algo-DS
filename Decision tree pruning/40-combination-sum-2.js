```
Related Topics: Array, Backtracking
前置知识: 剪枝,数组,回溯

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]

Example 2:
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
]

Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
```;
/*
* soulution1: Using Backtracking, 76ms, faster than 95%
Find all the subsets and if the target is reached, add to the result.

Time Complexity = O(n * 2^n)
Space Complexity = O(n)

时间复杂度：在最坏的情况下，数组中的每个数都不相同，数组中所有数的和不超过 target，那么每个元素有选和不选两种可能，一共就有 2^n种选择，又因为我们每一个选择，最多需要 O(n) 的时间 push 到结果中。因此一个粗略的时间复杂度上界为 O(N*2^N)，其中 N 是数组长度。更加严格的复杂度意义不大，不再分析。

空间复杂度：递归调用栈的长度不大于target/mintarget/min，同时用于记录路径信息的 list 长度也不大于 target/mintarget/min，因此空间复杂度为 O(target/min)
*/
var combinationSum2 = function (candidates, target) {
	const n = candidates.length;
	const result = [];
	// sort the array, to avoid duplicates by comparing adjacent values
	candidates.sort((a, b) => a - b);

	// find all the subsets with sum equal to target
	findSubsets(0, [], target);
	return result;

	function findSubsets(start, subset, target) {
		if (target < 0) {
			return;
		}
		if (target === 0) {
			result.push([...subset]);
			return;
		}
		for (let idx = start; idx < n; ++idx) {
			if (idx > start && candidates[idx] === candidates[idx - 1]) {
				continue;
			}
			subset.push(candidates[idx]);
			findSubsets(idx + 1, subset, target - candidates[idx]);
			subset.pop();
		}
	}
};

/*
* solution 2, runtime 84ms, faster than 76%
 By sorting the input candidates, we can rely on the candidates s' index and value to avoid 
 duplications by skipping to the next candidate on duplicates as well as terminating 
 the further search early once we found the candidates 
 that sum up to the target value
 
 Time O(2^N)
 Space O(N)
*/

var combinationSum2 = function (candidates, target) {
	let results = [],
		comb = [];
	candidates.sort((a, b) => a - b);
	backtrack(0, 0, comb, results, candidates, target);
	return results;
};

var backtrack = function (start, sum, comb, results, candidates, target) {
	if (sum > target) {
		return;
	}
	if (sum === target) {
		results.push(comb.slice());
		return true;
	}

	for (let i = start; i < candidates.length; i++) {
		let current = candidates[i],
			prev = candidates[i - 1];
		if (i !== start && current === prev) {
			continue;
		}

		comb.push(current);
		sum += current;

		let isSum = backtrack(i + 1, sum, comb, results, candidates, target);

		comb.pop();
		sum -= current;

		if (isSum) {
			break;
		}
	}
};

/*
 * soulution3: This is similar to a 0/1 Knapsack problem.
 */
var combinationSum2 = function (candidates, target) {
	// create a dp array with 2 rows since for each candidate, we check the previous row and add the subsets to the current row
	// so we require only two rows
	const dp = new Array(2)
		.fill(null)
		.map(() => new Array(target + 1).fill(null).map(() => null));
	dp[0][0] = [[]];
	dp[1][0] = [[]];

	// sort the array so that all combinations are ordered in ascending order
	candidates.sort((a, b) => a - b);

	let row, prevRow;
	for (let i = 0; i < candidates.length; ++i) {
		const candidate = candidates[i];
		row = i % 2 === 0 ? 0 : 1;
		prevRow = row === 0 ? 1 : 0;

		for (let j = 1; j <= target; ++j) {
			// add the new subsets with the already discovered subsets, so set it to previous row list
			if (dp[prevRow][j]) {
				dp[row][j] = [...dp[prevRow][j]];
			}
			// if there are subsets with sum `j - candidate`, add the current candidate to all these subsets to form combinations for sum `j`
			if (dp[prevRow][j - candidate]) {
				dp[prevRow][j - candidate].forEach((comb) => {
					const newComb = [...comb].concat(candidate);
					if (!dp[row][j]) {
						dp[row][j] = [];
					}
					// check if the subset does not already exist, if not then add
					if (!doesCombinationExist(dp[row][j], newComb)) {
						dp[row][j].push(newComb);
					}
				});
			}
		}
	}
	return dp[row][target] ? dp[row][target] : [];
};
function doesCombinationExist(combinations, comb) {
	for (let i = 0; i < combinations.length; ++i) {
		const c1 = combinations[i],
			c2 = comb;
		if (c1.length !== c2.length) {
			continue;
		}
		let j = 0;
		while (j < c1.length) {
			if (c1[j] !== c2[j]) {
				break;
			}
			++j;
		}
		if (j === c1.length) {
			return true;
		}
	}
	return false;
}
