const process = {
    cwd: () => __dirname,
    argv: [
        '/usr/local/bin/node',
        '/path/to/my/script.js',
        '../test-resources/mock-rider-templates.js'
    ]
}
jest.mock('process', () => process)
const flattenTemplates = jest.fn()
jest.mock('./flatten', () => ({ flattenTemplates }))
const riderMerge = jest.fn()
jest.mock('./rider', () => ({ merge: riderMerge }))

import * as fs from 'fs'
import * as path from 'path'
import { run } from './program'

describe('program', () => {
    beforeEach(() => {
        flattenTemplates.mockReset();
        riderMerge.mockReset();
        flattenTemplates.mockReturnValueOnce('flattenedTemplates')
    })
    it('creates rider templates from scratch', () => {
        riderMerge.mockReturnValueOnce('<a><b/></a>')

        run()

        expect(flattenTemplates).toHaveBeenCalledWith('mock-templates')
        expect(riderMerge).toHaveBeenCalledWith('flattenedTemplates', undefined)
        const result = fs.readFileSync(path.resolve(__dirname, '../temp/Test.DotSettings'), 'utf8')
        expect(result).toEqual('<a><b/></a>')
    })
})