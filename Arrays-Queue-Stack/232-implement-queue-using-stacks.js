``` Easy
使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

示例:
MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);
queue.peek(); // 返回 1
queue.pop(); // 返回 1
queue.empty(); // 返回 false
说明:

你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的、 （例如，一个空的队列不会调用 pop 或者 peek 操作）。

Similar question:
225. Implement Stack using Queues: https://leetcode.com/problems/implement-stack-using-queues/
```;
/*
思路
在元素入列的时候，就考虑好了它出列的顺序，但我们还可以在元素需要出列的时候再来考虑这个问题。这样的话：

  1. 入列时直接 push 到模拟栈中；
  2. 出列时，由于先入列的元素在栈底，需要先把其他元素弹出，依次压入辅助栈；
  3. 栈底元素弹出，出列；
  4. 刚才出栈的其他元素依次从辅助栈弹出，重新压入模拟栈。

  再仔细想想的话：

  - 第 2 步中，辅助栈中的元素出栈顺序刚好就是队列的出列顺序；
  - 所以到第 4 步的时候，我们根本没必要把元素再从辅助栈转移到模拟栈；
  - 下一次 pop 操作时，直接从辅助栈弹出元素就可以了；
  - 如果辅助栈中没有元素了，我们再重复第 2 步。

  这样的话，我们的队列元素其实是用了两个栈来储存，所以在判断队列是否为空的时候，两个栈都要考虑进去。

复杂度
时间复杂度：入列是 $O(1)$，出列最差的情况就是每个元素都要从模拟栈中弹出，压入辅助栈，再从辅助栈中弹出，所以是 $O(n)$。
空间复杂度：$O(n)$，n 为队列大小。
*/
class MyQueue {
	constructor() {
		this.helperStack = [];
		this.outputStack = [];
	}

	//Pushes element x to the back of the queue.
	push(x) {
		this.outputStack.push(x);
	}

	//Removes the element from the front of the queue and returns it.
	pop() {
		if (this.helperStack.length === 0) {
			while (this.outputStack.length !== 0) {
				this.helperStack.push(this.outputStack.pop());
			}
		}
		return this.helperStack.pop();
	}

	//Returns the element at the front of the queue.
	peek() {
		if (this.helperStack.length === 0) {
			while (this.outputStack.length !== 0) {
				this.helperStack.push(this.outputStack.pop());
			}
		}
		return this.helperStack[this.helperStack.length - 1];
	}

	//Returns true if the queue is empty, false otherwise.
	empty() {
		return this.outputStack.length === 0 && this.helperStack.length === 0;
	}
}

/*
* 扩展

	- 类似的题目有用队列实现栈，思路是完全一样的，大家有兴趣可以试一下。
	- 栈混洗也是借助另外一个栈来完成的，从这点来看，两者有相似之处。

* 延伸阅读

	- 实际上现实中也有使用两个栈来实现队列的情况，那么为什么我们要用两个 stack 来实现一个 queue？

	- 其实使用两个栈来替代一个队列的实现是为了在多进程中分开对同一个队列对读写操作。一个栈是用来读的，另一个是用来写的。当且仅当读栈满时或者写栈为空时，读写操作才会发生冲突。

	- 当只有一个线程对栈进行读写操作的时候，总有一个栈是空的。在多线程应用中，如果我们只有一个队列，为了线程安全，我们在读或者写队列的时候都需要锁住整个队列。而在两个栈的实现中，只要写入栈不为空，那么push操作的锁就不会影响到 pop。

? When we should use two stacks to implement a queue?
	- The application for this implementation is to separate read & write of a queue in multi-processing. One of the stack is for read, and another is for write. They only interfere each other when the former one is full or latter is empty.
	- When there's only one thread doing the read/write operation to the stack, there will always one stack empty. However, in a multi-thread application, if we have only one queue, for thread-safety, either read or write will lock the whole queue. In the two stack implementation, as long as the second stack is not empty, push operation will not lock the stack for pop.
	- https://stackoverflow.com/questions/2050120/why-use-two-stacks-to-make-a-queue/2050402#2050402
	- (The point is that adding (removing) an element to (from) the front of a purely functional list is O(1) and the reverse operation which is O(n) is amortised over all the dequeues, so it's close to O(1), thereby giving you a ~O(1) queue implementation with immutable data structures.)

*/
