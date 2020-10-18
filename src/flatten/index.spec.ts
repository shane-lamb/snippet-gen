import { flattenTemplates } from './index'
import { NestedTemplates } from '../types'

describe('flatten templates', () => {
    it('abstract templates are not given an entry', () => {
        const input: NestedTemplates = {
            p: {
                abstract: true,
                template: 't',
                children: {
                    c: {
                        template: '2'
                    }
                }
            }
        }

        const result = flattenTemplates(input);
        
        expect(result).toHaveLength(1);
        expect(result[0].shortcut).toEqual('pc');
        expect(result[0].template).toEqual('t2');
    })
    it('settings are inherited', () => {
        const input: NestedTemplates = {
            p: {
                template: 't',
                settings: { a: 1, b: 2 },
                children: {
                    c: {
                        template: '2',
                        settings: { a: 3, c: 1 }
                    }
                }
            }
        }

        const result = flattenTemplates(input);

        expect(result).toHaveLength(2);
        expect(result[0].settings).toEqual({ a: 1, b: 2 });
        expect(result[1].settings).toEqual({ a: 3, b: 2, c: 1 });
    })
    it('can simply use string in place of complex template', () => {
        const input: NestedTemplates = {
            p: {
                template: 't',
                abstract: true,
                children: {
                    c: '1'
                }
            },
            a: 't2'
        }

        const result = flattenTemplates(input);

        expect(result).toHaveLength(2);
        expect(result[0].template).toEqual('t1');
        expect(result[1].template).toEqual('t2');
    })
    it('makes use of separator, if provided', () => {
       const input: NestedTemplates = {
           p: {
               template: 't',
               abstract: true,
               children: {
                   c: {
                       template: '1',
                       settings: {
                           separator: ' '
                       }
                   }
               }
           }
       }

       const result = flattenTemplates(input);

       expect(result[0].template).toEqual('t 1');
    })
    it('should inherit separator', function () {
        const input: NestedTemplates = {
            p: {
                template: 't',
                abstract: true,
                settings: {
                    separator: ' '
                },
                children: {
                    c: '1'
                }
            }
        }

        const result = flattenTemplates(input);

        expect(result[0].template).toEqual('t 1');
    });
})
