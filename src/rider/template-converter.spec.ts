const randomBytes = jest.fn()
jest.mock('crypto', () => ({ randomBytes }))

import { XMLBuilder } from 'xmlbuilder2/lib/interfaces'
import { Template } from '../types'
import { templateToRows } from './template-converter'

const sample = `
<wpf:ResourceDictionary xml:space="preserve" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" xmlns:s="clr-namespace:System;assembly=mscorlib" xmlns:ss="urn:shemas-jetbrains-com:settings-storage-xaml" xmlns:wpf="http://schemas.microsoft.com/winfx/2006/xaml/presentation">
	<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/@KeyIndexDefined">True</s:Boolean>
	<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Applicability/=Live/@EntryIndexedValue">True</s:Boolean>
	<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Description/@EntryValue">async test method</s:String>
	<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Field/=NAME/@KeyIndexDefined">True</s:Boolean>
	<s:Int64 x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Field/=NAME/Order/@EntryValue">0</s:Int64>
	<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Reformat/@EntryValue">True</s:Boolean>
	<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Scope/=C3001E7C0DA78E4487072B7E050D86C5/@KeyIndexDefined">True</s:Boolean>
	<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Scope/=C3001E7C0DA78E4487072B7E050D86C5/CustomProperties/=minimumLanguageVersion/@EntryIndexedValue">2.0</s:String>
	<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Scope/=C3001E7C0DA78E4487072B7E050D86C5/Type/@EntryValue">InCSharpFile</s:String>
	<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Shortcut/@EntryValue">tma</s:String>
	<s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/ShortenQualifiedReferences/@EntryValue">True</s:Boolean>
	<s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=04FCFC465F439945B8515EA72E5FAA28/Text/@EntryValue">[Fact]
public async void $NAME$()
{
    $END$
}</s:String>
`

function assertEquals(expected: string, actual: XMLBuilder[]) {
    const expectedStrings = expected.split('\n').map(x => x.trim()).filter(Boolean)
    const actualStrings = actual.map(x => x.toString())
    expect(actualStrings).toIncludeSameMembers(expectedStrings)
}

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
                'contexts': ['InCSharpStatement']
            }
        }

        const result = templateToRows(input)

        assertEquals(`
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Shortcut/@EntryValue">ae</s:String>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/ShortenQualifiedReferences/@EntryValue">True</s:Boolean>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Text/@EntryValue">Assert.Equal($EXPECTED$, $ACTUAL$);$END$</s:String>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/@KeyIndexDefined">True</s:Boolean>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Applicability/=Live/@EntryIndexedValue">True</s:Boolean>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Description/@EntryValue">Assert.Equal()</s:String>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Reformat/@EntryValue">True</s:Boolean>
            <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Scope/=2C285F182AC98D44B0B4F29D4D2149EC/@KeyIndexDefined">True</s:Boolean>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Scope/=2C285F182AC98D44B0B4F29D4D2149EC/CustomProperties/=minimumLanguageVersion/@EntryIndexedValue">2.0</s:String>
            <s:String x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Scope/=2C285F182AC98D44B0B4F29D4D2149EC/Type/@EntryValue">InCSharpStatement</s:String>
        `, result)
    })
})
