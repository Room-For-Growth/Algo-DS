# """
# Input
# nums = [1, 8, 6, 4, 5]
# k = 7
# Output
# 2
# Explanation
# We can remove the sublist [6, 4] to get [1, 8, 5] which sums to 14 and is divisible by 7.

# """

# # time: O(N)
# # space: O(N)
# # prefix_sum + hash table (前缀和+哈希表)

# class Solution:
#     def minSubarray(self, nums: List[int], p: int) -> int:
#         # get presum
#         pre_sum = 0
#         for num in nums:
#             pre_sum += num


#         # sum is divisible by p, no need to remove any elts
#         if pre_sum % p == 0:
#             return 0

#         # sum is less than p, no matter what, it cannot be divisible by p
#         if pre_sum < p:
#             return -1

#         # 前缀和的余数，找到最短子数组等于余数，即可
#         mod = pre_sum % p


#         # [1, 8, 6, 4, 5] -> sum = 24, 24 % 7 = 3
#         dict = {0: -1}
#         res = float("inf")

#         # reset pre_sum, save mod for the pre_sum
#         pre_sum = 0
#         for i in range(len(nums)):
#             pre_sum = (nums[i] + pre_sum) % p   # presum保存当前前缀和对p的余数
#             target = (pre_sum - mod + p) % p    # target为找的目标，如果这个目标之前出现过，那么这段长度是一个符合条件的移除子数组
#             if target in dict:
#                 res = min(res, i - dict[target])

#             dict[pre_sum] = i

#         return res if res < len(nums) else -1

# # time: O(N)
# # space: O(min(n, k))
# class Solution:
#     def minSubarray(self, nums: List[int], p: int) -> int:
#         total = sum(nums)
#         if total % p == 0:
#             return 0
# #       将前缀和模 k 的余数 x 放到哈希表中
# #       哈希表就充当了前缀和的角色，来记录最新的余数 x 对应的下标
# #       记录最新的目的是为了找出符合要求的最短的连续子数组
#         mod = total % p

#         ans = len(nums)
#         total = 0
#         dic = {0: -1}
#         for j in range(len(nums)):
#             total += nums[j]
#             cur = total % p
#             print("j: ", j, "current: ", cur)
#             target = (cur - mod + p) % p
#             print("target:", target)
#             if target in dic:
#                 ans = min(ans, j - dic[target])
#                 print("target in dict, ans: ", ans)
#             dic[cur] = j

#         if ans == len(nums):
#             return -1
#         return ans

def minSubarray(nums, p) -> int:
    total = sum(nums)
    if total % p == 0:
        return 0
#       将前缀和模 k 的余数 x 放到哈希表中
#       哈希表就充当了前缀和的角色，来记录最新的余数 x 对应的下标
#       记录最新的目的是为了找出符合要求的最短的连续子数组
    mod = total % p

    ans = len(nums)
    total = 0
    dic = {0: -1}
    for j in range(len(nums)):
        total += nums[j]
        cur = total % p
        print("j:", j)

        target = (cur - mod + p) % p
        print("target:", target)

        if target in dic:
            ans = min(ans, j - dic[target])
            print("target in dict, ans: ", ans)

        dic[cur] = j
        print(dic)
        print("\n")

    if ans == len(nums):
        return -1
    return ans


print(minSubarray([1, 8, 6, 4, 5], 7))