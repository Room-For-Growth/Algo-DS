"""
Leetcode 1381: 
Design a stack which supports the following operations.

Implement the CustomStack class:

CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack or do nothing if the stack reached the maxSize.
void push(int x) Adds x to the top of the stack if the stack hasn't reached the maxSize.
int pop() Pops and returns the top of stack or -1 if the stack is empty.
void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, just increment all the elements in the stack.
"""

"""
push(): check if its full
判断是否满了
pop 的时候要判断是否空了
self.count: 当前stack中的个数
self.maxSize: stack最大的capactity

time complexity: 
push(), pop(): O(1), increment(): O(min(k, count))
space complexity: O(1)
"""
class CustomStack:
    def __init__(self, maxSize: int):
        self.maxSize = maxSize
        self.count = 0
        self.stack = []

    def push(self, x: int) -> None:
        if self.count < self.maxSize:
            self.stack.append(x)
            self.count += 1

    def pop(self) -> int:
        if self.count == 0:
            return -1
        self.count -= 1
        return self.stack.pop()

    def increment(self, k: int, val: int) -> None:
        for i in range(min(k, self.count)):
            self.stack[i] += val



# 优化
# class CustomStack:
#     def __init__(self, ma)
