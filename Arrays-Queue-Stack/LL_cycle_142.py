class Solution:
    def detectCycle(self, head: ListNode) -> ListNode:
        fast, slow = head, head
        cycle_length = 0
        while fast is not None and fast.next is not None:
            fast = fast.next.next
            slow = slow.next
#           cycle found, calcuate cycle length
            if fast == slow:
                cycle_length = self.calculate_cycle_length(slow, head)
                break

        if cycle_length == 0:
            return

        p1, p2 = head, head
        for _ in range(cycle_length):
            p2 = p2.next

        while p1 != p2:
            p1 = p1.next
            p2 = p2.next

        return p1

    def calculate_cycle_length(self, slow, head: ListNode):
        slow_runner = slow
        cycle_length = 0
        while True:
            cycle_length += 1
            slow_runner = slow_runner.next
            if slow_runner == slow:
                break

        return cycle_length
