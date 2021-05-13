---
title: Track Browser Errors
kind: documentation
further_reading:
- link: "/real_user_monitoring/error_tracking/explorer"
  tag: "Documentation"
  text: "Error Tracking Explorer"
- link: "https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps"
  tag: "Documentation"
  text: "Official repository of the Datadog CLI"
- link: "/real_user_monitoring/guide/upload-javascript-source-maps"
  tag: "Guide"
  text: "Upload javascript source maps"
- link: "https://app.datadoghq.com/error-tracking"
  tag: "UI"
  text: "Error tracking"
---

Error Tracking processes errors collected from the browser by the RUM SDK: whenever a [source][1] or [custom][2] error containing a stack trace is collected, Error Tracking processes and groups it under an issue (group of similar errors). To quickly get started with error tracking:

1. Download the latest version of the [RUM Browser SDK][3].
2. Configure the __version__, the __env__ and the __service__ when [initializing your SDK][4].
3. Upload JavaScript source maps [following our guide][5] to get unminified stack traces.

## Link errors with your source code

In addition to sending source maps, the new version of the [Datadog CLI][6] reports git information such as the commit hash, the repository url as well as the list of tracked file paths in the git repository. Using this information, Error Tracking and RUM will make it even easier to correlate an error with the source code by allowing you to pivot from any stack trace frame to the related source code in your source code management tool. 

{{< img src="real_user_monitoring/error_tracking/link_to_git_js_example.gif" alt="Link from a stack frame to the source code"  >}}

<div class="alert alert-info">To see links to the code, make sure to use the <code>0.12.0</code> version or more of the <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a>.</div>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: https://www.npmjs.com/package/@datadog/browser-rum
[4]: /real_user_monitoring/browser/#initialization-parameters
[5]: /real_user_monitoring/guide/upload-javascript-source-maps
[6]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
