# 哈希表 + 两点间距离计算 + 排列组合 n*(n-1)
# 
#  points = [[0,0],[1,0],[2,0]]
# The two boomerangs are [[1,0],[0,0],[2,0]] and [[1,0],[2,0],[0,0]].
# output: 2

class Solution:
    def numberOfBoomerangs(self, points: List[List[int]]) -> int:
        res = 0
        for p in points:
            dict = {}
            for q in points:
                distance = (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2
                dict[distance] = dict.get(distance, 0) + 1

            for v in dict.values():
                res += sum([v * (v - 1)])
        return res
