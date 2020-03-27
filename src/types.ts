export interface Template {
    shortcut: string
    template: string
    description: string
    settings: {[key: string]: any}
}

export type TextModification = string | {[key: string]: string}

export interface NestedTemplate {
    shortcut: string
    abstract?: boolean
    template: TextModification
    children?: NestedTemplate[]
    description?: TextModification
    settings?: {[key: string]: any}
}