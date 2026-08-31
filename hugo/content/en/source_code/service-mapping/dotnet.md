---
title: Embed Git Information in .NET Build Artifacts
description: Embed Git information in .NET build artifacts for containers, serverless, and host deployments.
type: multi-code-lang
code_lang: dotnet
code_lang_weight: 0
---

## Overview

To embed Git information in your .NET build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.
- The .NET client library version 2.24.1 or later is required.
- Ensure that your `.pdb` files are deployed alongside your .NET assemblies (`.dll` or `.exe`) in the same folder.

## Containers

If you are using Docker containers, you have three options: using Docker, using Microsoft SourceLink, or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="Microsoft SourceLink" level="h3" %}}
{{% sci-microsoft-sourcelink %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have the following options depending on your serverless application's setup.

{{% collapse-content title="Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="Microsoft SourceLink" level="h3" %}}
{{% sci-microsoft-sourcelink %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, you have the following options: using Microsoft SourceLink or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Microsoft SourceLink" level="h3" %}}
{{% sci-microsoft-sourcelink %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

[1]: /agent/
