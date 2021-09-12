"""
Leetcode: 989
The array-form of an integer num is an array representing its digits in left to right order.
For example, for num = 1321, the array form is [1,3,2,1].
Given num, the array-form of an integer, and an integer k, 
return the array-form of the integer num + k.

LOGIC:
based on addition operation,
start calculation from back to font
r is remainder: it's the value for current position after addtion
k is carry
after iteration, if k > 0, we need to handle the last carry(k)
using k % 10 to get current value until k > 0 is false
最后的sumArr[::-1] 是reverse array，因为我们从来面开始计算，把它依然放后面
"""

class Solution:
    def addToArrayForm(self, num: List[int], k: int) -> List[int]:
        sumArr = []
        for i in range(len(num) - 1, -1, -1):
            r = (num[i] + k) % 10
            k = (num[i] + k) // 10
            sumArr.append(r)

        while k > 0:
            sumArr.append(k % 10)
            k = k // 10

        return sumArr[::-1]

