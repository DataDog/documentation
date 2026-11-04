---
title: Links to Git Providers and Code Snippets
description: "See links to your source code and inline code snippets across Datadog products."
further_reading:
- link: "/tracing/error_tracking/"
  tag: "Documentation"
  text: "Learn about Error Tracking for Backend Services"
- link: "/logs/error_tracking/"
  tag: "Documentation"
  text: "Learn about Error Tracking for Logs"
- link: "/real_user_monitoring/error_tracking/"
  tag: "Documentation"
  text: "Learn about Error Tracking for RUM"
- link: "/profiler/"
  tag: "Documentation"
  text: "Learn about the Continuous Profiler"
- link: "/serverless/aws_lambda/configuration/?tab=datadogcli#link-errors-to-your-source-code"
  tag: "Documentation"
  text: "Learn about Serverless Monitoring"
- link: "/tests/developer_workflows/"
  tag: "Documentation"
  text: "Learn about Test Optimization"
- link: "/security/code_security/"
  tag: "Documentation"
  text: "Learn about Code Security"
- link: "/security/application_security/"
  tag: "Documentation"
  text: "Learn about Application Security Monitoring"
- link: "/dynamic_instrumentation/"
  tag: "Documentation"
  text: "Learn about Dynamic Instrumentation"
- link: "https://www.datadoghq.com/blog/live-debugging/"
  tag:  "Blog"
  text: "Fix production bugs efficiently with Datadog Live Debugging"
---

{{< tabs >}}
{{% tab "Error Tracking" %}}
You can see links from stack frames to their source repository in [Error Tracking][1].

1. Navigate to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][2].
2. Click on an issue. The {{< ui >}}Issue Details{{< /ui >}} panel appears on the right.
3. Under {{< ui >}}Latest Event{{< /ui >}}, if you're using the GitHub or GitLab integrations, click {{< ui >}}Connect to preview{{< /ui >}} on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the {{< ui >}}View{{< /ui >}} button on the right of a frame or select {{< ui >}}View file{{< /ui >}}, {{< ui >}}View Git blame{{< /ui >}}, or {{< ui >}}View commit{{< /ui >}} to be redirected to your source code management tool.

{{< img src="source_code_integration/error-tracking-panel-full.png" alt="A view repository button with three options (view file, view blame, and view commit) available on the right side of an error stack trace in Error Tracking, along with inline code snippets in the stack trace" style="width:100%;">}}

[1]: /tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "RUM" %}}

You can see links from stack frames to their source repository in [Error Tracking for RUM][1].

Source code integration is supported for the following RUM platforms when sourcemaps or debug symbols are uploaded with Git metadata:

- **Browser**: Requires [JavaScript source maps][3] to be uploaded with Git information using the [`datadog-ci sourcemaps upload`][4] command
- **React Native**: Requires [source maps and debug symbols][5] to be uploaded with Git information
- **Android**: Requires [Proguard mapping files][6] to be uploaded with Git information
- **Electron**: Requires [source maps][7] to be uploaded with Git information

**Note**: Source code integration is not supported for iOS RUM errors.

1. Navigate to [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Error Tracking{{< /ui >}}][2].
2. Click on an issue. The {{< ui >}}Issue Details{{< /ui >}} panel appears on the right.
3. Under {{< ui >}}Latest Available Errors{{< /ui >}} or error samples, if you're using the GitHub or GitLab integrations, click {{< ui >}}Connect to preview{{< /ui >}} on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the {{< ui >}}View{{< /ui >}} button on the right of a frame or select {{< ui >}}View file{{< /ui >}}, {{< ui >}}View Git blame{{< /ui >}}, or {{< ui >}}View commit{{< /ui >}} to be redirected to your source code management tool.

{{< img src="source_code_integration/error-tracking-panel-full.png" alt="A view repository button with options to view the file, blame, and commit available on the right side of a RUM error stack trace in Error Tracking, along with inline code snippets" style="width:100%;">}}

[1]: /real_user_monitoring/error_tracking/
[2]: https://app.datadoghq.com/rum/error-tracking
[3]: /real_user_monitoring/guide/upload-javascript-source-maps/
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: /real_user_monitoring/application_monitoring/react_native/error_tracking/#get-deobfuscated-stack-traces
[6]: /real_user_monitoring/application_monitoring/android/error_tracking/
[7]: /real_user_monitoring/application_monitoring/electron/error_tracking/#upload-source-maps

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

You can see source code previews directly in [Continuous Profiler][1] flame graphs.

1. Navigate to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Profiles{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][2].
2. Select the service you want to investigate.
3. Hover your cursor over a method in the flame graph.
4. Press `Opt` (on macOS) or `Ctrl` (on other operating systems) to lock the tooltip so you can interact with its contents.
5. If prompted, click {{< ui >}}Connect to preview{{< /ui >}}. The first time you do this for a repository, you will be redirected to GitHub to {{< ui >}}Authorize{{< /ui >}} the Datadog application.
6. After authorizing, the source code preview appears in the tooltip.
7. Click the file link in the tooltip to open the full source code file in your repository.

{{< img src="source_code_integration/profiler-source-code-preview-2.png" alt="Source code preview in the Continuous Profiler" style="width:100%;">}}

[1]: /profiler/
[2]: https://app.datadoghq.com/profiling/explorer
{{% /tab %}}
{{% tab "Serverless Monitoring" %}}

You can see links from errors in your Lambda functions' associated stack traces to their source repository in **Serverless Monitoring**.

1. Navigate to [{{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Serverless{{< /ui >}}][101] and click on the {{< ui >}}AWS{{< /ui >}} tab.
2. Click on a Lambda function and click the {{< ui >}}Open Trace{{< /ui >}} button for an invocation with an associated stack trace.
3. If you're using the GitHub or GitLab integrations, click {{< ui >}}Connect to preview{{< /ui >}} on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the {{< ui >}}View{{< /ui >}} button on the right of a frame or select {{< ui >}}View file{{< /ui >}}, {{< ui >}}View Git blame{{< /ui >}}, or {{< ui >}}View commit{{< /ui >}} to be redirected to your source code management tool.

{{< img src="source_code_integration/serverless-aws-function-errors.mp4" alt="Link to GitHub from Serverless Monitoring" video="true" >}}

[101]: https://app.datadoghq.com/functions?cloud=aws&entity_view=lambda_functions

{{% /tab %}}
{{% tab "Test Optimization" %}}

You can see links from failed test runs to their source repository in **Test Optimization**.

1. Navigate to [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Test Optimization{{< /ui >}} > {{< ui >}}Test Runs{{< /ui >}}][101] and select a failed test run.
2. If you're using the GitHub or GitLab integrations, click {{< ui >}}Connect to preview{{< /ui >}} on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the {{< ui >}}View{{< /ui >}} button on the right of a frame or select {{< ui >}}View file{{< /ui >}}, {{< ui >}}View Git blame{{< /ui >}}, or {{< ui >}}View commit{{< /ui >}} to be redirected to your source code management tool.

{{< img src="source_code_integration/test_run_blurred.png" alt="Link to GitHub from the CI Visibility Explorer" style="width:100%;">}}

For more information, see [Enhancing Developer Workflows with Datadog][102].

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /tests/developer_workflows/#open-tests-in-github-and-your-ide

{{% /tab %}}
{{% tab "Code Security" %}}

You can see links from failed Static Analysis and Software Composition Analysis scans to their source repository in **Code Security**.

1. Navigate to [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}}][101] and select a repository.
2. In the {{< ui >}}Code Vulnerabilities{{< /ui >}} or {{< ui >}}Code Quality{{< /ui >}} view, click on a code vulnerability or violation. In the {{< ui >}}Details{{< /ui >}} section, if you're using the GitHub, GitLab, or Azure DevOps integrations, click {{< ui >}}Connect to preview{{< /ui >}}. You can see inline code snippets highlighting the exact lines of code that triggered the vulnerability or violation. Otherwise, you can click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="source_code_integration/code-analysis-scan.png" alt="Link to GitHub from the Code Security Code Vulnerabilities view" style="width:100%;">}}

For more information, see the [Code Security documentation][102].

[101]: https://app.datadoghq.com/ci/code-analysis
[102]: /security/code_security/

{{% /tab %}}
{{% tab "App and API Protection Monitoring" %}}

You can see links from errors in your security signals' associated stack traces to their source repository in **App and API Protection Monitoring**.

1. Navigate to [{{< ui >}}Security{{< /ui >}} > {{< ui >}}App and API Protection{{< /ui >}}][101] and select a security signal.
2. Scroll down to the {{< ui >}}Traces{{< /ui >}} section on the {{< ui >}}Related Signals{{< /ui >}} tab and click on an associated stack trace.
3. If you're using the GitHub or GitLab integrations, click {{< ui >}}Connect to preview{{< /ui >}} on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the {{< ui >}}View{{< /ui >}} button on the right of a frame or select {{< ui >}}View file{{< /ui >}}, {{< ui >}}View Git blame{{< /ui >}}, or {{< ui >}}View commit{{< /ui >}} to be redirected to your source code management tool.

{{< img src="source_code_integration/asm-signal-trace-blur.png" alt="Link to GitHub from App and API Protection Monitoring" style="width:100%;">}}

[101]: https://app.datadoghq.com/security/appsec

{{% /tab %}}
{{% tab "Dynamic Instrumentation" %}}

You can see full source code files in [{{< ui >}}Dynamic Instrumentation{{< /ui >}}][102] when creating or editing an instrumentation (dynamic log, metric, span, or span tags).

### Create new instrumentation

1. Navigate to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][101].
2. Select {{< ui >}}Create New Instrumentation{{< /ui >}} and choose a service to instrument.
3. Search for and select a source code filename or method.

### View or edit instrumentation

1. Navigate to [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Dynamic Instrumentation{{< /ui >}}][101].
2. Select an existing instrumentation from the list, then click {{< ui >}}View Events{{< /ui >}}.
3. Select the instrumentation card to view its location in the source code.

{{< img src="source_code_integration/dynamic-instrumentation-create-new.png" alt="Source Code File in Dynamic Instrumentation" style="width:100%;">}}

For more information, see the [Dynamic Instrumentation documentation][102].

[101]: https://app.datadoghq.com/dynamic-instrumentation/events
[102]: /dynamic_instrumentation/

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
