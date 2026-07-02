---
title: Embed Git Information in Your Go Build Artifacts
---

## Overview

To embed Git information in your Go build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- Datadog Agent v7.35.0 or later is required.
- The Go client library version 1.48.0 or later is required.
- If your CI build runs inside a Docker container, see [Build inside a Docker container](/source_code/service-mapping/#build-inside-a-docker-container) to make your `.git` folder available before building.

## Containers

If you are using Docker containers, you have three options: using Docker, using the Datadog SDK, or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Option 1: Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: Datadog SDK" level="h3" %}}
{{% sci-dd-tracing-library %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 3: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

{{% tabs %}}

{{% tab "Option 1: Datadog tooling" %}}
{{% sci-dd-serverless %}}
{{% /tab %}}

{{% tab "Option 2: Datadog SDK" %}}
{{% sci-dd-tracing-library %}}
{{% /tab %}}

{{% tab "Option 3: DD_GIT_* environment variables" %}}
{{% sci-dd-git-env-variables %}}
{{% /tab %}}

{{% /tabs %}}

## Host

If you are using a host, you have two options.

{{% collapse-content title="Option 1: Datadog SDK" level="h3" %}}
{{% sci-dd-tracing-library %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

[101]: https://tip.golang.org/doc/go1.18
[102]: https://www.npmjs.com/package/@datadog/datadog-ci
[103]: https://docs.datadoghq.com/serverless/libraries_integrations/plugin/
[104]: https://github.com/DataDog/datadog-cdk-constructs
