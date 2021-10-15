"""
input:
["MyQueue","push","empty"]
[[],[1],[]]

expected_output = [null,null,false]

input:
["MyQueue","push","push","peek","pop","empty"]
[[],[1],[2],[],[],[]]

expected_output = [null,null,null,1,1,false]

["MyQueue","push","push","push","push","pop","push","pop","pop","pop","pop"]
[[],[1],[2],[3],[4],[],[5],[],[],[],[]]

expected_output = [null,null,null,null,null,1,null,2,3,4,5]

思路：
使用两个stack，将值append大stack1中，当我们要实现队列的功能（popFront(), peek())
就把stack1中的值pop()出来，append到stack1中
这样属于队头的值在stack1中将会进入stack2的栈尾，就可以被pop出来
s1 = [1, 2, 3, 4], s2 = []
s1 = [], s2 = [4, 3, 2, 1] -> using s2.pop() = 1 实现dequeue

注意点：
当我们将stack1的值倒入Stack2前，得确保Stack2是空的，否则队列内元素的顺序就不对
每次倒入都是导入stack1中所有的值

time complexity: O(N)
space complexity: O(N)
"""


class MyQueue:
    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.s1 = []
        self.s2 = []

    def push(self, x: int) -> None:
        """
        Push element x to the back of queue.
        """
        self.s1.append(x)

    def pop(self) -> int:
        """
        Removes the element from in front of queue and returns that element.
        """
        self._move_s1_to_s2()
        return self.s2.pop()

    def peek(self) -> int:
        """
        Get the front element.
        """
        self._move_s1_to_s2()
        return self.s2[-1]

    def empty(self) -> bool:
        """
        Returns whether the queue is empty.
        """
        return len(self.s2) + len(self.s1) == 0

    def _move_s1_to_s2(self):
        # move item from s1 to s2(empty check to make sure s2 stack is done with pop())
        if len(self.s2) == 0:
            while len(self.s1) > 0:
                self.s2.append(self.s1.pop())


# Your MyQueue object will be instantiated and called as such:
# obj = MyQueue()
# obj.push(x)
# param_2 = obj.pop()
# param_3 = obj.peek()
# param_4 = obj.empty()


# Approach2:
"""


"""
class MyQueue:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.stack = []
        self.help_stack = []

    def push(self, x: int) -> None:
        """
        Push element x to the back of queue.
        """
        while self.stack:
            self.help_stack.append(self.stack.pop())
        self.help_stack.append(x)
        while self.help_stack:
            self.stack.append(self.help_stack.pop())

    def pop(self) -> int:
        """
        Removes the element from in front of queue and returns that element.
        """
        return self.stack.pop()

    def peek(self) -> int:
        """
        Get the front element.
        """
        return self.stack[-1]

    def empty(self) -> bool:
        """
        Returns whether the queue is empty.
        """
        return not bool(self.stack)
