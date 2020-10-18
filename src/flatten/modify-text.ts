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
                return text.replace(RegExp(escapeRegExp(key), 'g'), value)
        }
    }, text);
}

function join(a: string, b: string, separator: string) {
    return a && b ? a + separator + b : a + b
}

// taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
function escapeRegExp(str: string) {
    return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
