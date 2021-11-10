```
Difficulty: Medium 

给定一个字符串 s 和一个非空字符串 p，找到 s 中所有是 p 的字母异位词的子串，返回这些子串的起始索引。

字符串只包含小写英文字母，并且字符串 s 和 p 的长度都不超过 20100。

说明：

字母异位词指字母相同，但排列不同的字符串。
不考虑答案输出的顺序。
示例 1:

输入:
s: "cbaebabacd" p: "abc"

输出:
[0, 6]

解释:
起始索引等于 0 的子串是 "cba", 它是 "abc" 的字母异位词。
起始索引等于 6 的子串是 "bac", 它是 "abc" 的字母异位词。
 示例 2:

输入:
s: "abab" p: "ab"

输出:
[0, 1, 2]

解释:
起始索引等于 0 的子串是 "ab", 它是 "ab" 的字母异位词。
起始索引等于 1 的子串是 "ba", 它是 "ab" 的字母异位词。
起始索引等于 2 的子串是 "ab", 它是 "ab" 的字母异位词。

前置知识
  Sliding Window
  哈希表

思路
1. 暴力题解
2. 来分析一下，首先题中说找到 s 中所有是 p 的字母异位词的字串，就这句话，就包含了如下两个重要信息：
  -找到符合要求的子串长度都是 p
  -何为字母异位词？也就是我们不关心 p 这个串的顺序，只关心字母是否出现以及出现的次数，这种问题解决方案一般有两种，一种是利用排序强制顺序，另一种就是用哈希表的方法。

这么一抽象，是不是和昨天那个题很相似呢？那么问题的关键就是：
  -如何构建滑窗
  -如何更新状态，也即如何存储 p 串及更新窗口信息

  针对问题 1 很容易，因为是长度固定为 p 的滑动窗口，而针对如何存储 p 串这个问题，我们可以考虑用桶来装，这个桶既可以用 26 个元素的数组（作用其实也是哈希表）也可以用哈希表

那么我们解决方案就很明朗了：
  -初始化个滑窗
  -不断移动该固定窗口，并用一个 rest 变量来记录剩余待匹配字符的个数
  -只要当前窗口符合要求，即把窗口左指针下标添加到结果集合中去。
```;
/*
 * solution 1 from leetcode, 80ms
 */
const asscii = 'a'.charCodeAt();

var findAnagrams = function (s, p) {
	//corner case
	if (s.length < p.length) return [];

	const hash = new Array(26).fill(0);
	for (let i = 0; i < p.length; i++) {
		hash[p.charCodeAt(i) - asscii]++;
	}

	const res = [];
	let left = 0,
		count = 0;

	for (let right = 0; right < s.length; right++) {
		hash[s.charCodeAt(right) - asscii]--;
		if (hash[s.charCodeAt(right) - asscii] >= 0) count++;

		if (right > p.length - 1) {
			hash[s.charCodeAt(left) - asscii]++;
			if (hash[s.charCodeAt(left) - asscii] > 0) {
				count--;
			}
			left++;
		}
		if (count == p.length) res.push(left);
	}
	return res;
};

/*
 * solution 2 from leetcode, 84 ms
 */
var findAnagrams = function (s, p) {
	var arr = new Array(26).fill(0);

	for (let i = 0; i < p.length; i++) {
		arr[p.charAt(i).charCodeAt() - 'a'.charCodeAt()]++;
	}

	var left = 0,
		right = 0,
		count = p.length;

	var result = [];

	while (right < s.length) {
		let rch = s.charAt(right).charCodeAt() - 'a'.charCodeAt();

		if (arr[rch] >= 1) {
			count--;
		}

		arr[rch]--;
		right++;

		if (count === 0) {
			result.push(left);
		}

		if (right - left === p.length) {
			let lch = s.charAt(left).charCodeAt() - 'a'.charCodeAt();
			if (arr[lch] >= 0) {
				count++;
			}

			arr[lch]++;
			left++;
		}
	}

	return result;
};
/*
 * solution 3 from leetcode, 88 ms
 */
var findAnagrams = function (s, p) {
	let sArr = new Array(26).fill(0);
	let pArr = new Array(26).fill(0);

	let result = [];

	for (let i = 0; i < p.length; i++) {
		let index = p.charCodeAt(i) % 26;
		pArr[index]++;
	}
	for (let i = 0; i < s.length; i++) {
		let index = s.charCodeAt(i) % 26;
		sArr[index]++;

		if (i > p.length - 1) {
			let headIdx = s.charCodeAt(i - p.length) % 26;
			sArr[headIdx]--;
		}
		if (i >= p.length - 1) {
			if (arrayValues(sArr, pArr)) result.push(i - (p.length - 1));
		}
	}

	return result;
};

const arrayValues = (arr1, arr2) => {
	for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
	return true;
};
/*
 * solution 4 from leetcode, 92 ms
 */
var findAnagrams = function (s, p) {
	const result = [];
	const hash = new Map();
	let left = 0;
	let right = 0;
	let count = 0;

	if (!s || !p) {
		return result;
	}

	for (let i = 0; i < p.length; i++) {
		hash.set(p[i], (hash.get(p[i]) || 0) + 1);
		count++;
	}

	while (right < s.length) {
		if (hash.get(s[right]) >= 1) {
			count--;
		}

		hash.set(s[right], hash.get(s[right]) - 1);
		right++;

		if (count === 0) {
			result.push(left);
		}

		if (right - left === p.length) {
			if (hash.get(s[left]) >= 0) {
				count++;
			}
			hash.set(s[left], hash.get(s[left]) + 1);
			left++;
		}
	}

	return result;
};
