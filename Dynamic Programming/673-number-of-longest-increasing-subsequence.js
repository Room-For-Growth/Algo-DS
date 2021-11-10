```
Given an integer array nums, return the number of longest increasing subsequences.

Notice that the sequence has to be strictly increasing.


Example 1:
Input: nums = [1,3,5,4,7]
Output: 2
Explanation: The two longest increasing subsequences are [1, 3, 4, 7] and [1, 3, 5, 7].

Example 2:
Input: nums = [2,2,2,2,2]
Output: 5
Explanation: The length of longest continuous increasing subsequence is 1, and there are 5 subsequences' length is 1, so output 5.

```;
/*

* 思路
这道题其实就是**最长上升子序列（LIS）**的变种题。如果对 LIS 不了解的可以先看下我之前写的一篇文章穿上衣服我就不认识你了？来聊聊最长上升子序列[1]，里面将这种题目的套路讲得很清楚了。

回到这道题。题目让我们求最长递增子序列的个数，而不是通常的最长递增子序列的长度。 因此我想到使用另外一个变量记录最长递增子序列的个数信息即可。类似的套路有股票问题，这种问题的套路在于只是单独存储一个状态以无法满足条件，对于这道题来说，我们存储的单一状态就是最长递增子序列的长度。那么一个自然的想法是不存储最长递增子序列的长度，而是仅存储最长递增子序列的个数可以么？这是不可以的，因为最长递增子序列的个数 隐式地条件是你要先找到最长的递增子序列才行。

如何存储两个状态呢？一般有两种方式：
  -二维数组 dp[i][0] 第一个状态 dp[i][1] 第二个状态
  -dp1[i] 第一个状态 dp2[i] 第二个状态

使用哪个都可以，空间复杂度也是一样的，使用哪种看你自己。这里我们使用第一种，并且 dp[i][0] 表示 以 nums[i] 结尾的最长上升子序列的长度，dp[i][1] 表示 以 nums[i] 结尾的长度为 dp[i][0] 的子序列的个数。
明确了要多存储一个状态之后，我们来看下状态如何转移。

LIS 的一般过程是这样的：
for i in range(n):
    for j in range(i + 1, n):
        if nums[j] > nums[i]:
            # ...

这道题也是类似，遍历到 nums[j] 的时候往前遍历所有的 满足 i < j 的 i。
  -如果 nums[j] <= nums[i]， nums[j] 无法和前面任何的序列拼接成递增子序列
  -否则说明我们可以拼接。但是拼接与否取决于拼接之后会不会更长。如果更长了就拼，否则不拼。

上面是 LIS 的常规思路，下面我们加一点逻辑。
  -如果拼接后的序列更长，那么 dp[j][1] = dp[i][1] （这点容易忽略）
  -如果拼接之后序列一样长， 那么 dp[j][1] += dp[i][1]。
  -如果拼接之后变短了，则不应该拼接。

* 关键点解析
最长上升子序列问题 (https://lucifer.ren/blog/2020/06/20/LIS/)
dp[j][1] = dp[i][1] 容易忘记
*/

/*
* sample solution, 108ms
复杂度分析
时间复杂度：$O(N^2)$。N 是数组 nums 的长度。
空间复杂度：$O(N)$。N 是辅助数组 length 和 count 的长度。
*/
var findNumberOfLIS = function (nums) {
	const n = nums.length;
	const length = Array.from({ length: n }).fill(1);
	const count = Array.from({ length: n }).fill(1);

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < i; j++) {
			if (nums[j] >= nums[i]) continue;

			if (length[j] + 1 > length[i]) {
				length[i] = length[j] + 1;
				count[i] = count[j];
			} else if (length[j] + 1 == length[i]) {
				count[i] += count[j];
			}
		}
	}

	const longest = Math.max(...length);
	return length.reduce(
		(cnt, len, i) => (len == longest ? cnt + count[i] : cnt),
		0
	);
};

/*
 * solution 2 from leetcode, 80ms
 */
var findNumberOfLIS = function (nums) {
	let maxLen = new Array(nums.length).fill(0); // of sub sequence ending at ith index
	let maxOccur = new Array(nums.length).fill(0);
	maxLen[0] = 1;
	maxOccur[0] = 1;
	let finalMaxLen = 1;
	let finalMaxOccur = 1;

	for (let i = 1; i < nums.length; i++) {
		let curMaxLen = 1;
		let curMaxOccur = 1;
		for (let j = 0; j < i; j++) {
			if (nums[i] > nums[j]) {
				if (curMaxLen < maxLen[j] + 1) {
					curMaxLen = maxLen[j] + 1;
					curMaxOccur = maxOccur[j];
				} else if (curMaxLen === maxLen[j] + 1) {
					curMaxOccur += maxOccur[j];
				}
			}
		}
		maxLen[i] = curMaxLen;
		maxOccur[i] = curMaxOccur;
		if (finalMaxLen < maxLen[i]) {
			finalMaxLen = maxLen[i];
			finalMaxOccur = maxOccur[i];
		} else if (finalMaxLen === maxLen[i]) {
			finalMaxOccur += maxOccur[i];
		}
	}

	return finalMaxOccur;
};

/*
 * solution 3 from leetcode, 88ms
 */
var findNumberOfLIS = function (nums) {
	let maxSize = 1;
	const dp = new Array(nums.length);
	const dpSizes = new Array(nums.length);
	for (let t = 0; t < nums.length; t++) {
		let localMaxSize = -1;
		let localMaxSizeCount = 1;
		for (let r = t - 1; r >= 0; r--) {
			if (nums[r] < nums[t] && dp[r] >= localMaxSize) {
				if (dp[r] === localMaxSize) {
					localMaxSizeCount += dpSizes[r];
				} else {
					localMaxSize = dp[r];
					localMaxSizeCount = dpSizes[r];
				}
			}
		}
		if (localMaxSize === -1) {
			dp[t] = 1;
			dpSizes[t] = 1;
		} else {
			dp[t] = localMaxSize + 1;
			dpSizes[t] = localMaxSizeCount;
			if (dp[t] > maxSize) {
				maxSize = dp[t];
			}
		}
	}
	let countMaxSize = 0;
	for (let t = 0; t < dp.length; t++) {
		if (dp[t] === maxSize) {
			countMaxSize += dpSizes[t];
		}
	}
	// console.log(maxSize, countMaxSize)
	// console.log(dp.toString())
	// console.log(dpSizes.toString())
	return countMaxSize;
};

/*
 * solution 4 from leetcode, 92ms
 */
var findNumberOfLIS = function (nums) {
	const n = nums.length;
	let dp = new Array(n).fill(1);
	let items = new Array(n).fill(1);
	let maxValue = 1;
	let maxCount = 0;

	for (let i = 1; i < n; i++) {
		let max = 0;
		let count = 0;
		for (let j = i - 1; j >= 0; j--) {
			if (nums[i] > nums[j]) {
				if (dp[j] > max) {
					max = dp[j];
					count = items[j];
				} else if (dp[j] === max) {
					count += items[j];
				}
			}
		}

		dp[i] = max + 1;
		items[i] = count === 0 ? 1 : count;

		if (dp[i] > maxValue) {
			maxValue = dp[i];
		}
	}

	for (let i = 0; i < n; i++) {
		if (dp[i] === maxValue) {
			maxCount += items[i];
		}
	}

	return maxCount;
};

/*
 * solution 5 from leetcode, 112ms
 */
var findNumberOfLIS = function (nums) {
	// 初始化dp数组
	let len = nums.length;
	let dp = Array(len).fill(1);
	let count = Array(len).fill(1);
	let res = 0;
	// 找到最长子序列并做好标记
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < i; j++) {
			//只有这样才能出现更长的LIS 不明白就先去看LeetCode300题 题解
			if (nums[i] > nums[j]) {
				//第1种情况： LIS出现在以nums[j]结尾的地方而不是以nums[i]结尾的地方
				if (dp[j] + 1 > dp[i]) {
					dp[i] = dp[j] + 1;
					count[i] = count[j];
				} else if (dp[j] + 1 === dp[i]) {
					//第2种情况： LIS同时出现在以nums[j]结尾的地方和以nums[i]结尾的地方
					dp[i] = dp[i];
					count[i] += count[j];
				} else {
					//第3种情况： LIS出现在以nums[i]结尾的地方而不是以nums[j]结尾的地方 （可以省略 写出来仅仅为了方便读者理解）
					dp[i] = dp[i];
					count[i] = count[i];
				}
			}
		}
	}
	// 统计一下 max 出现的次数
	let max = Math.max(...dp);
	//这里想要统计所有LIS的个数就要遍历
	for (let i = 0; i < len; i++) {
		if (dp[i] === max) {
			res += count[i];
		}
	}
	return res;
};

``` JavaScript
const findNumberOfLIS = nums => {
  const dp = new Array(nums.length);
  for (let i = 0; i < nums.length; ++i) {
    dp[i] = [1, 0];
  }
  dp[0] = [1, 1];

  let lis = 1;
  for (let i = 1; i < nums.length; ++i) {
    let maxLen = 0;
    for (let j = i - 1; j >= 0; --j) {
      if (nums[i] > nums[j]) {
        // dp[i][0] += dp[j][0];
        // lis = Math.max(lis, dp[i][0]);
        maxLen = Math.max(maxLen, dp[j][0]);
        // break;
      }
    }
    dp[i][0] += maxLen;
    lis = Math.max(lis, dp[i][0]);

    for (let j = i - 1; j >= 0; --j) {
      if (nums[i] > nums[j] && dp[i][0] - 1 === dp[j][0]) {
        dp[i][1] += dp[j][1];
      }
    }
    dp[i][1] = Math.max(dp[i][1], 1);
  }

  return dp.map(x => x[0] === lis ? x[1] : 0).reduce((x, y) => x + y, 0);
}
```;
