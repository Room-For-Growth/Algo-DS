```
给定两个二叉树，编写一个函数来检验它们是否相同。
如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

Given the roots of two binary trees p and q, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

示例 1:

输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true
示例 2:

输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false
示例 3:

输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```;

/*
* solution 1 递归

用 lucifer 的《产品经理法》 来解决递归问题。

1. 定义函数功能，先不用管其具体实现。

我们需要一个函数，给定两个二叉树的根节点，返回这两个二叉树是否相同的判断结果。假设我们已经有这个函数 F，那问题就转化为 F(root1, root2) 了。

2. 确定大问题和小问题的关系。
  要解决 F(root1, root2)，明显需要先解决的问题是：
    - F(root1.left, root2.left)
    - F(root1.right, root2.right)
而它们之间的关系也是显而易见的，两个二叉树要相等的话，当然其根节点和左右子节点都要相等，所以：

F(root1, root2) = root1 === root2 && F(root1.left, root2.left) && F(root1.right, root2.right)

3. 补充递归终止条件
    - p, q 不相同的话返回 false
    - p, q 都是 null 的时候返回 true

伪代码:
如果两个节点都存在：
    1) 俩节点值相等：
       返回 F(左子节点, 左子节点) and F(右子节点, 右子节点)

    1) 俩节点值不等：
       返回 false

如果两个节点都不存在：
    返回 true

如果两个节点一个存在一个不存在：
    返回 false

复杂度分析
时间复杂度：$O(N)$，N 为节点数，每个节点都要比较一次。
空间复杂度：$O(h)$, h 为树的高度。

* Runtime: 72 ms, faster than 77.79% of JavaScript online submissions for Same Tree.
*/
var isSameTree = function (p, q) {
	if (!p && !q) return true;
	if (!p || !q || p.val !== q.val) return false;
	return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

/*
* solution 2

思路
前序+中序遍历结果可以确定一棵树，所以比较这两个遍历结果就好。要注意的是，遍历的时候给空节点也留个位置。

复杂度分析
时间复杂度：$O(N)$，N 为二叉树的节点数。
空间复杂度：$O(N)$，N 为二叉树的节点数，遍历结果辅助数组的空间，遍历时递归栈的最大空间是 $O(h)$, h 为二叉树的高度。
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
	const preOrderP = preorderTraversal(p).join('');
	const preOrderQ = preorderTraversal(q).join('');

	const inOrderP = inorderTraversal(p).join('');
	const inOrderQ = inorderTraversal(q).join('');

	return preOrderP === preOrderQ && inOrderP === inOrderQ;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root, res = []) {
	if (!root) {
		// 标记空节点
		res.push('#');
		return res;
	}

	res.push(root.val);
	preorderTraversal(root.left, res);
	preorderTraversal(root.right, res);

	return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root, res = []) {
	if (!root) {
		// 标记空节点
		res.push('#');
		return res;
	}

	inorderTraversal(root.left, res);
	res.push(root.val);
	inorderTraversal(root.right, res);

	return res;
};

/*
* solution 3 BFS

思路
比较两棵树的结构，可以对两棵树同时进行层级遍历，在遍历中比较节点，如果有不同的节点就提前退出。

需要注意的是遍历过程中空节点也要入列。

复杂度分析
时间复杂度：$O(N)$，N 为二叉树的节点数。
空间复杂度：$O(logN)$，N 为二叉树的节点数。
*/
var isSameTree = function (p, q) {
	const queueP = [p];
	const queueQ = [q];

	while (queueP.length && queueQ.length) {
		let lenP = queueP.length;
		let lenQ = queueQ.length;

		// 如果两棵树同一层的节点数都不同，肯定不是同一棵树
		if (lenP !== lenQ) return false;

		while (lenP-- && lenQ--) {
			const nodeP = queueP.shift();
			const nodeQ = queueQ.shift();

			// 两个节点都是 null, 直接继续比较下一个节点
			if (!nodeP && !nodeQ) continue;
			// 遇到不同的节点，说明不是同一棵树，提前返回
			if (!nodeP || !nodeQ || nodeP.val !== nodeQ.val) return false;

			// 将下一层的节点入列，空节点也要入列
			queueP.push(nodeP.left, nodeP.right);
			queueQ.push(nodeQ.left, nodeQ.right);
		}
	}
	return true;
};
/*
 * solution 4
 * sample 44 ms submission from leetcode
 */
var isSameTree = function (p, q) {
	if (!p && !q) {
		return true;
	}
	if (!p || !q || p.val !== q.val) {
		return false;
	}
	return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
