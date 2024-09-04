---
title: Browser Error Tracking
aliases:
- /real_user_monitoring/error_tracking/browser_errors
further_reading:
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: "Source Code"
  text: "datadog-ci Source code"
- link: "/real_user_monitoring/guide/upload-javascript-source-maps"
  tag: "Documentation"
  text: "Upload Javascript source maps"
- link: "/real_user_monitoring/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
---

## Overview

[Error Tracking][4] processes errors collected from the browser by the Browser SDK. Whenever a [source][1], [custom][2], or [report][3] error containing a stack trace is collected, Error Tracking processes and groups it under an issue, or group of similar errors. 

## Setup

If you have not set up the Browser SDK yet, follow the [in-app setup instructions][5] or see the [Browser setup documentation][6].

1. Download the latest version of the [Browser SDK][7].
2. Configure your application's `version`, `env`, and `service` when [initializing the SDK][8].
3. [Upload your JavaScript source maps][9] to access unminified stack traces.

## Link errors with your source code

In addition to sending source maps, the [Datadog CLI][10] reports Git information such as the commit hash, repository URL, and a list of tracked file paths in the code repository. 

Error Tracking can use this information to correlate errors with your source code, allowing you to pivot from any stack trace frame to the related line of code in [GitHub][11], [GitLab][12] and [Bitbucket][13]. 

<div class="alert alert-info">Linking from stack frames to source code is supported in the <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> version <code>0.12.0</code> version and later.</div>

For more information, see the [Datadog Source Code Integration][14].

### Limitations

{{< site-region region="us,us3,us5,eu,gov" >}}
Source maps are limited to **500** MB each.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Source maps are limited to **500** MB each.
{{< /site-region >}}

## Collect errors manually

You can monitor handled exceptions, handled promise rejections, and other errors that the Browser SDK does not automatically track. Learn more about [Collecting Browser Errors][2].


To manually collect errors, use the `addError()` API:

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**Note**: [Error Tracking][4] processes errors that are sent with the source set to `custom`, `source` or `report`, and contain a stack trace. Errors sent with any other source (such as `console`) or sent from browser extensions are not processed by Error Tracking.

{{< tabs >}}
{{% tab "NPM" %}}

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
{{% /tab %}}
{{% tab "CDN async" %}}

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
{{% /tab %}}
{{% tab "CDN sync" %}}

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
{{% /tab %}}
{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#error-sources
[4]: https://app.datadoghq.com/rum/error-tracking
[5]: https://app.datadoghq.com/rum/application/create
[6]: /real_user_monitoring/browser/setup
[7]: https://www.npmjs.com/package/@datadog/browser-rum
[8]: /real_user_monitoring/browser/setup/#initialization-parameters
[9]: /real_user_monitoring/guide/upload-javascript-source-maps
[10]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[11]: https://github.com
[12]: https://about.gitlab.com
[13]: https://bitbucket.org/product
[14]: /integrations/guide/source-code-integration/
