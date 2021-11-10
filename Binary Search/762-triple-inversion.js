```
FROM: https://binarysearch.com/problems/Triple-Inversion
入选理由: 1.通常二分都是基于有序序列二分，题目直接给了有序序列自然就简单，如果题目没给就需要我们自己构造，这道题就是。 2. 和专题篇的某一个专题联动（会是谁呢？） 3. 力扣中有换皮题，其实这道题就是典型的 xxx（猜猜是啥）。
similar to leetcode 493???
Given a list of integers nums, return the number of pairs i < j such that nums[i] > nums[j] * 3.

Constraints

n ≤ 100,000 where n is the length of nums
Example 1
Input
nums = [7, 1, 2]
Output
2
Explanation
We have the pairs (7, 1) and (7, 2)
```;
/*
* 暴力法（超时）
思路
本题和力扣 493. 翻转对[1] 和 剑指 Offer 51. 数组中的逆序对[2] 一样，都是求逆序对的换皮题。

暴力的解法可以枚举所有可能的 j，然后往前找 i 使得满足 nums[i] > nums[j] * 3nums[i]>nums[j]∗3，我们要做的就是将满足这种条件的 i 数出来有几个即可。这种算法时间复杂度为 O(n^2)。

*/

/*
* 二分法
思路
这道题我们也可以反向思考。即思考：对于 nums 中的每一项 num，我们找前面出现过的大于 num * 3 的数。

我们可以自己构造有序序列 d，然后在 d 上做二分。如何构建 d 呢？很简单，就是将 nums 中已经遍历过的数字全部放到 d 中即可。
*/

/*
* 分治法
思路
我们接下来介绍更广泛使用的，效率更高的解法 分治。 我们进行一次归并排序，并在归并过程中计算逆序数，换句话说 逆序对是归并排序的副产物。


*/
