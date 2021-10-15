```
给你一个整数数组 nums，请你将该数组升序排列。

Given an array of integers nums, sort the array in ascending order.

示例 1：

输入：nums = [5,2,3,1]
输出：[1,2,3,5]
示例 2：

输入：nums = [5,1,1,2,0,0]
输出：[0,0,1,1,2,5]
 

提示：

1 <= nums.length <= 50000
-50000 <= nums[i] <= 50000

```;
/*
 * cheating with sort method
 */
var sortArray = function (nums) {
	return nums.sort((a, b) => a - b);
};

/*
 * solution merge sort,
 */

function merge(left, right) {
	let arr = [];
	// Break out of loop if any one of the array gets empty
	while (left.length && right.length) {
		// Pick the smaller among the smallest element of left and right sub arrays
		if (left[0] < right[0]) {
			arr.push(left.shift());
		} else {
			arr.push(right.shift());
		}
	}
	// (in case we didn't go through the entire left or right array)
	return [...arr, ...left, ...right];
}

function sortArray(nums) {
	if (nums.length < 2) {
		return nums;
	}
	const middle = Math.floor(nums.length / 2);
	const left = nums.slice(0, middle);
	const right = nums.slice(middle);

	return merge(sortArray(left), sortArray(right));
}

/*
 * solution quick sort, from leetcode, 108ms
 */
var sortArray = function (nums) {
	if (nums.length < 2) {
		return nums;
	}

	quickSort(nums, 0, nums.length - 1);

	return nums;
};

function quickSort(arr, start, end) {
	if (start >= end) {
		return;
	}

	let mid = Math.floor((start + end) / 2);

	let left = start;
	let right = end;
	let pivot = arr[mid];

	while (left <= right) {
		while (left <= right && arr[left] < pivot) {
			left++;
		}

		while (left <= right && pivot < arr[right]) {
			right--;
		}

		if (left <= right) {
			[arr[left], arr[right]] = [arr[right], arr[left]];
			left++;
			right--;
		}
	}

	quickSort(arr, start, right);
	quickSort(arr, left, end);
}

/*
 * solution quick sort 2, from leetcode, 116ms
 */
const sortArray = (nums) => {
	// [5,2,3,1]
	const quickSort = (start, end) => {
		let left = start;
		let right = end;
		const pivot = nums[Math.floor((left + right) / 2)]; // 2

		while (true) {
			while (nums[left] < pivot) {
				// 5<2
				left++;
			}
			while (pivot < nums[right]) {
				// 2 < 3 right:2
				right--;
			}
			if (right <= left) {
				// 2 <= 0
				break;
			} else {
				const tmp = nums[left];
				5;
				nums[left] = nums[right]; // 3
				nums[right] = tmp; // 5
				left++;
				right--;
			}
		}

		if (start < left - 1) {
			quickSort(start, left - 1);
		}
		if (right + 1 < end) {
			quickSort(right + 1, end);
		}
	};

	quickSort(0, nums.length - 1);
	return nums;
};
