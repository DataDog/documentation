---
title: Browser Crash Reporting and Error Tracking
kind: documentation
aliases:
- /real_user_monitoring/error_tracking/browser_errors
further_reading:
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: "GitHub"
  text: "datadog-ci Source code"
- link: "https://app.datadoghq.com/error-tracking"
  tag: "Documentation"
  text: "Learn about Error Tracking"
- link: "/real_user_monitoring/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
---

## Overview

Error Tracking processes errors collected from the browser by the RUM Browser SDK. Whenever a [source][1] or [custom][2] error containing a stack trace is collected, Error Tracking processes and groups it under an issue, or group of similar errors. 

Your crash reports appear in [**Error Tracking**][3].

## Setup

If you have not set up the Browser SDK yet, follow the [in-app setup instructions][4] or see the [Browser RUM setup documentation][5].

1. Download the latest version of the [RUM Browser SDK][6].
2. Configure your application's `version`, `env`, and `service` when [initializing the SDK][7].
3. [Upload your JavaScript source maps][8] to access unminified stack traces.

## Link errors with your source code

In addition to sending source maps, the [Datadog CLI][9] reports Git information such as the commit hash, repository URL, and a list of tracked file paths in the code repository. 

Error Tracking and RUM can use this information to correlate errors with your source code, allowing you to pivot from any stack trace frame to the related line of code in [GitHub][10], [GitLab][11] and [Bitbucket][12]. 

{{< img src="real_user_monitoring/error_tracking/link_to_git_js_example.mp4" alt="Link from a stack frame to the source code" video=true >}}

<div class="alert alert-info">Linking from stack frames to source code is supported in the <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> version <code>0.12.0</code> version and later.</div>

For more information, see the [Datadog Source Code Integration][13].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: https://app.datadoghq.com/rum/error-tracking
[4]: https://app.datadoghq.com/rum/application/create
[5]: /real_user_monitoring/browser/#setup
[6]: https://www.npmjs.com/package/@datadog/browser-rum
[7]: /real_user_monitoring/browser/#initialization-parameters
[8]: /real_user_monitoring/guide/upload-javascript-source-maps
[9]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[10]: https://github.com
[11]: https://about.gitlab.com
[12]: https://bitbucket.org/product
[13]: /integrations/guide/source-code-integration/
