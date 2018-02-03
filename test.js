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

		it('spread arguments', () => {
			topic.pushAll([1, 2, 3], 4, 5, 6)

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

		it('spread arguments', () => {
			topic.unshiftAll([1, 2, 3], 4, 5, 6)

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

		it('will not remove nodes that are not part of the list', () => {
			let list = new LinkedList()
			let ln1 = list.push(1)
			let tn1 = topic.push(1)
			topic.remove(ln1)
			expect(Array.from(topic)).to.deep.equal([
				[1, tn1]
			])
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
			let expected = []
			expected.push([1, topic.push(1)])
			expected.push([2, topic.push(2)])
			expected.push([3, topic.push(3)])
			expected.push([4, topic.push(4)])

			let actual = Array.from(topic)
			expect(actual).to.deep.equal(expected)
		})

		it('ES6 node iterator', () => {
			let expected = []

			expected.push(topic.push(1))
			expected.push(topic.push(2))
			expected.push(topic.push(3))
			expected.push(topic.push(4))

			let actual = Array.from(topic.nodes())
			expect(actual).to.deep.equal(expected)
		})

		it('ES6 value iterator', () => {
			let expected = [1, 2, 3, 4]
			topic.pushAll(expected)
			let actual = Array.from(topic.values())
			expect(actual).to.deep.equal(expected)
		})

		it('ES6 iterator on an empty list', () => {
			expect(Array.from(topic)).to.deep.equal([])
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

	describe.only('swap', () => {
		let swapTest

		it('will throw an error if node A is not a node', () => {
			expect(() => {
				topic.swap(1, 2)
			}).to.throw('swap() can only be used with node objects, node A is not of type Node')
		})

		it('will throw an error if node B is not a node', () => {
			expect(() => {
				topic.swap(topic.push(1), 2)
			}).to.throw('swap() can only be used with node objects, node B is not of type Node')
		})

		it('will throw an error if node A is currently a member of the list', () => {
			let anotherList = new LinkedList()
			expect(() => {
				topic.swap(anotherList.push(1), topic.push(2))
			}).to.throw('node A is not in this list')
		})

		it('will throw an error if node B is currently a member of the list', () => {
			let anotherList = new LinkedList()
			expect(() => {
				topic.swap(topic.push(2), anotherList.push(1))
			}).to.throw('node B is not in this list')
		})

		it('swap the same node has no effect', () => {
			swapTest.n1 = topic.push(2)
			swapTest.A = topic.push(3)
			swapTest.n3 = topic.push(4)

			topic.swap(swapTest.A, swapTest.A)

			swapTest.verify({
				n1: { v: 2, p: undefined, n: 3 },
				A: { v: 3, p: 2, n: 4 },
				n3: { v: 4, p: 3, n: undefined }
			})

			swapTest.verifyValues([2, 3, 4])
		})

		describe('two nonadjacent nodes in the list', () => {
			it('swap(A, B)', () => {
				topic.swap(swapTest.A, swapTest.B)
				verify()
			})

			it('swap(B, A)', () => {
				topic.swap(swapTest.B, swapTest.A)
				verify()
			})

			beforeEach(() => {
				swapTest.n1 = topic.push(2)
				swapTest.A = topic.push(4)
				swapTest.n3 = topic.push(3)
				swapTest.B = topic.push(5)
				swapTest.n5 = topic.push(7)
			})
			
			function verify() {
				swapTest.verify({
					n1: { v: 2, p: undefined, n: 5 },
					B: { v: 5, p: 2, n: 3 },
					n3: { v: 3, p: 5, n: 4 },
					A: { v: 4, p: 3, n: 7 },
					n5: { v: 7, p: 4, n: undefined }
				})

				swapTest.verifyValues([2, 5, 3, 4, 7])
			}
		})

		describe('two adjacent nodes in the list', () => {
			it('swap(A, B)', () => {
				topic.swap(swapTest.A, swapTest.B)
				verify()
			})

			it('swap(B, A)', () => {
				topic.swap(swapTest.B, swapTest.A)
				verify()
			})

			beforeEach(() => {
				swapTest.n1 = topic.push(2)
				swapTest.n2 = topic.push(3)
				swapTest.A = topic.push(5)
				swapTest.B = topic.push(4)
				swapTest.n5 = topic.push(7)
			})

			function verify() {
				swapTest.verify({
					n1: { v: 2, p: undefined, n: 3 },
					n2: { v: 3, p: 2, n: 4 },
					B: { v: 4, p: 3, n: 5 },
					A: { v: 5, p: 4, n: 7 },
					n5: { v: 7, p: 5, n: undefined }
				})

				swapTest.verifyValues([2, 3, 4, 5, 7])
			}
		})

		describe('two adjacent nodes in the list where A is the head', () => {
			it('swap(A, B)', () => {
				topic.swap(swapTest.A, swapTest.B)
				verify()
			})

			it('swap(B, A)', () => {
				topic.swap(swapTest.B, swapTest.A)
				verify()
			})

			beforeEach(() => {
				swapTest.A = topic.push(2)
				swapTest.B = topic.push(4)
				swapTest.n3 = topic.push(3)
				swapTest.n4 = topic.push(5)
				swapTest.n5 = topic.push(7)
			})

			function verify() {
				swapTest.verify({
					B: { v: 4, p: undefined, n: 2 },
					A: { v: 2, p: 4, n: 3 },
					n3: { v: 3, p: 2, n: 5 },
					n4: { v: 5, p: 3, n: 7 },
					n5: { v: 7, p: 5, n: undefined }
				})

				swapTest.verifyValues([4, 2, 3, 5, 7])
				expect(topic.head).to.equal(swapTest.B)
			}
		})

		describe('two adjacent nodes in the list where B is the tail', () => {
			it('swap(A, B)', () => {
				topic.swap(swapTest.A, swapTest.B)
				verify()
			})

			it('swap(B, A)', () => {
				topic.swap(swapTest.B, swapTest.A)
				verify()
			})

			beforeEach(() => {
				swapTest.n1 = topic.push(2)
				swapTest.n2 = topic.push(4)
				swapTest.n3 = topic.push(3)
				swapTest.A = topic.push(5)
				swapTest.B = topic.push(7)
			})

			function verify() {
				swapTest.verify({
					n1: { v: 2, p: undefined, n: 4 },
					n2: { v: 4, p: 2, n: 3 },
					n3: { v: 3, p: 4, n: 7 },
					B: { v: 7, p: 3, n: 5 },
					A: { v: 5, p: 7, n: undefined }
				})

				swapTest.verifyValues([2, 4, 3, 7, 5])
				expect(topic.tail).to.equal(swapTest.A)
			}
		})

		describe('tail and head', () => {
			it('swap(A, B)', () => {
				topic.swap(swapTest.A, swapTest.B)
				verify()
			})

			it('swap(B, A)', () => {
				topic.swap(swapTest.B, swapTest.A)
				verify()
			})

			beforeEach(() => {
				swapTest.A = topic.push(2)
				swapTest.n2 = topic.push(4)
				swapTest.n3 = topic.push(3)
				swapTest.n4 = topic.push(5)
				swapTest.B = topic.push(7)
			})

			function verify() {
				swapTest.verify({
					B: { v: 7, p: undefined, n: 4 },
					n2: { v: 4, p: 7, n: 3 },
					n3: { v: 3, p: 4, n: 5 },
					n4: { v: 5, p: 3, n: 2 },
					A: { v: 2, p: 5, n: undefined }
				})

				swapTest.verifyValues([7, 4, 3, 5, 2])
			}
		})

		describe('tail and head - length === 2', () => {
			it('swap(A, B)', () => {
				topic.swap(swapTest.A, swapTest.B)
				verify()
			})

			it('swap(B, A)', () => {
				topic.swap(swapTest.B, swapTest.A)
				verify()
			})

			beforeEach(() => {
				swapTest.A = topic.push(2)
				swapTest.B = topic.push(7)
			})

			function verify() {
				swapTest.verify({
					B: { v: 7, p: undefined, n: 2 },
					A: { v: 2, p: 7, n: undefined }
				})

				swapTest.verifyValues([7, 2])
			}
		})

		beforeEach(() => {
			swapTest = new SwapTest(topic)
		})
	})

	it.skip('bench', () => {

	})

	beforeEach(() => {
		topic = new LinkedList()
	})

	class SwapTest {
		constructor(topic) {
			this.n1 = undefined
			this.n2 = undefined
			this.n3 = undefined
			this.n4 = undefined
			this.n5 = undefined
			this.A = undefined
			this.B = undefined
			this.topic = topic
		}

		verify({ n1, n2, n3, n4, n5, A, B }) {
			this._verify(this.n1, n1)
			this._verify(this.n2, n2)
			this._verify(this.n3, n3)
			this._verify(this.n4, n4)
			this._verify(this.n5, n5)
			this._verify(this.A, A)
			this._verify(this.B, B)
		}

		verifyValues(values) {
			expect(Array.from(this.topic.values())).to.deep.equal(values)
		}

		_verify(node, expected) {
			if (expected) {
				expect(node.data).to.equal(expected.v)
				if (node.prev) {
					expect(node.prev.data).to.equal(expected.p)
				} else {
					expect(node.prev).to.equal(expected.p)
				}

				if (node.next) {
					expect(node.next.data).to.equal(expected.n)
				} else {
					expect(node.next).to.equal(expected.n)
				}
			}
		}
	}
})