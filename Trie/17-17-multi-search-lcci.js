```
Description
Given a string band an array of smaller strings T, design a method to search b for each small string in T. Output positions of all strings in smalls that appear in big, where positions[i] is all positions of smalls[i].

Example:
Input: 
big = "mississippi"
smalls = ["is","ppi","hi","sis","i","ssippi"]

Output:  [[1,4],[8],[],[3],[1,4,7,10],[5]]

Note:
0 <= len(big) <= 1000
0 <= len(smalls[i]) <= 1000
The total number of characters in smalls will not exceed 100000.
No duplicated strings in smalls.
All characters are lowercase letters.
```;
/*
* 思路
可以用 Trie树来做。

具体步骤有参考suukii的仓库, 代码完全是自己写的~

* 方法: Trie树
把短字符串存到 Trie 中，保证 Trie 的高度尽量的小。
  -以 dictionary 数组构建 Trie，并在结束节点记录每个短串在 dictionary 数组中的下标；
  -遍历 sentence 字符串，截取所有以 longest 为长度的子串(longest 是 dictionary 中最长的单词长度)，拿到 Trie 中去寻找所有匹配的短串，返回所有匹配到的下标，根据下标把当前子串的位置更新到对应的结果数组中。

Trie 的操作：
  -insert: 把单词的 下标 存到最后的节点中
  -search: 需要返回寻找路径中匹配到的所有单词的下标

*/

/*
* 思路
  -通过smalls构建Trie树，遍历big，在前缀树中寻找匹配项。
  -找到完整字符则将当前的「索引i」push进结果集，last为结果集的index。
    -继续向下找，直到匹配不到/big循环完毕
  -如果未能找到则break，进入下一个字符的循环。


* 复杂度分析
时间复杂度 O(N^2) N为big的长度
空间复杂度 O(S) S为所有匹配成功的位置的个数
*/
function TreeNode(val) {
	this.val = val || null;
	this.children = {};
}

/**
 * @param {string} big
 * @param {string[]} smalls
 * @return {number[][]}
 */
var multiSearch = function (big, smalls) {
	const res = smalls.map(() => []);
	if (!big) {
		return res;
	}
	let Tree = new TreeNode();
	let now;
	smalls.forEach((small, index) => {
		now = Tree;
		for (let i = 0; i < small.length; i++) {
			if (!now.children[small[i]]) {
				now.children[small[i]] = new TreeNode(small[i]);
			}
			now = now.children[small[i]];
		}
		now.children['last'] = index;
	});

	for (let i = 0; i < big.length; i++) {
		let now = Tree;
		for (let j = i; j < big.length; j++) {
			if (!now.children[big[j]]) {
				break;
			}
			now = now.children[big[j]];
			if (now.children.last !== undefined) {
				res[now.children.last].push(i);
			}
		}
	}
	return res;
};
