---
title: Features
description: "Learn about the various features enabled by source code integration across the Datadog platform."
further_reading:
- link: "/tracing/error_tracking/"
  tag: "Documentation"
  text: "Learn about Error Tracking for Backend Services"
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
---

## Overview

Once you have connected your Git repositories and tagged your services, you can use source code integration features across various Datadog products.

## Links to Git providers & code snippets

{{< tabs >}}
{{% tab "Error Tracking" %}}
You can see links from stack frames to their source repository in [Error Tracking][1].

1. Navigate to [**APM** > **Error Tracking**][2].
2. Click on an issue. The **Issue Details** panel appears on the right.
3. Under **Latest Event**, if you're using the GitHub or GitLab integrations, click **Connect to preview** on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="A view repository button with three options (view file, view blame, and view commit) available on the right side of an error stack trace in Error Tracking, along with inline code snippets in the stack trace" style="width:100%;">}}

[1]: /tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "RUM" %}}

You can see links from stack frames to their source repository in [Error Tracking for RUM][1].

Source code integration is supported for the following RUM platforms when sourcemaps or debug symbols are uploaded with Git metadata:

- **Browser**: Requires [JavaScript source maps][3] to be uploaded with Git information using the [`datadog-ci sourcemaps upload`][4] command
- **React Native**: Requires [source maps and debug symbols][5] to be uploaded with Git information
- **Android**: Requires [Proguard mapping files][6] to be uploaded with Git information

**Note**: Source code integration is not supported for iOS RUM errors.

1. Navigate to [**Digital Experience** > **Error Tracking**][2].
2. Click on an issue. The **Issue Details** panel appears on the right.
3. Under **Latest Available Errors** or error samples, if you're using the GitHub or GitLab integrations, click **Connect to preview** on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="A view repository button with options to view the file, blame, and commit available on the right side of a RUM error stack trace in Error Tracking, along with inline code snippets" style="width:100%;">}}

[1]: /real_user_monitoring/error_tracking/
[2]: https://app.datadoghq.com/rum/error-tracking
[3]: /real_user_monitoring/guide/upload-javascript-source-maps/
[4]: https://github.com/DataDog/datadog-ci/tree/master/packages/datadog-ci/src/commands/sourcemaps#link-errors-with-your-source-code
[5]: /real_user_monitoring/application_monitoring/react_native/error_tracking/#get-deobfuscated-stack-traces
[6]: /real_user_monitoring/application_monitoring/android/error_tracking/

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

You can see source code previews directly in [Continuous Profiler][1] flame graphs.

1. Navigate to [**APM** > **Profiles** > **Explorer**][2].
2. Select the service you want to investigate.
3. Hover your cursor over a method in the flame graph.
4. Press `Opt` (on macOS) or `Ctrl` (on other operating systems) to lock the tooltip so you can interact with its contents.
5. If prompted, click **Connect to preview**. The first time you do this for a repository, you will be redirected to GitHub to **Authorize** the Datadog application.
6. After authorizing, the source code preview appears in the tooltip.
7. Click the file link in the tooltip to open the full source code file in your repository.

{{< img src="integrations/guide/source_code_integration/profiler-source-code-preview-2.png" alt="Source code preview in the Continuous Profiler" style="width:100%;">}}

[1]: /profiler/
[2]: https://app.datadoghq.com/profiling/explorer
{{% /tab %}}
{{% tab "Serverless Monitoring" %}}

You can see links from errors in your Lambda functions' associated stack traces to their source repository in **Serverless Monitoring**.

1. Navigate to [**Infrastructure** > **Serverless**][101] and click on the **AWS** tab.
2. Click on a Lambda function and click the **Open Trace** button for an invocation with an associated stack trace.
3. If you're using the GitHub or GitLab integrations, click **Connect to preview** on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="integrations/guide/source_code_integration/serverless-aws-function-errors.mp4" alt="Link to GitHub from Serverless Monitoring" video="true" >}}

[101]: https://app.datadoghq.com/functions?cloud=aws&entity_view=lambda_functions

{{% /tab %}}
{{% tab "Test Optimization" %}}

You can see links from failed test runs to their source repository in **Test Optimization**.

1. Navigate to [**Software Delivery** > **Test Optimization** > **Test Runs**][101] and select a failed test run.
2. If you're using the GitHub or GitLab integrations, click **Connect to preview** on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="integrations/guide/source_code_integration/test_run_blurred.png" alt="Link to GitHub from the CI Visibility Explorer" style="width:100%;">}}

For more information, see [Enhancing Developer Workflows with Datadog][102].

[101]: https://app.datadoghq.com/ci/test-runs
[102]: /tests/developer_workflows/#open-tests-in-github-and-your-ide

{{% /tab %}}
{{% tab "Code Security" %}}

You can see links from failed Static Analysis and Software Composition Analysis scans to their source repository in **Code Security**.

1. Navigate to [**Software Delivery** > **Code Security**][101] and select a repository.
2. In the **Code Vulnerabilities** or **Code Quality** view, click on a code vulnerability or violation. In the **Details** section, if you're using the GitHub, GitLab, or Azure DevOps integrations, click **Connect to preview**. You can see inline code snippets highlighting the exact lines of code that triggered the vulnerability or violation. Otherwise, you can click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="integrations/guide/source_code_integration/code-analysis-scan.png" alt="Link to GitHub from the Code Security Code Vulnerabilities view" style="width:100%;">}}

For more information, see the [Code Security documentation][102].

[101]: https://app.datadoghq.com/ci/code-analysis
[102]: /security/code_security/

{{% /tab %}}
{{% tab "App and API Protection Monitoring" %}}

You can see links from errors in your security signals' associated stack traces to their source repository in **App and API Protection Monitoring**.

1. Navigate to [**Security** > **App and API Protection**][101] and select a security signal.
2. Scroll down to the **Traces** section on the **Related Signals** tab and click on an associated stack trace.
3. If you're using the GitHub or GitLab integrations, click **Connect to preview** on stack frames. You can see inline code snippets directly in the stack trace. Otherwise, you can click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="integrations/guide/source_code_integration/asm-signal-trace-blur.png" alt="Link to GitHub from App and API Protection Monitoring" style="width:100%;">}}

[101]: https://app.datadoghq.com/security/appsec

{{% /tab %}}
{{% tab "Dynamic Instrumentation" %}}

You can see full source code files in [**Dynamic Instrumentation**][102] when creating or editing an instrumentation (dynamic log, metric, span, or span tags).

### Create new instrumentation

1. Navigate to [**APM** > **Dynamic Instrumentation**][101].
2. Select **Create New Instrumentation** and choose a service to instrument.
3. Search for and select a source code filename or method.

### View or edit instrumentation

1. Navigate to [**APM** > **Dynamic Instrumentation**][101].
2. Select an existing instrumentation from the list, then click **View Events**.
3. Select the instrumentation card to view its location in the source code.

{{< img src="integrations/guide/source_code_integration/dynamic-instrumentation-create-new.png" alt="Source Code File in Dynamic Instrumentation" style="width:100%;">}}

For more information, see the [Dynamic Instrumentation documentation][102].

[101]: https://app.datadoghq.com/dynamic-instrumentation/events
[102]: /dynamic_instrumentation/

{{% /tab %}}
{{< /tabs >}}

## PR comments

<div class="alert alert-warning">
  PR comments are not supported in pull requests in public repositories, or on pull requests targeting a destination branch in a different repository from the source branch (that is, forked repositories trying to merge into the main repository).
</div>

PR comments are automated comments added by Datadog's [source code management integrations][10] to inform developers of issues detected in their code changes and, in certain cases, suggest remediation.

There is a maximum of 31 unique comments per PR at any time to reduce noise and clutter. These comments include:
* One summary comment is always posted to give a high-level view of all the issues Datadog detected in the PR. This comment is edited by Datadog as new commits pushed to the PR change the results.
* When applicable, up to 30 inline comments are posted on specific lines of code that triggered a violation. If more than 30 violations are introduced in the PR's diff, the 30 highest severity violations are posted.

{{< tabs >}}
{{% tab "CI Visibility" %}}
PR comments are enabled by default when first onboarding to CI Visibility if the GitHub or GitLab integration is installed correctly. These integrations post a comment summarizing the failed jobs detected in your pull request.

{{< img src="integrations/guide/source_code_integration/ci-visibility-pr-comment.png" alt="PR Comment summarizing failed jobs detected by CI Visibility" style="width:100%;">}}

To disable PR comments for CI Visibility, go to the [CI Visibility Repository Settings][101].

[101]: https://app.datadoghq.com/ci/settings/ci-visibility

{{% /tab %}}
{{% tab "Code Security" %}}

PR comments are enabled by default when first onboarding to Code Security if the GitHub, GitLab, or Azure DevOps integration is installed correctly. These integrations post two types of comments on your pull requests:

1. A single comment summarizing the new violations detected in your pull request.

{{< img src="integrations/guide/source_code_integration/code-security-summary-pr-comment.png" alt="PR Comment summarizing the new violations detected by Code Security" style="width:100%;">}}

2. Inline comments for each violation detected in your pull request placed directly on the lines of code that triggered the violation in the diff of the pull request.

{{< img src="integrations/guide/source_code_integration/code-security-inline-pr-comment.png" alt="Inline comment for a specific violation detected by Code Security" style="width:100%;">}}

To disable PR comments for Code Security, go to the [Code Security Repository Settings][101].

[101]: https://app.datadoghq.com/security/configuration/code-security/settings

{{% /tab %}}
{{% tab "Test Optimization" %}}

PR comments are enabled by default when first onboarding to Test Optimization if the GitHub or GitLab integration is installed correctly. The integration posts a comment summarizing the failed and flaky tests detected in your pull request.

{{< img src="integrations/guide/source_code_integration/test-optimization-pr-comment.png" alt="PR Comment summarizing failed and flaky tests detected by Test Optimization" style="width:100%;">}}

To disable PR comments for Test Optimization, go to the [Test Optimization Advanced Features Settings][101].

[101]: https://app.datadoghq.com/ci/settings/test-optimization/advanced-features

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[10]: /source_code/source-code-manager/
