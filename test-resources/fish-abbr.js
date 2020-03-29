const gpl = {
    o: {
        template: ' origin',
        children: {
            m: ' master'
        }
    },
    u: ' upstream'
}

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
                ch: {
                    template: ' checkout',
                    children: {
                        b: ' -b',
                        m: ' master'
                    }
                },
                d: {
                    template: ' diff',
                    children: {
                        c: ' --cached'
                    }
                },
                k: {
                    template: ' commit',
                    abstract: true,
                    children: {
                        '': ' -m',
                        a: ' --amend'
                    }
                },
                l: ' log',
                pl: {
                    template: ' pull',
                    children: {
                        r: {
                            template: ' -r',
                            children: gpl
                        },
                        ...gpl
                    }
                },
                ps: {
                    template: ' push',
                    children: {
                        f: ' -f'
                    }
                },
                r: ' reset',
                sh: {
                    template: ' stash',
                    children: {
                        a: ' apply'
                    }
                }
            }
        },
        n: {
            template: 'npm',
            children: {
                i: {
                    template: ' install',
                    children: {
                        s: ' --save',
                        sd: ' --save-dev'
                    }
                }
            }
        }
    }
}
