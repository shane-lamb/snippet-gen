const templateToRows = jest.fn()
jest.mock('./template-converter', () => ({ templateToRows }))

import { merge } from './rider-adapter'
import { Template } from '../types'
import { fragment } from 'xmlbuilder2'

const existing = `
    <anything key="123">
        <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Shortcut/@EntryValue">ae</s:String>
        <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Anything">True</s:Boolean>
    </anything>
`

const overrideTemplate: Template = {
    shortcut: 'ae',
    template: '',
    description: '',
    settings: {}
}

const appendTemplate: Template = {
    shortcut: 'mv',
    template: '',
    description: '',
    settings: {}
}

export function assertEquals(expected: string, actual: string) {
    expected = expected.split('\n').map(x => x.trim()).filter(Boolean).join('')
    expect(actual).toEqual(expected)
}

describe('rider adapter', () => {
    beforeEach(() => {
        templateToRows.mockReset();
    })
    it('updates existing', () => {
        templateToRows.mockReturnValueOnce([
            fragment().ele('overridetemp')
        ])
        
        const result = merge([overrideTemplate], existing)

        assertEquals(`
            <anything key="123">
                <overridetemp></overridetemp>
            </anything>
        `, result)
        expect(templateToRows).toHaveBeenCalledWith(overrideTemplate)
    })
    it('adds new', () => {
        templateToRows.mockReturnValueOnce([
            fragment().ele('newtemp')
        ])
        
        const result = merge([appendTemplate], existing)

        assertEquals(`
            <anything key="123">
                <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Shortcut/@EntryValue">ae</s:String>
                <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Anything">True</s:Boolean>
                <newtemp></newtemp>
            </anything>
        `, result)
        expect(templateToRows).toHaveBeenCalledWith(appendTemplate)
    })
})