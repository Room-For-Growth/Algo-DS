```
给定一个二叉树，找出其最大深度。
二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

Given the root of a binary tree, return its maximum depth.
A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

    3
   / \
  9  20
    /  \
   15   7
返回它的最大深度 3 。
```;

/*
* solution 1: recussion
思路
递归地分别计算出左子树和右子树的高度，取最大值加一，就是当前二叉树的最大深度。

假设我们已经计算出了左子树的最大深度是 1，右子树的最大深度是 2，那整棵二叉树的的最大深度就是左右子树最大深度的最大值加上根节点，也就是 3。
接下来我们只需要递归地去计算左右子树的高度：

1. base condition: 首先在递归中很重要的事情就是找到递归的出口，在这道题目中，明显能想到的出口是：
    - 当遍历到叶子节点的时候：if not root.left and not root.right，这时候我们需要 return 1。
    - 还有一种情况是，当前遍历的节点为 null，这时候我们只需要 return 0 就好了。
2. 如果当前节点有左子树，需要递归计算左子树的高度 leftHeight = maxDepth(root.left)。
3. 如果当前节点有右子树，需要递归计算右子树的高度 rightHeight = maxDepth(root.right)。
4. 取左右子树最大高度的最大值，加上当前节点返回 max(leftHeight, rightHeight) + 1 即可。

复杂度分析
时间复杂度：$O(N)$，N 为二叉树的节点数，因为每个节点都只遍历一次。
空间复杂度：$O(N)$，递归栈的空间。
*/
const maxDepth = (root) => {
	if (!root) return 0;
	if (!root.left && !root.right) return 1;
	return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};

/*
*solution 2 from leetcode faster 


*/

const maxDepth = (root) => {
	let max = 0;

	const helper = (root, i) => {
		if (!root) return 0;

		max = Math.max(i + 1, max);

		helper(root.left, i + 1);
		helper(root.right, i + 1);
	};
	helper(root, 0);
	return max;
};

/*
*solution 3 循环+队列
思路

我们还可以用层级遍历的方法来找到二叉树的最大高度，一层层地遍历二叉树，每遍历一层，height 加一。
  1. 记录当前这一层有多少个节点 nodeCount，当 nodeCount 等于 0 的时候，当前层遍历结束，height++，继续遍历下一层；
  2. 当下一层的节点数为 0 的时候，停止遍历，返回 height；

复杂度分析
时间复杂度：$O(N)$，因为每个节点都分别入列出列一次，入列和出列操作的时间复杂度都是 $O(1)$，所以总的时间复杂度是 $O(2N)$，也就是 $O(N)$。
空间复杂度：$O(h)$

新建一个队列来存放遍历的节点
把 root 推入队列
初始化 height 为 0

重复以下步骤：
  记录当前层级的节点数 nodeCount (即队列中的节点数)

  if nodeCount === 0: return height // 二叉树遍历结束
  height++

  // 遍历当前层级的每个节点
  while nodeCount > 0:
    出列一个节点，将它的左右子节点入列
    nodeCount--
  // 当前层级遍历结束，此时队列中的是下一层的节点
*/
var maxDepth = function (root) {
	if (!root) return 0;

	let height = 0;
	const queue = [root];

	while (queue.length) {
		let len = queue.length;
		height++;

		while (len > 0) {
			const node = queue.shift();
			node.left && queue.push(node.left);
			node.right && queue.push(node.right);
			len--;
		}
	}

	return height;
};

/*
*solution 4


*/

/*
*solution 5


*/
