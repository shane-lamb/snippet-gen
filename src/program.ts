import * as process from 'process'
import * as fs from 'fs'
import * as path from 'path'
import { program } from 'commander'
import { RunConfig } from './types'
import { merge } from './rider'
import { flattenTemplates } from './flatten'

const configuredProgram = program
    .command('<file>')
    .description('generate templates from definition file')
    .action((_, [configRelativePath]) => {
        const configPath = path.resolve(process.cwd(), configRelativePath)
        const config: RunConfig = require(configPath)
        const targetPath = path.resolve(configPath, '../', config.targetFile)
        const target = fs.existsSync(targetPath) ?
            fs.readFileSync(targetPath, 'utf8') : undefined
        const flatTemplates = flattenTemplates(config.templates)
        const merged = merge(flatTemplates, target)
        fs.writeFileSync(targetPath, merged)
    })

export function run() {
    configuredProgram.parse(process.argv)
}