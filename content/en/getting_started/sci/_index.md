---
title: Getting Started with Source Code Integration
kind: documentation

---
## Overview

Datadog source code integration allows you to find the root cause of the surfaced problems.

By setting up the source code integration datadog is able to:

* augment stack traces with your code
* directly link to your git repositories
* pre-load context wherever a git hash or git link is used

Work through this guide to Setup the full capabilities of source code integration with datadog.

To be able to map telemetry data to your source code we need to collect some metadata that needs to be configured to be transferred to Datadog in your CI pipeline.

1. Tag your process with the commit SHA
  1. Container label
  2. K8s label or annotation
  3. Setting or extending the DD_TAGS environment variable
2. Upload git metadata (including commit SHAs) and the git repository url
  1. Buy running datadog-ci commit upload
3. Install Github App

By having these two data points Datadog is able to correlate through the SHA all places where we can link to your git repository directly.

For Github SaaS users we are having an additional feature, by installing our Github App (link) we can directly inline codesnipets from your github repository and help you find the problematic pieces faster.

Currently the source code integration is in public beta and available for Java, Go

## How to tag your builds

To get direct links from your stacktrace to your git repo you need to tag all your telemetry with a new tag git.commit.sha. Depending on your environment there are several ways to do that

### Containerized environments

With containerized environments it’s easy to tag all your telemetry with the git.commit.sha (traces, profiles, logs…)

#### Docker runtime

If your containers are running on Docker, git.commit.sha can be directly extracted from your docker images and comply with the opencontainers standard. You can simply tag your containers during build time, and configure the agent to collect this tag as “git.commit.sha”

##### Tag your images
docker build -t my-application --label org.opencontainers.image.revision=$(git rev-parse HEAD) .

##### Configure the agent to collect git.commit.sha

Configure the agent to collect org.opencontainers.image.revision as git.commit.sha using DD_DOCKER_LABELS_AS_TAGS in the agent configuration:

```
DD_DOCKER_LABELS_AS_TAGS='{"org.opencontainers.image.revision": "git.commit.sha"}'
```

#### Other container runtimes on Kubernetes

If you use kubernetes with another container runtime (like containerd), you need to tag your deployed pod with a pod annotation using tag autodiscovery:
annotations:

```
  ad.datadoghq.com/tags: '{"git.commit.sha": "<FULL_GIT_COMMIT_SHA>"}'
```

#### Other containers setup

For now they are not supported, you need to default to the non-containerized environment setup.

### Non-containerized environments

In non-containerized environments you need to manually tag your traces and profiles with the git commit sha. The easiest way to achieve this is to tag all your spans and profiles with git.commit.sha by configuring the tracer with DD_TAGS environment variable.

```
export DD_TAGS=”git.commit.sha:<GIT_COMMIT_SHA>”
./my-application start
```

## Datadog-ci

To link your telemetry to your source code, we need to regularly collect some information from your git repository, for every commit sha reported to Datadog. The command datadog-ci commit upload allows us to collect that data. Every time you run this command within a git repository, the following information is reported to Datadog:
1. Repository URL
2. Commit sha of the current branch
3. List of tracked files paths within the repository

A good way to ensure the required data is collected is to run datadog-ci commit upload as part of your CI pipeline.

