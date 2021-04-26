const argv: string[] = []
jest.mock('process', () => ({
    cwd: () => __dirname,
    argv
}))
const flattenTemplates = jest.fn()
jest.mock('./flatten', () => ({ flattenTemplates }))
const merge = jest.fn()
jest.mock('./adapter', () => ({ merge }))

import * as fs from 'fs'
import * as path from 'path'
import { run } from './program'

const outputPath = path.resolve(__dirname, '../temp/mock-output')
const altOutputPath = outputPath + '2'

const setArgs = (...args: string[]) => {
    argv.length = 0
    argv.push('', '', '../test-resources/mock-templates.js', ...args)
}

describe('program', () => {
    beforeEach(() => {
        setArgs()
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
    describe.each([['-t'],['--targetFile']])('can take output file as command line argument', (optionText) => {
        test(optionText, () => {
            if (fs.existsSync(altOutputPath)) {
                fs.unlinkSync(altOutputPath)
            }
            merge.mockReturnValueOnce('a')

            setArgs(optionText, altOutputPath)

            run()

            const result = fs.readFileSync(altOutputPath, 'utf8')
            expect(result).toEqual('a')
        })
    })
})