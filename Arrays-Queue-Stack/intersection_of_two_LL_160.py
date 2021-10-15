"""
Leetcode 160:
Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.

"""
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None


class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> ListNode:
        runner1, runner2 = headA, headB
        while runner1 != runner2:
            runner1 = headB if runner1 is None else runner1.next
            runner2 = headA if runner2 is None else runner2.next
        return runner1


