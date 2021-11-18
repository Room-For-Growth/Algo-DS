```
ALSO Dynamic Programming

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0

Example 4:
Input: coins = [1], amount = 1
Output: 1

Example 5:
Input: coins = [1], amount = 2
Output: 2
```;

/*
 * solution 1 from leetcode, 80ms
 */
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
	// coins.sort((a, b) => { return b-a })
	// return start(coins, amount, 0)
	return minCoins(coins, coins.length, amount);
};

function minCoins(coins, m, V) {
	// table[i] will be storing
	// the minimum number of coins
	// required for i value. So
	// table[V] will have result
	let table = new Array(V + 1);
	for (let i = 0; i < V + 1; i++) {
		table[i] = 0;
	}

	// Initialize all table values as Infinite
	for (let i = 1; i <= V; i++) {
		table[i] = Number.MAX_VALUE;
	}
	// Compute minimum coins required for all
	// values from 1 to V
	for (let i = 1; i <= V; i++) {
		// Go through all coins smaller than i
		for (let j = 0; j < m; j++)
			if (coins[j] <= i) {
				let sub_res = table[i - coins[j]];
				if (sub_res != Number.MAX_VALUE && sub_res + 1 < table[i])
					table[i] = sub_res + 1;
			}
	}

	if (table[V] == Number.MAX_VALUE) return -1;

	return table[V];
}

/*
 * solution 2 from leetcode, 84ms

* 思路
以输入 coins = [1, 2, 5], amount = 11 为例，

假设我们先选了第一枚硬币 1，那子问题就变成了 coins = [1, 2, 5], amount = (11 - 1)，我们只要求出这个子问题的最优解，也就能求出原题的最优解。

但假如我们是先选了第二枚硬币，那子问题就变成了 coins = [1, 2, 5], amount = (11 - 2)。

由于我们并不确定先选哪枚硬币可以得到最优解，所以需要每枚硬币都试一次。
for (const coin of coins) {
  假设我们先拿了面值为 coin 的硬币，
  接下来求总金额为 amount - coin 时问题的最优解
}

另外我们用一个一维数组 dp 来记录问题的解，dp[i] 表示总金额为 i 时兑换零钱所需最少硬币个数。

前面已经提到过子问题是什么了。当总金额为 i 的时候，如果我们选了面值为 coin 的硬币，那问题就变成了求总金额为 i - coin 时的最优解，得到这个解再加上 1 (当前选的这枚硬币)就是总金额为 i 时问题的最优解。
dp[i] = dp[i - coin] + 1;

如果不选眼前这枚硬币，那就更简单了，要兑换零钱的总金额还是 i。
dp[i] = dp[i];

因为是求最优解，所以我们也要从这两种情况中选择最优解。
dp[i] = min(dp[i - coin] + 1, dp[i]);

因为总金额为零时不需要零钱，所以 dp[0] = 0，接着我们就可以自底向上地填充 dp 数组了。

* 复杂度
时间复杂度：$O(coins*amount)$，coins 是硬币种数。
空间复杂度：$O(amount)$。
 */

/* var coinChange = function (coins, amount) {
	// this problem can be solved by dp
	// smallest base case is when the amount is 0 then coins will be 0
	// also we know that we can use a coin when a coin is less than or equal to amount
	let dp = new Array(amount + 1).fill(Infinity);
	dp[0] = 0;
	for (let i = 0; i < coins.length; i++) {
		for (let j = coins[i]; j < dp.length; j++) {
			dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
		}
	}
	if (dp[amount] === Infinity) return -1;
	return dp[amount];
}; */

/* 
* 思路：
1.用硬币凑到amount，就是从0元，一直累加到amount元的过程。
2.可以创建一个dp数组，长度是amount + 1，用它的索引表示金额，dp[i]存储的是凑到金额i所需的最小硬币数量。
3.对于金额i，我们需要把coins中的硬币都试一次，也就是从金额i - coins[j]，用1个coins[j]面额的硬币凑过来。
4.状态转移方程：dp[i] = Math.min(dp[i], dp[i - coin] + 1);。 */

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
	// 兑换的金额是amount，因此需要从0开始递推到amount
	// 由于要计算的是最小值，因此初始化为Infinity，避免计算错误
	let dp = new Array(amount + 1).fill(Infinity);
	dp[0] = 0; // 金额为0时，硬币数为0，用于第一次使用硬币

	// 从1开始才会累计硬币个数
	for (let i = 1; i < dp.length; i++) {
		// 需要计算各种硬币的组合情况
		for (const coin of coins) {
			// 向前查找硬币的使用情况，当前金额是由金额i - coin加上coin而来，需要至少保证金额大于0
			// i - coin === 0 时，是第一次使用当前硬币
			if (i - coin >= 0) {
				// 如果要凑成当前金额，例如11，它可能的是由10+1，9+2，6+5组合而成
				dp[i] = Math.min(
					dp[i], // 表示已存储了之前所有硬币组合的最小值
					// 表示当前硬币组合的硬币个数
					// 当前硬币个数，是由金额i - coin加上一个coin硬币而来
					// 因此数量就是dp[i - coin]的硬币数加1
					dp[i - coin] + 1
				);
			}
		}
	}

	// 如果硬币无法凑成所需金额，就会出现从amount向前查找任意硬币金额都只能找到Infinity的情况
	// 因此最后一位必然还是Infinity
	return dp[amount] === Infinity ? -1 : dp[amount];
};
