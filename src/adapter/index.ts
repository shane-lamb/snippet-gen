import { MergeFunc, Template } from '../types'

import { merge as rider } from './rider'
import { merge as fish } from './fish-alias'
import { merge as zsh } from './zsh-alias'

const lookup: {[adapterName: string]: MergeFunc} = {
    'rider': rider,
    'fish-alias': fish,
    'zsh-alias': zsh
}

export function merge(adapter: string, updated: Template[], existing?: string): string {
    return lookup[adapter](updated, existing)
}
