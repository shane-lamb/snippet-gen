import { Template } from '../../types'

export function merge(updated: Template[], existing?: string): string {
    return updated.map(t => `abbr -a ${t.shortcut} '${t.template}'`).join('\n')
}
