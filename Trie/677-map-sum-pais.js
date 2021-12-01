```
Design a map that allows you to do the following:

Maps a string key to a given value.
Returns the sum of the values that have a key with a prefix equal to a given string.
Implement the MapSum class:

MapSum() Initializes the MapSum object.
void insert(String key, int val) Inserts the key-val pair into the map. If the key already existed, the original key-value pair will be overridden to the new one.
int sum(string prefix) Returns the sum of all the pairs' value whose key starts with the prefix.

Example 1:

Input
["MapSum", "insert", "sum", "insert", "sum"]
[[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
Output
[null, null, 3, null, 5]

Explanation
MapSum mapSum = new MapSum();
mapSum.insert("apple", 3);  
mapSum.sum("ap");           // return 3 (apple = 3)
mapSum.insert("app", 2);    
mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)
 

Constraints:

1 <= key.length, prefix.length <= 50
key and prefix consist of only lowercase English letters.
1 <= val <= 1000
At most 50 calls will be made to insert and sum.
```;
/*
 * solution 1:
 */
var MapSum = function () {
	this.map = {};
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
	this.map[key] = val;
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
	let result = 0;
	const strArr = Object.keys(this.map);
	strArr.forEach((str) => {
		if (str.startsWith(prefix)) {
			result += this.map[str];
		}
	});

	return result;
};

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */

/*
 * solution 2 from leetcode, 60ms, fastest
 */
/**
 * Initialize your data structure here.
 */
var MapSum = function () {
	this.trie = {};
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
	let curr = this.trie;

	for (let w of key) {
		if (!(w in curr)) curr[w] = {};

		curr = curr[w];
	}

	curr['val'] = val;
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
	let sum = 0,
		curr = this.trie;

	for (let w of prefix) {
		if (!(w in curr)) return 0;
		curr = curr[w];
	}

	return getTotal(curr);
};

function getTotal(curr) {
	let sum = 0;

	for (let child in curr) {
		if (child === 'val') sum += curr['val'];
		else sum += getTotal(curr[child]);
	}

	return sum;
}

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */

/*
 * solution 3 from leetcode, 64ms
 */
var MapSum = function () {
	this.map = new Map();
	this.trie = {};
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
	const present = this.map.has(key);
	this.map.set(key, val);
	if (present) return;
	let node = this.trie;
	for (let i = 0; i < key.length; ++i) {
		const ch = key[i];
		if (ch in node == false) node[ch] = { words: [] };
		node = node[ch];
		node['words'].push(key);
	}
	node['ends'] = true;
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
	const queue = [];
	let node = this.trie;
	for (let i = 0; i < prefix.length; ++i) {
		const ch = prefix[i];
		if (ch in node == false) return 0;
		node = node[ch];
	}
	return node['words'].reduce((acc, key) => (acc += this.map.get(key)), 0);
};

/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
