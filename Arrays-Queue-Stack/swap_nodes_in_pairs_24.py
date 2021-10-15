# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head
        dummy = ListNode(0)
        dummy.next = head
        head = dummy

        while head.next and head.next.next:
            #           head stands for the node with 0
            #           n1 is the first node
            #           n2 is the second node
            #           let node2 points to node1
            #           let node1 points to node3 (nodes's next)
            #           move head to the third node
            
            n1 = head.next
            n2 = head.next.next

            n1.next = n2.next
            n2.next = n1

#           head points to the new first node
#           head moves to n1
            head.next = n2
            head = n1

        return dummy.next
