import { Template } from '../../types'

export function merge(updated: Template[], existing?: string): string {
    return updated
        .map(t => (t.settings.expand ? `abbr -a ${t.shortcut} ` : `alias ${t.shortcut}=`) + `'${t.template}'`)
        .join('\n')
}
