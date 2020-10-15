import { merge } from './index'
import { Template } from '../../types'
import { default as each } from 'jest-each'

describe('templates to zsh aliases', () => {
    each([
        [{}, `alias g='git status'`],
        [{type: 'global'}, `alias -g g='git status'`],
        [{type: 'func'}, `g () { git status }`],
        [{expand: false}, `alias g='git status'\nGLOBALIAS_FILTER_VALUES=($\{GLOBALIAS_FILTER_VALUES} g)`],
        [{type: 'global', expand: false}, `alias -g g='git status'\nGLOBALIAS_FILTER_VALUES=($\{GLOBALIAS_FILTER_VALUES} g)`],
        [{type: 'func', expand: false}, `g () { git status }`],
    ]).it('', (settings, expected) => {
        const templates: Template[] = [{
            shortcut: 'g',
            template: 'git status',
            description: '',
            settings
        }]

        const result = merge(templates, '')

        expect(result).toEqual(expected)
    })
})
