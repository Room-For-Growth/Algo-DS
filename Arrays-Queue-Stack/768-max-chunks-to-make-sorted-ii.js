``` HARD
最多能完成排序的块 II
Max Chunks To Make Sorted II

You are given an integer array arr.

We split arr into some number of chunks (i.e., partitions), and individually sort each chunk. After concatenating them, the result should equal the sorted array.

Return the largest number of chunks we can make to sort the array.

这个问题和“最多能完成排序的块”相似，但给定数组中的元素可以重复，输入数组最大长度为2000，其中的元素最大为10**8。

arr是一个可能包含重复元素的整数数组，我们将这个数组分割成几个“块”，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。

我们最多能将数组分成多少块？

示例 1:

输入: arr = [5,4,3,2,1]
输出: 1
解释:
将数组分成2块或者更多块，都无法得到所需的结果。
例如，分成 [5, 4], [3, 2, 1] 的结果是 [4, 5, 1, 2, 3]，这不是有序的数组。

示例 2:

输入: arr = [2,1,3,4,4]
输出: 4
解释:
我们可以把它分成两块，例如 [2, 1], [3, 4, 4]。
然而，分成 [2, 1], [3], [4], [4] 可以得到最多的块数。

注意:
arr的长度在[1, 2000]之间。
arr[i]的大小在[0, 10**8]之间。

这是一个哈希表的题目，也可使用栈来优化。
```;

/*
单调栈
思路
通过题目给的三个例子，应该可以发现一些端倪。

如果 arr 是非递减的，那么答案为 1。

如果 arr 是非递增的，那么答案是 arr 的长度。

并且由于只有分的块内部可以排序，块与块之间的相对位置是不能变的。因此直观上我们的核心其实找到从左到右开始不减少（增加或者不变）的地方并分块。

比如对于 [5,4,3,2,1] 来说：

5 的下一个是 4，比 5 小，因此如果分块，那么永远不能变成[1,2,3,4,5]。

同理，4 的下一个是 3，比 4 小，因此如果分块，那么永远不能变成[1,2,3,4,5]。

。。。

我们继续分析一个稍微复杂一点的，即题目给的 [2,1,3,4,4]。

2 的下一个是 1，比 2 小，不能分块。

1 的下一个是 3，比 1 大，可以分块。

3 的下一个是 4，比 3 大，可以分块。

4 的下一个是 4，一样大，可以分块。

因此答案就是 4，分别是：

[2,1]

[3]

[3]

[4]

然而上面的算法步骤是不正确的，原因在于只考虑局部，没有考虑整体，比如 [4,2,2,1,1] 这样的测试用例，实际上只应该返回 1，原因是后面碰得到了 1，使得前面不应该分块。

因为把数组分成数个块，分别排序每个块后，组合所有的块就跟整个数组排序的结果一样，这就意味着后面块中的最小值一定大于前面块的最大值,这样才能保证分块有（即局部递减，整体递增）。因此直观上，我们又会觉得是不是”只要后面有较小值，那么前面大于它的都应该在一个块里面“，实际上的确如此。

这里的话，我们将思路逆转，不是分割区块，而是融合区块。

比如 [2,1,3,4,4]，遍历到 1 的时候会发现 1 比 2 小，因此 2， 1 需要在一块，我们可以将 2 和 1 融合，并重新压回栈。那么融合成 1 还是 2 呢？答案是 2，因为 2 是瓶颈，这提示我们可以用一个递增栈来完成。

因此本质上栈存储的每一个元素就代表一个块，而栈里面的每一个元素的值就是块的最大值。

以 [2,1,3,4,4] 来说， stack 的变化过程大概是：

[2]

1 被融合了，保持 [2] 不变

[2,3]

[2,3,4]

[2,3,4,4]

简单来说，就是将一个减序列压缩合并成最该序列的最大的值。 因此最终返回 stack 的长度就可以了。

时间复杂度：O(N)O(N)，其中 N 为数组长度。
空间复杂度：O(N)O(N)，其中 N 为数组长度。

单调栈：https://lucifer.ren/blog/2020/11/03/monotone-stack/
*/
const maxChunksToSorted = function (arr) {
	const stack = [];
	for (let i = 0; i < arr.length; i++) {
		a = arr[i];
		if (stack.length > 0 && stack[stack.length - 1] > a) {
			const cur = stack[stack.length - 1];
			while (stack && stack[stack.length - 1] > a) stack.pop();
			stack.push(cur);
		} else {
			stack.push(a);
		}
	}
	return stack.length;
};
/*
实际上本题的单调栈思路和 【力扣加加】从排序到线性扫描(57. 插入区间) https://leetcode-cn.com/problems/insert-interval/solution/li-kou-jia-jia-cong-pai-xu-dao-xian-xing-sao-miao-/
以及 394. 字符串解码 都有部分相似，大家可以结合起来理解。

融合与【力扣加加】从排序到线性扫描(57. 插入区间) 相似， 重新压栈和 394. 字符串解码 相似。
*/

/*
* solution 2 滑动窗口
题目有一个提示：Each k for which some permutation of arr[:k] is equal to sorted(arr)[:k] is where we should cut each chunk. 也就是原数组进行分块后，每一个分块和排序后的数组中对应的分块数字是一样的，只是排序不同。
既然每个分块中数字是一样的，那它们的和也是一样的了。我们可以用一个滑动窗口同时扫描原数组和排序数组，当窗口中数字的和一样时，就将数组进行分块，就像上图中的色块一样。

复杂度分析
时间复杂度：$O(NlogN)$，N 为数组长度，数组排序时间认为是 $NlogN$，滑动窗口遍历数组时间为 $N$。
空间复杂度：$O(N)$，N 为数组长度。

*/
var maxChunksToSorted = function (arr) {
	const sorted = [...arr];
	sorted.sort((a, b) => a - b);

	let count = 0,
		sum1 = 0,
		sum2 = 0;

	for (let i = 0; i < arr.length; i++) {
		sum1 += arr[i];
		sum2 += sorted[i];

		if (sum1 === sum2) {
			count++;
			sum1 = sum2 = 0; // 这行不要也可以啦
		}
	}

	return count;
};

/*

* leetcode sample solution, 80% tile	
*/

var maxChunksToSorted = function (arr) {
	const stack = [];
	let max = -Infinity;
	for (let num of arr) {
		max = Math.max(max, num);
		while (stack[stack.length - 1] > num) {
			stack.pop();
		}
		stack.push(max);
	}
	return stack.length;
};
