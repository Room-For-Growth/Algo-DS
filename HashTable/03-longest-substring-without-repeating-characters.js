```
给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
Given a string s, find the length of the longest substring without repeating characters.

示例 1:
输入: "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:
输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```;

/*
* solution 1 滑动窗口+哈希表
思路
  - 维护一个滑动窗口，当窗口中的字符不重复时，继续向右扩大窗口。
  - 当遇到重复字符 d 时，将窗口左侧收缩到 d 字符上次出现的位置 + 1。
  - 为了快速找到字符上次出现的位置，我们可以用一个哈希表来记录每个字符最新出现的位置。
  - 在滑动窗口遍历数组的过程中用一个变量记录窗口的最大长度。
复杂度分析
  时间复杂度：$O(N)$，N 为 s 长度。
  空间复杂度：$O(d)$，d 是字符集的大小，但哈希表最大的大小也只是 $O(N)$。

Runtime: 183 ms, faster than 37.75% of JavaScript online submissions
Memory Usage: 44.6 MB, less than 48.32% of JavaScript online submissions
*/

/*
* solution 2 from leetcode, fastest, 68ms

*/
var lengthOfLongestSubstring = function (s) {
	let string = s;
	var max = 0,
		current_string = '',
		i,
		char,
		pos;

	for (i = 0; i < string.length; i += 1) {
		char = string.charAt(i);
		pos = current_string.indexOf(char);
		if (pos !== -1) {
			// cut "dv" to "v" when you see another "d"
			current_string = current_string.substr(pos + 1);
		}
		current_string += char;
		max = Math.max(max, current_string.length);
	}
	return max;
};

/*
* solution 3 from leetcode, 72ms

*/
var lengthOfLongestSubstring = function (s) {
	const memo = new Map();
	let max = 0;
	let i = 0;
	let j = 0;
	while (i < s.length) {
		if (memo.has(s[i])) {
			j = memo.get(s[i]) >= j ? memo.get(s[i]) + 1 : j;
			memo.set(s[i], i);
			max = Math.max(max, i - j + 1);
			i++;
		} else {
			memo.set(s[i], i);
			max = Math.max(max, i - j + 1);
			i++;
		}
	}
	return max;
};

/*
* solution 4 from leetcode, 76ms

*/
var lengthOfLongestSubstring = function (s) {
	var k = 0;
	var maxLength = 0;
	for (i = 0; i < s.length; i++) {
		for (j = k; j < i; j++) {
			if (s[i] === s[j]) {
				k = j + 1;
				break;
			}
		}
		if (i - k + 1 > maxLength) {
			maxLength = i - k + 1;
		}
	}
	return maxLength;
};
/*
* solution 5 from leetcode, 80ms

*/
var lengthOfLongestSubstring = function (s) {
	let longest = '';
	let current = '';
	for (let i = 0; i < s.length; i++) {
		const item = s[i];
		const index = current.indexOf(item);
		if (index !== -1) {
			if (current.length > longest.length) {
				longest = current;
			}
			current = current.slice(index + 1) + item;
		} else {
			current += item;
		}
	}
	if (current.length > longest.length) {
		longest = current;
	}
	return longest.length;
};
