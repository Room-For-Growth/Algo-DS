"""
Leetcode: 821
Given a string s and a character c that occurs in s, 
return an array of integers answer where answer.length == s.length and 
answer[i] is the distance from index i to the closest occurrence of character c in s.

The distance between two indices i and j is abs(i - j), where abs is the absolute value function.

Input: s = "loveleetcode", c = "e"
Output: [3,2,1,0]


思路：
设置一个相同size的array，将target char的位置设置成最短距离 0
从第二个字母开始从左向右遍历，每次当前值都跟前一个值进行对比，存储更小的值
从倒数第二个字母开始从右到左遍历，每次当前值都跟后一个值进行对比，存储更小的值

[12, 12, 12, 0, 12, 0, 0, 12, 12, 12, 12, 0] 
[12, 12, 12, 0, 1, 0, 0, 1, 2, 3, 4, 0]
[3,2,1,0,1,0,0,1,2,2,1,0]

time complexity: O(N) 
space complexity: O(N) N is the number of chars in given string
"""

class Solution:
    def shortestToChar(self, s: str, c: str) -> List[int]:
        shortest_dis_arr = [len(s)] * len(s)
        for i in range(len(s)):
            if s[i] == c:
                shortest_dis_arr[i] = 0

        for i in range(1, len(s)):
            shortest_dis_arr[i] = min(shortest_dis_arr[i], shortest_dis_arr[i-1]+1)

        for i in range(len(s) - 2, -1, -1):
            shortest_dis_arr[i] = min(shortest_dis_arr[i], shortest_dis_arr[i+1]+1)

        return shortest_dis_arr
