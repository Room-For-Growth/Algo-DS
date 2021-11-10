```
In the "100 game" two players take turns adding, to a running total, any integer from 1 to 10. The player who first causes the running total to reach or exceed 100 wins.

What if we change the game so that players cannot re-use integers?

For example, two players might take turns drawing from a common pool of numbers from 1 to 15 without replacement until they reach a total >= 100.

Given two integers maxChoosableInteger and desiredTotal, return true if the first player to move can force a win, otherwise, return false. Assume both players play optimally.


Example 1:

Input: maxChoosableInteger = 10, desiredTotal = 11
Output: false
Explanation:
No matter which integer the first player choose, the first player will lose.
The first player can choose an integer from 1 up to 10.
If the first player choose 1, the second player can only choose integers from 2 up to 10.
The second player will win by choosing 10 and get a total = 11, which is >= desiredTotal.
Same with other integers chosen by the first player, the second player will always win.

Example 2:

Input: maxChoosableInteger = 10, desiredTotal = 0
Output: true

Example 3:

Input: maxChoosableInteger = 10, desiredTotal = 1
Output: true
```;
/*
* 思路1：暴力解法（超时）
两种特殊情况
首先考虑两种特殊情况，后面所有的解法这两种特殊情况都适用，因此不再赘述。

如果 desiredTotal 是小于等于 maxChoosableInteger 的，直接返回 True，这不难理解。

如果 [1, maxChoosableInteger] 全部数字之和小于 desiredTotal，谁都无法赢，返回 False。

一般情况
考虑完了特殊情况，我们继续思考一般情况。

首先我们来简化一下问题， 如果数字可以随便选呢？这个问题就简单多了，和爬楼梯没啥区别。这里考虑暴力求解，使用 DFS + 模拟的方式来解决。

注意到每次可选的数字都不变，都是 [1, maxChoosableInteger] ，因此无需通过参数传递。或者你想传递的话，把引用往下传也是可以的。
这里的 [1, maxChoosableInteger] 指的是一个左右闭合的区间。

-------------------------------------------
* 思路2：动态规划（状态压缩 + 回溯）
*/

/*
 * solution 1 from leetcode, fastest, 268ms
 */
/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
	let dp = Array(1 << maxChoosableInteger).fill(-1),
		sum = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;

	if (sum < desiredTotal) return false;
	else if (desiredTotal === 0) return true;

	const find = (valueState, target) => {
		if (dp[valueState] !== -1) return dp[valueState];

		if (target > 0)
			for (let i = 0; i < maxChoosableInteger; i++)
				if (
					!(valueState & (1 << i)) &&
					!find(valueState | (1 << i), target - i - 1)
				)
					return (dp[valueState] = true);

		return (dp[valueState] = false);
	};

	return find(0, desiredTotal);
};

/*
 * solution 2 from leetcode, slow, 524ms
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
	var sum = (maxChoosableInteger * (maxChoosableInteger + 1)) >> 1;

	if (sum < desiredTotal) {
		return false;
	}

	if (desiredTotal <= 0) {
		return true;
	}

	var cache = new Map();
	var used = [];

	return canIWinMemo(maxChoosableInteger, 0, desiredTotal, used, cache, 0);
};

var canIWinMemo = (
	maxChoosableInteger,
	totalTillNow,
	desiredTotal,
	used,
	memo,
	bitmap
) => {
	if (totalTillNow >= desiredTotal) {
		return false;
	} else {
		if (!memo.has(bitmap)) {
			var status = false;
			for (let i = 1; i <= maxChoosableInteger; i++) {
				if (!used[i]) {
					used[i] = true;
					status = !canIWinMemo(
						maxChoosableInteger,
						totalTillNow + i,
						desiredTotal,
						used,
						memo,
						bitmap | (1 << i)
					);

					used[i] = false;
				}

				if (status) {
					break;
				}
			}
			memo.set(bitmap, status);
		}

		return memo.get(bitmap);
	}
};

/*
 * solution 3 from online
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
	// 直接获胜
	if (maxChoosableInteger >= desiredTotal) return true;
	// 全部拿完也无法到达
	var sum = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;
	if (desiredTotal > sum) return false;
	// 记忆化
	var dp = {};
	/**
	 * @param {number} total 剩余的数量
	 * @param {number} state 使用二进制位表示抽过的状态
	 */
	function f(total, state) {
		// 有缓存
		if (dp[state] !== undefined) return dp[state];
		for (var i = 1; i <= maxChoosableInteger; i++) {
			var curr = 1 << i;
			// 已经抽过这个数
			if (curr & state) continue;
			// 直接获胜
			if (i >= total) return (dp[state] = true);
			// 可以让对方输
			if (!f(total - i, state | curr)) return (dp[state] = true);
		}
		// 没有任何让对方输的方法
		return (dp[state] = false);
	}
	return f(desiredTotal, 0);
};
