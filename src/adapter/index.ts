import { MergeFunc, Template } from '../types'

import { merge as rider } from './rider'
import { merge as fishAbbr } from './fish-abbr'

const lookup: {[adapterName: string]: MergeFunc} = {
    'rider': rider,
    'fish-abbr': fishAbbr
}

export function merge(adapter: string, updated: Template[], existing?: string): string {
    return lookup[adapter](updated, existing)
}