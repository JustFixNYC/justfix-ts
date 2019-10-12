This is a [monorepo][] for TypeScript-based NPM packages that are
intended for reuse across multiple JustFix.nyc properties.

Unless otherwise noted, all package source code uses **es2019** syntax
with **es2015** module code generation. This means that using them
in production will likely require the use of a transpiler and/or bundler.

Individual packages can be found in the [`packages/` subdirectory](packages/).

## Quick start

Before working on any individual packages, run the following to install
all dependencies:

```
yarn
```

Then `cd` into a package of your choice and follow its README instructions.

[monorepo]: https://en.wikipedia.org/wiki/Monorepo
