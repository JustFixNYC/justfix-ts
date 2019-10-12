This is a [monorepo][] for TypeScript-based NPM packages that are
intended for reuse across multiple JustFix.nyc properties.

Unless otherwise noted, all package source code uses **es2019** syntax
with **es2015** module code generation. This means that using them
in production will likely require the use of a transpiler and/or bundler.

Individual packages can be found in the [`packages/` subdirectory](packages/).

## Quick start

Before working on any individual packages, go to the root of the repository and
run the following to install all dependencies:

```
yarn install
```

Then run the following to build all packages in the monorepo:

```
yarn build
```

Then `cd` into a package of your choice.

Common commands that will work on all packages include:

* `yarn build` will build the project.
* `yarn watch` will watch the project's files for changes and rebuild them
  when they change.

Each package should also have a `CONTRIBUTING.md` that provides further
guidance on developing it.

## Publishing packages

Before publishing, you should make sure you are logged into `npm` as a
user with publish access to the `@justfixnyc` organization/scope.  Use
the following to check if you are logged in:

```
npm whoami
```

To publish all changed packages, go to the root of the repository and run:

```
yarn lerna publish
```

[monorepo]: https://en.wikipedia.org/wiki/Monorepo
