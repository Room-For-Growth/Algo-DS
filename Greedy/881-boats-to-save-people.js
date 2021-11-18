```
You are given an array people where people[i] is the weight of the ith person, and an infinite number of boats where each boat can carry a maximum weight of limit. Each boat carries at most two people at the same time, provided the sum of the weight of those people is at most limit.

Return the minimum number of boats to carry every given person.


Example 1:
Input: people = [1,2], limit = 3
Output: 1
Explanation: 1 boat (1, 2)

Example 2:
Input: people = [3,2,2,1], limit = 3
Output: 3
Explanation: 3 boats (1, 2), (2) and (3)

Example 3:
Input: people = [3,5,3,4], limit = 5
Output: 4
Explanation: 4 boats (3), (3), (4), (5)
```;
/*
* solution 1 from leetcode, 140ms
* 思路: sort+two pointers
时间复杂度：O(n*logn)
空间复杂度：O(logn)

由于题目要求船数最少，那显然我们希望每个船都尽可能多装一些重量，这样才能使得结果更优。

每次装人的时候先将最大重量的装上，然后再遍历剩下的人，看剩余容量能否再装下一人，实际上由于题目限定了只能坐两个人，那么我们优先选择较轻的总是没错的，因此轻的更容易被满足并且不会比重的结果差（制定贪心策略）。 最后将已经被装上船的人踢出列表，继续按上述策略装，直到所有人都上船。

每次遍历剩下的人以及将人踢出列表的时间复杂度过高，我们可以采用排序 + 双指针的具体策略来完成。因此这道题大的层面上是贪心，具体战术上采用的是排序 + 双指针，这同时也是贪心问题的一个常见的做法。

具体地：

先对 people 进行一次排序（不妨进行一次升序）。

选择头尾两个人。如果可以同时载就运载这两个人。如果不可行，那么这个重的人和剩下任何人都无法配对，只能自己走了。

采用上面的策略直到全部运走即可。
*/
var numRescueBoats = function (people, limit) {
	// sort people + two pointers
	people.sort((a, b) => a - b);
	let l = 0;
	let r = people.length - 1;
	let result = 0;
	while (l <= r) {
		result++;
		if (people[l] + people[r] <= limit) {
			l++;
		}
		r--;
	}
	return result;
};
