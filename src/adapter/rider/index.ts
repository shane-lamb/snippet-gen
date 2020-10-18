import { Template } from '../../types'
import { templateToRows } from './template-converter'
import { xml2js, js2xml, Element } from 'xml-js'

export function merge(updated: Template[], existing?: string): string {
    const xml = xml2js(
        existing ||
        '<wpf:ResourceDictionary xml:space="preserve" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml" xmlns:s="clr-namespace:System;assembly=mscorlib" xmlns:ss="urn:shemas-jetbrains-com:settings-storage-xaml" xmlns:wpf="http://schemas.microsoft.com/winfx/2006/xaml/presentation"></wpf:ResourceDictionary>'
    )
    const root: Element = xml.elements[0]
    root.elements = (root.elements || [])
        .filter(e => !e.attributes?.['x:Key']?.toString().startsWith('/Default/PatternsAndTemplates/LiveTemplates/Template/='))
        .concat(...updated.map(x => templateToRows(x)))
    return js2xml(xml, {spaces: 4});
}
