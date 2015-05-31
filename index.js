function Node(data) {
	this.data = data
}

module.exports = LinkedList

function LinkedList() {
	this.head = undefined
	this.tail = undefined
	this.length = 0
}

LinkedList.prototype.push = function(item) {
	var node = new Node(item)

	if (this.length > 0) {
		this.tail.next = node
		node.prev = this.tail
		this.tail = node
	} else {
		this.head = node
		this.tail = node
	}

	this.length++

	return node
}

LinkedList.prototype.pushAll = function(arr) {
	for (var i = 0; i < arr.length; i++)
		this.push(arr[i])
}

LinkedList.prototype.unshift = function(item) {
	var node = new Node(item)

	if (this.length > 0) {
		this.head.prev = node
		node.next = this.head
		this.head = node
	} else {
		this.head = node
		this.tail = node
	}

	this.length++

	return node
}

LinkedList.prototype.unshiftAll = function(arr) {
	for (var i = 0; i < arr.length; i++)
		this.unshift(arr[i])
}

LinkedList.prototype.foreach = LinkedList.prototype.forEach = function(fn) {
	var current = this.head
	while (current) {
		var next = current.next
		var stop = fn(current)
		if (stop)
			break
		current = next
	}
}

LinkedList.prototype.nodeIterator = function() {
	var next = this.head

	return function() {

		if (next) {
			var t = next
			next = next.next
			return t
		}
	}
}

LinkedList.prototype.iterator = function() {
	var next = this.head

	return function() {
		if (next) {
			var data = next.data
			next = next.next
			return data
		}
	}
}

LinkedList.prototype.findFirst = function(data) {
	var current = this.head

	while (current !== undefined) {
		if (current.data === data) {
			return current
		}

		current = current.next
	}

	return undefined
}

LinkedList.prototype.findAll = function(data) {
	var current = this.head
	var results = []

	while (current !== undefined) {
		if (current.data === data) {
			results.push(current)
		}

		current = current.next
	}

	return results
}

LinkedList.prototype.findFirstBy = function(predicate) {
	var current = this.head
	
	while (current !== undefined) {
		if (predicate(current.data)) {
			return current
		}

		current = current.next
	}

	return undefined
}

LinkedList.prototype.findAllBy = function(predicate) {
	var current = this.head
	var results = []

	while (current !== undefined) {
		if (predicate(current.data)) {
			results.push(current)
		}

		current = current.next
	}

	return results
}

LinkedList.prototype.remove = function(node) {

	if (!(node instanceof Node))
		throw new TypeError('remove() can only be used with node objects return from various methods of the list')

	if (this.length === 0)
		return

	if (this.head === node) {
		// its the head
		this.head = this.head.next
		if (this.head) {
			this.head.prev = undefined

			if (!this.head.next)
				this.tail = this.head // only 1 item remains

		} else {
			this.tail = undefined // was the last, now its empty - so clean tail reference too
		}

		this.length--

	} else if (this.tail === node) {
		this.tail = this.tail.prev
		this.tail.next = undefined
		this.length--
	} else if (node.prev && node.next) {
		var prev = node.prev
		var next = node.next
		prev.next = next
		next.prev = prev
		this.length--
	}

	node.prev = undefined
	node.next = undefined

	return node.data
}

LinkedList.prototype.shift = function() {
	if (this.head)
		return this.remove(this.head)
}

LinkedList.prototype.pop = function() {
	if (this.tail)
		return this.remove(this.tail)
}
