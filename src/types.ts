export interface Template {
    shortcut: string
    template: string
    description: string
    settings: {[key: string]: any}
}

export type TextModification = string | {[key: string]: string}

export interface NestedTemplate {
    abstract?: boolean
    template: TextModification
    children?: NestedTemplates
    description?: TextModification
    settings?: {[key: string]: any}
}

export type NestedTemplates = {[shortcut: string]: NestedTemplate}

export interface RunConfig {
    targetFile: string
    templates: NestedTemplates
}