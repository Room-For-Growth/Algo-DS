"""思路:
用两个stack，一个记录出现的数字，一个记录字符串
当遇到[的时候，就存储数字和字符串，并重置num 和 output
当遇到]的时候，就出栈，实现从内到外的这个打印效果
其他时候就Concatenatec char

time: O(N)
space: O(N)
"""
class Solution:
    def decodeString(self, s: str) -> str:
        numS, chaS = [], []
        num, ans = 0, ""
        for c in s:
            if c.isdigit():
                num = num * 10 + int(c)
            elif c == '[':
                numS.append(num)
                chaS.append(ans)
                num, ans = 0, ""
            elif c == ']':
                ans = chaS.pop() + ans * numS.pop()
            else:
                ans += c
        return ans

"""
时间复杂度：O(N)O(N)，其中 N 为解码后的 s 的长度。
空间复杂度：O(N)O(N)，其中 N 为解码后的 s 的长度
"""

class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        for c in s:
            if c == ']':
                repeatStr = ''
                repeatCount = ''
                while stack and stack[-1] != '[':
                    repeatStr = stack.pop() + repeatStr
                # pop 掉 "["
                stack.pop()
                while stack and stack[-1].isnumeric():
                    repeatCount = stack.pop() + repeatCount
                stack.append(repeatStr * int(repeatCount))
            else:
                stack.append(c)
        return "".join(stack)


