---
title: RUM Error Tracking
kind: documentation
beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/explorer/analytics/"
  tag: "Documentation"
  text: "Build analytics upon your events"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

{{< img src="real_user_monitoring/etracking_page.png" alt="Error Tracking Page"  >}}

## What is Error Tracking?

Across the different products of its platform, namely [Real User Monitoring][/real_user_monitoring], [APM][/tracing] and [Log Management][/logs], Datadog collects a lot of errors. The monitoring of those errors is critical for the health of a system but there can be so many individual error events that it’s hard to identify which ones matter the most and should be fixed first. The goal of Error Tracking is to make this easy by:
* __Grouping similar errors into issues__ to reduce the noise and help identify the most important ones.
* __Following issues over time__ to know when they first started, if they are still ongoing and more importantly how often they are occurring.
* __Getting all the context needed in one place__ to facilitate the troubleshooting.

## Getting started

Error Tracking processes for now __errors collected from the browser by the RUM SDK__ (errors with [source origin][/real_user_monitoring/data_collected/error#error-origins]). We plan to soon process errors from your mobile and back-end applications using errors already collected through the RUM and APM SDKs.

For Error Tracking to properly work, you must set the __version__, the __environment__ and the __service__ when initializing your different SDKs or when configuring your Datadog agent (for APM only, once supported). Refer to the dedicated documentation for more information:
* [Initialize the RUM SDK][/real_user_monitoring/installation/?tab=us#initialization-parameters]

__Important note__: you must download the `v1.11.5` version and onwards of the RUM SDK.

### Upload mapping files

The source code of some applications is obfuscated or minified when deployed to production for performance optimization and security concerns. The consequence is that stack traces of errors fired from those applications are also obfuscated making the troubleshooting process harder: they cannot be used to understand which file and which line of code are responsible for a given error.

__Datadog allows you to securely upload your mapping files so that collected stack traces can be automatically deobfuscated.__

#### Javascript source maps

Source maps are mapping files generated when minifying Javascript source code. The __Datadog CLI__ can be used to upload those mapping files from your build directory: it scans the build directory and its subdirectories to automatically upload the source maps along with their related minified files. To upload your source maps:
1. Add `@datadog/datadog-ci` to your `package.json` file (you must use the `v0.5.2` version and onwards of the CLI)
2. Export your Datadog API key as an environment variable named `<DATADOG_API_KEY>`
3. Run the following command:

   ```bash
    $ datadog-ci sourcemaps upload /path/to/build/directory \
                --service=my-service \
                --release-version=v35.2395005 \
                --minified-path-prefix=https://hostname.com/static/js
   ```

   Get more information about CLI parameters in the [official Github repository][https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps]

<div class="alert alert-warning">You must configure your Javascript bundler to create <strong>source maps that directly include the related source code</strong>. You should make sure the <code>sourceContent</code> attribute in your source maps is not empty before uploading them.</div>




