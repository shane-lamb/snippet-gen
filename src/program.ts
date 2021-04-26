import * as process from 'process'
import * as fs from 'fs'
import * as path from 'path'
import { program } from 'commander'
import { RunConfig } from './types'
import { merge } from './adapter'
import { flattenTemplates } from './flatten'

program
    .arguments('<configFile>')
    .option('-t, --targetFile <targetFile>', 'path to target/output file')
    .description('generate templates from definition file')
    .action((configRelativePath: string, options: {[optionName: string]: string}) => {
        const configPath = path.resolve(process.cwd(), configRelativePath)
        const config: RunConfig = require(configPath)
        const targetPath = path.resolve(configPath, '../', options.targetFile || config.targetFile)
        const target = fs.existsSync(targetPath) ?
            fs.readFileSync(targetPath, 'utf8') : undefined
        const flatTemplates = flattenTemplates(config.templates)
        const merged = merge(config.adapter, flatTemplates, target)
        fs.writeFileSync(targetPath, merged)
    })

export function run() {
    program.parse(process.argv)
}