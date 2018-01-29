const LinkedList = require('./index')
const { expect } = require('chai')

describe('Digital Chain - A linked list implementation, ', () => {
	let topic

	describe('push', () => {
		it('an item', () => {
			let node = topic.push(1)
			expect(node.data).to.equal(1)
			expect(topic.length).to.equal(1)
			expect(topic.head).to.equal(node)
			expect(topic.tail).to.equal(node)
			expect(topic.tail).to.equal(topic.head)
			expect(topic.head.data).to.equal(1)
		})

		it('two items', () => {
			let n1 = topic.push(1)
			let n2 = topic.push(2)

			expect(topic.length).to.equal(2)

			expect(topic.head).to.equal(n1)
			expect(topic.head.data).to.equal(1)

			expect(topic.tail).to.equal(n2)
			expect(topic.tail.data).to.equal(2)

			expect(topic.tail).not.to.equal(topic.head)
		})

		it('many items', () => {
			let n1 = topic.push(1)
			let n2 = topic.push(2)
			let n3 = topic.push(3)

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

		it('an array of items', () => {
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
	describe('unshift (insert at head)', () => {
		it('an item', () => {
			let node = topic.unshift(1)
			expect(topic.length).to.equal(1)
			expect(topic.head).to.equal(node)
			expect(topic.tail).to.equal(node)
			expect(topic.tail).to.equal(topic.head)
			expect(topic.head.data).to.equal(1)
		})

		it('two items', () => {
			let n1 = topic.unshift(1)
			let n2 = topic.unshift(2)

			expect(topic.length).to.equal(2)

			expect(topic.head).to.equal(n2)
			expect(topic.head.data).to.equal(2)

			expect(topic.tail).to.equal(n1)
			expect(topic.tail.data).to.equal(1)

			expect(topic.tail).not.to.equal(topic.head)
		})

		it('many items', () => {
			let n1 = topic.unshift(1)
			let n2 = topic.unshift(2)
			let n3 = topic.unshift(3)

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

		it('an array of items', () => {
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

	describe('remove', () => {
		it('head when there is only one node', () => {
			let n1 = topic.push(1)

			topic.remove(n1)

			expect(topic.head).to.be.undefined
			expect(topic.length).to.equal(0)
		})

		it('can only be used with node objects', () => {
			expect(() => {
				topic.remove(1)
			}).to.throw(TypeError)
		})

		it('head where there are two nodes', () => {
			let n1 = topic.push(1)
			let n2 = topic.push(2)

			topic.remove(n1)

			expect(topic.head).to.equal(n2)
			expect(n2.prev).to.be.undefined
			expect(topic.length).to.equal(1)
		})

		it('tail where there are two nodes', () => {
			let n1 = topic.push(1)
			let n2 = topic.push(2)

			topic.remove(n2)

			expect(topic.head).to.equal(n1)
			expect(topic.head.next).to.be.undefined
			expect(topic.length).to.equal(1)
		})

		it('a node where there are many nodes', () => {
			let n1 = topic.push(1)
			let n2 = topic.push(2)
			let n3 = topic.push(3)

			topic.remove(n2)

			expect(topic.head).to.equal(n1)
			expect(topic.tail).to.equal(n3)

			expect(topic.tail).to.equal(topic.head.next)
			expect(topic.head).to.equal(topic.tail.prev)

			expect(topic.length).to.equal(2)
		})

		it('all nodes when there are many nodes', () => {
			for (let i = 0; i < 10; i++) {
				topic.push(i)
			}

			let removeCount = 10
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


	describe('pop', () => {
		it('from a list with one node', () => {
			let n1 = topic.push(1)

			let nPop = topic.pop()

			expect(topic.length).to.equal(0)
			expect(nPop).to.equal(n1.data)
			expect(topic.head).to.be.undefined
			expect(topic.tail).to.be.undefined
		})

		it('from a list with many nodes', () => {
			let n1 = topic.push(1)
			let n2 = topic.push(2)
			let n3 = topic.push(3)

			let nPop = topic.pop()

			expect(topic.length).to.equal(2)
			expect(nPop).to.equal(n3.data)
			expect(topic.head).to.equal(n1)
			expect(topic.tail).to.equal(n2)

			nPop = topic.pop()

			expect(topic.length).to.equal(1)
			expect(nPop).to.equal(n2.data)
			expect(topic.head).to.equal(n1)
			expect(topic.tail).to.equal(n1)
		})
	})

	describe('shift', () => {
		it('from a list with one node', () => {
			let n1 = topic.push(1)

			let node = topic.shift()

			expect(topic.length).to.equal(0)
			expect(node).to.equal(n1.data)
			expect(topic.head).to.be.undefined
			expect(topic.tail).to.be.undefined
		})

		it('from a list with many nodes', () => {
			let n1 = topic.push(1)
			let n2 = topic.push(2)
			let n3 = topic.push(3)

			let node = topic.shift()

			expect(topic.length).to.equal(2)
			expect(node).to.equal(n1.data)
			expect(topic.head).to.equal(n2)
			expect(topic.tail).to.equal(n3)

			node = topic.shift()

			expect(topic.length).to.equal(1)
			expect(node).to.equal(n2.data)
			expect(topic.head).to.equal(n3)
			expect(topic.tail).to.equal(n3)
		})
	})

	describe('iteartion', () => {
		it('foreach', () => {
			topic.push(1)
			topic.push(2)
			topic.push(3)

			let count = 0
			topic.foreach(item => {
				expect(item.data).to.equal(++count)
			})

			expect(count).to.equal(3)
		})

		it('foreach - break in the middle', () => {
			topic.push(1)
			topic.push(2)
			topic.push(3)

			let count = 0
			topic.foreach(item => {
				expect(item.data).to.equal(++count)
				return true
			})

			expect(count).to.equal(1)
		})

		it('nodeIterator', () => {
			let nodes = []

			nodes.push(topic.push(1))
			nodes.push(topic.push(2))
			nodes.push(topic.push(3))

			expect(nodes.length).to.equal(3)

			let nodeIterator = topic.nodeIterator()

			let current
			let count = 0

			while (current = nodeIterator()) {
				expect(current).to.equal(nodes[count++])
			}

			expect(count).to.equal(nodes.length)
		})

		it('iterator', () => {
			let data = ['a', 'b', 'c']

			topic.pushAll(data)

			let iterator = topic.iterator()

			let current
			let count = 0

			while (current = iterator()) {
				expect(current).to.equal(data[count++])
			}

			expect(count).to.equal(data.length)
			expect(topic.head.data).to.equal('a')
		})

		it('ES6 iterator', () => {
			let nodes = []
			nodes.push(topic.push(1))
			nodes.push(topic.push(2))
			nodes.push(topic.push(3))
			nodes.push(topic.push(4))

			let count = 0
			for (let [number, node] of topic) {
				expect(node).to.equal(nodes[count])
				expect(number).to.equal(++count)
			}
		})
	})

	describe('find', () => {
		it('the first node using strict equality', () => {
			let na = topic.push('a')
			let nb = topic.push('b')
			let nc = topic.push('c')

			let found = topic.findFirst('b')

			expect(found.data).to.equal('b')
			expect(found).not.to.be.undefined
			expect(found).to.equal(nb)
		})

		it('first return undefined if node is not found', () => {
			let na = topic.push('a')
			let nb = topic.push('b')
			let nc = topic.push('c')

			let found = topic.findFirst('d')

			expect(found).to.be.undefined
		})

		it('all the nodes using strict equality', () => {
			let na = topic.push('a')
			let nb = topic.push('b')
			let nc = topic.push('b')

			let found = topic.findAll('b')

			expect(found).to.have.length(2)
			expect(found[0]).to.equal(nb)
			expect(found[1]).to.equal(nc)
		})

		it('all returns a zero length array if nodes are not found', () => {
			let na = topic.push('a')
			let nb = topic.push('b')
			let nc = topic.push('c')

			let found = topic.findAll('d')

			expect(found).to.have.length(0)
		})

		it('the first node by using custom predicate', () => {
			let na = topic.push('a')
			let nb = topic.push('b')
			let nc = topic.push('b')
			let count = 0

			let found = topic.findFirstBy(item => {
				count++
				return item === 'b'
			})

			expect(count).to.equal(2)
			expect(found.data).to.equal('b')
			expect(found).to.equal(nb)
		})

		it('all the nodes by using custom predicate', () => {
			let na = topic.push('a')
			let nb = topic.push('b')
			let nc = topic.push('b')
			let count = 0

			let found = topic.findAllBy(item => {
				count++
				return item === 'b'
			})

			expect(count).to.equal(3)
			expect(found).to.have.length(2)
			expect(found[0]).to.equal(nb)
			expect(found[1]).to.equal(nc)
		})

	})

	it.skip('bench', () => {

	})

	beforeEach(() => {
		topic = new LinkedList()
	})
})