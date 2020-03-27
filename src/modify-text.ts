import { TextModification } from './types';

export function modify(text: string, modification: TextModification): string {
    if (typeof modification === 'string') {
        return text + modification
    }
    return Object.entries(modification).reduce((text, [key, value]) => {
        switch (key) {
            case 'append':
                return text + value;
            case 'prepend':
                return value + text;
            default:
                return text.replace(key, value)
        }
    }, text);
}