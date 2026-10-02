## Automated error reporting

After you enable RUM, the Browser SDK automatically captures unhandled JavaScript errors, unhandled promise rejections, and reported errors (such as CSP violations and deprecations). For details on error sources, attributes, and troubleshooting, see [Browser Error Tracking][1].

## Manual error reporting

To report an error manually, use the `addError` API:

{% tabs %}
{% tab label="npm" %}
```javascript
import { datadogRum } from '@datadog/browser-rum';

try {
    // an error occurs
} catch (error) {
    datadogRum.addError(error);
}
```
{% /tab %}
{% tab label="CDN async" %}
```javascript
window.DD_RUM &&
    window.DD_RUM.onReady(function () {
        try {
            // an error occurs
        } catch (error) {
            window.DD_RUM.addError(error);
        }
    });
```
{% /tab %}
{% tab label="CDN sync" %}
```javascript
try {
    // an error occurs
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```
{% /tab %}
{% /tabs %}

You can also pass a context object as a second argument:

```javascript
datadogRum.addError(error, { pageStatus: 'beta' });
```

For React applications, instrument your error boundaries to report caught errors with `addError` from the `componentDidCatch` life cycle method. See [Collect browser errors][2] for the full example.

## Attach local error context with dd_context

When capturing errors, you can provide additional context at the time an error is generated. Instead of passing extra information through the `addError()` API, attach a `dd_context` property directly to the error instance. The RUM Browser SDK automatically detects this property and merges it into the final error event context.

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

For the attributes collected, see [Data Collected](/real_user_monitoring/setup/data_collected/?platform=browser#error-attributes).

## Upload debug symbols to get deobfuscated stack traces

If your JavaScript source code is minified, upload your source maps to Datadog to deobfuscate stack traces. For any given error, you can then access the file path, line number, and code snippet for each frame of the related stack trace.

1. Configure your JavaScript bundler to generate source maps that include the related source code in the `sourcesContent` attribute. The size of each source map plus the size of the related minified file must not exceed **500 MB**.
2. Upload the source maps with one of the following methods:

   {% tabs %}
   {% tab label="Build plugin (recommended)" %}

   Use a [Datadog build plugin][3] (webpack, Vite, Rollup, esbuild, or Rspack) to inject debug IDs and upload source maps during your build. For example, with webpack:

   ```javascript
   // webpack.config.js
   const { datadogWebpackPlugin } = require('@datadog/webpack-plugin');

   module.exports = {
     plugins: [
       datadogWebpackPlugin({
         auth: {
           apiKey: process.env.DATADOG_API_KEY,
           site: 'datadoghq.com',
         },
         sourcemaps: {
           debugId: true,
           upload: true,
         },
       }),
     ],
   };
   ```

   {% /tab %}
   {% tab label="Datadog CLI" %}

   1. Add `@datadog/datadog-ci` to your `package.json` file.
   2. [Create a dedicated Datadog API key][4] and export it as an environment variable named `DD_API_KEY`. For sites other than US1, also export `DD_SITE` with your [Datadog site][5].
   3. After the build, inject debug IDs and upload the source maps with their JavaScript bundles:

      ```bash
      datadog-ci sourcemaps inject /path/to/dist
      datadog-ci sourcemaps upload /path/to/dist --debug-id
      ```

   {% /tab %}
   {% /tabs %}

3. Verify the uploaded files on the [Explore RUM Debug Symbols][6] page.

You can also match source maps by service and version, upload WebAssembly debug symbols, and link stack frames to your source code. For details, see [Upload JavaScript Source Maps][7].

[1]: /error_tracking/frontend/browser/
[2]: /real_user_monitoring/application_monitoring/browser/collecting_browser_errors/
[3]: /real_user_monitoring/setup/additional_plugins/?platform=browser#source-maps
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /getting_started/site/
[6]: https://app.datadoghq.com/source-code/setup/rum
[7]: /real_user_monitoring/guide/upload-javascript-source-maps/
