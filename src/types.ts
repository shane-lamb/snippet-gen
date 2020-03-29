export interface Template {
    shortcut: string
    template: string
    description: string
    settings: {[key: string]: any}
}

export type TextModification = string | {[key: string]: string}

export interface ComplexNestedTemplate {
    abstract?: boolean
    template: TextModification
    children?: NestedTemplates
    description?: TextModification
    settings?: {[key: string]: any}
}

export type NestedTemplate = ComplexNestedTemplate | string

export type NestedTemplates = {[shortcut: string]: NestedTemplate} | string

export interface RunConfig {
    adapter: string,
    targetFile: string
    templates: NestedTemplates
}

export type MergeFunc = (updated: Template[], existing?: string) => string
