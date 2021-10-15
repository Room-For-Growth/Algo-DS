```
给你一个二维数组 tasks ，用于表示 n​​​​​​ 项从 0 到 n - 1 编号的任务。其中 tasks[i] = [enqueueTimei, processingTimei] 意味着第 i​​​​​​​​​​ 项任务将会于 enqueueTimei 时进入任务队列，需要 processingTimei 的时长完成执行。

现有一个单线程 CPU ，同一时间只能执行 最多一项 任务，该 CPU 将会按照下述方式运行：

如果 CPU 空闲，且任务队列中没有需要执行的任务，则 CPU 保持空闲状态。
如果 CPU 空闲，但任务队列中有需要执行的任务，则 CPU 将会选择 执行时间最短 的任务开始执行。如果多个任务具有同样的最短执行时间，则选择下标最小的任务开始执行。
一旦某项任务开始执行，CPU 在 执行完整个任务 前都不会停止。
CPU 可以在完成一项任务后，立即开始执行一项新任务。

返回 CPU 处理任务的顺序。

You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer array tasks, where tasks[i] = [enqueueTimei, processingTimei] means that the i​​​​​​th​​​​ task will be available to process at enqueueTimei and will take processingTimei to finish processing.

You have a single-threaded CPU that can process at most one task at a time and will act in the following way:

If the CPU is idle and there are no available tasks to process, the CPU remains idle.
If the CPU is idle and there are available tasks, the CPU will choose the one with the shortest processing time. If multiple tasks have the same shortest processing time, it will choose the task with the smallest index.
Once a task is started, the CPU will process the entire task without stopping.
The CPU can finish a task then start a new one instantly.
Return the order in which the CPU will process the tasks.

示例 1：

输入：tasks = [[1,2],[2,4],[3,2],[4,1]]
输出：[0,2,3,1]
解释：事件按下述流程运行：
- time = 1 ，任务 0 进入任务队列，可执行任务项 = {0}
- 同样在 time = 1 ，空闲状态的 CPU 开始执行任务 0 ，可执行任务项 = {}
- time = 2 ，任务 1 进入任务队列，可执行任务项 = {1}
- time = 3 ，任务 2 进入任务队列，可执行任务项 = {1, 2}
- 同样在 time = 3 ，CPU 完成任务 0 并开始执行队列中用时最短的任务 2 ，可执行任务项 = {1}
- time = 4 ，任务 3 进入任务队列，可执行任务项 = {1, 3}
- time = 5 ，CPU 完成任务 2 并开始执行队列中用时最短的任务 3 ，可执行任务项 = {1}
- time = 6 ，CPU 完成任务 3 并开始执行任务 1 ，可执行任务项 = {}
- time = 10 ，CPU 完成任务 1 并进入空闲状态


示例 2：

输入：tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]
输出：[4,3,2,0,1]
解释：事件按下述流程运行：
- time = 7 ，所有任务同时进入任务队列，可执行任务项  = {0,1,2,3,4}
- 同样在 time = 7 ，空闲状态的 CPU 开始执行任务 4 ，可执行任务项 = {0,1,2,3}
- time = 9 ，CPU 完成任务 4 并开始执行任务 3 ，可执行任务项 = {0,1,2}
- time = 13 ，CPU 完成任务 3 并开始执行任务 2 ，可执行任务项 = {0,1}
- time = 18 ，CPU 完成任务 2 并开始执行任务 0 ，可执行任务项 = {1}
- time = 28 ，CPU 完成任务 0 并开始执行任务 1 ，可执行任务项 = {}
- time = 40 ，CPU 完成任务 1 并进入空闲状态

 

提示：

tasks.length == n
1 <= n <= 105
1 <= enqueueTimei, processingTimei <= 109
```;

/*
 * solution 1 from leetcode, 580 ms
 */
var getOrder = function (tasks) {
	// time used by cpu sofar
	let time = 1;

	// util. function for comparing two tasks; first by processing time; and if equal index
	let cmp = (a, b) => b.proc - a.proc || b.indx - a.indx;

	// turn into nice map
	tasks = tasks.map((e, i) => ({ enqd: e[0], proc: e[1], indx: i }));

	// sort by enqueued time
	tasks = tasks.sort((a, b) => b.enqd - a.enqd);

	// priority queue
	q = [];

	// heapify function for restoring heap property
	let heapify = (i) => {
		let j = i;

		if (i * 2 - 1 < q.length && cmp(q[i - 1], q[i * 2 - 1]) < 0) j = i * 2;

		if (i * 2 < q.length && cmp(q[j - 1], q[i * 2]) < 0) j = i * 2 + 1;

		if (i == j) return;

		[q[i - 1], q[j - 1]] = [q[j - 1], q[i - 1]];
		heapify(j);
	};

	// insert element into pq
	let pqadd = function (e) {
		let p = q.length + 1;
		let r = Math.floor(p / 2);

		// insert element in last pos.
		q.push(e);

		// move elem. up into proper position
		while (p > 1) {
			if (cmp(q[r - 1], q[p - 1]) >= 0) break;

			heapify(r);

			p = r;
			r = Math.floor(p / 2);
		}
	};

	// result array
	let res = [];

	// tmp
	let p;

	while (tasks.length || q.length) {
		// if elements in queue
		if (q.length) {
			// pop. min element
			[q[0], q[q.length - 1]] = [q[q.length - 1], q[0]];
			p = q.pop();

			res.push(p.indx);

			// fix heap
			heapify(1);

			// adjust time spent by cpu
			time += p.proc;
		} else {
			// no element in queue so wait until time of elem. with
			// lowest enqueued time
			time = tasks[tasks.length - 1].enqd;
		}

		// add elements ready to be processed to queue
		while (tasks.length && tasks[tasks.length - 1].enqd <= time) {
			let t = tasks.pop();
			pqadd(t);
		}
	}

	// done
	return res;
};

/*
 * solution 2 from leetcode, 732 ms
 */
var getOrder = function (A) {
	A = A.map(([a, b], i) => [a, b, i]).sort((a, b) => b[0] - a[0]);
	let pq = new MinPriorityQueue({
			priority: ([e, p, idx]) => p + 10 ** -7 * (idx + 1),
		}),
		curtime = A[A.length - 1][0],
		res = [];
	while (A.length || pq.size()) {
		while (A.length && curtime >= A[A.length - 1][0])
			//get everything available inside the pq
			pq.enqueue(A.pop());
		if (pq.size()) {
			//make the selection
			let [e, p, idx] = pq.dequeue()['element'];
			curtime += Number(p);
			res.push(idx);
		} else if (A.length)
			//otherwise, increment time for the next element.
			curtime = A[A.length - 1][0];
	}
	return res;
};

/*
 * solution 3 from leetcode, 772 ms
 */
var getOrder = function (A) {
	A = A.map(([a, b], i) => [a, b, i]).sort((a, b) => b[0] - a[0]);
	let pq = new MinPriorityQueue({
			priority: ([e, p, idx]) => p + 10 ** -7 * (idx + 1),
		}),
		curtime = A[A.length - 1][0],
		res = [];
	while (A.length || pq.size()) {
		while (A.length && curtime >= A[A.length - 1][0])
			//get everything available inside the pq
			pq.enqueue(A.pop());
		if (pq.size()) {
			//make the selection
			let [e, p, idx] = pq.dequeue()['element'];
			curtime += Number(p);
			res.push(idx);
		} else if (A.length)
			//otherwise, increment time for the next element.
			curtime = A[A.length - 1][0];
	}
	return res;
};

/*
 * solution 4 from leetcode, 832 ms
 */
var getOrder = function (tasks) {
	const heap = new MinHeap(
		(a = [Infinity, Infinity], b = [Infinity, Infinity]) => {
			// a - [i, t] ith element takes t time.
			if (a[1] !== b[1]) return a[1] - b[1];

			return a[0] - b[0];
		}
	);

	let curTime = 0;

	tasks = tasks.map((item, idx) => [...item, idx]).sort((a, b) => a[0] - b[0]);
	let i = 0;
	let ans = [];

	while (true) {
		if (heap.size() === 0 && i === tasks.length) return ans;
		if (heap.size() === 0) {
			const startTime = tasks[i][0];
			curTime = startTime;
			while (i < tasks.length && tasks[i][0] === startTime) {
				heap.add([tasks[i][2], tasks[i][1]]);
				i++;
			}
		}
		const min = heap.pop();

		curTime = min[1] + curTime;

		ans.push(min[0]);

		while (i < tasks.length && curTime >= tasks[i][0]) {
			heap.add([tasks[i][2], tasks[i][1]]);
			i++;
		}
	}

	return ans;
};

class MinHeap {
	constructor(compFunc) {
		this.ary = [null]; // for i, lChild = 2 * i; rChild = 2 * i + 1;
		this.cf = compFunc;
	}

	size() {
		// return size of heap.
		return this.ary.length - 1;
	}

	pop() {
		// pop the min;
		this.swap(1, this.ary.length - 1);
		const ret = this.ary.pop();
		this.downHill();
		return ret;
	}

	add(x) {
		this.ary.push(x);

		this.upHill();
	}

	swap(i, j) {
		const temp = this.ary[i];
		this.ary[i] = this.ary[j];
		this.ary[j] = temp;
	}

	downHill() {
		let pidx = 1;
		let lChild = 2 * pidx,
			rChild = 2 * pidx + 1;
		while (
			this.cf(this.ary[lChild], this.ary[pidx]) < 0 ||
			this.cf(this.ary[rChild], this.ary[pidx]) < 0
		) {
			if (this.cf(this.ary[lChild], this.ary[rChild]) > 0) {
				this.swap(pidx, rChild);
				pidx = rChild;
			} else {
				this.swap(pidx, lChild);
				pidx = lChild;
			}

			lChild = 2 * pidx;
			rChild = 2 * pidx + 1;
		}
	}

	upHill() {
		let cidx = this.ary.length - 1;
		let pidx = Math.floor(cidx / 2);

		while (pidx > 0 && this.cf(this.ary[pidx], this.ary[cidx]) > 0) {
			this.swap(pidx, cidx);
			cidx = pidx;
			pidx = Math.floor(cidx / 2);
		}
	}
}
