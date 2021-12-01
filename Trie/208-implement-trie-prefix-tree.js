```
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.
```;
class Trie {
	constructor() {
		this.root = Object.create(null);
	}
	insert(word) {
		let node = this.root;
		for (const c of word) {
			if (!node[c]) node[c] = Object.create(null);
			node = node[c];
		}
		node.isWord = true;
	}
	traverse(word) {
		let node = this.root;
		for (const c of word) {
			node = node[c];
			if (!node) return null;
		}
		return node;
	}
	search(word) {
		const node = this.traverse(word);
		return !!node && !!node.isWord;
	}
	startsWith(prefix) {
		return !!this.traverse(prefix);
	}
}

/*
 * solution 1 from leetcode, 144ms
 */
const Node = function (_word) {
	this.word = _word;
	this.left = null;
	this.right = null;
};

var Trie = function () {
	this.head = null;
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
	if (this.head === null) {
		this.head = new Node(word);
		return;
	}

	let currNode = this.head;
	while (currNode != null) {
		if (word < currNode.word) {
			if (currNode.left === null) {
				currNode.left = new Node(word);
				return;
			}
			currNode = currNode.left;
		} else {
			if (currNode.right === null) {
				currNode.right = new Node(word);
				return;
			}
			currNode = currNode.right;
		}
	}
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
	let currNode = this.head;
	while (currNode != null) {
		if (currNode.word === word) {
			return true;
		}

		if (word < currNode.word) {
			currNode = currNode.left;
		} else {
			currNode = currNode.right;
		}
	}
	return false;
};

/**
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
	let currNode = this.head;
	while (currNode != null) {
		if (currNode.word.startsWith(prefix)) {
			return true;
		}

		if (prefix < currNode.word) {
			currNode = currNode.left;
		} else {
			currNode = currNode.right;
		}
	}
	return false;
};

/*
 * solution 2 from leetcode, 168ms

* 思路
前缀树
每次从根节点开始，一直向下寻找
当存在时，移动指针，不存在则直接结束

* 复杂度分析
时间复杂度：O(n)，创建时O(1), 其余为O(n)，n为字符串长度
空间复杂度：O(k * n)，k为字符个数，n为一个字符串的长度
 */
/**
 * Initialize your data structure here.
 */
var Trie = function () {
	this.map = new Map();
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
	let arr = this.map.get(word[0]);
	if (arr === undefined) {
		arr = [];
	}

	arr.push(word);
	this.map.set(word[0], arr);
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
	let found = false;
	let words = this.map.get(word[0]);
	if (words === undefined) {
		return false;
	}
	for (let i = 0; i < words.length; i++) {
		let candidate = words[i];
		if (candidate === word) {
			found = true;
			break;
		}
	}

	return found;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
	let found = false;
	let words = this.map.get(prefix[0]);
	if (words === undefined) {
		return false;
	}
	for (let i = 0; i < words.length; i++) {
		let candidate = words[i];
		let match = true;
		for (let j = 0; j < prefix.length; j++) {
			if (candidate[j] !== prefix[j]) {
				match = false;
				break;
			}
		}
		if (match === true) {
			found = true;
			break;
		}
	}

	return found;
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
