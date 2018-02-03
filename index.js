const FROM_HEAD = 1
const FROM_TAIL = 2

/**
 *    iterates over values and nodes
 *    for (let [value, node] of list) {}
 *    
 */
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
class Node {
	constructor(data, parent) {
		this.data = data
		this[_parent] = parent
	}
}

class LinkedList {
	constructor() {
		this.head = undefined
		this.tail = undefined
		this.length = 0
	}

	/**
	 *    push an item to the tail of this list
	 *    
	 *    @param  {variant} item
	 *    @return {Node}
	 */
	push(item) {
		let node = new Node(item, this)

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

	pushAll(...args) {
		for (let arg of args) {
			if (Array.isArray(arg)) {
				this.pushAll(...arg)
				continue
			}

			this.push(arg)
		}
	}

	unshift(item) {
		let node = new Node(item, this)

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

	unshiftAll(...args) {
		for (let arg of args) {
			if (Array.isArray(arg)) {
				this.unshiftAll(...arg)
				continue
			}

			this.unshift(arg)
		}
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

	nodes() {
		return new NodeIterator(this)
	}

	values() {
		return new ValueIterator(this)
	}

	[Symbol.iterator]() {
		return new EntryIterator(this)
	}

	reverseIterator() {
		return new EntryIterator(this, FROM_TAIL)
	}

	findFirst(data) {
		let current = this.head

		while (current !== undefined) {
			if (current.data === data) {
				return current
			}

			current = current.next
		}
	}

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

	findFirstBy(predicate) {
		let current = this.head

		while (current !== undefined) {
			if (predicate(current.data)) {
				return current
			}

			current = current.next
		}
	}

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

	remove(node) {

		if (!(node instanceof Node)) {
			throw new TypeError('remove() can only be used with node objects return from various methods of the list')
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

	shift() {
		if (this.head) {
			return this.remove(this.head)
		}
	}

	pop() {
		if (this.tail) {
			return this.remove(this.tail)
		}
	}

	swap(nodeA, nodeB) {

		if (!(nodeA instanceof Node)) {
			throw new TypeError('swap() can only be used with node objects, node A is not of type Node')
		}

		if (!(nodeB instanceof Node)) {
			throw new TypeError('swap() can only be used with node objects, node B is not of type Node')
		}

		if (nodeA[_parent] !== this) {
			throw new Error('node A is not in this list')
		}

		if (nodeB[_parent] !== this) {
			throw new Error('node B is not in this list')
		}

		if (nodeA === nodeB) {
			return
		}

		if (this.length === 0) {
			return
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
	}

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
}

function defaultComparator(a, b) {
	if (b > a) return -1
	if (b < a) return 1

	return 0
}

module.exports = LinkedList