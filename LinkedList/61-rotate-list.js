``` Medium
考察频率高

给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
Given the head of a linked list, rotate the list to the right by k places.

示例 1:

输入: 1->2->3->4->5->NULL, k = 2
输出: 4->5->1->2->3->NULL

解释:
向右旋转 1 步: 5->1->2->3->4->NULL
向右旋转 2 步: 4->5->1->2->3->NULL

示例 2:

输入: 0->1->2->NULL, k = 4
输出: 2->0->1->NULL

解释:
向右旋转 1 步: 2->0->1->NULL
向右旋转 2 步: 1->2->0->NULL
向右旋转 3 步: 0->1->2->NULL
向右旋转 4 步: 2->0->1->NULL
```;

/*
思路

闭环，走 k 步，断开。

复杂度
时间复杂度：$O(N), N 为链表长度。
空间复杂度：$O(1)。
*/
const rotateRight = (head, k) => {
	// edge case
	if (!head || k === 0) return head;

	let cur = head,
		len = 1;
	// 成环
	while (cur.next) {
		cur = cur.next;
		len++;
	}
	cur.next = head;

	// 走 k 步
	cur = head;
	let n = len - (k % len) - 1;
	while (n > 0) {
		cur = cur.next;
		n--;
	}
	const newHead = cur.next;
	cur.next = null;
	return newHead;
};

// Solution 2
/*
思路
首先我们看下如何返回链表倒数第 k 个节点。

采用快慢指针

快指针与慢指针都以每步一个节点的速度向后遍历

快指针比慢指针先走 k 步

当快指针到达终点时，慢指针正好是倒数第 k 个节点

快指针 = head;
慢指针 = head;
while (快指针.next) {
  if (k-- <= 0) {
    慢指针 = 慢指针.next;
  }
  快指针 = 快指针.next;
}

算法描述：

获取单链表的倒数第 1 （尾节点）与倒数第 2 个节点
将倒数第 2 个节点的 next 指向 null
将尾节点的 next 指向 head（拼起来）
返回倒数第 1 个节点
经过这样的处理，我们旋转了一位，而题目是要旋转 k 位，实际上我们只需要将上面的算法微调即可。将 1 改成 k ， 2 改成 k + 1。

算法描述：

获取单链表的倒数第 k 与倒数第 k + 1 个节点
将倒数第 k + 1 个节点的 next 指向 null
将尾节点 next 指向 head（拼起来）
返回倒数第 k 个节点
例如链表 A -> B -> C -> D -> E 右移 2 位，依照上述步骤为：
获取节点 C 与 D

A -> B -> C -> null, D -> E
D -> E -> A -> B -> C -> nul

返回节点 D

注意：假如链表节点长度为 len， 则右移 K 位与右移动 k % len 的效果是一样的 就像是长度为 1000 米的环形跑道， 你跑 1100 米与跑 100 米到达的是同一个地点

  获取链表的长度
  k = k % 链表的长度
  获取倒数第k + 1,倒数第K个节点与链表尾节点
  倒数第k + 1个节点.next = null
  链表尾节点.next = head
  return 倒数第k个节点

*/
var rotateRight = function (head, k) {
	if (!head || !head.next) return head;
	let count = 0,
		now = head;
	while (now) {
		now = now.next;
		count++;
	}
	k = k % count;
	let slow = (fast = head);
	while (fast.next) {
		if (k-- <= 0) {
			slow = slow.next;
		}
		fast = fast.next;
	}
	fast.next = head;
	let res = slow.next;
	slow.next = null;
	return res;
};

// solution 3

/* 
时间复杂度：O(N) ?
空间复杂度：O(1) 
*/

var rotateRight = function (head, l) {
	// exit early if only one head
	if (!head || !head.next) return head;

	// iterate and create ref to list nodes
	const nodesByIndex = [];
	let node = head;

	while (node) {
		nodesByIndex.push(node);
		node = node.next;
	}

	// k index determines where to rotate the list
	const k = l % nodesByIndex.length;

	// return head if rotation is at 0 index
	if (k === 0) return head;

	// otherwise, point new head
	const newHead = nodesByIndex[nodesByIndex.length - k]; //identify head

	// and create new tail;
	const tailIndex = nodesByIndex.length - k - 1;
	nodesByIndex[tailIndex].next = null; // set tail

	// append new head to old heaad
	return addNewHead(head, newHead);
};

const addNewHead = (oldHead, newHead) => {
	let node = newHead;
	let last;

	while (node) {
		last = node;
		node = node.next;
	}

	last.next = oldHead;
	return newHead;
};

// solution 4
// leetcode runtime 90ms, faster than most
var rotateRight = function (head, k) {
	if (!head) return null;
	if (!head.next) return head;
	if (k === 0) return head;

	let temp = head;
	let count = 0;
	while (temp) {
		temp = temp.next;
		count++;
	}

	// console.log(k,count)
	k = k % count;

	if (k === 0) return head;

	const m = count - k - 1;
	temp = head;
	for (let i = 0; i < m; i++) {
		temp = temp.next;
	}
	const newHead = temp.next;
	temp.next = null;
	temp = newHead;
	while (temp.next) {
		temp = temp.next;
	}
	temp.next = head;
	return newHead;
};
