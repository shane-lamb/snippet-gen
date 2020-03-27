import { fragment } from 'xmlbuilder2'
import { Template } from '../types'
import { XMLBuilder } from 'xmlbuilder2/lib/interfaces'
import * as crypto from 'crypto';

export function templateToRows(template: Template): XMLBuilder[] {
    const baseKey = `/Default/PatternsAndTemplates/LiveTemplates/Template/=${generateId()}/`
    const scopeBaseKey = baseKey + `Scope/=${generateId()}/`
    return [
        fragment().ele('s:String', {'x:Key': baseKey + 'Shortcut/@EntryValue'}).txt(template.shortcut),
        fragment().ele('s:Boolean', {'x:Key': baseKey + 'ShortenQualifiedReferences/@EntryValue'}).txt('True'),
        fragment().ele('s:String', {'x:Key': baseKey + 'Text/@EntryValue'}).txt(template.template),
        fragment().ele('s:Boolean', {'x:Key': baseKey + '@KeyIndexDefined'}).txt('True'),
        fragment().ele('s:Boolean', {'x:Key': baseKey + 'Applicability/=Live/@EntryIndexedValue'}).txt('True'),
        fragment().ele('s:String', {'x:Key': baseKey + 'Description/@EntryValue'}).txt(template.description),
        fragment().ele('s:Boolean', {'x:Key': baseKey + 'Reformat/@EntryValue'}).txt('True'),
        fragment().ele('s:Boolean', {'x:Key': scopeBaseKey + '@KeyIndexDefined'}).txt('True'),
        fragment().ele('s:String', {'x:Key': scopeBaseKey + 'CustomProperties/=minimumLanguageVersion/@EntryIndexedValue'}).txt('2.0'),
        fragment().ele('s:String', {'x:Key': scopeBaseKey + 'Type/@EntryValue'}).txt(template.settings['contexts'][0]),
        // <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Field/=ACTUAL/@KeyIndexDefined">True</s:Boolean>
        // <s:Int64 x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Field/=ACTUAL/Order/@EntryValue">1</s:Int64>
        // <s:Boolean x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Field/=EXPECTED/@KeyIndexDefined">True</s:Boolean>
        // <s:Int64 x:Key="/Default/PatternsAndTemplates/LiveTemplates/Template/=483DA23FE5010B45942DD5877D9DDE2D/Field/=EXPECTED/Order/@EntryValue">0</s:Int64>
    ];
}

function generateId(): string {
    return crypto.randomBytes(16).toString('hex');
}