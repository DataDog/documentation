---
title: Datadog Source Code Integration
kind: guide
description: "Set up links to a Git repository and inline source code with Datadog."
further_reading:
- link: "https://docs.datadoghq.com/integrations/github_apps/"
  tag: "Integration"
  text: "GitHub Apps Integration"
---

## Overview

<div class="alert alert-warning">
The source code integration is in public beta and is available for all JVM languages and Go.
<br><br>
The source code integration generates links from your telemetry to your source code in your repository. Links to third-party libraries and standard libraries are not supported.
</div>

The source code integration is an integration with Git that allows you to link your telemetry (such as stack traces) and source code.

With the source code and GitHub Apps integrations, you can also see inline code snippets in your errors. For more information, see [Inline Source Code](#inline-source-code).

| Integration Name            | Stack Trace Links | Issue and PR Previews | Inline Code Snippets |
|-----------------------------|-------------------|-----------------------|----------------------|
| Source Code                 | {{< X >}}         | X                     | X                    |
| GitHub Apps                 | X                 | {{< X >}}             | X                    |
| Source Code and GitHub Apps | {{< X >}}         | {{< X >}}             | {{< X >}}            |

## Configuration

To map telemetry data with your source code, you need to send metadata to Datadog from your CI pipeline.

To tag your process with the commit SHA, you need a container label, Kubernetes label, or annotation.

1. Set a container tag or extend the `DD_TAGS` environment variable.
2. Upload your git metadata including the commit SHAs and your git repository URL by running [`datadog-ci git-metadata upload`][1].
3. Optionally, [install GitHub Apps][2].

Datadog correlates the places where you can link directly to your git repository.

### Tag your builds

To get direct links from your stacktrace to your git repository, tag your telemetry with a `git.commit.sha` tag.

{{< tabs >}}
{{% tab "Docker Runtime" %}}

If your containers are running on Docker, Datadog can extract the commit SHA directly from your images' Docker labels.


#### Tag your images

During build time, follow the [Open Containers standard][1] to add the git commit SHA as a Docker label:

```
docker build -t my-application --label org.opencontainers.image.revision=$(git rev-parse HEAD)
```

#### Configure the Agent

For Agent version prior to 7.33, configure the Datadog Agent to collect `org.opencontainers.image.revision` as `git.commit.sha` by using [`DD_DOCKER_LABELS_AS_TAGS`][2] in the Agent configuration:

```
DD_DOCKER_LABELS_AS_TAGS='{"org.opencontainers.image.revision": "git.commit.sha"}'
```


[1]: https://github.com/opencontainers/image-spec/blob/859973e32ccae7b7fc76b40b762c9fff6e912f9e/annotations.md#pre-defined-annotation-keys
[2]: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
{{% /tab %}}
{{% tab "Kubernetes" %}}

If you use Kubernetes, tag your deployed pod with a pod annotation using [Datadog's Tag Autodiscovery][1]:

```
ad.datadoghq.com/tags: '{"git.commit.sha": "<FULL_GIT_COMMIT_SHA>"}'
```

The git commit SHA is added to your telemetry.

[1]: https://docs.datadoghq.com/agent/kubernetes/tag/?tab=containerizedagent#tag-autodiscovery
{{% /tab %}}
{{% tab "Other" %}}

#### Other container setups

<div class="alert alert-info">Container setups such as <code>containerd</code> and <code>CRI-O</code> running on Mesos or Swarm are not supported. Default to the non-containerized environment setup below.</div>

#### Non-containerized environments

For non-containerized environments, manually tag your traces, spans, and profiles with the git commit SHA.

To tag your traces, spans, and profiles with `git.commit.sha`, configure the tracer with the `DD_TAGS` environment variable:

```
export DD_TAGS="git.commit.sha:<GIT_COMMIT_SHA>"
./my-application start
```

{{% /tab %}}
{{< /tabs >}}

### Upload your git metadata

In order to link your telemetry to your source code, Datadog collects information for every commit SHA from your git repository with the [`datadog-ci git-metadata upload`][1] command.

When you run `datadog-ci git-metadata upload` within a git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

#### Validation

To ensure the data is being collected, run `datadog-ci git-metadata upload` in your CI pipeline.

You can expect to see the following output:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:DataDog/datadog-ci.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

## Links to Git

#### Error Tracking

In [Error Tracking][3], you can directly access links to repositories from your stack traces.

1. Navigate to **APM** > **Error Tracking**.
2. Click on an issue. The **Issue Details** panel appears to the right.
3. Under **Latest available errors**, hover over a frame. The **View** button appears to the right and directs you to GitHub.

{{< img src="integrations/guide/github_apps/stacktrace-link-to-git.png" alt="Inline code snippet" style="width:90%;">}}

##### Inline source code

If you are a GitHub SaaS user, install Datadog's [GitHub Apps integration][2] to directly inline code snippets from your GitHub repository in your stack traces.

When specifying your permissions in the integration tile, enable Datadog read permissions to **Contents**.

To install a GitHub App for your organization, you need to be an organization owner or have admin permissions in a repository. You can also install a GitHub App on your personal repository.

For more information, see [GitHub Apps & OAuth Apps][4].

1. Click on a frame to expand the code snippet containing lines of your source code.
2. Click **Connect to Preview** and **Authorize** to access the source code snippet containing the error.

{{< img src="integrations/guide/github_apps/inline-code-snippet.png" alt="Inline code snippet" style="width:90%;">}}

#### Continuous Profiler

In the [Continuous Profiler][2], you can directly access traces in the source repository on GitHub.

1. Navigate to **APM** > **Profile Search**.
2. Click on a profile and hover your cursor over a method in the flamegraph. A kebab icon with the **More actions** label appears to the right.
3. Click **More actions** > **View in repo** to open the source code repository.

{{< img src="integrations/guide/github_apps/profiler-link-to-git.png" alt="Link to git from profiler" style="width:90%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[2]: https://app.datadoghq.com/account/settings#integrations/github-apps
[3]: https://app.datadoghq.com/apm/error-tracking
[4]: https://docs.github.com/en/developers/apps/getting-started-with-apps/about-apps
