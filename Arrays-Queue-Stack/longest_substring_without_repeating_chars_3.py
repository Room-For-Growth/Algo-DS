# 哈希表 + 滑动窗口
# Time Complexity: O(N): N is the length of string
# Space Complexity: O(s): s is the number of pairs in hash table

# [abc]abc
# a[bca]bc
# [ab]ba
# a[bb]a

class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        charIdx = {}
        l, r, max_window_len = 0, 0, 0

        # iterate the given string
        for r in range(len(s)):
            newChar = s[r]
            if newChar in charIdx:
                # abba: make sure char inside current window
                if charIdx[newChar] >= l:
                    l = charIdx[newChar] + 1
                    
            # store non-duplicate char-idx into map
            charIdx[s[r]] = r
            max_window_len = max(max_window_len, r - l + 1)

        return max_window_len




