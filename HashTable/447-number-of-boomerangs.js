```
给定平面上  n 对不同的点，“回旋镖” 是由点表示的元组  (i, j, k) ，其中  i  和  j  之间的距离和  i  和  k  之间的距离相等（需要考虑元组的顺序）。

找到所有回旋镖的数量。你可以假设  n 最大为 500，所有点的坐标在闭区间 [-10000, 10000] 中。

You are given n points in the plane that are all distinct, where points[i] = [xi, yi]. A boomerang is a tuple of points (i, j, k) such that the distance between i and j equals the distance between i and k (the order of the tuple matters).

Return the number of boomerangs.

示例:
输入:
[[0,0],[1,0],[2,0]]

输出:
2

解释:
两个回旋镖为 [[1,0],[0,0],[2,0]] 和 [[1,0],[2,0],[0,0]]
```;
/*
* solution 1 哈希表
根据题意，回旋镖是指，坐标上有三个点 i, j, k，i 到 j 的距离等于 i 到 k 的距离。上图中，蓝色的点到两个橙色的点距离是一样的，所以 (i, j, k) 构成了一个回旋镖，然后其实 (i, k, j) 也构成了一个回旋镖。

其实可以想到，对于每个点，我们只需要将其他点按照距离分组记录，比如上图中的 [1, 1]，跟它距离 $\sqrt[]{2}$ 的点有 [0, 0] 和 [2, 0]。然后再计算排列组合数，也就是对 $\sqrt[]{2}$ 这个距离的分组中的点进行两两排列组合，就可以得出答案了。

如果用哈希表来存，它的结构大概是这样的：
{
    point1: {
        dist1: [point2, point3],
        dist2: [point4]
    },
    point2: {},
}

每个点都维护一个哈希表，哈希表的键是这个点到其他点的距离，值就是在这个距离的点有哪些。

不过题目只要求输出回旋镖的数量，所以我们只需要记录在某个距离的点有几个，并不需要记录具体的坐标，比如 dist1: 2 就可以了。

计算两点距离公式：

  $\sqrt[2]{(x1-x2)^2+(y1-y2)^2}$

不过其实我们只关心距离是否一样，并不关心实际距离是多少，所以实际上不需要开根号。

两两组合数：

  一个集合中有 N 个数，每个数都可以跟其余 N-1 个数进行组合，一共有 $N*(N-1)$ 种组合数。

复杂度分析
  时间复杂度：$O(N^2)$，N 是数组长度。在内层循环中，寻找该点到其他点的距离时间是 $O(N)$，计算组合数的时间是 $O(m)$，m 是每个点到其他点的不同距离总数的最大值，m 最大值是 N-1。所以总的时间是 $O(N*(N+m))$，差不多是 $O(N^2)$。
  空间复杂度：$O(N)$，最坏的情况是每个点到其他点的距离都不一样，那每个哈希表的大小就是 N-1。

  * runtime 928 ms, memory 56.7mb, faster than 30% 
  * Memory Usage: 56.7 MB, less than 60.00% 
*/
/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function (points) {
	let count = 0;

	points.forEach((a, i) => {
		const map = {};

		points.forEach((b, j) => {
			if (a !== b) {
				const dist = calcDistOf2Points(a, b);
				map[dist] = (map[dist] || 0) + 1;
			}
		});

		for (const dist in map) {
			const num = map[dist];
			if (num > 1) count += num * (num - 1);
		}
	});

	return count;

	// ******************************
	function calcDistOf2Points([x1, y1], [x2, y2]) {
		return (x1 - x2) ** 2 + (y1 - y2) ** 2;
	}
};

/*
* solution 2 暴力法
思路
三层循环吧，我就不写了。

复杂度
时间复杂度：$O(N^3)$。
空间复杂度：$O(1)$。
代码
略
*/

/*
* solution 3 from leetcode, fastest, 180ms

*/
var numberOfBoomerangs = function (points) {
	let ans = 0;

	const hash = new Map();

	function getDistance(a, b) {
		const dx = a[0] - b[0];
		const dy = a[1] - b[1];

		return dx * dx + dy * dy;
	}

	points.forEach((curr, index) => {
		for (let i = 0; i < points.length; i++) {
			if (index === i) continue;
			const d = getDistance(curr, points[i]);
			hash.set(d, hash.has(d) ? hash.get(d) + 1 : 1);
		}
		[...hash.values()].forEach((value) => {
			ans += value * (value - 1);
		});
		hash.clear();
	});
	return ans;
};

/*
* solution 4 from leetcode, 204 ms

*/
var numberOfBoomerangs = function (points) {
	if (points.length < 3) return 0;

	let dist = 0,
		res = 0;

	for (let i = 0; i < points.length; i++) {
		const map = new Map();
		for (let j = 0; j < points.length; j++) {
			if (i !== j) {
				dist = getDistance(points[i], points[j]);
				map.set(dist, map.has(dist) ? map.get(dist) + 1 : 1);
			}
		}

		for (let count of map.values()) {
			res += count * (count - 1);
		}
	}

	return res;
};

var getDistance = function (p1, p2) {
	return Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2);
};

/*
* solution 5 from leetcode, 424 ms

*/
var numberOfBoomerangs = function (points) {
	const n = points.length;

	const dists = [];

	for (let i = 0; i < n; i++) {
		const map = new Map();
		const [x1, y1] = points[i];

		for (let j = 0; j < n; j++) {
			if (i === j) continue;

			const [x2, y2] = points[j];

			const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

			if (!map.has(dist)) map.set(dist, 0);
			map.set(dist, map.get(dist) + 1);
		}

		dists[i] = map;
	}

	let res = 0;

	for (let i = 0; i < n; i++) {
		const map = dists[i];

		for (const count of map.values()) {
			res += count * (count - 1);
		}
	}

	return res;
};
