jest.mock('process', () => ({
    cwd: () => __dirname,
    argv: ['', '', '../test-resources/mock-templates.js']
}))
const flattenTemplates = jest.fn()
jest.mock('./flatten', () => ({ flattenTemplates }))
const riderMerge = jest.fn()
jest.mock('./rider', () => ({ merge: riderMerge }))

import * as fs from 'fs'
import * as path from 'path'
import { run } from './program'

const outputPath = path.resolve(__dirname, '../temp/mock-output')

describe('program', () => {
    beforeEach(() => {
        flattenTemplates.mockReset();
        riderMerge.mockReset();
        flattenTemplates.mockReturnValueOnce('flattenedTemplates')
    })
    it('creates templates from scratch', () => {
        if (fs.existsSync(outputPath)) {
           fs.unlinkSync(outputPath)
        }
        riderMerge.mockReturnValueOnce('a')

        run()

        expect(flattenTemplates).toHaveBeenCalledWith('mock-templates')
        expect(riderMerge).toHaveBeenCalledWith('flattenedTemplates', undefined)
        const result = fs.readFileSync(outputPath, 'utf8')
        expect(result).toEqual('a')
    })
    it('updates templates', () => {
        riderMerge.mockReturnValueOnce('ab')

        run()

        expect(flattenTemplates).toHaveBeenCalledWith('mock-templates')
        expect(riderMerge).toHaveBeenCalledWith('flattenedTemplates', 'a')
        const result = fs.readFileSync(outputPath, 'utf8')
        expect(result).toEqual('ab')
    })
})