import { flattenTemplates } from './index'
import { NestedTemplate } from '../types'

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
    it('settings are inherited', () => {
        const input: NestedTemplate[] = [{
            shortcut: 's',
            template: 't',
            settings: { a: 1, b: 2 },
            children: [{
                shortcut: '1',
                template: '2',
                settings: { a: 3, c: 1 }
            }]
        }]

        const result = flattenTemplates(input);

        expect(result).toHaveLength(2);
        expect(result[0].settings).toEqual({ a: 1, b: 2 });
        expect(result[1].settings).toEqual({ a: 3, b: 2, c: 1 });
    })
})