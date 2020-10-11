import { XMLBuilder } from 'xmlbuilder2/lib/interfaces'
import { Template } from '../../types'
import { templateToXml } from './template-converter'

describe('kotlin template converter', () => {
    it('converts template', () => {
        const input: Template = {
            template: 'fun $NAME$($PARAMS$) {\n$END$\n}',
            description: 'Function returning nothing',
            shortcut: 'void',
            settings: {
                contexts: ['KOTLIN_CLASS', 'KOTLIN_STATEMENT', 'KOTLIN_TOPLEVEL']
            }
        }

        const result = templateToXml(input)

        assertEquals(`
          <template name="void" value="fun $NAME$($PARAMS$) {&amp;#10;$END$&amp;#10;}" description="Function returning nothing" toReformat="true" toShortenFQNames="true">
            <context>
              <option name="KOTLIN_CLASS" value="true"/>
              <option name="KOTLIN_STATEMENT" value="true"/>
              <option name="KOTLIN_TOPLEVEL" value="true"/>
            </context>
          </template>
        `, result)
    })
})

function assertEquals(expected: string, actual: XMLBuilder) {
    const expectedString = expected.split('\n').map(x => x.trim()).filter(Boolean).join('')
    const actualString = actual.toString()
    expect(actualString).toEqual(expectedString)
}
