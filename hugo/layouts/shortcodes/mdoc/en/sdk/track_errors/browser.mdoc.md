The Browser SDK collects frontend errors, including the error message and stack trace when available. For triaging and managing these errors in the Error Tracking product, see [Browser Error Tracking][1].

When the Browser SDK collects an error:

* The error is captured as an [Error event][2] in RUM.
* [Retention Filters][3] that target sessions containing an Error event retain the current session.
* The [RUM metrics][4] `rum.measure.error`, `rum.measure.session.error`, and `rum.measure.view.error_free` are updated, regardless of whether the session is retained.
* The error is captured in [Error Tracking][5].

[Error Tracking rules][6] do not apply to _Error events_, and RUM still records Error events that match [Ignored and Excluded issues][7] in Error Tracking. To prevent errors from being recorded as Error events, discard them before they are sent to Datadog [using the `beforeSend` callback][8].

## Automated error reporting

After you enable RUM, the Browser SDK automatically captures unhandled JavaScript errors, unhandled promise rejections, and reported errors (such as CSP violations and deprecations).

### Error sources

Frontend errors come from several different sources:

- **agent**: From the SDK execution
- **console**: From `console.error()` API calls
- **custom**: Sent with the [`addError` API](#manual-error-reporting)
- **report**: From the `ReportingObserver` API
- **source**: From unhandled exceptions or unhandled promise rejections in the source code

For the attributes collected for errors, see [Data Collected][9].

### Configure WebAssembly error tracking

To track WebAssembly (WASM) errors, install the Browser SDK WASM plugin. Use the same version for the plugin and the RUM Browser SDK:

```shell
npm install --save-exact \
  @datadog/browser-rum@<VERSION> \
  @datadog/browser-plugin-wasm@<VERSION>
```

Register the plugin when you initialize RUM:

```javascript
import { makeWasmPlugin } from '@datadog/browser-plugin-wasm';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  // ...
  plugins: [makeWasmPlugin()],
});
```

Initialize RUM before loading any WASM modules. The plugin observes modules created with the browser's `WebAssembly` APIs and adds their URLs and build IDs to errors that contain WASM stack frames. This lets Datadog select the correct build ID when an application loads multiple modules.

Unhandled errors are collected automatically. To report a handled WASM error, pass the `Error` object to [`addError()`](#manual-error-reporting).

Then, [upload WebAssembly symbols][10] to symbolicate the errors.

## Manual error reporting

Monitor handled exceptions, handled promise rejections, and other errors not tracked automatically by the Browser SDK with the `addError()` API:

```javascript
addError(
    error: unknown,
    context?: Context
);
```

**Note**: [Error Tracking][5] processes errors that are sent with the source set to `custom`, `source`, `report` or `console`, and contain a stack trace. Errors sent with any other source (such as `network`) or sent from browser extensions are not processed by Error Tracking.

{% tabs %}
{% tab label="npm" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Send a custom error with context
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error);
}
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM.onReady(function() {
    window.DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    });
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addError(error);
    })
}
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM && window.DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && window.DD_RUM.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM && window.DD_RUM.addError(error);
}
```

{% /tab %}
{% /tabs %}

### React error boundaries instrumentation

You can instrument the React [error boundaries][11] to monitor React rendering errors using the RUM Browser SDK `addError()` API.

The collected rendering errors contain a component stack, which is unminified like any other error stack traces after you [upload source maps](#upload-debug-symbols-to-get-deobfuscated-stack-traces).

To instrument React error boundaries for monitoring, use the following:

{% tabs %}
{% tab label="npm" %}

```javascript
import { datadogRum } from '@datadog/browser-rum';

class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    datadogRum.addError(renderingError);
  }

  ...
}
```

{% /tab %}
{% tab label="CDN async" %}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

    DD_RUM.onReady(function() {
       DD_RUM.addError(renderingError);
    });
  }

  ...
}
```

{% /tab %}
{% tab label="CDN sync" %}

```javascript
class ErrorBoundary extends React.Component {
  ...

  componentDidCatch(error, info) {
    const renderingError = new Error(error.message);
    renderingError.name = `ReactRenderingError`;
    renderingError.stack = info.componentStack;
    renderingError.cause = error;

     window.DD_RUM &&
       window.DD_RUM.addError(renderingError);

  }

  ...
}
```

{% /tab %}
{% /tabs %}

## Attach local error context with dd_context

When capturing errors, you can provide additional context at the time an error is generated. Instead of passing extra information through the `addError()` API, attach a `dd_context` property directly to the error instance. The RUM Browser SDK automatically detects this property and merges it into the final error event context.

```javascript
const error = new Error('Something went wrong')
error.dd_context = { component: 'Menu', param: 123, }
throw error
```

## Upload debug symbols to get deobfuscated stack traces

If your JavaScript source code is minified, upload your source maps to Datadog to deobfuscate stack traces. For any given error, you can then access the file path, line number, and code snippet for each frame of the related stack trace.

1. Configure your JavaScript bundler to generate source maps that include the related source code in the `sourcesContent` attribute. The size of each source map plus the size of the related minified file must not exceed **500 MB**.
2. Upload the source maps with one of the following methods:

   {% tabs %}
   {% tab label="Build plugin (recommended)" %}

   Use a [Datadog build plugin][12] (webpack, Vite, Rollup, esbuild, or Rspack) to inject debug IDs and upload source maps during your build. For example, with webpack:

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
   2. [Create a dedicated Datadog API key][13] and export it as an environment variable named `DD_API_KEY`. For sites other than US1, also export `DD_SITE` with your [Datadog site][14].
   3. After the build, inject debug IDs and upload the source maps with their JavaScript bundles:

      ```bash
      datadog-ci sourcemaps inject /path/to/dist
      datadog-ci sourcemaps upload /path/to/dist --debug-id
      ```

   {% /tab %}
   {% /tabs %}

3. Verify the uploaded files on the [Explore RUM Debug Symbols][15] page.

You can also match source maps by service and version, upload WebAssembly debug symbols, and link stack frames to your source code. For details, see [Upload JavaScript Source Maps][16].

## Troubleshooting

### Script error

For security reasons, browsers hide details from errors triggered by cross-origin scripts. When this happens, the {% ui %}Error Details{% /ui %} tab shows an error with the minimal message "Script error."

{% img src="real_user_monitoring/browser/script-error.png" alt="Real User Monitoring script error example" style="width:75%;" /%}

For more information about cross-origin scripts and why details are hidden, see [CORS][17] and [this Note on Global Event Handlers][18]. Some possible reasons for this error include:
- Your JavaScript files are hosted on a different hostname (for instance, `example.com` includes assets from `static.example.com`).
- Your website includes JavaScript libraries hosted on a CDN.
- Your website includes third-party JavaScript libraries hosted on the provider's servers.

Get visibility into cross-origin scripts by following these two steps:
1. Call JavaScript libraries with [`crossorigin="anonymous"`][19].

    With `crossorigin="anonymous"`, the request to fetch the script is performed securely. No sensitive data is forwarded through cookies or HTTP authentication.

2. Configure the [`Access-Control-Allow-Origin`][20] HTTP response header:

    - `Access-Control-Allow-Origin: *` to allow all origins to fetch the resource.
    - `Access-Control-Allow-Origin: example.com` to specify a single allowed origin. If the server supports clients from multiple origins, it must return the origin for the specific client making the request.

[1]: /error_tracking/frontend/browser/
[2]: /real_user_monitoring/investigate_problems/explore_retained_data/search/#event-types
[3]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[4]: /real_user_monitoring/measure_health_with_metrics/out_of_the_box_metrics/
[5]: /real_user_monitoring/investigate_problems/triage_errors_and_crashes/
[6]: /error_tracking/manage_data_collection
[7]: /error_tracking/issue_states#excluding-an-issue
[8]: /real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=browser
[9]: /real_user_monitoring/setup/data_collected/?platform=browser#error-attributes
[10]: /real_user_monitoring/guide/upload-webassembly-symbols/
[11]: https://legacy.reactjs.org/docs/error-boundaries.html
[12]: /real_user_monitoring/setup/additional_plugins/?platform=browser#source-maps
[13]: https://app.datadoghq.com/organization-settings/api-keys
[14]: /getting_started/site/
[15]: https://app.datadoghq.com/source-code/setup/rum
[16]: /real_user_monitoring/guide/upload-javascript-source-maps/
[17]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[18]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
[19]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[20]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
