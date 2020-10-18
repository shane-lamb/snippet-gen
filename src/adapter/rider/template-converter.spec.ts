const randomBytes = jest.fn()
jest.mock('crypto', () => ({randomBytes}))

import { Template } from '../../types'
import { templateToRows } from './template-converter'
import { Element, js2xml } from 'xml-js'

describe('rider template converter', () => {
    beforeEach(() => {
        randomBytes.mockReset()
        randomBytes
            .mockReturnValueOnce('483DA23FE5010B45942DD5877D9DDE2D')
            .mockReturnValueOnce('2C285F182AC98D44B0B4F29D4D2149EC')
    })

    it('converts row', () => {
        const input: Template = {
            template: 'Assert.Equal($EXPECTED$, $ACTUAL$);$END$',
            description: 'Assert.Equal()',
            shortcut: 'ae',
            settings: {
                'context': 'InCSharpStatement'
            }
        }

        const result = templateToRows(input)

        assertEquals(`
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/@KeyIndexDefined">True</s:Boolean>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Applicability/=Live/@EntryIndexedValue">True</s:Boolean>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Reformat/@EntryValue">True</s:Boolean>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Scope/=2C285F182AC98D44B0B4F29D4D2149EC/@KeyIndexDefined">True</s:Boolean>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Scope/=2C285F182AC98D44B0B4F29D4D2149EC/CustomProperties/=minimumLanguageVersion/@EntryIndexedValue">2.0</s:String>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Scope/=2C285F182AC98D44B0B4F29D4D2149EC/Type/@EntryValue">InCSharpStatement</s:String>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Shortcut/@EntryValue">ae</s:String>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/ShortenQualifiedReferences/@EntryValue">True</s:Boolean>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Text/@EntryValue">Assert.Equal($EXPECTED$, $ACTUAL$);$END$</s:String>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Description/@EntryValue">Assert.Equal()</s:String>
        `, result)
    })

    it('uses global context when missing', () => {
        const input: Template = {
            template: '',
            description: '',
            shortcut: '',
            settings: {}
        }

        const result = templateToRows(input)

        expect(js2xml({elements: result})).toContain(
            '<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Scope/=2C285F182AC98D44B0B4F29D4D2149EC/Type/@EntryValue">InCSharpFile</s:String>'
        )
    })
})

function assertEquals(expected: string, actual: Element[]) {
    const expectedStrings = expected.split('\n').map(x => x.trim()).filter(Boolean).join('')
    const actualStrings = js2xml({elements: actual})
    expect(actualStrings).toEqual(expectedStrings)
}
