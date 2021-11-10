```
https://binarysearch.com/problems/Top-View-of-a-Tree
Given a binary tree root, return the top view of the tree, sorted left-to-right.

Constraints
n ≤ 100,000 where n is the number of nodes in root

前置知识：BFS,哈希表
标签：哈希表,树,BFS
```;

/*
优秀答案 in Python
BFS，每次传入当前node的坐标，最后排序后返回结果。
时间：O(nlogn) n为二叉树节点数。
空间：O(n)

class Solution:
    def solve(self, root):
        dic = {}
        tmp = []
        tmp.append([root, 0, 0])
        while tmp:
            node, w, h = tmp.pop()
            if w not in dic:
                dic[w] = (h, node.val)
            elif dic[w][0] > h:
                dic[w] = (h, node.val)

            if node.right:
                tmp.append([node.right, w + 1, h + 1])
            if node.left:
                tmp.append([node.left, w - 1, h + 1])
        res = []
        for w in sorted(dic):
            res.append(dic[w][1])
        return res
*/

/*
 * from online https://www.geeksforgeeks.org/print-nodes-top-view-binary-tree/
The idea is to do something similar to vertical Order Traversal. Like vertical Order Traversal, we need to put nodes of same horizontal distance together. We do a level order traversal so that the topmost node at a horizontal node is visited before any other node of same horizontal distance below it. Hashing is used to check if a node at given horizontal distance is seen or not. 
 */
// approach 1
class Node {
	constructor(data) {
		this.data = data;
		this.left = this.right = null;
		this.hd = 0;
	}
}

// Driver Code
function topview(root) {
	if (root == null) return;
	let q = [];
	let m = new Map();
	let hd = 0;
	root.hd = hd;
	q.push(root);
	let result = [];

	while (q.length != 0) {
		root = q[0];
		hd = root.hd;
		if (!m.has(hd)) m.set(hd, root.data);
		if (root.left) {
			root.left.hd = hd - 1;
			q.push(root.left);
		}
		if (root.right) {
			root.right.hd = hd + 1;
			q.push(root.right);
		}
		q.shift();
	}

	let arr = Array.from(m);
	arr.sort(function (a, b) {
		return a[0] - b[0];
	});

	for (let [key, value] of arr.values()) {
		//console.log(value + ' ');
		result.push(value);
	}
	console.log('result is: ', result);
	return result;
}
//
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.right = new Node(4);
root.left.right.right = new Node(5);
root.left.right.right.right = new Node(6);
topview(root);
// * approach 2
/*
This approach does not require a queue. Here we use the two variables, one for vertical distance of current node from the root and another for the depth of the current node from the root. We use the vertical distance for indexing. If one node with the same vertical distance comes again, we check if depth of new node is lower or higher with respect to the current node with same vertical distance in the map. If depth of new node is lower, then we replace it.
*/
class Node {
	constructor() {
		this.data = 0;
		this.left = this.right = null;
	}
}

class pair {
	constructor(i, j) {
		this.first = i;
		this.second = j;
	}
}

// map to store the pair of node value and
// its level with respect to the vertical
// distance from root.
let m = new Map();

// function to create a new node
function newNode(key) {
	let node = new Node();
	node.left = node.right = null;
	node.data = key;
	return node;
}

// function to fill the map
function fillMap(root, d, l) {
	if (root == null) return;

	if (m.get(d) == null) {
		m.set(d, new pair(root.data, l));
	} else if (m.get(d).second > l) {
		m.set(d, new pair(root.data, l));
	}

	fillMap(root.left, d - 1, l + 1);
	fillMap(root.right, d + 1, l + 1);
}

// function should print the topView of
// the binary tree
function topView(root) {
	fillMap(root, 0, 0);

	let arr = Array.from(m.keys());

	arr.sort(function (a, b) {
		return a - b;
	});
	for (let key of arr.values()) {
		document.write(m.get(key).first + ' ');
	}
}

```JavaScript
class Node {
	constructor(data) {
		this.data = data;
		this.left = this.right = null;
		this.hd = 0;
	}
}

function topview(root) {
	if (root == null) return;
	let q = [];
	let m = new Map();
	let hd = 0;
	root.hd = hd;
	q.push(root);

	while (q.length != 0) {
		root = q[0];
		hd = root.hd;
		if (!m.has(hd)) m.set(hd, root.data);
		if (root.left) {
			root.left.hd = hd - 1;
			q.push(root.left);
		}
		if (root.right) {
			root.right.hd = hd + 1;
			q.push(root.right);
		}
		q.shift();
	}

	let arr = Array.from(m);
	arr.sort(function (a, b) {
		return a[0] - b[0];
	});

	for (let [key, value] of arr.values()) {
		document.write(value + ' ');
	}
}

时间：O(n) 
空间：O(n)
```;
