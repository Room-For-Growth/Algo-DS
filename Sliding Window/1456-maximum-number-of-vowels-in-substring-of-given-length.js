```
难度：中等
给你字符串 s 和整数 k 。
请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
英文中的 元音字母 为（a, e, i, o, u）。

示例 1：

输入：s = "abciiidef", k = 3
输出：3
解释：子字符串 "iii" 包含 3 个元音字母。

示例 2：
输入：s = "aeiou", k = 2
输出：2
解释：任意长度为 2 的子字符串都包含 2 个元音字母。

示例 3：
输入：s = "leetcode", k = 3
输出：2
解释："lee"、"eet" 和 "ode" 都包含 2 个元音字母。

示例 4：
输入：s = "rhythms", k = 4
输出：0
解释：字符串 s 中不含任何元音字母。

示例 5：
输入：s = "tryhard", k = 4
输出：1


提示：

1 <= s.length <= 10^5
s 由小写英文字母组成
1 <= k <= s.length

前置知识:
滑动窗口
哈希表
```;
/*
 * 91答案

复杂度分析
时间复杂度：O(n)O(n)，n 为字串长度
空间复杂度：O(1)O(1)
https://github.com/azl397985856/leetcode/blob/master/thinkings/slide-window.md

思路
-拿这个题作为本专题第一道滑动窗口练手题再合适不过了，题目直观清晰。
  -元音字母有五个，为了避免我们总要写 if 啊 switch 啊这种，我们可以用个哈希表来存着方便后续查找是否存在。
  -题目要求我们找出所有 k 长度子串中可能包含的最大元音字母数，那我们遍历一边所有长度为 k 的子串不就知道啦 

很直观，但是提交会发现 TLE 了，我们也不难发现复杂度为O((N - K + 1) * K)O((N−K+1)∗K)，有什么优化方法呢？其实也容易想到：
-利用前缀和，只不过我们前缀和数组元素 i 存的是子串 0..i 的元音字母个数，这样再遍历一遍前缀和数组就可以求出结果 → 前缀和方案（有兴趣可以自行实现）
-其实我们完全没有必要去构建这个前缀和数组，我们维护一个窗口大小为 k 的滑窗即可，每移动一次可以归纳为：
  -窗口左端弹出一个字符（删除步）
  -若删除了元音则计数器-1（更新步）
  -窗口右端加进来一个字符（添加步）
  -若添加的字符是元音则计数器+1（更新步）

  */
var maxVowels = function (s, k) {
	const dict = new Set(['a', 'e', 'i', 'o', 'u']);
	let ret = 0;
	for (let i = 0; i < k; i++) {
		if (dict.has(s[i])) ret++;
	}

	let temp = ret;
	for (let i = k, j = 0; i < s.length; i++, j++) {
		if (dict.has(s[i])) temp++;
		if (dict.has(s[j])) temp--;

		ret = Math.max(temp, ret);
	}

	return ret;
};

/*
 * solution 1 from leetcode, 72ms
 */
const maxVowels = (s, k) => {
	const BASE = 97;
	const weight = 1065233; // 1 + (1 << 4) + (1 << 8) + (1 << 14) + (1 << 20);
	let max = 0;
	for (let i = 0; i < k; ++i) {
		max += (weight >> (s.charCodeAt(i) - BASE)) & 1;
	}
	for (let i = 0, cur = max; i < s.length - k; ++i) {
		cur +=
			((weight >> (s.charCodeAt(i + k) - BASE)) & 1) -
			((weight >> (s.charCodeAt(i) - BASE)) & 1);
		cur > max && (max = cur);
	}
	return max;
};

/*
 * solution 2 from leetcode, 84ms
 */
var maxVowels = function (s, k) {
	let count = 0;
	let p1 = 0;
	let p2 = k - 1;
	let result = 0;

	for (let i = 0; i < k - 1; i++) {
		if (isVowel(s[i])) {
			count++;
		}
	}

	while (p2 < s.length) {
		if (isVowel(s[p2])) {
			count++;
		}
		result = Math.max(count, result);
		if (isVowel(s[p1])) {
			count--;
		}
		p2++;
		p1++;
	}

	return result;
};

function isVowel(char) {
	if (
		char === 'a' ||
		char === 'e' ||
		char === 'i' ||
		char === 'o' ||
		char === 'u'
	) {
		return true;
	}
	return false;
}

/*
 * solution 3 from leetcode, 92ms
 */
var maxVowels = function (s, k) {
	let n = Array(1).fill('aeiou'.indexOf(s[0]) >= 0 ? 1 : 0);
	for (let i = 1; i < s.length; i++) {
		if ('aeiou'.indexOf(s[i]) >= 0) n[i] = n[i - 1] + 1;
		else n[i] = n[i - 1];
	}
	let max = n[k - 1];
	for (let i = k; i < n.length; i++) {
		if (n[i] - n[i - k] > max) max = n[i] - n[i - k];
	}
	return max;
};

/*
 * solution 4 from leetcode, 100ms
 */
var maxVowels = function (s, k) {
	const wowels = new Set(['a', 'e', 'i', 'o', 'u']);
	let max = 0,
		wowelsCount = 0;
	for (let i = 0; i < k; i++) {
		if (wowels.has(s[i])) wowelsCount++;
	}

	max = wowelsCount;

	for (let i = k; i < s.length; i++) {
		if (max === k) return max;
		wowelsCount += (wowels.has(s[i]) ? 1 : 0) - (wowels.has(s[i - k]) ? 1 : 0);
		max = Math.max(max, wowelsCount);
	}

	// T: O(n)
	// S: O(1)
	return max;
};
