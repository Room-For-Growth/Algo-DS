# given input: [0,0,1,1,1,2,2,3,3,4]
# j = next_non_duplicate_idx
#                    i
# [0,1,2,3,4,2,2,3,3,4]
#            j

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        next_non_duplicate_idx = 1
        for i in range(1, len(nums)):
            if nums[next_non_duplicate_idx - 1] != nums[i]:
                nums[next_non_duplicate_idx] = nums[i]
                next_non_duplicate_idx += 1

        return next_non_duplicate_idx


"""
读写双指针：
读指针遍历整个array，遇到重复的元素, 读指针就继续前移。
遇到不同的元素，写指针就前移一步，写入不同的元素
"""

# given input: [0,0,1,1,1,2,2,3,3,4]

class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        # return the length of the new array without duplicate vals
        if not nums:
            return 0

        write_pt, read_pt = 0, 0
        while read_pt < len(nums):
            if nums[write_pt] != nums[read_pt]:
                write_pt += 1
                nums[write_pt] = nums[read_pt]
            read_pt += 1

        return write_pt + 1

# Time Complexity: O(N): N is the number of total elements in given nums
# Space Complexity: O(1)
