# binary search：
# int l = 0
# int r = nums.size() - 1

# while (l <= r) {
#     int mid = (l + r) >> 1
#     if(一定条件) return 合适的值，一般是 l 和 r 的中点
#     if(一定条件) l = mid + 1
#     if(一定条件) r = mid - 1
# }
# // 看具体题意，此时 l == = r + 1
# return l

# Time complexity: O(N)
# Space complexity: O(1)
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        for i in range(len(nums)):
            if nums[i] >= target:
                return i
        # [1,3,5,6], 7 --> insert 7 in the last position
        return len(nums)



# Time: O (log N)
# Space: O (1)
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid_idx = (left + right) >> 1
            if target == nums[mid_idx]:
                return mid_idx

            # search right part
            if target > nums[mid_idx]:
                left = mid_idx + 1

            # search left part
            if target < nums[mid_idx]:
                right = mid_idx - 1
                
        # left == right + 1
        return left

    


