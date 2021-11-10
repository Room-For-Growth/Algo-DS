```
实现 int sqrt(int x) 函数。
计算并返回 x 的平方根，其中 x 是非负整数。
由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

Given a non-negative integer x, compute and return the square root of x.
Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
Note: You are not allowed to use any built-in exponent function or operator, such as pow(x, 0.5) or x ** 0.5

Example 1:
Input: x = 4
Output: 2

Example 2:
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.

Constraints:
0 <= x <= 231 - 1

cheating: 
var mySqrt = function(x) {
  return Math.floor(Math.sqrt(x));
};
```;

/*
* solution 1
思路: 
这个问题分两种情况：

x 有整数平方根
x 没有整数平方根
第 1 种就是最基本的二分法查找目标值，而第 2 种可以转化成寻找最右边的满足条件的值，在这个问题里，这个条件就是 target 的平方小于 x (因为题目要求结果只保留整数部分)。

首先定义搜索区间为 [l, r]，注意左右都是闭区间。
在循环过程中，如果碰到 m 平方等于 x 就可以提前返回了。
如果 m 平方小于 x，收缩左边界，如果 m 平方大于 x，收缩右边界。
最后搜索区间会被缩小到只剩一个数字 n，如果 n 不是 x 的整数平方根，那么还剩两种情况：
如果 $n^2 > x$，那么 n-1 就是我们想要的结果，而由于 n 平方大于 x 时我们会收缩右边界，此时右指针会左移，刚好指向 n-1，同时结束了循环，最后我们返回右指针 r 即可。
如果 $n^2 < x$，那么 n 就是我们想要的结果，由于 n 平方小于 x 时左边界会收缩，此时左指针右移，右指针不动，依然指向 n，循环结束，最后我们还是返回右指针 r。
所以循环结束后我们直接返回右指针 r 即可。
需要特别注意一下的是 0 和 1 这两个数字，不过上面的算法对这两个数字也是有效的。

复杂度
时间复杂度：$O(logx)$
空间复杂度：$O(1)$
*/

/*
* solution 2

思路
此题就是我讲义提到的寻找最右边的满足条件的值 的变种。

变种的点在于本题不是给定一个有序数组和 target。不过我们只需要一点点抽象即可轻松转化为我们已知的问题，进而使用模板解决。

简单抽象一下，nums 数组就是 [0,1,2,3,4,...,x] target 就是 x 的平方根。以题目的 8 为例，我们 先不考虑结果只保留整数的部分最后再将小数部分去掉即可。·这么来看，2,...,2.82841,2.82842,.... 都是符合的。由于需要返回不带小数的，那不就是返回 最左边的满足条件的值 么？但是这种算法比较复杂，原因在于计算误差，比如题目限定了 10 ** -5 以内的误差都可以，那么是可以的。

仍然以 8 为例， 我们想要在 1,2,3,4,5... （注意我这里不考虑小数了）找满足条件的 ans，使得 ans ^ 2 刚好小于等于 8，也就是找所有满足 ans ^ 2 <= 8 的最大值，也就是 找最右边的满足条件的值 ，这里的条件就是 <= 8。

我们可以找所有满足 ans ^ 2 >= 8 的最小值，也就是 找最左边的满足条件的值，这里的条件就是 >= 8 么？很明显不可以。这样算的话，答案就是 3 了。（如果题目让我们向上取整就可以用啦 ^_^ ）
*/

/*
 * solution 3 from leetcode, 64 ms
 */
var mySqrt = function (x) {
	if (x < 2) return x;
	let mid,
		left = 2,
		right = x / 2;
	while (left <= right) {
		mid = Math.floor((right + left) / 2);
		let n = mid * mid;
		if (n == x) return mid;
		if (n < x) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	return Math.floor(right);
};

/*
 * solution 4 from leetcode, 72 ms
 */
var mySqrt = function (x) {
	if (x < 2) return x;

	let start = 2;
	let end = x;
	let ans = 1;
	while (start <= end) {
		let mid = Math.floor((start + end) / 2);
		let guess = mid * mid;

		if (guess > x) {
			end = mid - 1;
		} else if (guess < x) {
			start = mid + 1;
			ans = mid;
		} else {
			return mid;
		}
	}

	return ans;
};

/*
 * solution 5 from leetcode, 80 ms
 */
var mySqrt = function (x) {
	if (x === 0) return 0;
	if (x === 1) return 1;
	var left = 0;
	var right = x;
	var mid;
	var sqrt;
	var ans;
	while (left < right) {
		mid = Math.floor((left + right) / 2);
		sqrt = mid * mid;
		if (sqrt < x) {
			ans = mid;
			left = mid + 1;
		} else if (sqrt > x) {
			right = mid;
		} else {
			return mid;
		}
	}
	return ans;
};

/*
 * solution 6 牛顿迭代
 */
