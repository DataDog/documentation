---
title: Embed Git Information in Go Build Artifacts
description: Embed Git information in Go build artifacts for containers, serverless, and host deployments.
type: multi-code-lang
code_lang: go
code_lang_weight: 10
---

## Overview

To embed Git information in your Go build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.
- The Go client library version 1.48.0 or later is required.

## Containers

If you are using Docker containers, you have the following options: using Docker, using the Datadog SDK, or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="Datadog SDK" level="h3" %}}
{{% sci-dd-tracing-library %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have the following options depending on your serverless application's setup.

{{% collapse-content title="Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="Datadog SDK" level="h3" %}}
{{% sci-dd-tracing-library %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, you have the following options.

{{% collapse-content title="Datadog SDK" level="h3" %}}
{{% sci-dd-tracing-library %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

[1]: /agent/
