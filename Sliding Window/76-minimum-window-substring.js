```
Difficulty: Hard

前置知识
Sliding Window
哈希表

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

A substring is a contiguous sequence of characters within the string.
给你一个字符串 S、一个字符串 T 。请你设计一种算法，可以在 O(n) 的时间复杂度内，从字符串 S 里面找出：包含 T 所有字符的最小子串。

示例：

输入：S = "ADOBECODEBANC", T = "ABC"
输出："BANC"

提示：

如果 S 中不存这样的子串，则返回空字符串 ""。
如果 S 中存在这样的子串，我们保证它是唯一的答案。
```;
/*
* 思路
读完该题，是否发现和前一天的题目有些类似呢，前一天的那个说法叫异位词，今天这个直接说包含 T 的所有字符，意思其实是一样的，那不一样的在哪呢？
  -这次的窗口长度并不固定为 T 的长度，实际窗口大小是 ≥T.length 的
  -这次输出的是最小子串，也就是长度最小的子串，因此我们要维护一个 min，代表当前符合要求的子串长度，遇到更短的，则进行更新。

针对上面的，我们开始分析讲义中所讲的滑窗流程的核心三步，在分析之前，再贴一遍简单的伪代码：
-------------------
while 右边界 < 合法条件：
  # 右边界扩张
  window右边界+1
  更新状态信息
  # 左边界收缩
  while 符合收缩条件：
    window左边界+1
    更新状态信息
-----------------
按上边的模版一步步分析：

右边界<合法条件：条件自然是 right 不能超过字符串长度
  -右端 add：将当前字符加入窗口
  -更新 update：当前加入窗口的字符是否 match 了 T 的字符集，match 了则更新状态（这里需要注意的是，如果当前 match 的字符已经够了，则只更新哈希表中的状态而不更新 match 计数器）
  -循环左端 delete，目的是尽量缩短窗口大小达到题目最小的要求：符合收缩条件的前提自然是当前已经 match 了 T 的所有字符，然后不断缩小窗口，移除左端字符。
    --更新 update：当前移除的字符若在 T 字符集中则要更新状态，方式同上。

记得记录一下最短子串对应窗口的左右指针方便后续返回结果。

复杂度分析
时间复杂度：O(N + K)O(N+K)，N 为 S 串长度，K 为 T 串长度
空间复杂度：O(S)O(S)，其中 S 为 T 字符集元素个数

------
用哈希表统计t 字符串字母的频率
用滑动窗口的right， 扩大右边界直到找到所有字母, 同时更新match和字母的频率
压缩left边界， 更新答案长度的字符串
------
*/
/*
 * from other ppl
 */
var minWindow = function (s, t) {
	let l = 0,
		r = 0;
	const map = new Map();
	let res = '';

	// 创建 t 子串的 map
	for (const k of t) {
		if (map.has(k)) map.set(k, map.get(k) + 1);
		else map.set(k, 1);
	}

	let minSize = map.size;

	// 1. 对 map 中的出现的 key 进行相减， 出现值为 0 时，表示当前字母的种类 -1
	// 2. 更新 res
	// 3. 尝试缩小左侧指针
	while (r < s.length) {
		const c = s[r];
		if (map.has(c)) map.set(c, map.get(c) - 1);
		if (map.get(c) === 0) minSize -= 1;

		while (minSize === 0) {
			const _res = s.slice(l, r + 1);
			if (!res.length || _res.length < res.length) res = _res;

			// 尝试减小左侧结果
			const cl = s[l];
			if (map.has(cl)) {
				map.set(cl, map.get(cl) + 1);
				if (map.get(cl) === 1) minSize += 1;
			}
			l += 1;
		}
		r += 1;
	}

	return res;
};

/*
 * solution 2 from leetcode, 68ms
 */
var minWindow = function (s, t) {
	let dict = new Array(128).fill(0);
	let count = 0;
	for (let i = 0; i < t.length; i++) {
		dict[t[i].charCodeAt(0)]++;
		count++;
	}

	let left = 0,
		right = 0;
	let min = Number.MAX_VALUE;
	let i = null,
		j = null;
	while (right < s.length) {
		if (dict[s[right].charCodeAt(0)]-- > 0) {
			count--;
		}
		while (count == 0) {
			if (right - left + 1 < min) {
				min = right - left + 1;
				i = left;
				j = right;
			}
			if (++dict[s[left].charCodeAt(0)] > 0) {
				count++;
			}
			left++;
		}
		right++;
	}
	return min == Number.MAX_VALUE ? '' : s.substring(i, j + 1);
};

/*
 * solution 3 from leetcode, 72 ms
 */
var minWindow = function (s, t) {
	let windowStart = 0;
	let subStrStart = 0;
	let matched = 0;
	let minLength = s.length + 1;
	const charFreq = {};

	for (let i = 0; i < t.length; i++) {
		const c = t[i];
		if (!(c in charFreq)) {
			charFreq[c] = 0;
		}
		charFreq[c] += 1;
	}

	for (let i = 0; i < s.length; i++) {
		const rightChar = s[i];
		if (rightChar in charFreq) {
			charFreq[rightChar]--;
			if (charFreq[rightChar] >= 0) {
				matched++;
			}
		}

		// shrink window if we can, finish as soon as we remove a matched character
		while (matched === t.length) {
			if (minLength > i - windowStart + 1) {
				// update minLength if current window is smaller
				minLength = i - windowStart + 1;
				subStrStart = windowStart;
			}

			const leftChar = s[windowStart];
			windowStart++;
			if (leftChar in charFreq) {
				// Note that we could have redundant matching characters, therefore we'll decrement the
				// matched count only when a useful occurrence of a matched character is going out of                   // the window
				if (charFreq[leftChar] === 0) {
					matched--;
				}
				// add back character to charFreq
				charFreq[leftChar]++;
			}
		}
	}

	// no match found
	if (minLength > s.length) return '';

	return s.substring(subStrStart, subStrStart + minLength);
};
/*
 * solution 4 from leetcode, 76 ms
 */
const minWindow = function (s, t) {
	//corner case check input valid or not
	if (s == null || t == null || s.length < t.length) return '';

	//because contains lower and uppercase
	const hash = new Array(265).fill(0);
	//store t into hash
	for (let i = 0; i < t.length; i++) {
		hash[t.charCodeAt(i)]++;
	}

	let left = 0,
		count = 0,
		max = s.length + 1;
	let res = '';
	for (let right = 0; right < s.length; right++) {
		//update hash
		hash[s.charCodeAt(right)]--;

		//check valid
		if (hash[s.charCodeAt(right)] >= 0) count++;

		//move left
		//keep removing uncessary
		while (left < right && hash[s.charCodeAt(left)] < 0) {
			hash[s.charCodeAt(left)]++; //recover
			left++;
		}

		if (count == t.length && max > right - left + 1) {
			max = right - left + 1;
			res = s.substring(left, right + 1);
		}
	}
	return res;
};
/*
 * solution 5 from leetcode, 80 ms
 */
var minWindow = function (str, pattern) {
	let windowStart = 0,
		matched = 0,
		substrStart = 0,
		minLength = str.length + 1,
		charFrequency = {};

	for (i = 0; i < pattern.length; i++) {
		const chr = pattern[i];
		if (!(chr in charFrequency)) {
			charFrequency[chr] = 0;
		}
		charFrequency[chr] += 1;
	}

	// try to extend the range [windowStart, windowEnd]
	for (windowEnd = 0; windowEnd < str.length; windowEnd++) {
		const rightChar = str[windowEnd];
		if (rightChar in charFrequency) {
			charFrequency[rightChar] -= 1;
			if (charFrequency[rightChar] >= 0) {
				// Count every matching of a character
				matched += 1;
			}
		}

		// Shrink the window if we can, finish as soon as we remove a matched character
		while (matched === pattern.length) {
			if (minLength > windowEnd - windowStart + 1) {
				minLength = windowEnd - windowStart + 1;
				substrStart = windowStart;
			}

			const leftChar = str[windowStart];
			windowStart += 1;
			if (leftChar in charFrequency) {
				// Note that we could have redundant matching characters, therefore we'll decrement the
				// matched count only when a useful occurrence of a matched character is going out of the window
				if (charFrequency[leftChar] === 0) {
					matched -= 1;
				}
				charFrequency[leftChar] += 1;
			}
		}
	}

	if (minLength > str.length) {
		return '';
	}
	return str.substring(substrStart, substrStart + minLength);
};

/*
 * solution 6 from leetcode, 96ms
 */
var minWindow = function (s, t) {
	if (s.length < t.length) return '';
	let width = Infinity;
	let start = 0;
	let end = 0;
	let head = 0;
	let count = t.length;
	const map = {};
	for (let i = 0; i < s.length; i++) {
		map[s[i]] = 0;
	}
	for (let i = 0; i < t.length; i++) {
		map[t[i]] = ~~map[t[i]] + 1;
	}
	while (end < s.length) {
		if (map[s[end]] > 0) {
			count--;
		}
		map[s[end]]--;
		end++;
		while (count === 0) {
			if (end - start < width) {
				width = end - start;
				head = start;
			}
			map[s[start]]++;
			if (map[s[start]] > 0) {
				count++;
			}
			start++;
		}
	}
	return width === Infinity ? '' : s.substring(head, head + width);
};
