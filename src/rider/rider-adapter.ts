import { Template } from '../types'
import { fragment } from 'xmlbuilder2'
import { templateToRows } from './template-converter'

const keyRegex = /x:Key="\/Default\/PatternsAndTemplates\/LiveTemplates\/Template\/=\w*\//

export function merge(updated: Template[], existing: string): string {
    const xml = fragment(existing)
    const root = xml.first()
    updated.forEach(template => {
        const found = root.find(x => x.node.textContent == template.shortcut)
        if (found) {
            const key = keyRegex.exec(found.toString())?.[0]
            if (key) {
                root.filter(r => r.toString().includes(key))
                    .forEach(r => r.remove())
            }
        }
        templateToRows(template).forEach(t => root.import(t))
    });
    return xml.toString()
}
