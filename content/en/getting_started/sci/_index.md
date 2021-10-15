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

To be able to map telemetry data to your source code we need to collect some metadata that needs to be configured to be transferred to Datadog in your CI pipeline.

1. Tag your process with the commit SHA
    1. Container label
    2. K8s label or annotation
    3. Setting or extending the DD_TAGS environment variable
2. Upload your git metadata including the commit SHAs and your git repository URL by running [`datadog-ci git-metadata upload`][1].
3. [Install GitHub Apps][2].

By having these two data points Datadog is able to correlate all places where we can link to your git repository directly.

For Github SaaS users we are having an additional feature, by installing our [Github App](https://app.datadoghq.com/account/settings#integrations/github-apps) we can directly inline codesnipets from your github repository and help you find the problematic pieces faster.

Currently the source code integration is in public beta and available for JVM languages and Go.

## How to tag your builds

To get direct links from your stacktrace to your git repo you need to tag all your telemetry with a new tag git.commit.sha. Depending on your environment there are several ways to do that.

### Containerized environments

With containerized environments it’s easy to tag all your telemetry with the git.commit.sha (traces, profiles, logs…).

#### Docker runtime

If your containers are running on Docker, git.commit.sha can be directly extracted from your docker images that comply with the [opencontainers standard](https://github.com/opencontainers/image-spec/blob/859973e32ccae7b7fc76b40b762c9fff6e912f9e/annotations.md#pre-defined-annotation-keys). You can simply tag your containers during build time, and configure the agent to collect this tag as `git.commit.sha`.

##### Tag your images

```
docker build -t my-application --label org.opencontainers.image.revision=$(git rev-parse HEAD)
```

##### Configure the agent to collect git.commit.sha

Configure the agent to collect org.opencontainers.image.revision as git.commit.sha using [DD_DOCKER_LABELS_AS_TAGS](https://docs.datadoghq.com/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables) in the agent configuration:

```
DD_DOCKER_LABELS_AS_TAGS='{"org.opencontainers.image.revision": "git.commit.sha"}'
```

#### Other container runtimes on Kubernetes

If you use kubernetes with another container runtime (like containerd), you need to tag your deployed pod with a pod annotation using [tag autodiscovery](https://docs.datadoghq.com/agent/kubernetes/tag/?tab=containerizedagent#tag-autodiscovery):
annotations:

```
ad.datadoghq.com/tags: '{"git.commit.sha": "<FULL_GIT_COMMIT_SHA>"}'
```

#### Other containers setup

For now they are not supported, you need to default to the non-containerized environment setup.

### Non-containerized environments

In non-containerized environments you need to manually tag your traces and profiles with the git commit sha. The easiest way to achieve this is to tag all your spans and profiles with git.commit.sha by configuring the tracer with DD_TAGS environment variable.

```
export DD_TAGS="git.commit.sha:<GIT_COMMIT_SHA>"
./my-application start
```

## Datadog-ci

In order to link your telemetry to your source code, Datadog collects information for every `commit sha` from your git repository with the [`datadog-ci git-metadata upload`][1] command. 

When you run `datadog-ci git-metadata upload` within a git repository, Datadog receives the repository URL, the `commit sha` of the current branch, and a list of tracked file paths.

A good way to ensure the required data is collected is to run datadog-ci git-metadata upload as part of your CI pipeline.

