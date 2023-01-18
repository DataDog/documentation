---
title: Datadog Source Code Integration
kind: guide
description: "Set up the source code integration that integrates with APM to link your telemetry with your backend services' repositories and generate inline code snippets."
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
The source code integration supports the following languages (Go, Java, JavaScript, and Python) and the following Git providers (GitHub, GitLab, and BitBucket).</br></br> Custom URLs are not supported—while your Git provider may be GitHub, if your source code is hosted on <code>xyz.com</code>, for example, and not <code>github.com</code>, the source code integration does not work.
</div>

Datadog's source code integration allows you to connect your telemetry with your Git repositories hosted in GitHub, GitLab, or Bitbucket. Once you have enabled the [GitHub integration][5], you can debug stack traces, slow profiles, and more issues by quickly accessing the relevant lines of your source code.

{{< img src="integrations/guide/source_code_integration/inline-code-snippet.png" alt="Inline code snippet of a Java RuntimeException with a button to view the code in Github" style="width:100%;">}}

By setting up the GitHub integration, you can see inline code snippets in **Error Tracking for Backend Services** and the **Continuous Profiler**. For more information, see [Inline Source Code](#inline-source-code) and [Continuous Profiler](#continuous-profiler).

## Setup

Datadog Agent v7.35.0 or later is required.

If you have [APM][6] set up already, navigate to [**Integrations** > **Link Source Code**][7] and configure the source code integration for your backend services.

## Tag your telemetry

To link data to a specific commit, tag your telemetry with `git.commit.sha` and `git.repository_url` tags. Ensure that the `git.repository_url` tag does not contain protocols. For example, if your repository RUL is `https://github.con/example_repo`, the value for the `git.repository_url` tag should be `github.com/example_repo`.

{{< tabs >}}
{{% tab "Docker Runtime" %}}

<div class="alert alert-warning">
This approach requires Docker, or containerd >= 1.5.6. It doesn't support containers running on AWS Fargate.
For additional container setups, see the <a href="https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=other#tag-your-telemetry">Other</a> section.
</div>

If you are running your app in containers, Datadog can extract source code information directly from your images' Docker labels. During build time, follow the [Open Containers standard][1] to add the git commit SHA and repository URL as Docker labels:

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
{{% tab "Other" %}}

To tag your traces, spans, and profiles with `git.commit.sha` and `git.repository_url`, configure the tracer with the `DD_TAGS` environment variable:

```
export DD_TAGS="git.commit.sha:<FULL_GIT_COMMIT_SHA> git.repository_url:git-provider.example/me/my-repo"
./my-application start
```

{{% /tab %}}
{{< /tabs >}}

Datadog only captures the repository URL, the commit SHA of the current branch, and a list of tracked file paths—Datadog does not ingest or store any user code.

## Configure your repositories

{{< tabs >}}
{{% tab "GitHub" %}}

If you are a GitHub SaaS user, install Datadog's [GitHub integration][1] on the [GitHub integration tile][2] to link your telemetry with your source code. When specifying permissions on the integration tile, enable Datadog read permissions to **Contents**.

[1]: https://docs.datadoghq.com/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}
{{% tab "Other Git Providers" %}}

To link telemetry to your source code, Datadog collects metadata for every commit SHA from your Git repository with the [`datadog-ci git-metadata upload`][1] command.

When you run `datadog-ci git-metadata upload` within a git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

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

## Examples of links to Git repositories

### Inline source code

If you are a GitHub SaaS user, install Datadog's [GitHub integration][2] to directly inline code snippets from your GitHub repository in your stack traces in [Error Tracking for Backend Services][8]. When specifying permissions on the integration tile, enable Datadog read permissions to **Contents**.

1. Navigate to [**APM** > **Error Tracking**][1].
2. Click on an issue. The **Issue Details** panel appears on the right.
3. Click **Connect to Preview** and **Authorize** to access the source code snippet containing the error.
4. Under **Latest Event**, click the **View Code** button to the right of a frame containing the code snippet.
5. Click **View file on GitHub**, **View Git blame**, or **View commit** to be redirected to GitHub.

{{< img src="integrations/guide/source_code_integration/error-tracking-panel.png" alt="An inline code snippet in a stack trace" style="width:100%;">}}

To install a GitHub App for your organization, you need to be an organization owner or have admin permissions in a repository. You can also install a GitHub App on your personal GitHub account. For more information, see [GitHub Apps & OAuth Apps][3].

### Continuous Profiler

You can directly access a trace in its source repository on GitHub in the [Continuous Profiler][4].

1. Navigate to [**APM** > **Profile Search**][9].
2. Click on a profile and hover your cursor over a method in the flamegraph. A kebab icon with the **More actions** label appears on the right.
3. Click **More actions** > **View in repo** to open the trace in its source code repository.

{{< img src="integrations/guide/source_code_integration/profiler-link-to-git.png" alt="Link to GitHub from the Continuous Profiler" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/error-tracking
[2]: https://app.datadoghq.com/integrations/github/
[3]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[4]: /profiler/search_profiles/
[5]: /integrations/github/
[6]: /tracing/
[7]: https://app.datadoghq.com/source-code/setup/apm
[8]: /tracing/error_tracking/
[9]: https://app.datadoghq.com/profiling/search