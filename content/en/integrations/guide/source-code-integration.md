---
title: Datadog Source Code Integration
kind: guide
description: "Set up links to a Git repository and inline source code with Datadog."
further_reading:
- link: "https://docs.datadoghq.com/integrations/github/"
  tag: "Documentation"
  text: "Learn about the GitHub Integration"
---

## Overview

The source code integration is an integration with Git that enables you to link your telemetry (such as stack traces) with your source code.

{{< img src="integrations/guide/source_code_integration/link-to-github.png" alt="Inline code snippet of a Java RuntimeException with a button to view the code in Github" style="width:90%;">}}

By setting up the GitHub integration, you can see inline code snippets in your errors. For more information, see [Inline Source Code](#inline-source-code).

## Configuration

<div class="alert alert-info">
The source code integration supports Go, Java, JavaScript, and Python.
<br>
Datadog Agent 7.35.0 or higher is required.
</div>

To map telemetry data with your source code:

{{< tabs >}}
{{% tab "GitHub" %}}

1. Add `git.commit.sha` and `git.repository_url` tags to your containers, or directly on your telemetry.
2. Install Datadog's [GitHub integration][1] to display inline source code snippets.

[1]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}
{{% tab "Other Git Providers" %}}

1. Add `git.commit.sha` and `git.repository_url` tags to your containers, or directly on your telemetry.
2. Upload metadata about your git repository by running [`datadog-ci git-metadata upload`][1] in your CI pipeline.

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Tag your telemetry

To link data to a specific commit, tag your telemetry with `git.commit.sha` and `git.repository_url` tags.

{{< tabs >}}
{{% tab "Docker Runtime" %}}

<div class="alert alert-warning">
This approach requires Docker, or containerd >= 1.5.6. It doesn't support containers running on AWS Fargate.
For other container setups, see the "Other" section.
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

The git commit SHA and repository URL are added to your telemetry.

[1]: https://docs.datadoghq.com/agent/kubernetes/tag/?tab=containerizedagent#tag-autodiscovery
{{% /tab %}}
{{% tab "Other" %}}

For non-containerized or unsupported environments, manually tag your traces, spans, and profiles with the git commit SHA and repository URL.

To tag your traces, spans, and profiles with `git.commit.sha` and `git.repository_url`, configure the tracer with the `DD_TAGS` environment variable:

```
export DD_TAGS="git.commit.sha:<FULL_GIT_COMMIT_SHA> git.repository_url:git-provider.example/me/my-repo"
./my-application start
```

{{% /tab %}}
{{< /tabs >}}

### Configure repositories

{{< tabs >}}
{{% tab "GitHub" %}}

If you are a GitHub SaaS user, install Datadog's [GitHub integration][1] in the [GitHub integration tile][2] in order to link your telemetry to your source code.
When specifying your permissions in the integration tile, enable Datadog read permissions to Contents.

[1]: https://docs.datadoghq.com/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}
{{% tab "Other Git Providers" %}}

To link telemetry to your source code, Datadog collects information for every commit SHA from your git repository with the [`datadog-ci git-metadata upload`][1] command.

When you run `datadog-ci git-metadata upload` within a git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

#### Validation

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

## Links to Git

#### Stack traces

In [Error Tracking][1] and on APM error spans, you can directly access links to repositories from your stack traces.

1. Navigate to **APM** > **Error Tracking**.
2. Click on an issue. The **Issue Details** panel appears to the right.
3. Under **Latest available errors**, hover over a frame. The **View** button appears to the right and directs you to GitHub.

{{< img src="integrations/guide/github_apps/stacktrace-link-to-git.png" alt="Inline code snippet" style="width:90%;">}}

##### Inline source code

If you are a GitHub SaaS user, install Datadog's [GitHub integration][2] to directly inline code snippets from your GitHub repository in your stack traces.

When specifying your permissions in the integration tile, enable Datadog read permissions to **Contents**.

To install a GitHub App for your organization, you need to be an organization owner or have admin permissions in a repository. You can also install a GitHub App on your personal GitHub account.

For more information, see [GitHub Apps & OAuth Apps][3].

1. Click on a frame to expand the code snippet containing lines of your source code.
2. Click **Connect to Preview** and **Authorize** to access the source code snippet containing the error.

{{< img src="integrations/guide/github_apps/inline-code-snippet.png" alt="Inline code snippet" style="width:90%;">}}

#### Continuous Profiler

In the [Continuous Profiler][4], you can directly access traces in the source repository on GitHub.

1. Navigate to **APM** > **Profile Search**.
2. Click on a profile and hover your cursor over a method in the flamegraph. A kebab icon with the **More actions** label appears to the right.
3. Click **More actions** > **View in repo** to open the source code repository.

{{< img src="integrations/guide/github_apps/profiler-link-to-git.png" alt="Link to git from profiler" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/error-tracking
[2]: https://app.datadoghq.com/integrations/github/
[3]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
[4]: /profiler/search_profiles/
