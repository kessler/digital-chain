var LinkedList = require('./index')
var expect = require('chai').expect

describe('Digital Chain - A linked list implementation, ', function () {
	var topic

	describe('push', function () {
		it('an item', function() {
			var node = topic.push(1)
			expect(node.data).to.equal(1)
			expect(topic.length).to.equal(1)
			expect(topic.head).to.equal(node)
			expect(topic.tail).to.equal(node)
			expect(topic.tail).to.equal(topic.head)
			expect(topic.head.data).to.equal(1)
		})

		it('two items', function() {
			var n1 = topic.push(1)
			var n2 = topic.push(2)

			expect(topic.length).to.equal(2)

			expect(topic.head).to.equal(n1)
			expect(topic.head.data).to.equal(1)

			expect(topic.tail).to.equal(n2)
			expect(topic.tail.data).to.equal(2)

			expect(topic.tail).not.to.equal(topic.head)
		})

		it('many items', function() {
			var n1 = topic.push(1)
			var n2 = topic.push(2)
			var n3 = topic.push(3)

			expect(topic.length).to.equal(3)

			expect(topic.head).to.equal(n1)
			expect(topic.head.data).to.equal(1)

			expect(topic.head.next).to.equal(n2)
			expect(topic.tail.prev).to.equal(n2)
			expect(topic.tail.prev).to.equal(topic.head.next)
			expect(topic.head.next.data).to.equal(2)

			expect(topic.tail).to.equal(n3)
			expect(topic.tail.data).to.equal(3)

			expect(topic.tail).not.to.equal(topic.head)
		})

		it('an array of items', function () {
			topic.pushAll([1, 2, 3])
			topic.pushAll([4, 5, 6])

			expect(topic.length).to.equal(6)
			expect(topic.head.data).to.equal(1)
			expect(topic.head.next.data).to.equal(2)
			expect(topic.head.next.next.data).to.equal(3)
			expect(topic.head.next.next.next.data).to.equal(4)
			expect(topic.head.next.next.next.next.data).to.equal(5)
			expect(topic.tail.data).to.equal(6)
		})
	})
	
	// TODO: want to have the same methods like javascript array
	// but the english sounds quirky
	describe('unshift (insert at head)', function () {
		it('an item', function() {	
			var node = topic.unshift(1)
			expect(topic.length).to.equal(1)
			expect(topic.head).to.equal(node)
			expect(topic.tail).to.equal(node)
			expect(topic.tail).to.equal(topic.head)
			expect(topic.head.data).to.equal(1)
		})

		it('two items', function() {
			var n1 = topic.unshift(1)
			var n2 = topic.unshift(2)

			expect(topic.length).to.equal(2)

			expect(topic.head).to.equal(n2)
			expect(topic.head.data).to.equal(2)

			expect(topic.tail).to.equal(n1)
			expect(topic.tail.data).to.equal(1)

			expect(topic.tail).not.to.equal(topic.head)
		})

		it('many items', function() {
			var n1 = topic.unshift(1)
			var n2 = topic.unshift(2)
			var n3 = topic.unshift(3)

			expect(topic.length).to.equal(3)

			expect(topic.head).to.equal(n3)
			expect(topic.head.data).to.equal(3)

			expect(topic.head.next).to.equal(n2)
			expect(topic.tail.prev).to.equal(n2)
			expect(topic.tail.prev).to.equal(topic.head.next)
			expect(topic.head.next.data).to.equal(2)

			expect(topic.tail).to.equal(n1)
			expect(topic.tail.data).to.equal(1)

			expect(topic.tail).not.to.equal(topic.head)
		})

		it('an array of items', function () {
			topic.unshiftAll([1, 2, 3])
			topic.unshiftAll([4, 5, 6])

			expect(topic.length).to.equal(6)
			expect(topic.head.data).to.equal(6)
			expect(topic.head.next.data).to.equal(5)
			expect(topic.head.next.next.data).to.equal(4)
			expect(topic.head.next.next.next.data).to.equal(3)
			expect(topic.head.next.next.next.next.data).to.equal(2)
			expect(topic.tail.data).to.equal(1)
		})
	})

	describe('remove', function () {
		it('head when there is only one node', function () {
			var n1 = topic.push(1)
			
			topic.remove(n1)

			expect(topic.head).to.be.undefined
			expect(topic.length).to.equal(0)
		})

		it('can only be used with node objects', function() {
			expect(function () {
				topic.remove(1)
			}).to.throw(TypeError)
		})

		it('head where there are two nodes', function() {
			var n1 = topic.push(1)
			var n2 = topic.push(2)

			topic.remove(n1)

			expect(topic.head).to.equal(n2)
			expect(n2.prev).to.be.undefined
			expect(topic.length).to.equal(1)
		})

		it('tail where there are two nodes', function() {
			var n1 = topic.push(1)
			var n2 = topic.push(2)

			topic.remove(n2)

			expect(topic.head).to.equal(n1)
			expect(topic.head.next).to.be.undefined
			expect(topic.length).to.equal(1)
		})

		it('a node where there are many nodes', function() {
			var n1 = topic.push(1)
			var n2 = topic.push(2)
			var n3 = topic.push(3)

			topic.remove(n2)
			
			expect(topic.head).to.equal(n1)
			expect(topic.tail).to.equal(n3)
			
			expect(topic.tail).to.equal(topic.head.next)
			expect(topic.head).to.equal(topic.tail.prev)

			expect(topic.length).to.equal(2)
		})

		it('all nodes when there are many nodes', function () {
			for (var i = 0; i < 10; i++) {				
				topic.push(i)
			}

			var removeCount = 10
			while (topic.head) {
				topic.remove(topic.head)
				removeCount--
			}

			expect(removeCount).to.equal(removeCount)
			expect(topic.length).to.equal(0)
			expect(topic.head).to.be.undefined
			expect(topic.tail).to.be.undefined
		})

	})

	
	describe('pop', function () {
		it('from a list with one node', function () {
			var n1 = topic.push(1)

			var nPop = topic.pop()

			expect(topic.length).to.equal(0)
			expect(nPop).to.equal(n1)
			expect(topic.head).to.be.undefined
			expect(topic.tail).to.be.undefined
		})

		it('from a list with many nodes', function () {
			var n1 = topic.push(1)
			var n2 = topic.push(2)
			var n3 = topic.push(3)

			var nPop = topic.pop()

			expect(topic.length).to.equal(2)
			expect(nPop).to.equal(n3)
			expect(topic.head).to.equal(n1)
			expect(topic.tail).to.equal(n2)

			nPop = topic.pop()

			expect(topic.length).to.equal(1)
			expect(nPop).to.equal(n2)
			expect(topic.head).to.equal(n1)
			expect(topic.tail).to.equal(n1)
		})
	})

	describe('shift', function () {
		it('from a list with one node', function () {
			var n1 = topic.push(1)

			var node = topic.shift()

			expect(topic.length).to.equal(0)
			expect(node).to.equal(n1)
			expect(topic.head).to.be.undefined
			expect(topic.tail).to.be.undefined
		})

		it('from a list with many nodes', function () {
			var n1 = topic.push(1)
			var n2 = topic.push(2)
			var n3 = topic.push(3)

			var node = topic.shift()

			expect(topic.length).to.equal(2)
			expect(node).to.equal(n1)
			expect(topic.head).to.equal(n2)
			expect(topic.tail).to.equal(n3)

			node = topic.shift()

			expect(topic.length).to.equal(1)
			expect(node).to.equal(n2)
			expect(topic.head).to.equal(n3)
			expect(topic.tail).to.equal(n3)
		})
	})

	describe('iteartion', function () {
		it('foreach', function() {
			topic.push(1)
			topic.push(2)
			topic.push(3)

			var count = 0
			topic.foreach(function (item) {
				expect(item.data).to.equal(++count)
			})

			expect(count).to.equal(3)
		})

		it('foreach - break in the middle', function () {
			topic.push(1)
			topic.push(2)
			topic.push(3)

			var count = 0
			topic.foreach(function (item) {
				expect(item.data).to.equal(++count)
				return true
			})

			expect(count).to.equal(1)
		})

		it('iterator', function () {
			var nodes = []
			
			nodes.push(topic.push(1))
			nodes.push(topic.push(2))
			nodes.push(topic.push(3))

			expect(nodes.length).to.equal(3)

			var iterator = topic.iterator()
			
			var current
			var count = 0
			
			while (current = iterator()) {
				expect(current).to.equal(nodes[count++])
			}
			
			expect(count).to.equal(nodes.length)
		})

		it('data iterator', function () {
			var data = ['a', 'b', 'c']

			topic.pushAll(data)
			
			var iterator = topic.dataIterator()
			
			var current
			var count = 0
			
			while (current = iterator()) {
				expect(current).to.equal(data[count++])
			}
			
			expect(count).to.equal(data.length)
		})
	})
	
	describe('find', function () {
		it('the first node using strict equality', function () {
			var na = topic.push('a')
			var nb = topic.push('b')
			var nc = topic.push('c')

			var found = topic.findFirst('b')

			expect(found.data).to.equal('b')
			expect(found).not.to.be.undefined
			expect(found).to.equal(nb)
		})

		it('first return undefined if node is not found', function () {
			var na = topic.push('a')
			var nb = topic.push('b')
			var nc = topic.push('c')

			var found = topic.findFirst('d')

			expect(found).to.be.undefined
		})

		it('all the nodes using strict equality', function () {
			var na = topic.push('a')
			var nb = topic.push('b')
			var nc = topic.push('b')
			
			var found = topic.findAll('b')

			expect(found).to.have.length(2)
			expect(found[0]).to.equal(nb)
			expect(found[1]).to.equal(nc)
		})

		it('all returns a zero length array if nodes are not found', function () {
			var na = topic.push('a')
			var nb = topic.push('b')
			var nc = topic.push('c')

			var found = topic.findAll('d')

			expect(found).to.have.length(0)
		})

		it('the first node by using custom predicate', function () { 
			var na = topic.push('a')
			var nb = topic.push('b')
			var nc = topic.push('b')
			var count = 0

			var found = topic.findFirstBy(function (item) {
				count ++
				return item === 'b'
			})

			expect(count).to.equal(2)
			expect(found.data).to.equal('b')
			expect(found).to.equal(nb)
		})

		it('all the nodes by using custom predicate', function () { 
			var na = topic.push('a')
			var nb = topic.push('b')
			var nc = topic.push('b')
			var count = 0

			var found = topic.findAllBy(function (item) {
				count ++
				return item === 'b'
			})

			expect(count).to.equal(3)
			expect(found).to.have.length(2)
			expect(found[0]).to.equal(nb)
			expect(found[1]).to.equal(nc)
		})
	
	})
		
	it.skip('bench', function () {

	})

	beforeEach(function () {
		topic = new LinkedList()
	})
})
