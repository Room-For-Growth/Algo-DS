```
给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

给定的有序链表： [-10, -3, 0, 5, 9],

一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
```;
/*
方法 1：递归
思路

先用快慢指针找到中间节点
分治构建平衡二叉树

复杂度分析
时间复杂度：$O(NlogN)，N 为链表长度。
空间复杂度：$O(logN)，N 为链表长度。

*/

var sortedListToBST = function (head, tail = null) {
	if (!head || head === tail) return null;

	let slow = head,
		fast = head;
	while (fast !== tail && fast.next !== tail) {
		slow = slow.next;
		fast = fast.next.next;
	}

	const root = new TreeNode(slow.val);
	root.left = sortedListToBST(head, slow);
	root.right = sortedListToBST(slow.next, tail);
	return root;
};

/*
 * solution 2 from LeetCode, faster than 90%
 */
var sortedListToBST = function (head) {
	const nodeCount = countNodes(head);
	console.log(nodeCount);

	function traverse(n) {
		if (n <= 0) return null;

		const left = traverse(Math.floor(n / 2));
		const root = new TreeNode(head.val);
		root.left = left;
		head = head.next;
		root.right = traverse(n - Math.floor(n / 2) - 1);
		return root;
	}

	return traverse(nodeCount);
};

function countNodes(head) {
	if (!head) return 0;
	return 1 + countNodes(head.next);
}

/*
 * solution 3 from LeetCode, faster than 80%
 */
var sortedListToBST = function (head) {
	const values = getValues(head);

	return createBST(values);
};

const createBST = (values, left = 0, right = values.length - 1) => {
	if (left > right) return null;

	const middle = ~~(left + (right - left) / 2);
	const rootValue = values[middle];

	const root = new TreeNode(rootValue);
	root.left = createBST(values, left, middle - 1);
	root.right = createBST(values, middle + 1, right);

	return root;
};

const getValues = (head) => {
	const values = [];

	while (head) {
		values.push(head.val);
		head = head.next;
	}

	return values;
};
/*
 * solution 4 from LeetCode
 */
var sortedListToBST = function (head) {
	return helper(head, null);
};

var helper = function (head, foot) {
	let fast = head;
	let slow = head;
	let node = null;

	if (head === foot) return null;

	while (fast !== foot && fast.next !== foot) {
		fast = fast.next.next;
		slow = slow.next;
	}

	node = new TreeNode(slow.val);
	node.left = helper(head, slow);
	node.right = helper(slow.next, foot);

	return node;
};
///

const sortedListToBST = (head) => {
	if (!head) return head;
	let hashArr = [];

	let pointer = head;
	while (pointer) {
		hashArr.push(pointer.val);
		pointer = pointer.next;
	}

	// build up the tree recursively
	const helper = (left, right) => {
		if (left > right) return null;

		let index = Math.floor((right + left) / 2);
		let newNode = new TreeNode(hashArr[index]);

		newNode.left = helper(left, index - 1);
		newNode.right = helper(index + 1, right);

		return newNode;
	};

	return helper(0, hashArr.length - 1);
};
