module.exports = {
    targetFile: './abbr.fish',
    adapter: 'fish-abbr',
    templates: {
        c: 'clear',
        g: {
            template: 'git',
            abstract: true,
            children: {
                '': ' status -s',
                a: ' add',
                A: ' add -A',
                b: {
                    template: ' branch',
                    children: {
                        d: ' -D'
                    }
                },
                d: {
                    template: ' diff',
                    children: {
                        c: ' --cached'
                    }
                },
                k: ' commit -m',
            }
        }
    }
}