const riderMerge = jest.fn()
jest.mock('./rider', () => ({ merge: riderMerge }))
const fishMerge = jest.fn()
jest.mock('./fish-alias', () => ({ merge: fishMerge }))

import { merge } from './index'

describe('getting adapters', () => {
    it('gets rider', function () {
        riderMerge.mockReturnValueOnce('result')
        expect(merge('rider', [], 'existing')).toBe('result')
        expect(riderMerge).toHaveBeenCalledWith([], 'existing')
    });
    it('gets fish-alias', function () {
        fishMerge.mockReturnValueOnce('result')
        expect(merge('fish-alias', [], 'existing')).toBe('result')
        expect(fishMerge).toHaveBeenCalledWith([], 'existing')
    });
})