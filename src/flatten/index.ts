import { NestedTemplate, NestedTemplates, Template } from '../types'
import { modify } from './modify-text'

export function flattenTemplates(templates: NestedTemplates): Template[] {
    return Object.entries(templates).flatMap(t => flattenTemplate(t))
}

function flattenTemplate(child: [string, NestedTemplate], parent?: Template): Template[] {
    const [_, template] = child
    const merged = mergeWithParent(child, parent)
    const children = Object.entries(template.children || {}).flatMap(c => flattenTemplate(c, merged))
    return (template.abstract ? [] : [merged]).concat(children)
}

function mergeWithParent(child: [string, NestedTemplate], parent?: Template): Template {
    const [shortcut, template] = child
    return {
        shortcut: modify(parent?.shortcut || '', shortcut),
        description: modify(parent?.description || '', template.description || ''),
        settings: { ...(parent?.settings || {}), ...(template.settings || {})},
        template: modify(parent?.template || '', template.template)
    }
}
