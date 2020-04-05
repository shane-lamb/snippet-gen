import { modify } from './modify-text'
import exp from 'constants'

describe('modify text', () => {
    it('does implicit append', () => {
        expect(modify('a', 'b')).toEqual('ab')
    })

    it('does append', () => {
        const modification = {
            append: 'b'
        }
        expect(modify('a', modification)).toEqual('ab')
    })

    it('does prepend', () => {
        const modification = {
            prepend: 'b'
        }
        expect(modify('a', modification)).toEqual('ba')
    })

    it('does simple replace', () => {
        const modification = {
            replaceMe: 'b'
        }
        expect(modify('a replaceMe c', modification)).toEqual('a b c')
    });

    it('appends using separator', () => {
        expect(modify('a', 'b', ' ')).toEqual('a b')
        expect(modify('a', {append: 'b'}, ' ')).toEqual('a b')
        expect(modify('a', {prepend: 'b'}, ' ')).toEqual('b a')
    })

    it('does not use separator if nothing to join', () => {
        expect(modify('', 'a', ' ')).toEqual('a')
        expect(modify('a', '', ' ')).toEqual('a')
        expect(modify('', '', ' ')).toEqual('')
    })
})