const templateToXml = jest.fn()
jest.mock('./template-converter', () => ({ templateToXml }))

import { merge } from './index'
import { Template } from '../../types'
import { fragment } from 'xmlbuilder2'

const existing = `
    <templateSet group="Kotlin">
      <template name="a">x</template>
    </templateSet>
`

const overrideTemplate: Template = {
    shortcut: 'a',
    template: '',
    description: '',
    settings: {}
}

const appendTemplate: Template = {
    shortcut: 'b',
    template: '',
    description: '',
    settings: {}
}

export function assertEquals(expected: string, actual: string) {
    expected = expected.split('\n').map(x => x.trim()).filter(Boolean).join()
    expect(actual.split('\n').map(x => x.trim()).join()).toEqual(expected)
}

describe('kotlin adapter', () => {
    beforeEach(() => {
        templateToXml.mockReset();
    })
    it('updates existing', () => {
        templateToXml.mockReturnValueOnce(fragment().ele('overridetemp').txt("456"))
        
        const result = merge([overrideTemplate], existing)

        assertEquals(`
            <templateSet group="Kotlin">
              <overridetemp>456</overridetemp>
            </templateSet>
        `, result)
        expect(templateToXml).toHaveBeenCalledWith(overrideTemplate)
    })
    it('adds new', () => {
        templateToXml.mockReturnValueOnce(fragment().ele('newtemp').txt("456"))
        
        const result = merge([appendTemplate], existing)

        assertEquals(`
            <templateSet group="Kotlin">
              <template name="a">x</template>
              <newtemp>456</newtemp>
            </templateSet>
        `, result)
        expect(templateToXml).toHaveBeenCalledWith(appendTemplate)
    })
    it('adds without existing content', () => {
        templateToXml.mockReturnValueOnce(fragment().ele('newtemp').txt("456"))

        const result = merge([appendTemplate])

        assertEquals(`
            <templateSet group="Kotlin">
              <newtemp>456</newtemp>
            </templateSet>
        `, result)
        expect(templateToXml).toHaveBeenCalledWith(appendTemplate)
    })
    it('fixes newline issue', () => {
        templateToXml.mockReturnValueOnce(fragment().ele('newtemp', {value: 'a&#10;b&#10;'}))

        const result = merge([appendTemplate])

        assertEquals(`
            <templateSet group="Kotlin">
              <newtemp value="a&#10;b&#10;"/>
            </templateSet>
        `, result)
        expect(templateToXml).toHaveBeenCalledWith(appendTemplate)
    })
})
