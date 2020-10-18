const templateToRows = jest.fn()
jest.mock('./template-converter', () => ({templateToRows}))

import { merge } from './index'
import { Template } from '../../types'
import { Element } from "xml-js";

const existing = `
    <anything key="123">
        <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Shortcut/@EntryValue">ae</s:String>
        <something>else</something>
        <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Anything">True</s:Boolean>
    </anything>
`

const template: Template = {
    shortcut: 'ae',
    template: '',
    description: '',
    settings: {}
}

export function assertEquals(expected: string, actual: string) {
    expected = expected.split('\n').map(x => x.trim()).filter(Boolean).join('')
    expect(actual.split('\n').map(x => x.trim()).join()).toEqual(expected)
}

describe('rider adapter', () => {
    beforeEach(() => {
        templateToRows.mockReset();
    })
    it('updates existing xml', () => {
        templateToRows.mockReturnValueOnce([
            element('sometemplate', 'stuff')
        ])

        const result = merge([template], existing)

        assertEquals(`
            <anything key="123">
                <something>else</something>
                <sometemplate>stuff</sometemplate>
            </anything>
        `, result)
        expect(templateToRows).toHaveBeenCalledWith(template)
    })
    it('creates xml from scratch', () => {
        templateToRows.mockReturnValueOnce([
            element('sometemplate', 'stuff')
        ])

        const result = merge([template])

        assertEquals(`
            <wpf:ResourceDictionary xml:space="preserve" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" xmlns:s="clr-namespace:System;assembly=mscorlib" xmlns:ss="urn:shemas-jetbrains-com:settings-storage-xaml" xmlns:wpf="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
                <sometemplate>stuff</sometemplate>
            </wpf:ResourceDictionary>
        `, result)
        expect(templateToRows).toHaveBeenCalledWith(template)
    })
})

function element(name: string, text: string): Element {
    return {
        type: 'element',
        name,
        elements: [
            {
                type: 'text',
                text
            }
        ]
    }
}
