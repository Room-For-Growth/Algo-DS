# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


# Time Complexity: O(N): N 为节点数
# Space Complexity: O(h): 其中 h 为树的深度，最坏的情况 h 等于 N，其中 N 为节点数，此时树退化到链表。
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        return max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1
