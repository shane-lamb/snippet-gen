import { ComplexNestedTemplate, NestedTemplate, NestedTemplates, Template } from '../types'
import { modify } from './modify-text'

export function flattenTemplates(templates: NestedTemplates): Template[] {
    return Object.entries(templates).flatMap(t => flattenTemplate(t))
}

function flattenTemplate(child: [string, NestedTemplate], parent?: Template): Template[] {
    const [shortcut, rawTemplate] = child
    const template = typeof rawTemplate !== 'string' ? rawTemplate :
        {shortcut, template: rawTemplate} as ComplexNestedTemplate
    const merged = mergeWithParent([shortcut, template], parent)
    const children = Object.entries(template.children || {}).flatMap(c => flattenTemplate(c, merged))
    return (template.abstract ? [] : [merged]).concat(children)
}

function mergeWithParent(child: [string, ComplexNestedTemplate], parent?: Template): Template {
    const [shortcut, template] = child
    const settings = { ...(parent?.settings || {}), ...(template.settings || {})}
    return {
        shortcut: modify(parent?.shortcut || '', shortcut),
        description: modify(parent?.description || '', template.description || ''),
        settings,
        template: modify(parent?.template || '', template.template, settings.separator)
    }
}
