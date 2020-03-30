import { expect } from 'chai'
import pagination from './index'


test('Pagination deve ser uma função', () => {
    expect(pagination).to.be.a('function')
})
test('pagination({total: 1, activePage: 1}) deve retornar [1]', () => {
    const params = { total: 1, activePage: 1 }
    const result = [1]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 2, activePage: 1}) deve retornar [1, 2]', () => {
    const params = { total: 2, activePage: 1 }
    const result = [1, 2]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 5, activePage: 1}) deve retornar [1, 2, 3, 4, 5]', () => {
    const params = { total: 5, activePage: 1 }
    const result = [1, 2, 3, 4, 5]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 6, activePage: 1}) deve retornar [1, 2, 3, "...", 6]', () => {
    const params = { total: 6, activePage: 1 }
    const result = [1, 2, 3, '...', 6]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 6, activePage: 2}) deve retornar [1, 2, 3, "...", 6]', () => {
    const params = { total: 6, activePage: 2 }
    const result = [1, 2, 3, '...', 6]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 6, activePage: 3}) deve retornar [1, 2, 3, 4, 5, 6]', () => {
    const params = { total: 6, activePage: 3 }
    const result = [1, 2, 3, 4, 5, 6]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 6, activePage: 4}) deve retornar [1, 2, 3, 4, 5, 6]', () => {
    const params = { total: 6, activePage: 4 }
    const result = [1, 2, 3, 4, 5, 6]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 6, activePage: 5}) deve retornar [1, "...", 4, 5, 6]', () => {
    const params = { total: 6, activePage: 5 }
    const result = [1, '...', 4, 5, 6]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 6, activePage: 6}) deve retornar [1, "...", 4, 5, 6]', () => {
    const params = { total: 6, activePage: 6 }
    const result = [1, '...', 4, 5, 6]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 7, activePage: 1}) deve retornar [1, 2, 3, "...", 7]', () => {
    const params = { total: 7, activePage: 1 }
    const result = [1, 2, 3, '...', 7]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 7, activePage: 3}) deve retornar [1, 2, 3, 4, "...", 7]', () => {
    const params = { total: 7, activePage: 3 }
    const result = [1, 2, 3, 4, '...', 7]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 7, activePage: 4}) deve retornar [1, 2, 3, 4, 5, 6, 7]', () => {
    const params = { total: 7, activePage: 4 }
    const result = [1, 2, 3, 4, 5, 6, 7]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 7, activePage: 5}) deve retornar [1, "...", 4, 5, 6, 7]', () => {
    const params = { total: 7, activePage: 5 }
    const result = [1, '...', 4, 5, 6, 7]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 7, activePage: 6}) deve retornar [1, "...", 5, 6, 7]', () => {
    const params = { total: 7, activePage: 6 }
    const result = [1, '...', 5, 6, 7]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 7, activePage: 7}) deve retornar [1, "...", 5, 6, 7]', () => {
    const params = { total: 7, activePage: 7 }
    const result = [1, '...', 5, 6, 7]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 15, activePage: 8}) deve retornar [1, "...", 7, 8, 9, "...", 15]', () => {
    const params = { total: 15, activePage: 8 }
    const result = [1, '...', 7, 8, 9, '...', 15]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({total: 15 }) deve retornar [1, 2, 3 "...", 15]', () => {
    const params = { total: 15 }
    const result = [1, 2, 3, '...', 15]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination({}) deve retornar [1]', () => {
    const params = {}
    const result = [1]
    expect(pagination(params)).to.be.deep.equal(result)
})
test('pagination() deve retornar [1]', () => {
    const result = [1]
    expect(pagination()).to.be.deep.equal(result)
})
test('pagination({total: "abc", activePage: 1}) deve disparar um erro', () => {
    const params = { total: 'abc', activePage: 1 }
    const result = 'total deve ser um numero'
    try {
        pagination(params)
    } catch (e) {
        expect(e.message).to.be.equal(result)
    }
})
test('pagination({total: 10, activePage: "1a"}) deve disparar um erro', () => {
    const params = { total: 10, activePage: '1a' }
    const result = 'activePage deve ser um numero'
    try {
        pagination(params)
    } catch (e) {
        expect(e.message).to.be.equal(result)
    }
})
test('pagination({total: 10, activePage: 12}) deve disparar um erro', () => {
    const params = { total: 10, activePage: 12 }
    const result = 'activePage não pode ser maior que o total de páginas'
    try {
        pagination(params)
    } catch (e) {
        expect(e.message).to.be.equal(result)
    }
})

