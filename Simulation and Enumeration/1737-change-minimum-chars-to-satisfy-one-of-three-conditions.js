```
给你两个字符串 a 和 b ，二者均由小写字母组成。一步操作中，你可以将 a 或 b 中的 任一字符 改变为 任一小写字母 。

操作的最终目标是满足下列三个条件 之一 ：

a 中的 每个字母 在字母表中 严格小于 b 中的 每个字母 。
b 中的 每个字母 在字母表中 严格小于 a 中的 每个字母 。
a 和 b 都 由 同一个 字母组成。
返回达成目标所需的 最少 操作数。

You are given two strings a and b that consist of lowercase letters. In one operation, you can change any character in a or b to any lowercase letter.

Your goal is to satisfy one of the following three conditions:

Every letter in a is strictly less than every letter in b in the alphabet.
Every letter in b is strictly less than every letter in a in the alphabet.
Both a and b consist of only one distinct letter.
Return the minimum number of operations needed to achieve your goal.

Example 1:

Input: a = "aba", b = "caa"
Output: 2
Explanation: Consider the best way to make each condition true:
1) Change b to "ccc" in 2 operations, then every letter in a is less than every letter in b.
2) Change a to "bbb" and b to "aaa" in 3 operations, then every letter in b is less than every letter in a.
3) Change a to "aaa" and b to "aaa" in 2 operations, then a and b consist of one distinct letter.
The best way was done in 2 operations (either condition 1 or condition 3).

Example 2:

Input: a = "dabadd", b = "cda"
Output: 3
Explanation: The best way is to make condition 1 true by changing b to "eee".
 

Constraints:

1 <= a.length, b.length <= 105
a and b consist only of lowercase letters.
```;

/*
* 前置知识: 计数, 枚举
* 思路

三个条件中，前两个条件其实是一样的，因为如果你会了其中一个，那么你只需要将 A 和 B 交换位置就可以解出另外一个了。

对于前两个条件来说，我们可以枚举所有可能。以条件一 A 中的 每个字母 在字母表中 严格小于 B 中的 每个字母 为例。我们要做的就是枚举所有可能的 A 的最大字母 和 B 的最小字母（其中 A 的最大字母保证严格小于 B 的最大字母），并计算操作数，最后取最小值即可。

代码上，我们需要先统计 A 和 B 的字符出现次数信息，不妨分别记为 counter_A 和 counter_B。接下来，我们就可以执行核心的枚举逻辑了。

而对于第三个条件，则比较简单，我们只需要将 A 和 B 改为同一个字母，并计算出操作数，取最小值即可。我们可能修改成的字母一共只有 26 种可能，因此直接枚举即可。

* 关键点
  - 使用一个长度为 26 的数组计数不仅性能比哈希表好，并且在这里代码书写会更简单
*/

/*
 * solution 1, from leetcode, fastest 96ms
 */
var minCharacters = function (a, b) {
	const aCode = 97;
	function getInfo(s) {
		const len = s.length;
		const table = new Array(26).fill(0);

		for (let i = 0; i < len; i++) {
			const code = s.charCodeAt(i);
			const offset = code - aCode;
			table[offset]++;
		}

		const countSF = new Array(26);
		countSF[-1] = 0;
		for (const [i, count] of table.entries()) {
			countSF[i] = count + countSF[-1 + i];
		}

		return { len, countSF, table };
	}

	// how many steps to make A < B
	function getChangeSize(infoA, infoB) {
		const { len: lenA, countSF: countSFA } = infoA;
		const { len: lenB, countSF: countSFB } = infoB;

		let result = Infinity;
		for (let offset = 0; offset < 25; offset++) {
			const stepsA = lenA - countSFA[offset];
			const stepsB = countSFB[offset];

			let outcome = stepsA + stepsB;
			result = Math.min(result, outcome);
		}

		return result;
	}

	const infoA = getInfo(a),
		infoB = getInfo(b);
	let resultA2B = getChangeSize(infoA, infoB);
	let resultB2A = getChangeSize(infoB, infoA);

	const maxCountA = Math.max(...infoA.table);
	const maxCountB = Math.max(...infoB.table);
	const stepsA = infoA.len - maxCountA;
	const stepsB = infoB.len - maxCountB;
	let resultUnique = stepsA + stepsB;

	let result = Math.min(resultA2B, resultB2A, resultUnique);
	return result;
};
