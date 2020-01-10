const NODE_ENV = process.env.NODE_ENV;

const config = {
     production: {
        FOO_API: 'production.foo.com',
        BAR_API: 'production.bar.com',
        BAZ_API: 'production.baz.com',
     },
     development: {
        FOO_API: 'development.foo.com',
        BAR_API: 'development.bar.com',
        BAZ_API: 'development.baz.com',
     },
     test: {
        FOO_API: 'test.foo.com',
        BAR_API: 'test.bar.com',
        BAZ_API: 'test.baz.com',
     }
}

module.exports = config[NODE_ENV];