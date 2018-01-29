class DataIterator {
	constructor(list) {
		this._list = list
		this._current = list.head
	}

	next() {
		let current = this._current

		if (!current) {
			return { done: true }
		}

		this._current = current.next

		return {
			done: false,
			value: [
				current.data,
				current
			]
		}
	}
}

class Node {
	constructor(data) {
		this.data = data
	}
}

class LinkedList {
	constructor() {
		this.head = undefined
		this.tail = undefined
		this.length = 0
		this.foreach = this.forEach
	}

	/**
	 *    push an item to the tail of this list
	 *    
	 *    @param  {variant} item
	 *    @return {Node}
	 */
	push(item) {
		let node = new Node(item)

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

	pushAll(arr) {
		for (let i = 0; i < arr.length; i++) {
			this.push(arr[i])
		}
	}

	unshift(item) {
		let node = new Node(item)

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

	unshiftAll(arr) {
		for (let i = 0; i < arr.length; i++) {
			this.unshift(arr[i])
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

	[Symbol.iterator]() {
		return new DataIterator(this)
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
}

module.exports = LinkedList