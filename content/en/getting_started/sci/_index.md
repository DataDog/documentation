---
title: Setting up Incline Source Code and Links to Git with Datadog
kind: documentation
beta: true

---
## Overview

Datadog source code integration allows you to find the root cause of the surfaced problems.

By setting up the source code integration Datadog is able to:

* augment stack traces with your code
* directly link to your git repositories
* pre-load context wherever a git hash or git link is used

Work through this guide to setup the full capabilities of source code integration with datadog.

## Configuration

In order to map telemetry data with your source code, you need to send metadata to Datadog from your CI pipeline.

To tag your process with the commit SHA, you need a container label, Kubernetes label, or annotation.

1. Set or extend the `DD_TAGS` environment variable.
2. Upload your git metadata including the commit SHAs and your git repository URL by running [`datadog-ci git-metadata upload`][1].
3. [Install GitHub Apps][2].

Datadog correlates the places where you can link directly to your git repository.

If you are a GitHub SaaS user, you can install Datadog's [GitHub Apps][2] to find problems faster by directly inlining code snippets from your GitHub repository.

<div class="alert alert-warning">
The GitHub Apps source code integration is in public beta and is available for all JVM languages and Go.
</div>

## Tag your builds

To get direct links from your stacktrace to your git repo, tag all your telemetry with a `git.commit.sha` tag.

{{< tabs >}}
{{% tab "Containers" %}}

### Containerized environments

For containerized environments, set the `git.commit.sha` container tag for all your telemetry including traces, profiles, and logs downstream.

{{% /tab %}}
{{% tab "Docker" %}}

#### Docker runtime

If your containers are running on Docker, directly extract `git.commit.sha` from your Docker images that comply with the [Open Containers standard][1]. During build time, tag your containers and configure the Datadog Agent to collect the tag as `git.commit.sha`.

To tag your images, run:

```
docker build -t my-application --label org.opencontainers.image.revision=$(git rev-parse HEAD)
```

#### Configure the Agent

Configure the Datadog Agent to collect `org.opencontainers.image.revision` as `git.commit.sha` by using [`DD_DOCKER_LABELS_AS_TAGS`][2] in the Agent configuration:

```
DD_DOCKER_LABELS_AS_TAGS='{"org.opencontainers.image.revision": "git.commit.sha"}'
```
[1]: https://github.com/opencontainers/image-spec/blob/859973e32ccae7b7fc76b40b762c9fff6e912f9e/annotations.md#pre-defined-annotation-keys
[2]: https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables

{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Other container runtimes on Kubernetes

If you use Kubernetes with another container runtime such as containerd, tag your deployed pod with a pod annotation using [Datadog's Tag Autodiscovery][1]:

```
ad.datadoghq.com/tags: '{"git.commit.sha": "<FULL_GIT_COMMIT_SHA>"}'
```

#### Other containers setup

For now they are not supported, you need to default to the non-containerized environment setup.

### Non-containerized environments

For non-containerized environments, manually tag your traces, spans, and profiles with the `git commit sha`.

 To tag your traces, spans, and profiles with `git.commit.sha`, configure the tracer with the `DD_TAGS` environment variable:

```
export DD_TAGS="git.commit.sha:<GIT_COMMIT_SHA>"
./my-application start
```
[1]: https://docs.datadoghq.com/agent/kubernetes/tag/?tab=containerizedagent#tag-autodiscovery

{{% /tab %}}
## `datadog-ci`

In order to link your telemetry to your source code, Datadog collects information for every `commit sha` from your git repository with the [`datadog-ci git-metadata upload`][1] command. 

When you run `datadog-ci git-metadata upload` within a git repository, Datadog receives the repository URL, the `commit sha` of the current branch, and a list of tracked file paths.

A good way to ensure the required data is collected is to run datadog-ci git-metadata upload as part of your CI pipeline.

## Link to Git

Screenshots + intro

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/git-metadata
[2]: https://app.datadoghq.com/account/settings#integrations/github-apps
