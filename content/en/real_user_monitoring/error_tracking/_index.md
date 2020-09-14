---
title: RUM Error Tracking
kind: documentation
beta: true
further_reading:
- link: "/real_user_monitoring/error_tracking/explorer"
  tag: "Documentation"
  text: "RUM Error Tracking Explorer"
- link: "https://app.datadoghq.com/error-tracking"
  tag: "UI"
  text: "Error tracking"
---

{{< site-region region="eu" >}}

<div class="alert alert-warning"> The EU region is not yet available for Error Tracking. If you have any feedback or question, contact <a href="/help">Datadog support</a>.</div>

{{< /site-region >}}

{{< img src="real_user_monitoring/error_tracking/page.png" alt="Error Tracking Page"  >}}

## What is Error Tracking?

Datadog collects a lot of errors. It's critical to the health of your system to monitor these errors, but there can be so many individual error events that it’s hard to identify which ones matter the most and should be fixed first. 

Error Tracking makes it easier to monitor these errors by:

- __Grouping similar errors into issues__ to reduce the noise and help identify the most important ones.
- __Following issues over time__ to know when they first started, if they are still ongoing, and how often they are occurring.
- __Getting all the context needed in one place__ to facilitate troubleshooting the issue.

## Getting started

Error Tracking processes errors collected from the browser by the RUM SDK (errors with [source origin][1]).

To quickly get started with error tracking:

1. Download the `v1.11.5+` version of the [RUM Browser SDK][2].
2. Configure the __version__, the __env__ and the __service__ when [initializing your SDK][3].

### Upload mapping files

The source code of some applications is obfuscated or minified when deployed to production for performance optimization and security concerns.
The consequence is that stack traces of errors fired from those applications are also obfuscated, making the troubleshooting process much more difficult because the stack traces cannot be used to understand which file and which line of code are responsible for a given error. 

Datadog allows you to securely upload your source maps to deobfuscate your stack traces:

#### Javascript source maps

Source maps are mapping files generated when minifying Javascript source code. The [Datadog CLI][4] can be used to upload those mapping files from your build directory: it scans the build directory and its subdirectories to automatically upload the source maps with their related minified files. Upload your source maps directly from your CI pipeline:

1. Add `@datadog/datadog-ci` to your `package.json` file, you must use the `v0.5.2` version and onwards of the CLI.
2. Export your Datadog API key as an environment variable named `DATADOG_API_KEY`.
3. Run the following command:
   {{< code-block lang="curl">}}
```curl
datadog-ci sourcemaps upload /path/to/build/directory \
  --service=my-service \
  --release-version=v35.2395005 \
  --minified-path-prefix=https://hostname.com/static/js
```
  {{< /code-block >}}

For more information about CLI parameters, see the [official Github repository][5].

<div class="alert alert-warning">You must configure your Javascript bundler to create <strong>source maps that directly include the related source code</strong>. You should make sure the <code>sourcesContent</code> attribute in your source maps is not empty before uploading them.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /real_user_monitoring/data_collected/error#error-origins
[2]: https://www.npmjs.com/package/@datadog/browser-rum
[3]: /real_user_monitoring/installation/?tab=us#initialization-parameters
[4]: https://github.com/DataDog/datadog-ci/
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
