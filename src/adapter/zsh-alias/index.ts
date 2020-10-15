import { Template } from '../../types'

export function merge(updated: Template[], existing?: string): string {
    return updated
        .map(format)
        .join('\n')
}

function format(t: Template) {
    switch (t.settings.type) {
        case 'func':
            return `${t.shortcut} () { ${t.template} }`
        case 'global':
            return formatRegular(t, true)
        default:
            return formatRegular(t, false)
    }
}

function formatRegular(t: Template, isGlobal: boolean) {
    return `alias ${isGlobal ? '-g ' : ''}${t.shortcut}='${t.template}'` +
        (t.settings.expand === false ? `\nGLOBALIAS_FILTER_VALUES=($\{GLOBALIAS_FILTER_VALUES} ${t.shortcut})` : '')
}
