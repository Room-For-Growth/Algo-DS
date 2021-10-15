```
在一个小镇里，按从 1 到 n 为 n 个人进行编号。传言称，这些人中有一个是小镇上的秘密法官。

如果小镇的法官真的存在，那么：

小镇的法官不相信任何人。
每个人（除了小镇法官外）都信任小镇的法官。
只有一个人同时满足条件 1 和条件 2 。

给定数组 trust，该数组由信任对 trust[i] = [a, b] 组成，表示编号为 a 的人信任编号为 b 的人。

如果小镇存在秘密法官并且可以确定他的身份，请返回该法官的编号。否则，返回 -1。

 

示例 1：

输入：n = 2, trust = [[1,2]]
输出：2


示例 2：

输入：n = 3, trust = [[1,3],[2,3]]
输出：3


示例 3：

输入：n = 3, trust = [[1,3],[2,3],[3,1]]
输出：-1


示例 4：

输入：n = 3, trust = [[1,2],[2,3]]
输出：-1


示例 5：

输入：n = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]]
输出：3

 

提示：

1 <= n <= 1000
0 <= trust.length <= 104
trust[i].length == 2
trust[i] 互不相同
trust[i][0] != trust[i][1]
1 <= trust[i][0], trust[i][1] <= n
```;

/*
解题思路
信任关系可以用有向图来表示。每个顶点表示不同的人，每条边表示信任关系，从表示信任的人到被信任的人。因为法官不相信任何人，而每个人都信任法官，所以法官的入度为n-1，出度为0。找到这样条件的顶点即可。
*/

/*
将信任关系转化为有向图，找出出度为0，入度为n-1的关系
*/

/*
- 定义两个数组: arr1 存每个人相信几个人, arr2 存每个人被多少人相信
- 法官条件:相信 0 人, 被 n-1 人相信

时间复杂度：O(n)
空间复杂度：O(n)
*/
var findJudge = function (n, trust) {
	const arr1 = new Array(n).fill(0);
	const arr2 = new Array(n).fill(0);
	for (let i = 0; i < trust.length; i++) {
		const t = trust[i];
		arr1[t[0] - 1]++;
		arr2[t[1] - 1]++;
	}
	for (let i = 0; i < n; i++) {
		if (arr1[i] == 0 && arr2[i] == n - 1) {
			return i + 1;
		}
	}
	return -1;
};

/*
 * solution from leetcode, fastest, 88ms
 */
var findJudge = function (n, trust) {
	let inOut = Array(n + 1).fill(0);
	for (let i = 0; i < trust.length; i++) {
		let current = trust[i];
		inOut[current[0]]--;
		inOut[current[1]]++;
	}
	for (let i = 1; i <= n; i++) {
		if (inOut[i] === n - 1) {
			return i;
		}
	}
	return -1;
};

/*
 * solution from leetcode, 96ms
 */
var findJudge = function (n, trust) {
	let trustCounts = new Array(n + 1).fill(0);
	for (let [a, b] of trust) {
		trustCounts[a] = trustCounts[a] - 1;
		trustCounts[b] = trustCounts[b] + 1;
	}

	for (let i = 1; i < trustCounts.length; i++) {
		if (trustCounts[i] === n - 1) {
			return i;
		}
	}
	return -1;
};

/*

*/
var findJudge = function (n, trust) {
	if (!trust.length && n === 1) return 1;
	const citizens = new Set();
	const trusted = {};
	let judge = -1;

	for (person of trust) {
		citizens.add(person[0]);
		if (trusted[person[1]]) trusted[person[1]]++;
		else trusted[person[1]] = 1;
	}

	for (let i = 1; i <= n; i++) {
		if (!citizens.has(i) && trusted[i] === n - 1) judge = i;
	}

	return judge;
};
