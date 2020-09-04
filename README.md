[![Actions Status](https://github.com/JustFixNYC/justfix-ts/workflows/Node%20CI/badge.svg)](https://github.com/JustFixNYC/justfix-ts/actions)

This is a [monorepo][] for TypeScript-based NPM packages that are
intended for reuse across multiple JustFix.nyc properties.

Individual packages can be found in the [`packages/`](packages/)  subdirectory.
They are published to NPM under the `@justfixnyc` scope.

## Using packages

Unless otherwise noted, all package source code uses **es2019** syntax
with **es2015** module code generation.

The case for this is documented in Henry Zhu's Babel post
[On Consuming (and Publishing) ES2015+ Packages][babel-es2015]:

> Why is compiling dependencies (as opposed to just compiling our own code) desirable in the first place?
>
> * To have the freedom to make the tradeoffs of where code is able to run (vs. the library).
> * To ship less code to users, since JavaScript has a [cost][].

However, the downside of this approach is that using packages from this monorepo
will almost certainly require the use of a transpiler and/or bundler. Fortunately, many
tools and frameworks support the transpilation of dependencies, and some even do it
by default.

Accomplishing this usually involves the following techniques:

* Many transpilation/bundling tools are configured to automatically ignore
  everything in `node_modules`. You'll probably need to tell them to ignore everything
  in `node_modules` _except_ packages scoped under `@justfixnyc`.

* Your tools may include a regular expression that tells them to only
  transpile/bundle TypeScript source files; you may need to tell them to also process
  JS files, or else the files in `@justfixnyc` packages will be skipped over.

Below are techniques and examples for specific tools and frameworks.

[babel-es2015]: https://babeljs.io/blog/2018/06/26/on-consuming-and-publishing-es2015+-packages
[cost]: https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e

### Webpack

Most Webpack configurations typically explicitly exclude anything in `node_modules`
via an `exclude` option. If you do this, you'll need to change this option to
exclude everything in `node_modules` *except* anything scoped under `@justfixnyc`.

Additionally, if you use [webpack-node-externals][] to exclude `node_modules` from
being transpiled and bundled by Webpack for scripts that run in node, you'll want
to pass the [`whitelist`][] option to ensure that it still processes packages
from this monorepo.

See [tenants2#889][] for an example of these techniques in practice.

[webpack-node-externals]: https://www.npmjs.com/package/webpack-node-externals
[`whitelist`]: https://www.npmjs.com/package/webpack-node-externals#optionswhitelist-

### Rollup

Using Rollup is relatively straightforward, since it uses es2015 modules natively.
You'll need to use the [`rollup-plugin-node-resolve`][] package so Rollup can
find your dependencies using the Node module resolution algorithm. See
[justfix-ts#1][] for an example.

[`rollup-plugin-node-resolve`]: https://github.com/rollup/rollup-plugin-node-resolve

### Jest

Jest normally doesn't transpile anything in `node_modules`, but this can be
overridden via its [`transformIgnorePatterns`][] option. See [justfix-website#40][] or
[justfix-ts#3][] for examples of this in practice.

[`transformIgnorePatterns`]: https://jestjs.io/docs/en/configuration#transformignorepatterns-array-string

### Create React App (CRA)

CRA actually _always_ transpiles `node_modules` during development and production,
but its built-in Jest configuration currently does not. See [who-owns-what#180][] for
a solution.

### Gatsby

Gatsby also always transpiles `node_modules`, at least for production. See
[justfix-website#40][] for an example.

[justfix-website#40]: https://github.com/JustFixNYC/justfix-website/pull/40
[who-owns-what#180]: https://github.com/JustFixNYC/who-owns-what/pull/180
[tenants2#889]: https://github.com/JustFixNYC/tenants2/pull/889
[justfix-ts#1]: https://github.com/JustFixNYC/justfix-ts/pull/1
[justfix-ts#3]: https://github.com/JustFixNYC/justfix-ts/pull/3

## Developing packages

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
* `yarn test` will run the project's tests.
* `yarn test:watch` will run the project's tests, watching files for changes and re-running the test suite as needed.

Each package should also have a `CONTRIBUTING.md` that provides further
guidance on developing it.

### Code formatting

We use [Prettier][] for all code formatting, and its formatting is enforced by our continous integration infrastructure.

Checking code formatting can be done with `yarn prettier:check`, while automatically fixing all code formatting
issues can be done with `yarn prettier:fix`.

[Prettier]: https://prettier.io/

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
