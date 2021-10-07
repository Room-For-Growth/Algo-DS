"""
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
"""

# Time Complexity: O(N)
# Space Complexity: O(N)
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        numIdx = {}
        for i in range(len(nums)):
            if target - nums[i] in numIdx:
                return [numIdx[target - nums[i]], i]
            numIdx[nums[i]] = i
