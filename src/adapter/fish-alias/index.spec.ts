import { merge } from './index'
import { Template } from '../../types'

describe('templates to fish abbreviations', () => {
    it('does abbr', () => {
        const templates: Template[] = [{
            shortcut: 'g',
            template: 'git status -s',
            description: '',
            settings: {
                expand: true
            }
        }]

        const result = merge(templates, '')

        expect(result).toEqual(`abbr -a g 'git status -s'`)
    })
    it('does alias', () => {
        const templates: Template[] = [{
            shortcut: 'g',
            template: 'git status -s',
            description: '',
            settings: {}
        }]

        const result = merge(templates, '')

        expect(result).toEqual(`alias g='git status -s'`)
    })
})