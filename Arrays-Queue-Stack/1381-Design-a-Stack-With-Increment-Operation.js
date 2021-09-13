```
请你设计一个支持下述操作的栈。

实现自定义栈类 CustomStack ：

  - CustomStack(int maxSize)：用 maxSize 初始化对象，maxSize 是栈中最多能容纳的元素数量，栈在增长到 maxSize 之后则不支持 push 操作。CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack or do nothing if the stack reached the maxSize.
  - void push(int x)：如果栈还未增长到 maxSize ，就将 x 添加到栈顶。void push(int x) Adds x to the top of the stack if the stack hasn't reached the maxSize.
  - int pop()：弹出栈顶元素，并返回栈顶的值，或栈为空时返回 -1 。int pop() Pops and returns the top of stack or -1 if the stack is empty.
  - void inc(int k, int val)：栈底的 k 个元素的值都增加 val 。如果栈中元素总数小于 k ，则栈中的所有元素都增加 val。void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, just increment all the elements in the stack.

示例：

输入：
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
输出：
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
解释：
CustomStack customStack = new CustomStack(3); // 栈是空的 []
customStack.push(1); // 栈变为 [1]
customStack.push(2); // 栈变为 [1, 2]
customStack.pop(); // 返回 2 --> 返回栈顶值 2，栈变为 [1]
customStack.push(2); // 栈变为 [1, 2]
customStack.push(3); // 栈变为 [1, 2, 3]
customStack.push(4); // 栈仍然是 [1, 2, 3]，不能添加其他元素使栈大小变为 4
customStack.increment(5, 100); // 栈变为 [101, 102, 103]
customStack.increment(2, 100); // 栈变为 [201, 202, 103]
customStack.pop(); // 返回 103 --> 返回栈顶值 103，栈变为 [201, 202]
customStack.pop(); // 返回 202 --> 返回栈顶值 202，栈变为 [201]
customStack.pop(); // 返回 201 --> 返回栈顶值 201，栈变为 []
customStack.pop(); // 返回 -1 --> 栈为空，返回 -1


提示：

1 <= maxSize <= 1000
1 <= x <= 1000
1 <= k <= 1000
0 <= val <= 100
每种方法 increment，push 以及 pop 分别最多调用 1000 次
```;
const CustomStack = function (maxSize) {
	this.maxSize = maxSize;
	this.stack = [];
};

CustomStack.prototype.push = function (x) {
	if (this.stack.length == this.maxSize) return;

	this.stack.push(x);
};

CustomStack.prototype.pop = function () {
	if (this.stack.length == 0) return -1;

	return this.stack.pop();
};
//time O(k)
CustomStack.prototype.increment = function (k, val) {
	for (let i = 0; i < k && i < this.stack.length; i++) {
		this.stack[i] += val;
	}
};

/*********************** */

class CustomStack {
	constructor(maxSize) {
		this.maxSize = maxSize;
		this.stack = [];
	}
	push(x) {
		if (this.stack.length === this.maxSize) return;
		this.stack.push(x);
	}
	pop() {
		if (this.stack.length === 0) return -1;
		return this.stack.pop();
	}
	increment(k, val) {
		for (let i = 0; i < k && i < this.stack.length; i++) {
			this.stack[i] += val;
		}
	}
	/* 	increment(k, val) {
		let len = this.stack.length;
		if (len < k) {
			for (let i = 0; i < len; i++) {
				this.stack[i] += val;
			}
		} else {
			for (let i = 0; i < k; i++) {
				this.stack[i] += val;
			}
		}
	} */
}

/********* */
/* 优化的前缀和
* 思路
维护一个大小为当前栈长度的 incrementals，而不是 O(maxSize)O(maxSize) 。
每次栈 push 的时候，incrementals 也 push 一个 0。每次栈 pop 的时候， incrementals 也 pop，这样就可以了。
这里的 incrementals 并不是一个栈，而是一个普通数组，因此可以随机访问。

时间复杂度：全部都是 O(1)O(1)
空间复杂度：我们维护了一个大小为 cnt 的数组，因此平均到每次的空间复杂度为 O(cnt / N)O(cnt/N)，其中 N 为操作数，cnt 为操作过程中的栈的最大长度（小于等于 maxSize）。
*/
class CustomStack {
	constructor(maxSize) {
		this.maxSize = maxSize;
		this.stack = [];
		this.count = 0;
		this.incrementals = [];
	}
	push(x) {
		if (this.count < this.maxSize) {
			this.stack.push(x);
			this.incrementals.push(0);
			this.count += 1;
		}
	}
	pop() {
		if (this.count === 0) return -1;

		if (this.count >= 1) {
			this.incrementals[this.count - 2] += this.incrementals[this.count - 1];
		}

		this.count -= 1;
		return this.stack.pop() + this.incrementals.pop();
	}
	increment(k, val) {
		if (this.incrementals) {
			this.incrementals[Math.min(this.count, k) - 1] += val;
		}
	}
}

/**************** */

/* 空间换时间
其实我们只在出栈时才关心元素的值，所以在增量操作的时候，可以不用去更新栈内的元素，而是用一个 hashMap 来记录第几个元素需要增加多少。出栈时，检查当前元素的下标是否在 hashMap 中有记录，有的话就加上增量再出栈。这样我们就得到了时间复杂度 $O(1)$ 的增量操作，不过代价就是额外的 $O(N)$ 空间。

时间复杂度：push, pop 和 inc 都是 $O(1)$。
空间复杂度：$O(maxSize)$，模拟栈的数组和哈希表的空间都是 $O(maxSize)$。
*/
class CustomStack {
	constructor(maxSize) {
		this.list = [];
		this.maxSize = maxSize;
		this.hashMap = {};
	}
	_setInc(key, value) {
		if (!(key in this.hashMap)) {
			this.hashMap[key] = 0;
		}
		this.hashMap[key] += value;
	}
	_getInc(key) {
		return this.hashMap[key] || 0;
	}
	_size() {
		return this.list.length;
	}
	push(x) {
		if (this._size() < this.maxSize) {
			this.list.push(x);
		}
	}
	pop() {
		const top = this._size() - 1;
		const inc = this._getInc(top);

		let item = this.list.pop();
		if (item === void 0) {
			return -1;
		}

		item += inc;
		const newTop = top - 1;
		this._setInc(newTop, inc);
		this.hashMap[top] = 0;
		return item;
	}
	increment(k, val) {
		const size = this._size();
		k = k < size ? k - 1 : size - 1;
		this._setInc(k, val);
	}
}
