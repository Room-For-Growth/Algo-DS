```
给定一个非空的整数数组，返回其中出现频率前  k  高的元素。
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

示例 1:
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]


示例 2:
输入: nums = [1], k = 1
输出: [1]


提示：

- 你可以假设给定的  k  总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
- 你的算法的时间复杂度必须优于 O(n log n) , n  是数组的大小。
- 题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的。
- 你可以按任意顺序返回答案。

```;
/*
* solution 1 哈希表
思路
  遍历一遍数组，用哈希表统计每个数字出现的次数。
  按次数排序，然后输出前 k 个数字。
复杂度分析
  时间复杂度：$O(mlogm)$，m 是数组中不同数字的数量，最大是 N，数组的长度，这是排序的时间。
  空间复杂度：$O(m)$，m 是数组中不同数字的数量，哈希表的空间。

Runtime: 88 ms, faster than 78.37% of JavaScript online submissions
Memory Usage: 41.7 MB, less than 86.80% of JavaScript online submissions
*/
var topKFrequent = function (nums, k) {
	// 统计出现次数
	const map = {};
	for (const n of nums) {
		n in map || (map[n] = 0);
		map[n]++;
	}
	// 对次数进行排序然后输出前 k 个
	return Object.entries(map)
		.sort((a, b) => b[1] - a[1])
		.slice(0, k)
		.map((a) => a[0]);
};

/*
* solution 2 大顶堆
思路
看到 前 k 个 这种描述就能想到 堆 了，还是先把数字出现的次数统计在哈希表中，然后入堆按次数排序，再吐出来 k 个。

复杂度分析
时间复杂度：$O(klogm)$，m 是数组中不同数字的数量，堆中有 m 个元素，移除堆顶的时间是 $logm$，重复操作了 k 次。
空间复杂度：$O(m)$，m 是数组中不同数字的数量，哈希表和堆的空间。

*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
	// 统计出现次数
	const map = {};
	for (const n of nums) {
		n in map || (map[n] = 0);
		map[n]++;
	}
	// 入堆，格式是：[数字，次数]，按次数排序
	const maxHeap = new MaxHeap(Object.entries(map), function comparator(
		inserted,
		compared
	) {
		return inserted[1] < compared[1];
	});
	// 输出前 k 个
	const res = [];
	while (k-- > 0) {
		res.push(maxHeap.pop()[0]);
	}
	return res;
};

// *******************************************

class Heap {
	constructor(list = [], comparator) {
		this.list = list;

		if (typeof comparator != 'function') {
			this.comparator = function comparator(inserted, compared) {
				return inserted < compared;
			};
		} else {
			this.comparator = comparator;
		}

		this.init();
	}

	init() {
		const size = this.size();
		for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
			this.heapify(this.list, size, i);
		}
	}

	insert(n) {
		this.list.push(n);
		const size = this.size();
		for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
			this.heapify(this.list, size, i);
		}
	}

	peek() {
		return this.list[0];
	}

	pop() {
		const last = this.list.pop();
		if (this.size() === 0) return last;
		const returnItem = this.list[0];
		this.list[0] = last;
		this.heapify(this.list, this.size(), 0);
		return returnItem;
	}

	size() {
		return this.list.length;
	}
}

class MaxHeap extends Heap {
	constructor(list, comparator) {
		super(list, comparator);
	}

	heapify(arr, size, i) {
		let largest = i;
		const left = Math.floor(i * 2 + 1);
		const right = Math.floor(i * 2 + 2);

		if (left < size && this.comparator(arr[largest], arr[left])) largest = left;
		if (right < size && this.comparator(arr[largest], arr[right]))
			largest = right;

		if (largest !== i) {
			[arr[largest], arr[i]] = [arr[i], arr[largest]];
			this.heapify(arr, size, largest);
		}
	}
}

/*
* solution 3 小顶堆
思路
统计每个数字出现的次数后，维护一个大小为 k 的小顶堆。

复杂度分析
时间复杂度：$O(klogk)$。
空间复杂度：$O(m)$，m 是数组中不同数字的数量，哈希表的空间，小顶堆的空间是 $O(k)$，m >= k。

*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
	// 统计出现次数
	const map = {};
	for (const n of nums) {
		n in map || (map[n] = 0);
		map[n]++;
	}

	const minHeap = new MinHeap([], function comparator(inserted, compared) {
		return inserted[1] > compared[1];
	});

	// 维护一个大小为 k 的小顶堆，堆元素格式是：[数字，次数]，按次数排序
	Object.entries(map).forEach(([num, times]) => {
		const [, minTimes] = minHeap.peek() || [, 0];
		// 小顶堆大小还没达到 k，继续插入新元素
		if (minHeap.size() < k) {
			minHeap.insert([num, times]);
		}

		// 小顶堆大小为 k，如果新元素次数大于堆顶，弹出堆顶，插入新元素
		// 否则就不用管这个元素了
		else if (minHeap.size() === k && times > minTimes) {
			minHeap.pop();
			minHeap.insert([num, times]);
		}
	});

	// 反序输出小顶堆中的所有元素
	const res = Array(k);
	while (k-- > 0) {
		res[k] = minHeap.pop()[0];
	}
	return res;
};

// *************************************

class MinHeap extends Heap {
	constructor(list, comparator) {
		if (typeof comparator != 'function') {
			comparator = function comparator(inserted, compared) {
				return inserted > compared;
			};
		}
		super(list, comparator);
	}

	heapify(arr, size, i) {
		let smallest = i;
		const left = Math.floor(i * 2 + 1);
		const right = Math.floor(i * 2 + 2);
		if (left < size && this.comparator(arr[smallest], arr[left]))
			smallest = left;
		if (right < size && this.comparator(arr[smallest], arr[right]))
			smallest = right;

		if (smallest !== i) {
			[arr[smallest], arr[i]] = [arr[i], arr[smallest]];
			this.heapify(arr, size, smallest);
		}
	}
}

/*
* solution 4 快速选择

思路
https://github.com/suukii/Articles/blob/master/articles/dsa/quick_select.md

复杂度分析
时间复杂度：$O(N)$，平均是 $O(N)$，虽然理论上最差情况是 $O(N^2)$，但实际应用的话效率还是不错的。
空间复杂度：$O(N)$，哈希表的空间是 $O(m)$，m 是数组中不同数字的数量。快速选择中递归栈最差应该是 $O(N)$。
*/
var topKFrequent = function (nums, k) {
	// 统计出现次数
	const map = {};
	for (const n of nums) {
		n in map || (map[n] = 0);
		map[n]++;
	}

	const list = Object.entries(map);
	quickSelect(list, k, 0, list.length - 1, function (item, pivot) {
		return item[1] >= pivot[1];
	});

	return list.slice(0, k).map((el) => el[0]);
};

/**
 * 把 arr[r] 当成是 pivot
 * 把大于等于 pivot 的数字放到左边
 * 把小于 pivot 的数字放到右边
 * @param {number[]} arr
 * @param {number} l
 * @param {number} r
 */
function partition(arr, l, r, comparator) {
	if (typeof comparator != 'function') {
		comparator = function (num, pivot) {
			return num >= pivot;
		};
	}

	let i = l;
	for (let j = l; j < r; j++) {
		if (comparator(arr[j], arr[r])) {
			[arr[i], arr[j]] = [arr[j], arr[i]];
			i++;
		}
	}
	// 将 pivot 换到分界点
	[arr[i], arr[r]] = [arr[r], arr[i]];
	// 返回 pivot 的下标
	return i;
}

/**
 * 寻找第 k 大元素
 * 如果 pivot 的下标刚好是 k - 1，那我们就找到了
 * 如果下标大于 k - 1，那就在 [left, pivotIndex - 1] 这段找第 k 大元素
 * 如果下标小于 k - 1，那就对 [pivotIndex + 1, right] 这段找第 k - pivotIndex + left - 1 大元素
 * @param {number[]} list
 * @param {number} left
 * @param {number} right
 * @param {number} k
 * @param {function} comparator
 */
function quickSelect(list, k, left = 0, right = list.length - 1, comparator) {
	if (left >= right) return list[left];
	const pivotIndex = partition(list, left, right, comparator);

	if (pivotIndex - left === k - 1) return list[pivotIndex];
	else if (pivotIndex - left > k - 1)
		return quickSelect(list, k, left, pivotIndex - 1, comparator);
	else
		return quickSelect(
			list,
			k - pivotIndex + left - 1,
			pivotIndex + 1,
			right,
			comparator
		);
}

/*
 * solution 5 from leetcode, fastest, 60ms
 */
var topKFrequent = function (nums, k) {
	let map = new Map();
	let freqArr = [];
	let res = [];
	nums.forEach((num) => {
		map.set(num, (map.get(num) || 0) + 1);
	});
	for (const [num, freq] of map) {
		// freqArr[freq] = (freqArr[freq] || new Set()).add(num);
		if (freqArr[freq]) {
			freqArr[freq].add(num);
		} else {
			freqArr[freq] = new Set([num]);
		}
	}
	for (let i = freqArr.length - 1; i >= 0; i--) {
		if (freqArr[i]) res.push(...freqArr[i]);
		if (res.length === k) break;
	}
	return res;
};

/*
 * solution 6 from leetcode, 64ms
 */
var topKFrequent = function (nums, k) {
	let frequency = new Map();

	for (let i = 0; i < nums.length; i++) {
		if (frequency.has(nums[i])) {
			frequency.set(nums[i], frequency.get(nums[i]) + 1);
		} else {
			frequency.set(nums[i], 1);
		}
	}

	// console.log("A", Array.from(frequency.entries()));
	// console.log("A", Object.entries(frequency));
	let frequencies = Array.from(frequency.entries()).sort((b, a) => a[1] - b[1]);

	// console.log("frequencies", frequencies);

	return frequencies.slice(0, k).map((e) => e[0]);
};

/*
* solution 7 from leetcode, 68ms

*/

const topKFrequent = (nums, k) => {
	let map = new Map();
	for (let i = 0; i < nums.length; i++) {
		if (map.has(nums[i])) {
			map.set(nums[i], map.get(nums[i]) + 1);
		} else {
			map.set(nums[i], 1);
		}
	}
	let res = [...map];
	res.sort((a, b) => b[1] - a[1]);
	return res.map((n) => n[0]).slice(0, k);
};

/*
 * solution 8 from leetcode, 72ms
 */
var topKFrequent = function (nums, k) {
	let hash = {};

	for (let num of nums) {
		hash[num] = hash[num] + 1 || 1;
	}

	return Object.keys(hash)
		.sort((a, b) => hash[b] - hash[a])
		.slice(0, k);
};
