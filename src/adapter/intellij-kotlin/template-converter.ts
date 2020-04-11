import { fragment } from 'xmlbuilder2'
import { Template } from '../../types'
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces'

interface Settings {
    contexts: string[]
}

export function templateToXml(template: Template): XMLBuilder {
    const rootNode = fragment().ele('template', {
        name: template.shortcut,
        value: template.template.replace('\n', '&#10;'),
        description: template.description,
        toReformat: 'true',
        toShortenFQNames: 'true'
    })
    const contextNode = rootNode.ele('context')
    const settings = template.settings as Settings
    settings.contexts.forEach(name => contextNode.ele('option', {name, value: 'true'}))
    return rootNode;
}
