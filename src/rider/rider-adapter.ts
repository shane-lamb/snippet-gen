import { Template } from '../types'
import { create } from 'xmlbuilder2'

export function merge(updated: Template[], existing: string): string {
    const xml = create(existing)
    const root = xml.root()
    updated.forEach(template => {
        const found = root.find(x => x.node.textContent == template.shortcut)
        if (found) {
            console.log(found.node.nodeName)
            console.log(found.toString)
            const toRemove = root.filter(x => !!x.node)
        }
    });
    return xml.toString()
}
