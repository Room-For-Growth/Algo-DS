# calculate the sum of a contiguous subarray, we can utilize the sum of the previous subarray.
"""
使用双向队列
当新的值大于队尾的值时，弹出所有小的值
当值超出了window- size，弹出队首的值
队首的值一直是最大的
"""

# time: O(N)
# space: O(k)
from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        q = deque()
        res = []

        for i in range(len(nums)):
            # 如果队列不为空 并且 新来的数比队尾的数要大的话，不停的抛出队尾的数（抛出队伍中所有小于这个数列的值）
            while q and nums[i] >= nums[q[-1]]:
                q.pop()

            # 如果队首的数出了滑动窗口的范围，popleft(), [1,-1], 1
            while q and i - q[0] == k:
                q.popleft()

            # 存index方便我们判断是否值超出了窗口
            q.append(i)

            # window size满了之后的每一次，都存储队首到res
            # when we hit window size k, save max-value in window to res
            if i >= k - 1:
                res.append(nums[q[0]])
        return res
