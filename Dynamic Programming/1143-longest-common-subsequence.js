```
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.

```;
/*
* 思路
LCS（最长公共子序列） 系列我写过专题，非常详细了，大家可以参考一下。地址：https://lucifer.ren/blog/2020/07/01/LCS/

当然最长上升子序列问题我也讲过了，大家一起复习。地址：https://lucifer.ren/blog/2020/06/20/LIS/

* 关键点解析: dp 建模套路
*/
/*
* solution from online, faster than 90%, 100ms
time: O(m*n)
space: O(m*n)
*/
const longestCommonSubsequence = function (text1, text2) {
	const len1 = text1.length;
	const len2 = text2.length;
	const dp = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));
	for (let i = 1; i <= len1; i++) {
		for (let j = 1; j <= len2; j++) {
			dp[i][j] =
				text1[i - 1] === text2[j - 1]
					? dp[i - 1][j - 1] + 1
					: Math.max(dp[i - 1][j], dp[i][j - 1]);
		}
	}
	return dp[len1][len2];
};

/*
 * solution 2 from leetcode, fastest, 68ms
 */
var longestCommonSubsequence = function (text1, text2) {
	let dp = Array(text1.length + 1);
	for (let i = 0; i < dp.length; i++) {
		dp[i] = Array(text2.length + 1);
		dp[i][0] = 0;
	}
	dp[0].fill(0);
	for (let i = 1; i <= text1.length; i++) {
		for (let j = 1; j <= text2.length; j++) {
			const i1 = i - 1;
			const j1 = j - 1;
			if (text1.charAt(i1) === text2.charAt(j1)) {
				dp[i][j] = dp[i1][j1] + 1;
			} else {
				dp[i][j] = Math.max(dp[i1][j], dp[i][j1]);
			}
		}
	}
	return dp[text1.length][text2.length];
};

/*
 * solution 3 from leetcode, 72ms
 */
var longestCommonSubsequence = function (text1, text2) {
	const m = text1.length,
		n = text2.length;
	const dp = new Uint16Array(m);
	for (let i = 0; i < n; i++) {
		let previous = 0;
		for (let j = 0; j < m; j++) {
			if (text1[j] == text2[i]) {
				[dp[j], previous] = [previous + 1, dp[j]];
			} else {
				previous = dp[j];
				dp[j] = j > 0 ? Math.max(dp[j], dp[j - 1]) : dp[j];
			}
		}
	}
	return dp[m - 1];
};
/*
 * solution 4 from leetcode, 80ms
 */
// https://www.youtube.com/watch?v=NnD96abizww
var longestCommonSubsequence = function (text1, text2) {
	let len1 = text1.length;
	let len2 = text2.length;
	let pre_val = 0;
	let dp = new Array(len2 + 1).fill(0);
	for (let i = 1; i <= len1; i++) {
		pre_val = 0;
		for (let j = 1; j <= len2; j++) {
			const cur_val = dp[j];
			dp[j] = Math.max(
				dp[j],
				dp[j - 1],
				pre_val + (text1[i - 1] === text2[j - 1])
			);
			pre_val = cur_val;
		}
	}
	return dp[len2];
};

``` JavaScript
var longestCommonSubsequence = function (text1, text2) {
	// create a 2d array and fill with zeroes; we want extra column and row
	let dp = [];
	let m = text1.length;
	let n = text2.length;
	for (let i = 0; i <= m; i++) {
		dp[i] = new Array(n + 1).fill(0);
	}

	for (let i = 1; i <= m; i++) {
		for (let j = 1; j <= n; j++) {
			if (text1.charAt(i - 1) === text2.charAt(j - 1)) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
			} else {
				dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
			}
		}
	}
	return dp[m][n];
};
```;
