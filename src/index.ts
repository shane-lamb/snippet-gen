import { NestedTemplate } from './types';

const defs: NestedTemplate[] = [
    {
        shortcut: 'a',
        abstract: true,
        template: 'Assert.',
        children: [
            {
                shortcut: 'e',
                template: 'Equals($end$)',
                description: 'Equals'
            }
        ]
    },
    {
        shortcut: 'm',
        abstract: true,
        template: '$access$ $name$($end$) {\n}',
        description: 'Method',
        children: [
            {
                shortcut: 'v',
                template: {
                    $access$: 'private $type$'
                },
                description: {
                    prepend: 'Private '
                }
            }
        ]
    }
];

export default defs;