---
title: Embed Git Information in Your .NET Build Artifacts
---

## Overview

To embed Git information in your .NET build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- Datadog Agent v7.35.0 or later is required.
- The .NET client library version 2.24.1 or later is required.
- Ensure that your `.pdb` files are deployed alongside your .NET assemblies (`.dll` or `.exe`) in the same folder.
- If your CI build runs inside a Docker container, see [Build inside a Docker container](/source_code/service-mapping/#build-inside-a-docker-container) to make your `.git` folder available before building.

## Containers

If you are using Docker containers, you have three options: using Docker, using Microsoft SourceLink, or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Option 1: Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: Microsoft SourceLink" level="h3" %}}
{{% sci-microsoft-sourcelink %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 3: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

{{% collapse-content title="Option 1: Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: Microsoft SourceLink" level="h3" %}}
{{% sci-microsoft-sourcelink %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 3: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, you have two options: using Microsoft SourceLink or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Option 1: Microsoft SourceLink" level="h3" %}}
{{% sci-microsoft-sourcelink %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}
