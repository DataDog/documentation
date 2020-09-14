---
title: Upload Javascript source maps
kind: guide
further_reading:
- link: '/real_user_monitoring/error_tracking'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize your Error Tracking data in the Explorer'
---

## Overview

If your front-end Javascript source code is minified, you will need to upload your source maps to Datadog so that we are able to deobfuscate your different stack traces: for a given error, you will then get access to the file path, the line number as well as a code snippet for each frame of the related stack trace.

## Instrument your code
You must configure your Javascript bundler so that, when minifying your source code, it generates source maps which directly include the related source code in the `sourcesContent` attribute.

Check below some configurations for popular Javascript bundlers.

{{< tabs >}}
{{% tab "WebpackJS" %}}

You can generate source maps by using the built-in webpack plugin named [SourceMapDevToolPlugin][1]. Check below how to configure it in your `webpack.config.js` file:

```javascript
// ...
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      noSources: false,
      filename: '[name].[hash].js.map'
    }),
    // ...
  ],
  optimization: {
    minimize: true,
    // ...
  },
  // ...
};
```

**Note**: If you are using TypeScript, make sure to set `compilerOptions.sourceMap` to `true` when configuring your `tsconfig.json` file.

{{% /tab %}}
{{% tab "ParcelJS" %}}

Parcel generates source maps by default when you run the build command: `parcel build <entry file>`

{{% /tab %}}
{{< /tabs >}}

After building your application, bundlers generate a directory, most of the time named `dist`, with minified Javascript files colocated with their corresponding source maps. Check an example below:

```bash
./dist
    javascript.364758.min.js
    javascript.364758.js.map
    ./subdirectory
        javascript.464388.min.js
        javascript.464388.js.map
```

## Upload your source maps

The best way to upload source maps is to add an extra-step in your CI pipeline and to run the dedicated command from the [Datadog CLI][2]: it scans the `dist` directory and its subdirectories to automatically upload the source maps with their related minified files. The flow is the following:

1. Add `@datadog/datadog-ci` to your `package.json` file (make sure to use the latest version).
2. [Create a new and dedicated Datadog API key][3] and export it as an environment variable named `DATADOG_API_KEY`.
3. Run the following command:
```bash
datadog-ci sourcemaps upload /path/to/dist \
	--service=my-service \
	--release-version=v35.2395005 \
	--minified-path-prefix=https://hostname.com/static/js
```

**Note**: the CLI has been optimised to upload as many source maps as you need in a very short amount of time (typically a few seconds) to minimize the overhead on your CI's performance.

By running this command against our example `dist` directory (see previous section), Datadog will expect your server or your CDN to deliver the javascript files at `https://hostname.com/static/js/javascript.364758.min.js` and `https://hostname.com/static/js/subdirectory/javascript.464388.min`.js.  When an error occurs in a session of one of your users, the RUM SDK instantaneously collects it: whenever the given error originated in a file that were downloaded from one of those urls and is also tagged with `version:v35.2395005` and `service:my-service`, the related source map will be used to deobfuscate the stack trace (in this case, the `javascript.464388.js.map` file).

## Troubleshoot errors with ease

A minified stack trace is almost useless as you don't have access to the file path and the line number: you basically do not know where it is happening in your code base. In addition, the code snippet is still minified (one long line of transformed code) which makes the troubleshooting process even hard. See below an example of an unminified stack trace:

{{< img src="real_user_monitoring/error_tracking/minified_stacktrace.png" alt="Error Tracking Minified Stack Trace"  >}}

On the contrary, an unminified stack trace gives you all the context you need for a fast and seamless troubleshooting:

{{< img src="real_user_monitoring/error_tracking/unminified_stacktrace.png" alt="Error Tracking Unminified Stack Trace"  >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://webpack.js.org/plugins/source-map-dev-tool-plugin/
[2]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
[3]: https://app.datadoghq.com/account/settings#api
