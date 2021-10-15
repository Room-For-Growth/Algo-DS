```
给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。

说明：不允许修改给定的链表。

Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.

Do not modify the linked list.

进阶：

你是否可以使用 O(1) 空间解决此题？
```;

/* 
* Solution 1

* 思路
  - 从头开始遍历链表并给每个节点增加一个“已遍历”的标记；
  - 如果在遍历过程中遇到了一个“已遍历”的节点，说明这个就是环的入口了；
  - 题目要求不允许修改给定的链表，但我们可以用一个 hashmap 来记录；
  - 由于题目中没有提到节点值是否唯一，也就是说两个不同的节点可能会有相同的值，那仅用节点值作为 hashmap 的 key 是不够的，得用整个节点对象来当 key，所以需要 Map。

复杂度分析

时间复杂度：$O(n)$, n 为链表长度。
空间复杂度：$O(n)$。

*/

var detectCycle = function (head) {
	const map = new Map();

	while (head) {
		if (map.has(head)) return head;
		map.set(head, true);
		head = head.next;
	}

	return null;
};

/* 
* Solution 2

* 思路
  - 先使用快慢指针确定链表是否有环；
  - 如果链表有环，那快慢指针相遇的点一定是在环上；
  - 接着把一个指针 A 移到链表头部，另一个指针 B 留在环内；
  - 指针 A 开始遍历环外的节点，指针 A 每走一步，指针 B 在环内走一圈；
  - 如果指针 A 和指针 B 相遇了，说明这个节点就是环的入口。
因为环和环外的唯一交点就是环的入口点

复杂度分析
时间复杂度：$O(n*p)$, n 是环外链表的长度，p 是环的长度。
空间复杂度：$O(1)$。
*/
var detectCycle = function (head) {
	let slow = head,
		fast = head;
	// 快慢指针确定有环
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
		// 确定有环，开始找环的第一个节点
		if (slow === fast) return findConnection(head, fast);
	}
	return null;

	// ******************************************

	function findConnection(head, loopNode) {
		// p1 走一步，p2 绕环一圈
		let p1 = head;
		while (true) {
			let p2 = loopNode;
			while (p2.next !== loopNode && p2.next !== p1) {
				p2 = p2.next;
			}
			if (p2.next === p1) return p1;
			p1 = p1.next;
		}
	}
};
/********************** */
var detectCycle = function (head) {
	let fast = head,
		slow = head;

	// 快慢指针确定有环
	while (fast && fast.next) {
		fast = fast.next.next;
		slow = slow.next;

		// 确定有环，开始找环的第一个节点
		if (fast === slow) {
			slow = head;
			while (slow !== fast) {
				slow = slow.next;
				fast = fast.next;
			}
			return slow;
		}
	}
	return null;
};

/************************* */
/* 
* Solution 3
* leetcode fastest

*/
var detectCycle = function (head) {
	if (!head || !head.next) return null;
	let slow = head,
		fast = head;

	// iterate until two pointers meet
	while (fast && fast.next) {
		slow = slow.next;
		fast = fast.next.next;
		if (slow === fast) break;
	}

	if (slow !== fast) return null;

	// the distances 'from head to the cycle start node' and
	// 'the current fast pointer to the cycle start node' are always same
	slow = head;
	while (slow !== fast) {
		slow = slow.next;
		fast = fast.next;
	}

	return slow;
};

/* 
* Solution 4

思路
双指针

复杂度分析
时间复杂度：不确定。
空间复杂度：O(1)。
*/

const detectCycle = (head) => {
	let fast = head;
	let slow = head;
	while (fast && fast.next && fast.next.next) {
		fast = fast.next.next;
		slow = slow.next;
		if (fast === slow) {
			let curr = head;
			while (curr !== fast) {
				curr = curr.next;
				fast = fast.next;
			}
			return curr;
		}
	}
	return null;
};
