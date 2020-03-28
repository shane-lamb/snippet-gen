import { modify } from './modify-text';

describe('modify text', () => {
    it('does implicit append', () => {
        expect(modify('a', 'b')).toEqual('ab');
    })

    it('does append', () => {
        const modification = {
            append: 'b'
        }
        expect(modify('a', modification)).toEqual('ab');
    })

    it('does prepend', () => {
        const modification = {
            prepend: 'b'
        }
        expect(modify('a', modification)).toEqual('ba');
    })

    it('does simple replace', () => {
        const modification = {
            replaceMe: 'b'
        }
        expect(modify('a replaceMe c', modification)).toEqual('a b c');
    });
})