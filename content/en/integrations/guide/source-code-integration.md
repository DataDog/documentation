---
title: Datadog Source Code Integration

description: "Set up the source code integration that integrates with APM to link your telemetry with your repositories, embed git information into artifacts in your CI pipeline, and use the GitHub integration to generate inline code snippets."
further_reading:
- link: "/integrations/github/"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
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
- link: "/logs/error_tracking/"
  tag: "Documentation"
  text: "Learn about Error Tracking for logs"
- link: "https://www.datadoghq.com/blog/live-debugging/"
  tag:  "Blog"
  text: "Fix production bugs efficiently with Datadog Live Debugging"
---

## Overview

Datadog's Source Code Integration allows you to connect your Git repositories to Datadog to enable various source code-related features across the Datadog platform. It allows debugging stack traces, slow profiles, and other issues by accessing the relevant lines of your source code.

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Inline code snippet of a Java RuntimeException with a button to view the code in GitHub" style="width:100%;">}}

## Connect your Git repositories to Datadog

To use most source code-related features, you must connect your Git repositories to Datadog through Datadog's first-party source code management (SCM) provider integrations. After connecting your repositories, Datadog may store the contents of your repositories for up to 7 days to reduce repeated requests to the repository and support feature performance.

### Source code management providers

Datadog supports the following features for the SCM providers listed below. See [Usage](#usage) for more details about each feature:

| Feature | GitHub | GitLab | Azure DevOps | Bitbucket |
|---|---|---|---|---|
| **Connect SaaS Instance** | Yes <br />(GitHub.com and GitHub Enterprise Cloud) | Yes <br />(GitLab.com) | Yes <br />(Azure DevOps Services) | No <br />(Bitbucket.org) |
| **Connect On-Prem Instance** | Yes <br />(GitHub Enterprise Server) | Yes <br />(GitLab Self-Managed or Dedicated) | No <br />(Azure DevOps Server) | No <br />(Bitbucket Data Center or Server)|
| **Context Links** | Yes | Yes | Yes | Yes |
| **Code Snippets** | Yes | Yes | Yes | No |
| **PR Comments** | Yes | Yes | Yes | No |

{{< tabs >}}
{{% tab "GitHub (SaaS & On-Prem)" %}}

<div class="alert alert-info">
Repositories from GitHub instances are supported for GitHub.com, GitHub Enterprise Cloud (SaaS), and GitHub Enterprise Server (On-Prem). For GitHub Enterprise Server, your instance must be accessible from the internet. If needed, you can allowlist <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">Datadog's <code>webhooks</code> IP addresses</a> to allow Datadog to connect to your instance.
</div>

Install Datadog's [GitHub integration][101] using the [integration tile][102] or while onboarding other Datadog products to connect to your GitHub repositories.

[101]: https://docs.datadoghq.com/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/

{{% /tab %}}
{{% tab "GitLab (SaaS & On-Prem)" %}}

<div class="alert alert-info">
Repositories from GitLab instances are supported for both GitLab.com (SaaS) and GitLab Self-Managed/Dedicated (On-Prem). For GitLab Self-Managed, your instance must be accessible from the internet. If needed, you can allowlist <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">Datadog's <code>webhooks</code> IP addresses</a> to allow Datadog to connect to your instance.
</div>

Install Datadog's [GitLab Source Code integration][101] using the [integration tile][102] or while onboarding other Datadog products to connect to your GitLab repositories.

[101]: https://docs.datadoghq.com/integrations/gitlab-source-code/
[102]: https://app.datadoghq.com/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "Azure DevOps (SaaS Only)" %}}

<div class="alert alert-warning">
Repositories from Azure DevOps instances are supported for Azure DevOps Services (SaaS). Azure DevOps Server (On-Prem) is <strong>not</strong> supported.
</div>

Install Datadog's Azure DevOps Source Code integration using the [integration tile][101] or while onboarding other Datadog products to connect to your Azure DevOps repositories.

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{% tab "Other SCM Providers" %}}

<div class="alert alert-danger">
Repositories on self-hosted instances or private URLs are not supported out-of-the-box. To enable this feature, <a href="/help">contact Support</a>.
</div>

If you are using any other SCM provider, you can still manually link telemetry with your source code. To do so, upload your repository metadata with the [`datadog-ci git-metadata upload`][1] command. `datadog-ci v2.10.0` or later is required.

When you run `datadog-ci git-metadata upload` within a Git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command for every commit that you need to be synchronized with Datadog.

### Validation

To ensure the data is being collected, run `datadog-ci git-metadata upload` in your CI pipeline.

You can expect to see the following output:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## Tag your APM Telemetry with Git information

Datadog Agent v7.35.0 or later is required.

If you have [APM][6] set up already, navigate to [**Integrations** > **Link Source Code**][7] and configure the source code integration for your backend services.

Your telemetry must be tagged with Git information that ties the running application version with a particular repository and commit.

For supported languages, Datadog recommends [embedding Git information](#embed-git-information-in-your-build-artifacts) in the deployed artifacts, which is then extracted by the [Datadog Tracing Libraries][9] automatically.

For other languages and configurations, you can [configure telemetry tagging](#configure-telemetry-tagging) yourself.

### Embed Git information in your build artifacts

You can embed the repository URL and commit hash in your build artifact. The [Datadog Tracing Libraries][9] use this information to automatically add the right tags to your APM service telemetry.

Select one of the following languages that supports embedding git information:

{{< tabs >}}
{{% tab "Go" %}}

<div class="alert alert-info">The Go client library version 1.48.0 or later is required.</div>

#### Containers

If you are using Docker containers, you have three options: using Docker, using the Datadog tracing library, or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Host

If you are using a host, you have two options.

##### Option 1: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

[101]: https://tip.golang.org/doc/go1.18
[102]: https://www.npmjs.com/package/@datadog/datadog-ci
[103]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/
[104]: https://github.com/DataDog/datadog-cdk-constructs

{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">The Python client library version 1.12.0 or later is required.</div>

#### Containers

If you are using Docker containers, you have three options: using Docker, using the Datadog tracing library, or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

[101]: https://github.com/DataDog/dd-trace-go
[102]: https://github.com/DataDog/hatch-datadog-build-metadata#readme

#### Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Host

If you are using a host, you have two options.

##### Option 1: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab ".NET" %}}

<div class="alert alert-info">The .NET client library version 2.24.1 or later is required.</div>

As a first step, ensure that your `.pdb` files are deployed alongside your .NET assemblies (`.dll` or `.exe`) in the same folder.
Then, follow the rest of the instructions based on your specific deployment model:

#### Containers

If you are using Docker containers, you have three options: using Docker, using Microsoft SourceLink, or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Host

If you are using a host, you have two options: using Microsoft SourceLink or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Node.js" %}}

<div class="alert alert-info">
  The Node.js client library version 3.21.0 or later is required.
  </br>
  </br>
  For transpiled Node.js applications (for example, TypeScript), make sure to generate and publish source maps with the deployed application, and to run Node.js with the <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a> flag. Otherwise, code links and snippets will not work.
</div>

#### Containers

If you are using Docker containers, you have several options: using a plugin if your application is bundled, using Docker, or configuring your application with `DD_GIT_*` environment variables.

##### Option 1: Bundler plugin

{{% sci-dd-tags-bundled-node-js %}}

##### Option 2: Docker

{{% sci-docker %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Serverless

If you are using Serverless, you have several options depending on your serverless application's setup.

##### Option 1: Bundler plugin

{{% sci-dd-tags-bundled-node-js %}}

##### Option 2: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Host

For host-based environments, you have two options based on your build and deploy configuration.

##### Option 1: Bundler plugin

{{% sci-dd-tags-bundled-node-js %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-info">The Ruby client library version 1.6.0 or later is required.</div>

#### Containers

If you are using Docker containers, you have two options: using Docker or configuring your application with the `DD_TAGS` environment variable.

##### Option 1: Docker

{{% sci-docker-ddtags %}}

##### Option 2: `DD_TAGS` Environment Variable

{{% sci-dd-tags-env-variable %}}

#### Serverless

If you are using Serverless, you have two options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: `DD_TAGS` Environment Variable

{{% sci-dd-tags-env-variable %}}

#### Host

If you are using a host, configure your application with the `DD_TAGS` environment variable.

{{% sci-dd-tags-env-variable %}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">The Java client library version 1.12.0 or later is required.</div>

#### Containers

If you are using Docker containers, you have two options: using Docker or configuring your application with  `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Serverless

If you are using Serverless, you have two options depending on your serverless application's setup.

##### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Host

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-info">PHP client library version 1.13.0 or later is required, or 1.2.0 or later if using tracing only without profiling.</div>

#### Containers

If you are using Docker containers, you have two options: using Docker or configuring your application with  `DD_GIT_*` environment variables.

##### Option 1: Docker

{{% sci-docker %}}

##### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

#### Host

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{< /tabs >}}

### Build inside a Docker container

If your build process is executed in CI within a Docker container, perform the following steps to ensure that the build can access Git information:

1. Add the following text to your `.dockerignore` file. This ensures that the build process is able to access a subset of the `.git` folder, enabling it to determine the git commit hash and repository URL.

   ```
   !.git/HEAD
   !.git/config
   !.git/refs
   ```

2. Add the following line of code to your `Dockerfile`. Ensure that it is placed before the actual build is ran.

   ```
   COPY .git ./.git
   ```

### Configure telemetry tagging

For unsupported languages, use the `git.commit.sha` and `git.repository_url` tags to link data to a specific commit.

## Kubernetes source code and resource mapping

Datadog's Source Code and resource mapping allow you to connect cluster resources to the source code
that was used to deploy them, using Kubernetes annotations.

`origin.datadoghq.com/location` contains different content depending on how the resources were deployed.

{{< tabs >}}
{{% tab "Raw Kubernetes YAML" %}}
If you deployed resources using `kubectl`, use the following annotation format:

```json
origin.datadoghq.com/location:
{
	"repo": {
		"url": "<repo URL>",
		"targetRevision": "<SHA for commit being deployed>",
		"path": "<file path of the resource>"
	}
}
```

{{% /tab %}}
{{% tab "Helm chart" %}}
If you deployed resources using `helm`, the annotation format you need to use depends on how `helm install` was invoked.
There are six possible ways to do it:

{{% collapse-content title="Chart reference" level="h4" expanded=false id="chart-reference" %}}

Use this option when the chart is stored in the git repo in unpacked form.

Use the installation command `helm install <release> <chart/path>`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "repoURL": "<repo where the chart and values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"],
    "chartPath": "<chart/path> relative to <repoURL>"
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="Path to a packaged chart" level="h4" expanded=false id="path-to-chart" %}}

Use this option when the chart is stored in the git repo in the form of an archive.

Use the installation command `helm install <release> <chart/path/arch-x.y.z.tgz>`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "repoURL": "<repo where the chart and values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"],
    "chartPath": "<chart/path/arch-x.y.z.tgz relative to repoURL>"
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="Path to an unpacked chart directory" level="h4" expanded=false id="path-to-unpacked-chart" %}}

Use this option when the chart is stored somewhere in the current git repo and unpacked during the installation.

Use the installation command `helm install <release> <unpacked/path/dir>`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "chartURL": "<URL of the chart>",
    "repoURL": "<repo where the values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"],
    "chartPath": "<unpacked/path/dir relative to repoURL>"
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="Absolute URL" level="h4" expanded=false id="absolute-url" %}}

Use the installation command `helm install mynginx https://example.com/charts/nginx-1.2.3.tgz`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "chartURL": "<URL in the format https://example.com/charts/nginx-1.2.3.tgz>",
    "repoURL": "<repo where the values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"]
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="Chart reference and repo URL" level="h4" expanded=false id="chart-reference-and-repo" %}}

Use the installation command `helm install --repo https://example.com/charts/ mynginx nginx`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "chartURL": "<URL in the format https://example.com/charts/nginx>",
    "repoURL": "<repo where the values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of values.yaml files relative to <repoURL>"]
  }
}
```

{{% /collapse-content %}}
{{% collapse-content title="OCI registries" level="h4" expanded=false id="oci-registries" %}}

Use the installation command `helm install mynginx --version 1.2.3 oci://example.com/charts/nginx`.

Use the following annotation format:

```json
origin.datadoghq.com/location:
{
  "helm": {
    "chartURL": "<URL in the format oci://example.com/charts/nginx>",
    "repoURL": "<repo where the values.yaml files are stored>",
    "targetRevision": "<commit SHA of repoURL>",
    "valuesPath": ["location of `values.yaml` files relative to <repoURL>"]
  }
}
```

{{% /collapse-content %}}
{{% /tab %}}
{{< /tabs >}}

## Usage

### Links to Git providers & code snippets

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

#### Create new instrumentation

1. Navigate to [**APM** > **Dynamic Instrumentation**][101].
2. Select **Create New Instrumentation** and choose a service to instrument.
3. Search for and select a source code filename or method.

#### View or edit instrumentation

1. Navigate to [**APM** > **Dynamic Instrumentation**][101].
2. Select an existing instrumentation from the list, then click **View Events**.
3. Select the instrumentation card to view its location in the source code.

{{< img src="integrations/guide/source_code_integration/dynamic-instrumentation-create-new.png" alt="Source Code File in Dynamic Instrumentation" style="width:100%;">}}

For more information, see the [Dynamic Instrumentation documentation][102].

[101]: https://app.datadoghq.com/dynamic-instrumentation/events
[102]: /dynamic_instrumentation/

{{% /tab %}}
{{< /tabs >}}

### PR comments

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

[1]: https://app.datadoghq.com/apm/error-tracking
[2]: https://app.datadoghq.com/integrations/github/
[3]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[5]: /integrations/github/
[6]: /tracing/
[7]: https://app.datadoghq.com/source-code/setup/apm
[8]: /tracing/error_tracking/
[9]: /tracing/trace_collection/dd_libraries/
[10]: #source-code-management-providers
