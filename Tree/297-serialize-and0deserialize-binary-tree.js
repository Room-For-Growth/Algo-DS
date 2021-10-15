```
序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

示例: 

你可以将以下二叉树：

    1
   / \
  2   3
     / \
    4   5

序列化为 "[1,2,3,null,null,4,5]"
提示: 这与 LeetCode 目前使用的方式一致，详情请参阅 LeetCode 序列化二叉树的格式。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

说明: 不要使用类的成员 / 全局 / 静态变量来存储状态，你的序列化和反序列化算法应该是无状态的。
```;

/*
* Solution 1 层级遍历

思路

- 要重构一棵二叉树的话，只要把原二叉树的结构记录下来就好了。
- 序列化时可以用层级遍历来记录树的结构，记得把空节点也记录下来。
- 反序列化时也是用层级遍历的方法一层一层地垒节点就好啦。

复杂度分析
serialize()
  - 时间复杂度：$O(N)$，N 为二叉树节点数。
  - 空间复杂度：$O(q)$，q 是队列的最大长度，最差的情况是满二叉树的最后一层，此时 q 与 N 同阶，N 为二叉树节点数。

deserialize()
  - 时间复杂度：$O(N)$，N 为二叉树节点数。
  - 空间复杂度：$O(N)$，N 为二叉树节点数，用了一个辅助数组 nodes 来存所有节点的值，层次遍历时用的队列空间是 q，最差情况也是与 N 同阶。
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root, emptyMarker = '#', seperator = ',') {
	if (!root) return '';

	const queue = [root];
	const arr = [];

	// BFS
	while (queue.length) {
		const node = queue.shift();

		if (node) {
			arr.push(node.val);
			// 子节点为空也要入列，因为要标记空节点
			queue.push(node.left, node.right);
		} else {
			// 标记空节点
			arr.push(emptyMarker);
		}
	}
	// 最后一层右侧的那些空节点标记可以删掉
	// 不删也行 `return arr.join(seperator);`
	return arr
		.join(seperator)
		.replace(new RegExp(`(${seperator}${emptyMarker})+$`), '');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data, emptyMarker = '#', seperator = ',') {
	if (!data) return null;

	const nodes = data.split(seperator);
	const root = new TreeNode(nodes[0]);
	const queue = [root];

	let i = 1;
	// BFS
	while (queue.length) {
		const node = queue.shift();

		node.left = buildNode(nodes[i]);
		node.left && queue.push(node.left);
		i++;

		node.right = buildNode(nodes[i]);
		node.right && queue.push(node.right);
		i++;
	}

	return root;

	// *********************************
	function buildNode(value) {
		return value === void 0 || value === emptyMarker
			? null
			: new TreeNode(value);
	}
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// deserialize() 也可以用正则来读取节点值。
/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data, emptyMarker = '#', seperator = ',') {
	const reg = new RegExp(`[^${seperator}]+`, 'g');
	let match = reg.exec(data);
	if (!match) return null;

	const root = new TreeNode(match[0]);
	const queue = [root];

	while (queue.length) {
		const node = queue.shift();

		match = reg.exec(data);
		if (!match) break;

		node.left = buildNode(match[0]);
		node.left && queue.push(node.left);

		match = reg.exec(data);
		if (!match) break;

		node.right = buildNode(match[0]);
		node.right && queue.push(node.right);
	}

	return root;

	// *********************************
	function buildNode(value) {
		return value === emptyMarker ? null : new TreeNode(value);
	}
};

/*
* Solution 2 前序遍历
* Runtime: 112 ms, faster than 94.90% of JavaScript online submissions for Serialize and Deserialize Binary Tree.
* Memory Usage: 49.4 MB, less than 81.83% of JavaScript online submissions for Serialize and Deserialize Binary Tree.

思路
- 前序遍历和后序遍历应该都可以，因为可以确定根节点。

serialize
- 正常前序遍历即可，在遍历过程中组装字符串，遇到空节点加一个标识符。

deserialize
- 按前序遍历的顺序构建二叉树，也就是先构建当前节点，再递归构建左子树和右子树。

复杂度分析
serialize()
  - 时间复杂度：$O(N)$，N 为二叉树节点数。
  - 空间复杂度：$O(h)$，h 为二叉树高度。

deserialize()
  - 时间复杂度：$O(N)$，N 为二叉树节点数。
  - 空间复杂度：$O(N)$，N 为二叉树节点数，nodes 数组的空间。
*/
var serialize = function (root, emptyMarker = '#', seperator = ',') {
	if (!root) return '';
	let str = '';
	preorder(root);
	// 删除最后的分隔符
	return str.slice(0, -1);

	// *******************************
	function preorder(root) {
		if (!root) {
			str += emptyMarker + seperator;
			return;
		}
		str += root.val + seperator;
		preorder(root.left);
		preorder(root.right);
	}
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data, emptyMarker = '#', seperator = ',') {
	if (!data) return null;
	const nodes = data.split(seperator);
	let i = 0;
	return preorder();

	// *********************************
	function preorder() {
		if (i >= nodes.length || nodes[i] === emptyMarker) return null;

		const node = new TreeNode(nodes[i]);
		i++;
		node.left = preorder();
		i++;
		node.right = preorder();

		return node;
	}
};
/*
* Solution 3 92 ms submission from leetcode

*/
var serialize = function (root) {
	if (!root) {
		return 'n';
	}

	return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
	const values = data.split(',');
	let i = 0;

	dfs = () => {
		if (values[i] === 'n') {
			++i;
			return null;
		}

		const node = new TreeNode(values[i]);
		++i;
		node.left = dfs();
		node.right = dfs();
		return node;
	};

	return dfs();
};

/*
* Solution 4 116 ms submission on leetcode

*/
var serialize = function (root) {
	const preOrder = [];

	function visit(node) {
		if (!node) {
			preOrder.push(null);
			return;
		}

		preOrder.push(node.val);
		visit(node.left);
		visit(node.right);
	}

	visit(root);

	//console.log(preOrder.join(','))

	return preOrder.join(',');
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
	if (data.length === 0) {
		return null;
	}

	const d = data.split(',');

	let root = new TreeNode(parseInt(d[0]));
	let on = root;
	let stack = [];

	let onLeft = true;

	for (let val of d.splice(1)) {
		//console.log(val, on, stack, onLeft)
		if (!val) {
			if (onLeft) {
				onLeft = false;
				//on =stack.pop();
			} else {
				onLeft = false;
				on = stack.pop();
			}
			continue;
		}

		const node = new TreeNode(val);

		if (onLeft) {
			stack.push(on);
			on.left = node;
		} else {
			on.right = node;
		}
		on = node;
		onLeft = true;
	}

	return root;
};

/************************ */

/* 
* Notes
Time: O(n) BFS traverse all the tree nodes (n is the number of tree nodes).
Space: O(k) k is the queue size, also it is the number of leaf nodes, worst case k is n/2.

BFS (no need to differentiate tree levels)
  Serializeuse
    - use StringBuilder to append new node value and comma to the end
    - use special character # to mark null node value
    - remove the last comma and return string as result
  
  Deserialize
    - convert the input string into a string array, by using split(",") method

    - the first value is root value, conver it to a TreeNode and mark it as root, and offer to the queue

    - use a pointer to mark the current index of string array, start from index 1, which is the value of the left child of root

    - while the queue is not empty, pop it
      - check if it's still within input string range, otherwise break the while loop
      - read its left child value from input string, convert it to a TreeNode, offer the left child TreeNode to the queue if it's not null
      - move the pointer one step, and check if it's still within input string range, otherwise break the while loop
      - read its right child value from input string, convert it to a TreeNode, offer the right child TreeNode to the queue if it's not null
      - move the pointer one step, and check if it's still within input string range, otherwise break the while loop

    - write a private method to convert node value to a TreeNode
    - return root as the result

*/
