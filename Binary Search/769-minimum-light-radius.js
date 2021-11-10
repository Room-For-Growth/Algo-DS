```
Difficulty: HARD
入选理由: 能力检测 + 最左二分的典型题目
Similar to leetcode 475

You are given a list of integers nums representing coordinates of houses on a 1-dimensional line. You have 3 street lights that you can put anywhere on the coordinate line and a light at coordinate x lights up houses in [x - r, x + r], inclusive. Return the smallest r required such that we can place the 3 lights and all the houses are lit up.

Constraints

n ≤ 100,000 where n is the length of nums
Example 1
Input
nums = [3, 4, 5, 6]
Output
0.5
Explanation
If we place the lamps on 3.5, 4.5 and 5.5 then with r = 0.5 we can light up all 4 houses.
```;
/*
思路：
参考一楼大佬写的答案。本质是找出合适的直径来避免小数问题
首先排序，然后处理边界条件，用一个二分查找来搜索半径，如果符合条件则继续调用canCoverAll函数，否则左移边界d。
canCoverAll函数本质是对左边界，即最终寻找的值是nums[0]+d，其中d为直径。(nums[n-1] - nums[0]) / 3可以算出能覆盖所有房子的直径。
先找左边界：nums[0]+d进行二分查找
再找有边界：nums[n-1]-d进行二分查找
最后判断中间值可获得最佳情况
--------------------------------------
我们做(整数)二分搜索, 比较靠谱的方法是枚举直径。

而实现时, 我们需要考虑下面这些:

1.有3盏灯, 需要3个位置来放, 意味着房子的数量 >=4 才能放下。
2.因为有3盏灯，直径的最大值是最右侧房子和最左侧房子坐标之差的1/3，因此右指针初始化为right = (nums[N-1] - nums[0]) / 3
3.枚举直径d, 如果当前直径mid可以覆盖所有的房子(canCoverAll == true)，那么当前mid可能偏大，也可能就是最小直径，令 right= mid - 1(如果确实偏大就丢弃了，如果确实是最小直径那循环会停止，left就是最小直径，返回left / 2)
4.如果当前直径mid不可以覆盖所有房子(canCoverAll == false)，那么当前mid偏小，增大mid，left = mid + 1
5.此时, 我们找到了最小直径left, 而所求的最小半径即为left的一半。
*/
