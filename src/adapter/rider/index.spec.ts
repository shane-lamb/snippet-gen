const templateToRows = jest.fn()
jest.mock('./template-converter', () => ({ templateToRows }))

import { merge } from './index'
import { Template } from '../../types'
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
    expected = expected.split('\n').map(x => x.trim()).filter(Boolean).join()
    expect(actual.split('\n').map(x => x.trim()).join()).toEqual(expected)
}

describe('rider adapter', () => {
    beforeEach(() => {
        templateToRows.mockReset();
    })
    it('updates existing', () => {
        templateToRows.mockReturnValueOnce([
            fragment().ele('overridetemp').txt("456")
        ])
        
        const result = merge([overrideTemplate], existing)

        assertEquals(`
            <anything key="123">
                <overridetemp>456</overridetemp>
            </anything>
        `, result)
        expect(templateToRows).toHaveBeenCalledWith(overrideTemplate)
    })
    it('adds new', () => {
        templateToRows.mockReturnValueOnce([
            fragment().ele('newtemp').txt("456")
        ])
        
        const result = merge([appendTemplate], existing)

        assertEquals(`
            <anything key="123">
                <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Shortcut/@EntryValue">ae</s:String>
                <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Anything">True</s:Boolean>
                <newtemp>456</newtemp>
            </anything>
        `, result)
        expect(templateToRows).toHaveBeenCalledWith(appendTemplate)
    })
    it('adds without existing content', () => {
        templateToRows.mockReturnValueOnce([
            fragment().ele('newtemp').txt("456")
        ])

        const result = merge([appendTemplate])

        assertEquals(`
            <wpf:ResourceDictionary xml:space="preserve" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" xmlns:s="clr-namespace:System;assembly=mscorlib" xmlns:ss="urn:shemas-jetbrains-com:settings-storage-xaml" xmlns:wpf="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
                <newtemp>456</newtemp>
            </wpf:ResourceDictionary>
        `, result)
        expect(templateToRows).toHaveBeenCalledWith(appendTemplate)
    })
})