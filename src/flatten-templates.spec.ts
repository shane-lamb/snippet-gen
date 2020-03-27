import { flattenTemplates } from './flatten-templates'
import { Template, NestedTemplate } from './types'

describe('flatten templates', () => {
    it('abstract templates are not given an entry', () => {
        const input: NestedTemplate[] = [{
            shortcut: 's',
            abstract: true,
            template: 't',
            children: [{
                shortcut: '1',
                template: '2',
            }]
        }]

        const result = flattenTemplates(input);
        
        expect(result).toHaveLength(1);
        expect(result[0].shortcut).toEqual('s1');
        expect(result[0].template).toEqual('t2');
    })
})