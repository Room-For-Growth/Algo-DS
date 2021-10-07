"""
O(n), O(1)
Get the length of LinkedList
Decrease K by module operation k = k % count
How to get Kth node from the bottom of the linkedList
Set two pointers, fast and slow
fast moves first while decreasing k
When k <= 0, slow begins to move
Until fast reaches the last node
Problem
Decrease k by module or you could not pass the tests with big k value
Use fast and slow pointer to determine the final position which should be moved.
"""
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
# Decrease K by module operation k=k%count

"""
    思路：
    移动k位数，就是从后数的k作为start node 连接LL head
    

    用k = k % c
"""
class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if k == 0 or head is None or head.next is None:
            return head
        cnt = 0
        runner = head

        while runner:
            cnt += 1
            runner = runner.next

        k %= cnt

        # [1,2], k = 2 --> [1, 2]
        if k == 0: return head

        slow = fast = head

        # fast pointer is k step faster than slow one, put fast in right position
        for _ in range(k):
            fast = fast.next

        # keep runnig until fast points at the last node
        while fast.next:
            slow, fast = slow.next, fast.next

        start = slow.next  # set slow.next as start node
        slow.next = None   # slow node is the last node
        fast.next = head   # connect last k nodes to head node
        return start

