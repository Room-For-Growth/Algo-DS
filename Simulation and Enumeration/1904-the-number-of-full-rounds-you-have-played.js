```
一款新的在线电子游戏在近期发布，在该电子游戏中，以 刻钟 为周期规划若干时长为 15 分钟 的游戏对局。这意味着，在 HH:00、HH:15、HH:30 和 HH:45 ，将会开始一个新的对局，其中 HH 用一个从 00 到 23 的整数表示。游戏中使用 24 小时制的时钟 ，所以一天中最早的时间是 00:00 ，最晚的时间是 23:59 。

给你两个字符串 startTime 和 finishTime ，均符合 "HH:MM" 格式，分别表示你 进入 和 退出 游戏的确切时间，请计算在整个游戏会话期间，你完成的 完整对局的对局数 。

例如，如果 startTime = "05:20" 且 finishTime = "05:59" ，这意味着你仅仅完成从 05:30 到 05:45 这一个完整对局。而你没有完成从 05:15 到 05:30 的完整对局，因为你是在对局开始后进入的游戏；同时，你也没有完成从 05:45 到 06:00 的完整对局，因为你是在对局结束前退出的游戏。

如果 finishTime 早于 startTime ，这表示你玩了个通宵（也就是从 startTime 到午夜，再从午夜到 finishTime）。

假设你是从 startTime 进入游戏，并在 finishTime 退出游戏，请计算并返回你完成的 完整对局的对局数 。

A new online video game has been released, and in this video game, there are 15-minute rounds scheduled every quarter-hour period. This means that at HH:00, HH:15, HH:30 and HH:45, a new round starts, where HH represents an integer number from 00 to 23. A 24-hour clock is used, so the earliest time in the day is 00:00 and the latest is 23:59.

Given two strings startTime and finishTime in the format "HH:MM" representing the exact time you started and finished playing the game, respectively, calculate the number of full rounds that you played during your game session.

For example, if startTime = "05:20" and finishTime = "05:59" this means you played only one full round from 05:30 to 05:45. You did not play the full round from 05:15 to 05:30 because you started after the round began, and you did not play the full round from 05:45 to 06:00 because you stopped before the round ended.
If finishTime is earlier than startTime, this means you have played overnight (from startTime to the midnight and from midnight to finishTime).

Return the number of full rounds that you have played if you had started playing at startTime and finished at finishTime.

示例 1：

输入：startTime = "12:01", finishTime = "12:44"
输出：1
解释：你完成了从 12:15 到 12:30 的一个完整对局。
你没有完成从 12:00 到 12:15 的完整对局，因为你是在对局开始后的 12:01 进入的游戏。
你没有完成从 12:30 到 12:45 的完整对局，因为你是在对局结束前的 12:44 退出的游戏。


示例 2：

输入：startTime = "20:00", finishTime = "06:00"
输出：40
解释：你完成了从 20:00 到 00:00 的 16 个完整的对局，以及从 00:00 到 06:00 的 24 个完整的对局。
16 + 24 = 40


示例 3：

输入：startTime = "00:00", finishTime = "23:59"
输出：95
解释：除最后一个小时你只完成了 3 个完整对局外，其余每个小时均完成了 4 场完整对局。




提示：

startTime 和 finishTime 的格式为 HH:MM
00 <= HH <= 23
00 <= MM <= 59
startTime 和 finishTime 不相等
```;

/*
 * solution 1, from leetcode 72 ms
 */
var numberOfRounds = function (startTime, finishTime) {
	const start =
		parseInt(startTime.slice(0, 2)) * 4 +
		Math.ceil(parseInt(startTime.slice(3, 5)) / 15);
	const finish =
		parseInt(finishTime.slice(0, 2)) * 4 +
		Math.floor(parseInt(finishTime.slice(3, 5)) / 15);

	return startTime < finishTime
		? Math.max(0, finish - start)
		: finish - start + 96;
};

/*
 * solution 2, from leetcode ms
Approach:
Convert everything to minute and run a loop from start time in minutes to finish time in minutes
Add 24*60 minutes if finish time is less than start time
Increment the answer(except for the first occurrance) by 1 whenever minute count is multiple of 15
 */
var numberOfRounds = function (startTime, finishTime) {
	let startH,
		startM,
		finishH,
		finishM,
		start = -1,
		ans = 0,
		addition = 0,
		startInMin,
		finishInMin;
	startH = parseInt(startTime.substring(0, 2));
	startM = parseInt(startTime.substring(3));
	finishH = parseInt(finishTime.substring(0, 2));
	finishM = parseInt(finishTime.substring(3));

	if (finishH < startH || (finishH === startH && finishM < startM)) {
		//Add 24*60 minutes if finish time is less than start time
		addition = 24 * 60;
	}

	startInMin = startH * 60 + startM;
	finishInMin = finishH * 60 + finishM + addition;

	for (let i = startInMin; i <= finishInMin; i++) {
		if (i % 15 === 0) {
			if (start === -1) {
				start = 1;
			} else {
				ans++;
			}
		}
	}
	return ans;
};

/*
 * solution 3, from leetcode ms
 */

var numberOfRounds = function (startTime, finishTime) {
	var start =
		60 * parseInt(startTime.slice(0, 2)) + parseInt(startTime.slice(3));
	var end =
		60 * parseInt(finishTime.slice(0, 2)) + parseInt(finishTime.slice(3));
	if (start > end) end += 24 * 60;
	return Math.floor(end / 15) - Math.ceil(start / 15);
};

/*
 * solution 4, from leetcode 60 ms
 */
var numberOfRounds = function (startTime, finishTime) {
	const firstRound = findStart(startTime);
	const lastRound = findEnd(finishTime);
	startTime = toMinutes(startTime);
	finishTime = toMinutes(finishTime);

	const count =
		startTime <= finishTime
			? (lastRound - firstRound) / 15
			: (1440 - firstRound) / 15 + lastRound / 15;
	return count < 0 ? 0 : count;
};

function toMinutes(time) {
	let [hour, min] = time.split(':');
	return parseInt(hour) * 60 + parseInt(min);
}
function findStart(time) {
	let [hour, min] = time.split(':');
	if (parseInt(min) === 0) return parseInt(hour) * 60;
	if (parseInt(min) <= 15) return parseInt(hour) * 60 + 15;
	if (parseInt(min) <= 30) return parseInt(hour) * 60 + 30;
	if (parseInt(min) <= 45) return parseInt(hour) * 60 + 45;
	return (parseInt(hour) + 1) * 60;
}

function findEnd(time) {
	let [hour, min] = time.split(':');
	if (parseInt(min) < 15) return parseInt(hour) * 60;
	if (parseInt(min) < 30) return parseInt(hour) * 60 + 15;
	if (parseInt(min) < 45) return parseInt(hour) * 60 + 30;
	return parseInt(hour) * 60 + 45;
}

``` JavaScript
var numberOfRounds = function (startTime, finishTime) {
	const start =
		parseInt(startTime.slice(0, 2)) * 4 +
		Math.ceil(parseInt(startTime.slice(3, 5)) / 15);
	const finish =
		parseInt(finishTime.slice(0, 2)) * 4 +
		Math.floor(parseInt(finishTime.slice(3, 5)) / 15);

	return startTime < finishTime
		? Math.max(0, finish - start)
		: finish - start + 96;
};
```;
