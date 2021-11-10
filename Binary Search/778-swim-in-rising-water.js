```
Difficulty: HARD

在一个 N x N 的坐标方格  grid 中，每一个方格的值 grid[i][j] 表示在位置 (i,j) 的平台高度。

现在开始下雨了。当时间为  t  时，此时雨水导致水池中任意位置的水位为  t 。你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。

你从坐标方格的左上平台 (0，0) 出发。最少耗时多久你才能到达坐标方格的右下平台  (N-1, N-1)？

You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point (i, j).

The rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.

Return the least time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).

示例 1:

输入: [[0,2],[1,3]]
输出: 3
解释:
时间为 0 时，你位于坐标方格的位置为 (0, 0)。
此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。

等时间到达 3 时，你才可以游向平台 (1, 1). 因为此时的水位是 3，坐标方格中的平台没有比水位 3 更高的，所以你可以游向坐标方格中的任意位置

示例 2:

输入: [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
输出: 16
解释:
0 1 2 3 4
24 23 22 21 5
12 13 14 15 16
11 17 18 19 20
10 9 8 7 6

最终的路线用加粗进行了标记。
我们必须等到时间为 16，此时才能保证平台 (0, 0) 和 (4, 4) 是连通的

提示:

2 <= N <= 50.
grid[i][j] 位于区间 [0, ..., N*N - 1] 内。
```;
/*
*思路
二分查找在 CP 中的一个常见应用是二分答案。在这一类题目中，我们往往需要求出满足条件的最大值或最小值。如果这一取值和条件的成立与否之间满足有序性，我们就可以通过对整个定义域进行二分查找，来找到我们需要的最值。

很明显，这道题的答案是一个连续的空间，从 0 到 max(grid)，其中 max(grid) 表示 grid 中的最大值。

因此一个简单的思路是一个个试。实际上，如果 x 不可以，那么小于 x 的所有值都是不可以的，这正是本题的突破口。基于此，我们可使用讲义中的最左二分模板解决。
*/
/*
* 二分法模板 伪代码
def test(x):
    pass
while l <= r:
    mid = (l + r) // 2
    if test(mid, 0, 0):
        r = mid - 1
    else:
        l = mid + 1
return l
*/

/*
* Notes
-Binary Search and DFS

-Use binary search to find the left most value of t when can swim to the destination, which means for value t, there is a path from start point to the destination that all the values of the grids in the path are <= t

-The range for binary search is [0, n * n - 1], because in the problem requirement : 0 <= grid[i][j] < n^2

-Use DFS to check whether there is a path from start point to the destination for each t

-The start point of DFS is grid[0][0], check four directions and recursively call the DFS method for each neighbor

-Details:
  -need to create a int[][] directions to easily get the neighbors on four directions
  -need to maintain a boolean[][] visited to trim the possibilities
  -need to check whether the new grid is valid (in the grid[][] scope) before validating on other conditions to avoid out of bounds exception
*/
/*
 * solution 1 from leetcode, 72ms
 */
var swimInWater = function (grid) {
	const values = [];
	for (let i = 0; i < grid.length; i++) {
		values.push(new Array(grid[i].length));
	}

	values[0][0] = grid[0][0];
	let squares = [[0, 0]];
	while (squares.length) {
		const newSquares = [];
		squares.forEach(([i, j]) => {
			const thisSquareValue = values[i][j];
			if (i > 0) {
				const adjSquareValue = Math.max(grid[i - 1][j], thisSquareValue);
				if (
					values[i - 1][j] === undefined ||
					adjSquareValue < values[i - 1][j]
				) {
					values[i - 1][j] = adjSquareValue;
					newSquares.push([i - 1, j]);
				}
			}

			if (i < grid.length - 1) {
				const adjSquareValue = Math.max(grid[i + 1][j], thisSquareValue);
				if (
					values[i + 1][j] === undefined ||
					adjSquareValue < values[i + 1][j]
				) {
					values[i + 1][j] = adjSquareValue;
					newSquares.push([i + 1, j]);
				}
			}

			if (j > 0) {
				const adjSquareValue = Math.max(grid[i][j - 1], thisSquareValue);
				if (
					values[i][j - 1] === undefined ||
					adjSquareValue < values[i][j - 1]
				) {
					values[i][j - 1] = adjSquareValue;
					newSquares.push([i, j - 1]);
				}
			}

			if (j < grid[i].length - 1) {
				const adjSquareValue = Math.max(grid[i][j + 1], thisSquareValue);
				if (
					values[i][j + 1] === undefined ||
					adjSquareValue < values[i][j + 1]
				) {
					values[i][j + 1] = adjSquareValue;
					newSquares.push([i, j + 1]);
				}
			}
		});
		squares = newSquares;
	}

	return values[values.length - 1][values[values.length - 1].length - 1];
};
/*
 * solution 2 from leetcode, 80ms
 */
var swimInWater = function (grid) {
	let low = grid[0][0],
		n = grid.length,
		high = n * n;

	while (low < high) {
		let visited = [];

		for (let row = 0; row < n; row++) {
			visited.push(new Array(n).fill('0'));
		}

		let mid = low + Math.floor((high - low) / 2);
		if (dfs(grid, 0, 0, mid, visited)) high = mid;
		else low = mid + 1;
	}

	return low;
};

function dfs(grid, i, j, time, visited) {
	let n = grid.length;

	if (
		i >= n ||
		j >= n ||
		i < 0 ||
		j < 0 ||
		visited[i][j] == 1 ||
		grid[i][j] > time
	)
		return false;

	visited[i][j] = 1;

	if (i == n - 1 && j == n - 1) return true;

	return (
		dfs(grid, i - 1, j, time, visited) ||
		dfs(grid, i, j + 1, time, visited) ||
		dfs(grid, i, j - 1, time, visited) ||
		dfs(grid, i + 1, j, time, visited)
	);
}
/*

*/
var swimInWater = function (grid) {
	let N = grid.length;

	const DIRECTIONS = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];

	let left = 0;
	let right = N * N - 1;

	const inArea = (x, y) => {
		return x >= 0 && x < N && y >= 0 && y < N;
	};

	const dfs = (x, y, visited, threshold) => {
		visited[x][y] = true;
		for (let i = 0; i < DIRECTIONS.length; i++) {
			const direction = DIRECTIONS[i];
			const newX = x + direction[0];
			const newY = y + direction[1];
			if (
				inArea(newX, newY) &&
				!visited[newX][newY] &&
				grid[newX][newY] <= threshold
			) {
				if (newX == N - 1 && newY == N - 1) {
					return true;
				}

				if (dfs(newX, newY, visited, threshold)) {
					return true;
				}
			}
		}
		return false;
	};

	while (left < right) {
		// left + right 不会溢出
		let mid = Math.floor((left + right) / 2);
		const visited = Array(N)
			.fill()
			.map(() => Array(N).fill(false));
		if (grid[0][0] <= mid && dfs(0, 0, visited, mid)) {
			// mid 可以，尝试 mid 小一点是不是也可以呢？下一轮搜索的区间 [left, mid]
			right = mid;
		} else {
			left = mid + 1;
		}
	}
	return left;
};
