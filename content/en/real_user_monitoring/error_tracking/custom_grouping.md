---
title: Custom Grouping
kind: documentation
description: Customize how Browser RUM errors are grouped into issues.
further_reading:
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: "GitHub"
  text: "datadog-ci Source code"
- link: "/real_user_monitoring/guide/upload-javascript-source-maps"
  tag: "Documentation"
  text: "Upload JavaScript source maps"
- link: "/real_user_monitoring/error_tracking/"
  tag: "Documentation"
  text: "Learn about Error Tracking for Web and Mobile Applications"
---

## Overview

[Error Tracking][4] intelligently groups similar errors into issues with a default strategy. By using _custom fingerprinting_, you can gain full control over the grouping decision and customize the grouping behavior for your Real User Monitoring (RUM) errors.

Provide an `error.fingerprint` attribute that Error Tracking can use to group RUM errors into issues. While the value of the `error.fingerprint` attribute does not have any particular format or requirement, the content must be a string.

If `error.fingerprint` is provided, the grouping behavior follows these rules:

* Custom grouping takes precedence over the default strategy.
* Custom grouping can be applied only to a subset of your RUM errors and can coexist with the default strategy.
* The content of `error.fingerprint` is used as-is without any modification.
* RUM errors from the same service and with the same `error.fingerprint` attribute are grouped into the same issue.
* RUM errors with different `service` attributes are grouped into different issues.

## Setup for browser errors

In order to use custom grouping, you need the Datadog Browser SDK [v4.42.0 or later][3], a [browser RUM error][2], and an additional string attribute.

If you aren't already collecting Browser RUM events with Datadog, see the [Browser Monitoring setup documentation][1].

### Example

If you're already [collecting browser errors][2], it's possible to add the attribute by either:

* Adding a `dd_fingerprint` attribute to the error object:

```javascript
import { datadogRum } from '@datadog/browser-rum';
// Send a custom error with context
const error = new Error('Something went wrong');
error.dd_fingerprint = 'my-custom-grouping-fingerprint'
datadogRum.addError(error);
```

* Or, using the `beforeSend` callback with an `error.fingerprint` attribute:

```javascript
DD_RUM.init({
  ...
  beforeSend: () => {
    if (event.type === 'error') {
      event.error.fingerprint = 'my-custom-grouping-fingerprint'
    }
  },
})
```

In both cases, `my-custom-grouping-material` is used to group the Browser RUM errors into a single issue in Error Tracking.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /real_user_monitoring/browser/collecting_browser_errors/
[3]: https://github.com/DataDog/browser-sdk/releases/tag/v4.42.0
[4]: /real_user_monitoring/error_tracking
