"""
树的路径题
DFS：深度优先遍历
"""
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

# Time Complexity: O(N): N is the number of nodes
# Space Complexity: O(h): h is the height of bt
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(root, cur_val):
            # base case: empty root, and there is no left/right node
            if not root:
                return 0

            if not root.left and not root.right:
                return cur_val * 10 + root.val
            return dfs(root.left, cur_val * 10 + root.val) + dfs(root.right, cur_val * 10 + root.val)

        return dfs(root, 0)


"""
BFS: 广度优先遍历（层）
"""

# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        res = 0
        q = deque()
        q.append((root, 0))

        while q:
            node, value = q.popleft()
            if node.left:
                q.append((node.left, value * 10 + node.val))

            if node.right:
                q.append((node.right, value * 10 + node.val))

            if not node.left and not node.right:
                res += value * 10 + node.val
        return res

