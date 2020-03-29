jest.mock('process', () => ({
    cwd: () => __dirname,
    argv: ['', '', '../test-resources/mock-templates.js']
}))
const flattenTemplates = jest.fn()
jest.mock('./flatten', () => ({ flattenTemplates }))
const merge = jest.fn()
jest.mock('./adapter', () => ({ merge }))

import * as fs from 'fs'
import * as path from 'path'
import { run } from './program'

const outputPath = path.resolve(__dirname, '../temp/mock-output')

describe('program', () => {
    beforeEach(() => {
        flattenTemplates.mockReset()
        merge.mockReset()
        flattenTemplates.mockReturnValueOnce('flattenedTemplates')
    })
    it('creates templates from scratch', () => {
        if (fs.existsSync(outputPath)) {
           fs.unlinkSync(outputPath)
        }
        merge.mockReturnValueOnce('a')

        run()

        expect(flattenTemplates).toHaveBeenCalledWith('mock-templates')
        expect(merge).toHaveBeenCalledWith('adapterName', 'flattenedTemplates', undefined)
        const result = fs.readFileSync(outputPath, 'utf8')
        expect(result).toEqual('a')
    })
    it('updates templates', () => {
        merge.mockReturnValueOnce('ab')

        run()

        expect(flattenTemplates).toHaveBeenCalledWith('mock-templates')
        expect(merge).toHaveBeenCalledWith('adapterName', 'flattenedTemplates', 'a')
        const result = fs.readFileSync(outputPath, 'utf8')
        expect(result).toEqual('ab')
    })
})