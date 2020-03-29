import { merge } from './index'
import { Template } from '../../types'

describe('templates to fish abbreviations', () => {
    it('converts', () => {
        const templates: Template[] = [{
            shortcut: 'g',
            template: 'git status -s',
            description: '',
            settings: {}
        }]

        const result = merge(templates, '')

        expect(result).toEqual(`abbr -a g 'git status -s'`)
    })
})