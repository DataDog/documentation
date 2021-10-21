---
title: Setting Up Inline Source Code in Datadog
kind: guide
description: "Set up inline source code and rich previews of issues and pull requests with Datadog."
further_reading:
- link: "https://docs.datadoghq.com/integrations/github-apps/"
  tag: "Integration"
  text: "GitHub Apps Integration"
- link: "https://docs.datadoghq.com/integrations/guide/github-apps-links-to-git/"
  tag: "Guide"
  text: "Setting Up Links to Git in Datadog"
---

## Overview

<div class="alert alert-warning">
The source code integration is in public beta and is available for all JVM languages and Go.
</div>

By installing the Datadog-GitHub Apps integration, you can enrich your GitHub issues and pull requests in Datadog. With the source code integration, you can link your telemetry (such as stack traces) and source code. 

The GitHub Apps source code integration allows you to see code snippets in your errors and preview additional details about your issues and pull requests on GitHub.

### Inline Source Code

If you are a GitHub SaaS user, install Datadog's [GitHub Apps][1] to directly inline code snippets from your GitHub repository in your stack traces. 

#### Error Tracking 

In [Error Tracking][2], you can authorize your GitHub App to access the repository containing the error and display an inline code snippet.

1. Navigate to **APM** > **Error Tracking**.
2. Click on an issue. The **Issue Details** panel appears to the right.
3. Under **Latest available errors**, hover over a frame. The **View** button appears to the right. 
4. Click on a frame to expand the code snippet containing lines of your source code. 
5. Click **Connect to Preview** and **Authorize** to access the source code snippet containing the error. 

{{< img src="integrations/guide/github_apps/inline-code-snippet.png" alt="Inline code snippet" style="width:90%;">}}

## Configuration

In order to map telemetry data with your source code, you need to send metadata to Datadog from your CI pipeline.

To tag your process with the commit SHA, you need a container label, Kubernetes label, or annotation.

1. Set or extend the `DD_TAGS` environment variable.
2. Upload your git metadata including the commit SHAs and your git repository URL by running [`datadog-ci git-metadata upload`][3].
3. [Install GitHub Apps][1].

Datadog correlates the places where you can link directly to your git repository.

### Tag your builds

To get direct links from your stacktrace to your git repository, tag your telemetry with a `git.commit.sha` tag.

{{< tabs >}}
{{% tab "Docker Runtime" %}}

#### Docker runtime

(Loic to add copy)

If your containers are running on Docker, directly extract `git.commit.sha` from your Docker images that comply with the [Open Containers standard][1]. During build time, tag your containers and configure the Datadog Agent to collect the tag as `git.commit.sha`.

##### Tag your images

To tag your images, run:

```
docker build -t my-application --label org.opencontainers.image.revision=$(git rev-parse HEAD)
```

##### Configure the Agent

Configure the Datadog Agent to collect `org.opencontainers.image.revision` as `git.commit.sha` by using [`DD_DOCKER_LABELS_AS_TAGS`][2] in the Agent configuration:

```
DD_DOCKER_LABELS_AS_TAGS='{"org.opencontainers.image.revision": "git.commit.sha"}'
```


[1]: https://github.com/opencontainers/image-spec/blob/859973e32ccae7b7fc76b40b762c9fff6e912f9e/annotations.md#pre-defined-annotation-keys
[2]: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Container runtime

(Loic to add copy)

#### Other container runtimes on Kubernetes

If you use Kubernetes with another container runtime such as containerd, tag your deployed pod with a pod annotation using [Datadog's Tag Autodiscovery][1]:

```
ad.datadoghq.com/tags: '{"git.commit.sha": "<FULL_GIT_COMMIT_SHA>"}'
```

[1]: https://docs.datadoghq.com/agent/kubernetes/tag/?tab=containerizedagent#tag-autodiscovery
{{% /tab %}}
{{% tab "Other Setups" %}}

#### Containerized environments

For containerized environments, set the git.commit.sha container tag for all your telemetry including traces, profiles, and logs downstream.

#### Non-containerized environments

For non-containerized environments, manually tag your traces, spans, and profiles with the git commit SHA.

 To tag your traces, spans, and profiles with `git.commit.sha`, configure the tracer with the `DD_TAGS` environment variable:

```
export DD_TAGS="git.commit.sha:<GIT_COMMIT_SHA>"
./my-application start
```

#### Other container setups

<div class="alert alert-info">Container setups such as <code>containerd</code> and <code>CRI-O</code> running on Mesos or Swarm are not supported. Default to the non-containerized environment setup.</div>

{{% /tab %}}
{{< /tabs >}}

### Upload your git metadata

In order to link your telemetry to your source code, Datadog collects information for every commit SHA from your git repository with the [`datadog-ci git-metadata upload`][3] command. 

When you run `datadog-ci git-metadata upload` within a git repository, Datadog receives the repository URL, the commit SHA of the current branch, and a list of tracked file paths.

### Validation

To ensure the data is being collected, run `datadog-ci git-metadata upload` in your CI pipeline. 

You can expect to see the following return:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:DataDog/datadog-ci.git.
180 tracked file paths will be reported.
✅ [DRYRUN] Handled in 0.077 seconds.
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#integrations/github-apps
[2]: https://app.datadoghq.com/apm/error-tracking
[3]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
