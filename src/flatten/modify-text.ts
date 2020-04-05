import { TextModification } from '../types';

export function modify(text: string, modification: TextModification, separator: string = ''): string {
    if (typeof modification === 'string') {
        return join(text, modification, separator)
    }
    return Object.entries(modification).reduce((text, [key, value]) => {
        switch (key) {
            case 'append':
                return join(text, value, separator)
            case 'prepend':
                return join(value, text, separator)
            default:
                return text.replace(key, value)
        }
    }, text);
}

function join(a: string, b: string, separator: string) {
    return a && b ? a + separator + b : a + b
}