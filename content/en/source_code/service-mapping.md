---
title: Service Mapping for Source Code Integration
description: "Tag your APM telemetry with Git information to link services to source code."
further_reading:
- link: "/tracing/"
  tag: "Documentation"
  text: "Learn about APM"
- link: "/tracing/trace_collection/dd_libraries/"
  tag: "Documentation"
  text: "Learn about Datadog Tracing Libraries"
---

## Overview

Datadog Agent v7.35.0 or later is required.

If you have [APM][6] set up already, navigate to [**Integrations** > **Link Source Code**][7] and configure the source code integration for your backend services.

Your telemetry must be tagged with Git information that ties the running application version with a particular repository and commit.

For supported languages, Datadog recommends [embedding Git information](#embed-git-information-in-your-build-artifacts) in the deployed artifacts, which is then extracted by the [Datadog Tracing Libraries][9] automatically.

For other languages and configurations, you can [configure telemetry tagging](#configure-telemetry-tagging) yourself.

## Embed Git information in your build artifacts

You can embed the repository URL and commit hash in your build artifact. The [Datadog Tracing Libraries][9] use this information to automatically add the right tags to your APM service telemetry.

Select one of the following languages that supports embedding git information:

{{< tabs >}}
{{% tab "Go" %}}

<div class="alert alert-info">The Go client library version 1.48.0 or later is required.</div>

### Containers

If you are using Docker containers, you have three options: using Docker, using the Datadog tracing library, or configuring your application with `DD_GIT_*` environment variables.

#### Option 1: Docker

{{% sci-docker %}}

#### Option 2: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

#### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

#### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

#### Option 2: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

#### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Host

If you are using a host, you have two options.

#### Option 1: Datadog Tracing Library

{{% sci-dd-tracing-library %}}

#### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

[101]: https://tip.golang.org/doc/go1.18
[102]: https://www.npmjs.com/package/@datadog/datadog-ci
[103]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/
[104]: https://github.com/DataDog/datadog-cdk-constructs

{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">The Python client library version 1.12.0 or later is required.</div>

### Containers

If you are using Docker containers, you have three options: using Docker, using Setuptools, or configuring your application with `DD_GIT_*` environment variables.

#### Option 1: Docker

{{% sci-docker %}}

#### Option 2: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

#### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

[101]: https://github.com/DataDog/dd-trace-go
[102]: https://github.com/DataDog/hatch-datadog-build-metadata#readme

### Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

#### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

#### Option 2: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

#### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Host

If you are using a host, you have two options.

#### Option 1: Setuptools or Unified Python Project Settings File

{{% sci-dd-setuptools-unified-python %}}

#### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab ".NET" %}}

<div class="alert alert-info">The .NET client library version 2.24.1 or later is required.</div>

As a first step, ensure that your `.pdb` files are deployed alongside your .NET assemblies (`.dll` or `.exe`) in the same folder.
Then, follow the rest of the instructions based on your specific deployment model:

### Containers

If you are using Docker containers, you have three options: using Docker, using Microsoft SourceLink, or configuring your application with `DD_GIT_*` environment variables.

#### Option 1: Docker

{{% sci-docker %}}

#### Option 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

#### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

#### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

#### Option 2: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

#### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Host

If you are using a host, you have two options: using Microsoft SourceLink or configuring your application with `DD_GIT_*` environment variables.

#### Option 1: Microsoft SourceLink

{{% sci-microsoft-sourcelink %}}

#### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Node.js" %}}

<div class="alert alert-info">
  The Node.js client library version 3.21.0 or later is required.
  </br>
  </br>
  For transpiled Node.js applications (for example, TypeScript), make sure to generate and publish source maps with the deployed application, and to run Node.js with the <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a> flag. Otherwise, code links and snippets will not work.
</div>

### Containers

If you are using Docker containers, you have three options: using a bundler plugin, using Docker, or configuring your application with `DD_GIT_*` environment variables.

#### Option 1: Bundler plugin

{{% sci-dd-tags-bundled-node-js %}}

#### Option 2: Docker

{{% sci-docker %}}

#### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Serverless

If you are using Serverless, you have several options depending on your serverless application's setup.

#### Option 1: Bundler plugin

{{% sci-dd-tags-bundled-node-js %}}

#### Option 2: Datadog Tooling

{{% sci-dd-serverless %}}

#### Option 3: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Host

For host-based environments, you have two options based on your build and deploy configuration.

#### Option 1: Bundler plugin

{{% sci-dd-tags-bundled-node-js %}}

#### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "Ruby" %}}

<div class="alert alert-info">The Ruby client library version 1.6.0 or later is required.</div>

### Containers

If you are using Docker containers, you have two options: using Docker or configuring your application with the `DD_TAGS` environment variable.

#### Option 1: Docker

{{% sci-docker-ddtags %}}

#### Option 2: `DD_TAGS` Environment Variable

{{% sci-dd-tags-env-variable %}}

### Serverless

If you are using Serverless, you have two options depending on your serverless application's setup.

#### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

#### Option 2: `DD_TAGS` Environment Variable

{{% sci-dd-tags-env-variable %}}

### Host

If you are using a host, configure your application with the `DD_TAGS` environment variable.

{{% sci-dd-tags-env-variable %}}

{{% /tab %}}
{{% tab "Java" %}}

<div class="alert alert-info">The Java client library version 1.12.0 or later is required.</div>

### Containers

If you are using Docker containers, you have two options: using Docker or configuring your application with `DD_GIT_*` environment variables.

#### Option 1: Docker

{{% sci-docker %}}

#### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Serverless

If you are using Serverless, you have two options depending on your serverless application's setup.

#### Option 1: Datadog Tooling

{{% sci-dd-serverless %}}

#### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Host

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{% tab "PHP" %}}

<div class="alert alert-info">PHP client library version 1.13.0 or later is required, or 1.2.0 or later if using tracing only without profiling.</div>

### Containers

If you are using Docker containers, you have two options: using Docker or configuring your application with `DD_GIT_*` environment variables.

#### Option 1: Docker

{{% sci-docker %}}

#### Option 2: `DD_GIT_*` Environment Variables

{{% sci-dd-git-env-variables %}}

### Host

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% sci-dd-git-env-variables %}}

{{% /tab %}}
{{< /tabs >}}

## Build inside a Docker container

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

## Configure telemetry tagging

For unsupported languages, use the `git.commit.sha` and `git.repository_url` tags to link data to a specific commit.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[6]: /tracing/
[7]: https://app.datadoghq.com/source-code/setup/apm
[9]: /tracing/trace_collection/dd_libraries/
