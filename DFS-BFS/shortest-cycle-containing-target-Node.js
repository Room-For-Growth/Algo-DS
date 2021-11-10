`
https://binarysearch.com/problems/Shortest-Cycle-Containing-Target-Node
You are given a two-dimensional list of integers graph representing a directed graph as an adjacency list. You are also given an integer target.

Return the length of a shortest cycle that contains target. If a solution does not exist, return -1.

Constraints

n, m ≤ 250 where n and m are the number of rows and columns in graph
前置知识：BFS
标签：BFS，反向搜索
`;

/*
* 思路
题目大意是给你一个邻接矩阵表示的图，让你返回最短的环，如果没有环则返回 -1。

回想一下，我们遍历图的时候是如何防止环的产生的？通常是使用一个集合 visited，记录已经访问过的节点。每次遇到一个新的节点，我们都检查其是否在 visited 中存在。如果存在，我们就不再进行处理（跳过），这样就避免了环的影响。

因此检测环的存在也是一样的思路。我们也可使用一个集合记录访问过的节点。如果再次访问到了已经访问过的节点，那么说明有环。

同时为了记录最短的环，我们不妨进行 BFS，这样当我们遇到一个环的时候，就一定最短的，直接返回 BFS 遍历的层即可，这提示我们使用带层信息的 BFS。而如果使用 dfs，在极端情况下性能会很差。

而题目要求的是返回的最短的 包含 target的环。与其从各个点作为搜索起点，并在检测到环的时候再判断环中是否有 target，我们不妨从 target 开始搜索，这样检测到环就不用判断环中是否有 target 了，这是一个小技巧。 即从题目的 target 开始反向搜索，而不是从起点找到 target。

* 关键点
反向搜索，即从 target 开始搜索。而不是从图中所有的节点开始搜。
*/

/*
* solution 1 from others
* Idea
BFS
Starting from the target node, we increase result by 1 each time we visit its next node
Also use a set so that we don't visit a node twice
return the result when we visit target again, otherwise -1
Runtime = O(V+E), Space = O(V)
*/
class Solution {
	solve(graph, target) {
		let result = 0;
		let visited = new Set([]);
		let check = [target];
		let length = check.length;
		while (length > 0) {
			result++;
			for (let i = 0; i < length; i++) {
				let vertex = check.shift();
				for (let nextNode of graph[vertex]) {
					if (nextNode === target) {
						return result;
					} else {
						if (!visited.has(nextNode)) {
							visited.add(nextNode);
							check.push(nextNode);
						}
					}
				}
			}
			length = check.length;
		}
		return -1;
	}
}

``` Python
class Solution:
   def solve(self, graph, target):
      visited = set()
      l = [target]
      length = 0

      while l:
         length += 1
         nl = []
         for u in l:
            for v in graph[u]:
               if v == target:
                  return length
               if v in visited:
                  continue
               visited.add(v)
               nl.append(v)
         l = nl

      return -1
```;
