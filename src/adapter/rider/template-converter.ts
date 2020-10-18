import { Template } from '../../types'
import * as crypto from 'crypto'
import { Element } from 'xml-js'

export function templateToRows(template: Template): Element[] {
    const baseKey = `/Default/PatternsAndTemplates/LiveTemplates/Template/=${generateId()}/`
    const scopeBaseKey = baseKey + `Scope/=${generateId()}/`
    return [
        element('s:String', baseKey + 'Shortcut/@EntryValue', template.shortcut),
        element('s:Boolean', baseKey + 'ShortenQualifiedReferences/@EntryValue', 'True'),
        element('s:String', baseKey + 'Text/@EntryValue', template.template),
        element('s:Boolean', baseKey + '@KeyIndexDefined', 'True'),
        element('s:Boolean', baseKey + 'Applicability/=Live/@EntryIndexedValue', 'True'),
        element('s:String', baseKey + 'Description/@EntryValue', template.description),
        element('s:Boolean', baseKey + 'Reformat/@EntryValue', 'True'),
        element('s:Boolean', scopeBaseKey + '@KeyIndexDefined', 'True'),
        element('s:String', scopeBaseKey + 'CustomProperties/=minimumLanguageVersion/@EntryIndexedValue', '2.0'),
        element('s:String', scopeBaseKey + 'Type/@EntryValue', template.settings['context'] || 'InCSharpFile'),
    ];
}

function generateId(): string {
    return crypto.randomBytes(16).toString('hex');
}

function element(name: string, xKey: string, text: string): Element {
    return {
        type: 'element',
        name,
        attributes: {
            ['x:Key']: xKey
        },
        elements: [
            {
                type: 'text',
                text
            }
        ]
    }
}
