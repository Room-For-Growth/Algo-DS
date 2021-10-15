```
在二维平面上，有一个机器人从原点 (0, 0) 开始。给出它的移动顺序，判断这个机器人在完成移动后是否在 (0, 0) 处结束。

移动顺序由字符串表示。字符 move[i] 表示其第 i 次移动。机器人的有效动作有 R（右），L（左），U（上）和 D（下）。如果机器人在完成所有动作后返回原点，则返回 true。否则，返回 false。

注意：机器人“面朝”的方向无关紧要。 “R” 将始终使机器人向右移动一次，“L” 将始终向左移动等。此外，假设每次移动机器人的移动幅度相同。

 

示例 1:

输入: "UD"
输出: true
解释：机器人向上移动一次，然后向下移动一次。所有动作都具有相同的幅度，因此它最终回到它开始的原点。因此，我们返回 true。

示例 2:

输入: "LL"
输出: false
解释：机器人向左移动两次。它最终位于原点的左侧，距原点有两次 “移动” 的距离。我们返回 false，因为它在移动结束时没有返回原点。

https://leetcode-solution.cn/solutionDetail?type=3&id=32&max_id=2
```;
/*
 * solution 1 from leetcode, 60ms
 */
var judgeCircle = function (moves) {
	const movesArray = moves.split('');
	let horizontalCount = 0;
	let verticalCount = 0;
	const rCount = (moves.match(/R/g) || []).length;
	const lCount = (moves.match(/L/g) || []).length;
	const uCount = (moves.match(/U/g) || []).length;
	const dCount = (moves.match(/D/g) || []).length;
	return rCount === lCount && uCount === dCount;
};

/*
 * solution 2 from leetcode, 64ms
 */
var judgeCircle = function (moves) {
	let x = 0,
		y = 0;

	for (let i = 0; i < moves.length; i++) {
		x += moves[i] === 'R';
		x -= moves[i] === 'L';
		y += moves[i] === 'D';
		y -= moves[i] === 'U';
	}

	return x === 0 && y === 0;
};

/*
 * solution 3 from leetcode, 68ms
 */
function judgeCircle(moves) {
	var up_count = 0;
	var down_count = 0;

	var right_count = 0;
	var left_count = 0;

	for (var i = 0; i < moves.length; i++) {
		var move = moves[i];

		if (move === 'U') up_count++;
		else if (move === 'D') down_count++;
		else if (move === 'R') right_count++;
		else if (move === 'L') left_count++;
	}

	return up_count === down_count && right_count === left_count;
}

/*
 * solution 4 from leetcode, 72ms
 */
var judgeCircle = function (moves) {
	let x = (y = 0);
	for (let i = 0; i < moves.length; i++) {
		if (moves[i] === 'U') {
			y += 1;
		} else if (moves[i] === 'D') {
			y -= 1;
		} else if (moves[i] === 'L') {
			x -= 1;
		} else {
			x += 1;
		}
	}
	return x === 0 && y === 0;
};
