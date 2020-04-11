import { Template } from '../../types'
import { fragment } from 'xmlbuilder2'
import { templateToXml } from './template-converter'

export function merge(updated: Template[], existing?: string): string {
    const xml = existing ? fragment(existing) :
        fragment('<templateSet group="Kotlin"></templateSet>')
    const root = xml.last()
    updated.forEach(template => {
        const found = root.find(x => x.toString().includes(`name="${template.shortcut}"`))
        if (found) {
            found.remove()
        }
        root.import(templateToXml(template))
    });
    return xml.toString({prettyPrint:true})
}
