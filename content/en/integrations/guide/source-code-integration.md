---
title: Datadog Source Code Integration
kind: guide
description: "Set up the source code integration that integrates with APM to link your telemetry with your repositories, embed git information into artifacts in your CI pipeline, and use the GitHub integration to generate inline code snippets."
further_reading:
- link: "https://docs.datadoghq.com/integrations/github/"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
- link: "https://docs.datadoghq.com/tracing/error_tracking/"
  tag: "Documentation"
  text: "Learn about Error Tracking for Backend Services"
- link: "https://docs.datadoghq.com/profiler/"
  tag: "Documentation"
  text: "Learn about the Continuous Profiler"
---

## Overview

<div class="alert alert-info">
The source code integration supports:
</br>
<b>Languages</b>: Go, Java, JavaScript (except transpiled JavaScript), Python, .NET, Ruby
</br>
<b>Git providers</b>: GitHub, GitLab, BitBucket, Azure DevOps
</div>

Datadog's source code integration allows you to connect your telemetry with your Git repositories. It allows debugging stack traces, slow profiles, and other issues by accessing the relevant lines of your source code.

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Inline code snippet of a Java RuntimeException with a button to view the code in GitHub" style="width:100%;">}}


## Setup

Datadog Agent v7.35.0 or later is required.

If you have [APM][6] set up already, navigate to [**Integrations** > **Link Source Code**][7] and configure the source code integration for your backend services.

## Tag your telemetry with Git information

Your telemetry must be tagged with Git information that ties the running application version with a particular repository and commit.

For supported languages, Datadog recommends [embedding Git information](#embed-git-information-in-your-build-artifacts) in the deployed artifacts, which is then extracted by the [Datadog Tracing Libraries][9] automatically.
For other languages and configurations, you can [configure telemetry tagging](#configure-telemetry-tagging) yourself.

### Embed Git information in your build artifacts

You can embed the repository URL and commit hash in your build artifact. The [Datadog Tracing Libraries][9] use this information to automatically add the right tags to your APM service telemetry.

Select one of the following languages that supports embedding git information:

{{< tabs >}}
{{% tab "Go" %}}
[Go embeds version control information][1] in binaries starting in version 1.18.

Ensure your service meets all the following requirements:

* You are using a version of Go >= 1.18.
* You are using a version of the Datadog Go Tracer >= 1.48.0.
* Your application was built as a module using `go.mod`, and the module path is your code repository's URL.

[1]: https://tip.golang.org/doc/go1.18
{{% /tab %}}

{{% tab "Python" %}}
First, upgrade the [Python tracer][1] to v1.12 or higher.

For the standard library:
1. Install the `ddtrace` package.
2. Add `import ddtrace.sourcecode.setuptools_auto` as the first import to `setup.py`.
3. Set the environment variable `DD_MAIN_PACKAGE` to the name of the primary Python package.

For the unified Python project settings file:
1. Install the [`hatch-datadog-build-metadata` plugin][2] and configure it to embed git metadata. If the project already has URLs, you must reconfigure them as dynamic and move them to another config section.
2. Set the environment variable `DD_MAIN_PACKAGE` to the name of the primary Python package.

[1]: https://app.datadoghq.com/apm/service-setup?architecture=host-based&language=python
[2]: https://github.com/DataDog/hatch-datadog-build-metadata
{{% /tab %}}

{{% tab ".NET" %}}
Datadog can use [Microsoft SourceLink][1] to extract the git commit SHA and repository URL directly from your .NET assembly. To use this approach:
1. Open your project file (`.csproj`) in your IDE, and add a reference to one of the following NuGet packages, based on where your git repository is hosted:
   - **GitHub:** [Microsoft.SourceLink.GitHub][2]
   - **Bitbucket:** [Microsoft.SourceLink.Bitbucket][3]
   - **GitLab:** [Microsoft.SourceLink.GitLab]()
   - **Azure DevOps:** [Microsoft.SourceLink.AzureRepos.Git][5]
   - **Azure DevOps Server:** [Microsoft.SourceLink.AzureDevOpsServer.Git][6]
2. Upgrade the [.NET tracer][7] to v2.25.0 or higher
3. Ensure that your `.pdb` files are deployed alongside your .NET assemblies (`.dll` or `.exe`) in the same folder.

[1]: https://github.com/dotnet/sourcelink
[2]: https://www.nuget.org/packages/Microsoft.SourceLink.GitHub
[3]: https://www.nuget.org/packages/Microsoft.SourceLink.Bitbucket
[4]: https://www.nuget.org/packages/Microsoft.SourceLink.GitLab
[5]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureRepos.Git
[6]: https://www.nuget.org/packages/Microsoft.SourceLink.AzureDevOpsServer.Git
[7]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{< /tabs >}}

#### Build inside a Docker container
If your build process is executed in CI within a Docker container, perform the following steps to ensure that the build can access git information:

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

For unsupported languages, use the `git.commit.sha` and `git.repository_url` tags to link data to a specific commit. Ensure that the `git.repository_url` tag does not contain protocols. For example, if your repository URL is `https://github.com/example/repo`, the value for the `git.repository_url` tag should be `github.com/example/repo`.

{{< tabs >}}
{{% tab "Docker Runtime" %}}

<div class="alert alert-warning">
This approach requires Docker or containerd >= 1.5.6. Containers running on AWS Fargate are not suported. For other container setups, see the <a href="https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=host#tag-your-telemetry">Host</a> tab.
</div>

If you are running your app in containers, Datadog can extract source code information directly from your images' Docker labels. During build time, follow the [Open Containers standard][1] to add the Git commit SHA and repository URL as Docker labels:

```
docker build . \
  -t my-application \
  --label org.opencontainers.image.revision=$(git rev-parse HEAD) \
  --label org.opencontainers.image.source=git-provider.example/me/my-repo
```

[1]: https://github.com/opencontainers/image-spec/blob/859973e32ccae7b7fc76b40b762c9fff6e912f9e/annotations.md#pre-defined-annotation-keys
{{% /tab %}}
{{% tab "Kubernetes" %}}

If you use Kubernetes, tag your deployed pod with a pod annotation using [Datadog's Tag Autodiscovery][1]:

```
ad.datadoghq.com/tags: '{"git.commit.sha": "<FULL_GIT_COMMIT_SHA>", "git.repository_url": "git-provider.example/me/my-repo"}'
```

The `git.commit.sha` and `git.repository_url` are tagged in your telemetry.

[1]: https://docs.datadoghq.com/agent/kubernetes/tag/?tab=containerizedagent#tag-autodiscovery
{{% /tab %}}
{{% tab "Serverless" %}}

Datadog can extract source code information directly from your serverless application according to your [Serverless Monitoring for AWS Lambda setup][4].

| APM Serverless Setup                | Method Description                                                                                                                                                                                                          |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Datadog Serverless Framework Plugin | If you are using the [Datadog Serverless Plugin][1] to instrument your serverless application, use a serverless-plugin-datadog `version >= 5.18.0`.                                                                         |
| datadog-cdk-constructs              | If you are using the [Datadog CDK Construct][2] to instrument your serverless application, use a datadog-cdk-constructs `version >= 0.8.5` for AWS CDK v1, and datadog-cdk-constructs-v2 `version >= 1.4.0` for AWS CDK v2. |
| datadog-ci                          | If you are using the [Datadog CLI client][3] to instrument your serverless application, use a datadog-ci `version >= 2.4.1`. You must run the CLI tool in the same directory as the code repository.                        |

[1]: /serverless/libraries_integrations/plugin/
[2]: /serverless/libraries_integrations/cdk/
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /serverless/aws_lambda/configuration/

{{% /tab %}}
{{% tab "Host" %}}

To tag your traces, spans, and profiles with `git.commit.sha` and `git.repository_url`, configure the tracer with the `DD_TAGS` environment variable:

```
export DD_TAGS="git.commit.sha:<FULL_GIT_COMMIT_SHA>,git.repository_url:git-provider.example/me/my-repo"
./my-application start
```

{{% /tab %}}
{{< /tabs >}}


## Synchronize your repository metadata

To link your telemetry with source code, your repository metadata must be synchronized to Datadog.

<div class="alert alert-info">
Datadog doesn't store the actual content of files in your repository, only Git commit and tree objects.
</div>

{{< tabs >}}
{{% tab "GitHub" %}}

Install Datadog's [GitHub integration][1] on the [GitHub integration tile][2] to allow Datadog to synchronize your repository metadata automatically. When specifying permissions on the integration tile, select at least **Read** permissions for **Contents**.

Setting up the GitHub integration also allows you to see inline code snippets in **Error Tracking**.

[1]: https://docs.datadoghq.com/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}
{{% tab "Other Git Providers" %}}

<div class="alert alert-warning">
Repositories on self-hosted instances or private URLs are not supported out-of-the-box by the Source Code Integration. To enable this feature, <a href="/help">contact Support</a>.
</div>

To link telemetry to your source code, you can upload your repository metadata with the [`datadog-ci git-metadata upload`][1] command.

When you run `datadog-ci git-metadata upload` within a Git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

Run this command for every commit that you need to be synchronized with Datadog.

### Validation

To ensure the data is being collected, run `datadog-ci git-metadata upload` in your CI pipeline.

You can expect to see the following output:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:my-org/my-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## Usage

### Links to Git providers

{{< tabs >}}
{{% tab "Error Tracking" %}}
You can see links from stack frames to their source repository in [Error Tracking][1].

1. Navigate to [**APM** > **Error Tracking**][2].
2. Click on an issue. The **Issue Details** panel appears on the right.
3. Under **Latest Event**, click the **View** button on the right of a frame or select **View file**, **View Git blame**, or **View commit** to be redirected to your source code management tool.

{{< img src="integrations/guide/source_code_integration/error-tracking-panel-full.png" alt="A view repository button with three options (view file, view blame, and view commit) available on the right side of an error stack trace in Error Tracking, along with inline code snippets in the stack trace" style="width:100%;">}}

If you're using the GitHub integration, or if you're hosting your repositories on the GitLab SaaS instance (gitlab.com), click **Connect to preview** on stack frames. You can see inline code snippets directly in the stack trace.

[1]: /tracing/error_tracking/
[2]: https://app.datadoghq.com/apm/error-tracking

{{% /tab %}}
{{% tab "Continuous Profiler" %}}

You can see links from profile frames to their source repository in the [Continuous Profiler][1].

1. Navigate to [**APM** > **Profile Search**][2].
2. Click on a profile and hover your cursor over a method in the flamegraph. A kebab icon with the **More actions** label appears on the right.
3. Click **More actions** > **View in repo** to open the trace in its source code repository.

{{< img src="integrations/guide/source_code_integration/profiler-link-to-git.png" alt="Link to GitHub from the Continuous Profiler" style="width:100%;">}}

[1]: /profiler/
[2]: https://app.datadoghq.com/profiling/search
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
