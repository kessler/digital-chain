/**
 *    a doubly linked list
 *    
 */
class LinkedList {
	constructor() {
		this.head = undefined
		this.tail = undefined
		this.length = 0
	}

	/**
	 *    push an item to the tail of this list
	 *    
	 *    @param  {Variant} item - any kind of item can be pushed
	 *    @return {ListNode} the node wrapping the item, nodes can be used in methods such as remove()
	 *
	 *    @public
	 */
	push(item) {
		let node = new ListNode(item, this)

		if (this.length > 0) {
			this.tail.next = node
			node.prev = this.tail
			this.tail = node
		} else {
			this.head = node
			this.tail = node
		}

		this.length++;

		return node
	}

	/**
	 *    push all the items at the tail of the list
	 *    
	 *    @param  {...[Variant]} an array or just arguments to be pushed to the list, the following are equivalent:
	 *    ```js
	 *    list.pushAll(1, 2, 3)
	 *    list.pushAll([1, 2], 3)
	 *    list.pushAll([1, 2, 3])
	 *    ```
	 *    to push an array as a single item use .push(arr)
	 *    
	 *    @return {ListNode[]}
	 *
	 *    @public
	 */
	pushAll(...args) {
		let result = []

		for (let arg of args) {
			if (Array.isArray(arg)) {
				result.push(...this.pushAll(...arg))
				continue
			}

			result.push(this.push(arg))
		}

		return result
	}

	/**
	 *    remove the tail of this list, if the list has more than 1 node in it, the previous node
	 *    will become the new tail of the list
	 *    
	 *    @return {Variant} the data from the removed tail node or `undefined` if the list was empty
	 *
	 *    @public
	 */
	pop() {
		if (this.tail) {
			return this.remove(this.tail)
		}
	}

	/**
	 *    insert an item at the head of this list
	 *    
	 *    @param  {Variant} item - any kind of item can be inserted
	 *    @return {ListNode}
	 *
	 *    @public
	 */
	unshift(item) {
		let node = new ListNode(item, this)

		if (this.length > 0) {
			this.head.prev = node
			node.next = this.head
			this.head = node
		} else {
			this.head = node
			this.tail = node
		}

		this.length++;

		return node
	}

	/**
	 *	insert all the items at the head of the list
	 *    
	 *    @param  {...[Variant]} an array or just arguments to be pushed to the list, the following are equivalent:
	 *    ```js
	 *    list.unshiftAll(1, 2, 3)
	 *    list.unshiftAll([1, 2], 3)
	 *    list.unshiftAll([1, 2, 3])
	 *    ```
	 *    to push an array as a single item use .push(arr)
	 *    
	 *    @return {ListNode[]}
	 *
	 *    @public
	 */
	unshiftAll(...args) {
		let result = []
		for (let arg of args) {
			if (Array.isArray(arg)) {
				result.push(...this.unshiftAll(...arg))
				continue
			}

			result.push(this.unshift(arg))
		}

		return result
	}

	/**
	 *    remove the head of this list, if the list has more than 1 node in it, the next node
	 *    will become the new head of the list
	 *    
	 *    @return {Variant} the data from the removed head node or `undefined` if the list was empty
	 */
	shift() {
		if (this.head) {
			return this.remove(this.head)
		}
	}

	/**
	 *    Remove a node from the list
	 *    
	 *    @param  {ListNode} node - the node to remove
	 *    @return {Variant} the data contained in the removed node
	 */
	remove(node) {

		if (!(node instanceof ListNode)) {
			throw new TypeError('remove() only accept instances of ListNode')
		}

		if (node[_parent] !== this) {
			return
		}

		if (this.length === 0) {
			return
		}

		if (this.head === node) {
			// its the head
			this.head = this.head.next
			if (this.head) {
				this.head.prev = undefined

				if (!this.head.next) {
					this.tail = this.head // only 1 item remains
				}

			} else {
				this.tail = undefined // was the last, now its empty - so clean tail reference too
			}

			this.length--

		} else if (this.tail === node) {
			this.tail = this.tail.prev
			this.tail.next = undefined
			this.length--
		} else if (node.prev && node.next) {
			let prev = node.prev
			let next = node.next
			prev.next = next
			next.prev = prev
			this.length--
		}

		node.prev = undefined
		node.next = undefined

		return node.data
	}

	/**
	 *	swap the positions of node A and node B inside the list
	 *	
	 *	this method will throw an error if one or more of the arguments is not a `Node` or not a member
	 *	of this list
	 *    
	 *    @param  {ListNode} nodeA
	 *    @param  {ListNode} nodeB
	 *
	 *    @return {Boolean} returns true if a swap did occur
	 */
	swap(nodeA, nodeB) {

		if (!(nodeA instanceof ListNode)) {
			throw new TypeError('swap() can only be used with node objects, node A is not of type ListNode')
		}

		if (!(nodeB instanceof ListNode)) {
			throw new TypeError('swap() can only be used with node objects, node B is not of type ListNode')
		}

		if (nodeA[_parent] !== this) {
			throw new Error('node A is not in this list')
		}

		if (nodeB[_parent] !== this) {
			throw new Error('node B is not in this list')
		}

		if (nodeA === nodeB) {
			return false
		}

		// this should never happen, because we're testing if node a and b are part of this list
		if (this.length === 0) {
			throw new Error('list is empty, this shouldn\'t have happened, this is probably a bug')
		}

		if (nodeA === this.head) {
			this.head = nodeB
		} else if (nodeB === this.head) {
			this.head = nodeA
		}

		if (nodeA === this.tail) {
			this.tail = nodeB
		} else if (nodeB === this.tail) {
			this.tail = nodeA
		}

		let currentNodeANext = nodeA.next
		let currentNodeAPrev = nodeA.prev
		let currentNodeBNext = nodeB.next
		let currentNodeBPrev = nodeB.prev

		if (nodeA.next === nodeB) {
			currentNodeBNext = nodeB.next
			currentNodeBPrev = nodeB
			currentNodeANext = nodeA
			currentNodeAPrev = nodeA.prev
		} else if (nodeA.prev === nodeB) {
			currentNodeBNext = nodeB
			currentNodeBPrev = nodeB.prev
			currentNodeANext = nodeA.next
			currentNodeAPrev = nodeA
		}

		nodeA.next = currentNodeBNext
		nodeA.prev = currentNodeBPrev
		nodeB.next = currentNodeANext
		nodeB.prev = currentNodeAPrev

		if (currentNodeAPrev) {
			currentNodeAPrev.next = nodeB
		}

		if (currentNodeANext) {
			currentNodeANext.prev = nodeB
		}

		if (currentNodeBPrev) {
			currentNodeBPrev.next = nodeA
		}

		if (currentNodeBNext) {
			currentNodeBNext.prev = nodeA
		}

		return true
	}

	/**
	 *    @param  {function(Node, Node)} [comparator] - override the default comparator with a custom one.
	 *    ```js
	 *    // default comparator
	 *    
	 * 	function defaultComparator(a, b) {
	 * 		if (b > a) return -1
	 *		if (b < a) return 1
	 *
	 *		return 0
	 * 	}
	 *    ````
	 *
	 */
	sort(comparator) {
		if (typeof(comparator) !== 'function') {
			comparator = defaultComparator
		}

		for (let [currentData, currentNode] of this) {
			let node = currentNode
			// previous one is bigger than current
			while (node.prev && comparator(node.prev.data, currentData) > 0) {
				this.swap(node.prev, node)
			}
		}
	}

	/**
	 *    An ES6 iterator of the nodes in this list, starting from the head
	 *    
	 *    ```js
	 *    for (let node of list.nodes()) {
	 *    	console.log(node.data, node.next)
	 *    }
	 *    ```
	 *    @return {ListNodeIterator}
	 *
	 *    @public
	 */
	nodes() {
		return new NodeIterator(this)
	}

	/**
	 *    An ES6 iterator of the values in this list, starting from the head
	 *    
	 *    ```js
	 *    for (let value of list.values()) {
	 *    	console.log(value)
	 *    }
	 *    ```
	 *    @return {ValueIterator}
	 *
	 *    @public
	 */
	values() {
		return new ValueIterator(this)
	}

	/**
	 *    An ES6 iterator of the value and nodes in this list, starting from the head
	 *    
	 *    ```js
	 *    for (let [data, node] of list) {
	 *    	console.log(data === node.data)
	 *    }
	 *    ```
	 *    @return {EntryIterator}
	 *
	 *    @public
	 */
	[Symbol.iterator]() {
		return new EntryIterator(this)
	}

	/**
	 *    An ES6 iterator of the value and nodes in this list, starting from the *tail*
	 *
	 *    @return {EntryIterator}
	 *
	 *    @public
	 */
	reverseIterator() {
		return new EntryIterator(this, FROM_TAIL)
	}

	/**
	 *    find the first occurrence of this piece of data in the list, equality test 
	 *    is performed using `===`
	 *     
	 *    @param {Variant} data - data to find
	 *    @return {ListNode} the first node that contains this data
	 *
	 *    @public
	 */
	findFirst(data) {
		let current = this.head

		while (current !== undefined) {
			if (current.data === data) {
				return current
			}

			current = current.next
		}
	}

	/**
	 *    find all the occurrences of this piece of data in the list, equality test 
	 *    is performed using `===`
	 *    this will traverse the entire list
	 *     
	 *    @param {Variant} data - data to find
	 *    @return {ListNode[]} an array of nodes that contain this data
	 *
	 *    @public
	 */
	findAll(data) {
		let current = this.head
		let results = []

		while (current !== undefined) {
			if (current.data === data) {
				results.push(current)
			}

			current = current.next
		}

		return results
	}

	/**
	 *    finds the first node in the list where the predicate function returns `true`
	 *     
	 *    @param {function(Variant)} predicate - a function that returns `true` for nodes that should be included in the search results
	 *    
	 *    @return {ListNode} the first node that was found
	 *
	 *    @public
	 */
	findFirstBy(predicate) {
		let current = this.head

		while (current !== undefined) {
			if (predicate(current.data)) {
				return current
			}

			current = current.next
		}
	}

	/**
	 *    finds the all the nodes in the list where the predicate function returns `true`
	 *     
	 *    @param {function(Variant)} predicate - a function that returns `true` for nodes that should be included in the search results
	 *    
	 *    @return {ListNode[]} an array of nodes that were found
	 *
	 *    @public
	 */
	findAllBy(predicate) {
		let current = this.head
		let results = []

		while (current !== undefined) {
			if (predicate(current.data)) {
				results.push(current)
			}

			current = current.next
		}

		return results
	}

	forEach(fn) {
		let current = this.head
		while (current) {
			let next = current.next
			let stop = fn(current)
			if (stop) break
			current = next
		}
	}

	foreach(fn) {
		return this.forEach(fn)
	}

	/**
	 *	A functional iterator over the nodes in the list, prefer the new ES6 iteration methods over this
	 *    
	 *    @return {[type]}
	 */
	nodeIterator() {
		let next = this.head
		return () => {
			if (next) {
				let t = next
				next = next.next
				return t
			}
		}
	}

	iterator() {
		let next = this.head
		return () => {
			if (next) {
				let data = next.data
				next = next.next
				return data
			}
		}
	}
}

const FROM_HEAD = 1
const FROM_TAIL = 2

class EntryIterator {
	constructor(list, direction) {
		this._direction = direction || FROM_HEAD
		this._start = this._direction === FROM_HEAD ? list.head : list.tail

		this._list = list
		this._current = undefined
		this._done = this._start === undefined
	}

	next() {
		if (this._done) {
			return this
		}

		if (this._current) {
			// TODO pretty ugly, replace with polymorphism?
			if (this._direction === FROM_HEAD) {
				this._current = this._current.next
			} else {
				this._current = this._current.prev
			}
		} else {
			this._current = this._start
		}

		this._done = this._current === undefined

		return this
	}

	get value() {
		return [this._current.data, this._current]
	}

	get done() {
		return this._done
	}

	[Symbol.iterator]() {
		return this
	}
}

class ValueIterator extends EntryIterator {
	constructor(list) {
		super(list)
	}

	get value() {
		return this._current.data
	}
}

class NodeIterator extends EntryIterator {
	constructor(list) {
		super(list)
	}

	get value() {
		return this._current
	}
}

const _parent = Symbol('_parent')

/**
 *    a node in the list
 */
class ListNode {
	constructor(data, parent) {
		this.data = data
		this[_parent] = parent
	}
}

function defaultComparator(a, b) {
	if (b > a) return -1
	if (b < a) return 1

	return 0
}

module.exports = LinkedList