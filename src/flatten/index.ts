import { NestedTemplate, Template } from '../types'
import { modify } from './modify-text'

export function flattenTemplates(templates: NestedTemplate[]): Template[] {
    return templates.flatMap(t => flattenTemplate(t))
}

function flattenTemplate(template: NestedTemplate, parent?: Template): Template[] {
    const merged = mergeWithParent(template, parent)
    const children = (template.children || []).flatMap(c => flattenTemplate(c, merged))
    return (template.abstract ? [] : [merged]).concat(children)
}

function mergeWithParent(child: NestedTemplate, parent?: Template): Template {
    return {
        shortcut: modify(parent?.shortcut || '', child.shortcut),
        description: modify(parent?.description || '', child.description || ''),
        settings: { ...(parent?.settings || {}), ...(child.settings || {})},
        template: modify(parent?.template || '', child.template)
    }
}