const riderMerge = jest.fn()
jest.mock('./rider', () => ({ merge: riderMerge }))
const fishAbbrMerge = jest.fn()
jest.mock('./fish-abbr', () => ({ merge: fishAbbrMerge }))

import { merge } from './index'

describe('getting adapters', () => {
    it('gets rider', function () {
        riderMerge.mockReturnValueOnce('result')
        expect(merge('rider', [], 'existing')).toBe('result')
        expect(riderMerge).toHaveBeenCalledWith([], 'existing')
    });
    it('gets fish-abbr', function () {
        fishAbbrMerge.mockReturnValueOnce('result')
        expect(merge('fish-abbr', [], 'existing')).toBe('result')
        expect(fishAbbrMerge).toHaveBeenCalledWith([], 'existing')
    });
})