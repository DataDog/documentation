---
title: Tracing Node.js Applications
kind: documentation
aliases:
    - /tracing/nodejs/
    - /tracing/languages/nodejs/
    - /tracing/languages/javascript/
    - /tracing/setup/javascript/
    - /agent/apm/nodejs/
    - /tracing/setup/nodejs
    - /tracing/setup_overview/nodejs
    - /tracing/setup_overview/setup/nodejs
    - /tracing/trace_collection/dd_libraries/nodejs/
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 30
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-js'
      tag: "Source Code"
      text: 'Source code'
    - link: 'https://datadog.github.io/dd-trace-js'
      tag: 'Documentation'
      text: 'API documentation'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources and traces'
    - link: 'tracing/'
      tag: 'Documentation'
      text: 'Advanced Usage'
---
## Compatibility requirements

The latest Node.js Tracer supports versions `>=14`. For a full list of Datadog's Node.js version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][13]. Then, complete the following steps to add the Datadog tracing library to your Node.js application to instrument it. 

### Install the Datadog tracing library

To install the Datadog tracing library using npm for Node.js 14+, run:

  ```shell
  npm install dd-trace --save
  ```
To install the Datadog tracing library (version 2.x of `dd-trace`) for end-of-life Node.js version 12, run:
  ```shell
  npm install dd-trace@latest-node12
  ```
For more information on Datadog's distribution tags and Node.js runtime version support, see the [Compatibility Requirements][1] page.
If you are upgrading from a previous major version of the library (0.x, 1.x, or 2.x) to another major version (2.x or 3.x), read the [Migration Guide][5] to assess any breaking changes.

### Import and initialize the tracer

Import and initialize the tracer either in code or with command line arguments. The Node.js tracing library needs to be imported and initialized **before** any other module.

After you have completed setup, if you are not receiving complete traces, including missing URL routes for web requests, or disconnected or missing spans, **confirm the tracer has been imported and initialized correctly**. The tracing library being initialized first is necessary for the tracer to properly patch all of the required libraries for automatic instrumentation.

When using a transpiler such as TypeScript, Webpack, Babel, or others, import and initialize the tracer library in an external file and then import that file as a whole when building your application.

#### Option 1: Add the tracer in code

##### JavaScript

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

##### TypeScript and bundlers

For TypeScript and bundlers that support EcmaScript Module syntax, initialize the tracer in a separate file to maintain correct load order.

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

If the default config is sufficient, or all configuration is done
via environment variables, you can also use `dd-trace/init`, which loads and
initializes in one step.

```typescript
import 'dd-trace/init';
```

#### Option 2: Add the tracer with command line arguments

Use the `--require` option to Node.js to load and initialize the tracer in one step.

```sh
node --require dd-trace/init app.js
```

**Note:** This approach requires using environment variables for all configuration of the tracer.

#### ESM applications only: Import the loader

EcmaScript Modules (ESM) applications require an additional command line argument. Run this command regardless of how the tracer is imported and initialized.

**Node.js < v20.6**
```shell
node --loader dd-trace/loader-hook.mjs entrypoint.js
```

**Node.js >= v20.6**
```shell
node --import dd-trace/register.js entrypoint.js
```

### Bundling

`dd-trace` works by intercepting `require()` calls that a Node.js application makes when loading modules. This includes modules that are built-in to Node.js, like the `fs` module for accessing the filesystem, as well as modules installed from the NPM registry, like the `pg` database module.

Bundlers crawl all of the `require()` calls that an application makes to files on disk. It replaces the `require()` calls with custom code and combines all of the resulting JavaScript into one "bundled" file. When a built-in module is loaded, such as `require('fs')`, that call can then remain the same in the resulting bundle.

APM tools like `dd-trace` stop working at this point. They can continue to intercept the calls for built-in modules but don't intercept calls to third party libraries. This means that when you bundle a `dd-trace` app with a bundler it is likely to capture information about disk access (through `fs`) and outbound HTTP requests (through `http`), but omit calls to third party libraries. For example:
- Extracting incoming request route information for the `express` framework. 
- Showing which query is run for the `mysql` database client.

A common workaround is to treat all third party modules that the APM needs to instrument as being "external" to the bundler. With this setting the instrumented modules remain on disk and continue to be loaded with `require()` while the non-instrumented modules are bundled. However, this results in a build with many extraneous files and starts to defeat the purpose of bundling.

Datadog recommends you have custom-built bundler plugins. These plugins are able to instruct the bundler on how to behave, inject intermediary code and intercept the "translated" `require()` calls. As a result, more packages are included in the bundled JavaScript file. 

**Note**: Some applications can have 100% of modules bundled, however native modules still need to remain external to the bundle.

#### Esbuild support

This library provides experimental esbuild support in the form of an esbuild plugin, and requires at least Node.js v16.17 or v18.7. To use the plugin, make sure you have `dd-trace@3+` installed, and then require the `dd-trace/esbuild` module when building your bundle.

Here's an example of how one might use `dd-trace` with esbuild:

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node16'],
  external: [
    // esbuild cannot bundle native modules
    '@datadog/native-metrics',

    // required if you use profiling
    '@datadog/pprof',

    // required if you use Datadog security features
    '@datadog/native-appsec',
    '@datadog/native-iast-taint-tracking',
    '@datadog/native-iast-rewriter',

    // required if you encounter graphql errors during the build step
    'graphql/language/visitor',
    'graphql/language/printer',
    'graphql/utilities'
  ]
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

**Note**: Due to the usage of native modules in the tracer, which are compiled C++ code, (usually ending with a `.node` file extension), you need to add entries to your `external` list. Currently native modules used in the Node.js tracer live inside of `@datadog` prefixed packages. This will also require that you ship a `node_modules/` directory alongside your bundled application. You don't need to ship your entire `node_modules/` directory as it would contain many superfluous packages that should be contained in your bundle.

To generate a smaller `node_modules/` directory with only the required native modules, (and their dependencies) you can first determine the versions of packages that you need, then create a temporary directory to install them into, and copy the resulting `node_modules/` directory from it. For example:

```sh
cd path/to/project
npm ls @datadog/native-metrics
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/native-metrics@2.0.0
$ npm ls @datadog/pprof
# dd-trace@5.4.3-pre ./dd-trace-js
# └── @datadog/pprof@5.0.0
mkdir temp && cd temp
npm init -y
npm install @datadog/native-metrics@2.0.0 @datadog/pprof@5.0.0
cp -R ./node_modules path/to/bundle
```

At this stage you should be able to deploy your bundle, (which is your application code and most of your dependencies), with the `node_modules/` directory, which contains the native modules and their dependencies.

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

Read [tracer settings][3] for a list of initialization options.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/compatibility_requirements/nodejs
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://datadog.github.io/dd-trace-js/#tracer-settings
[4]: /tracing/trace_collection/library_config/nodejs/
[5]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[11]: /tracing/trace_collection/library_injection_local/
[13]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
