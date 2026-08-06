---
title: Embed Git Information in Java Build Artifacts
description: Embed Git information in Java build artifacts for containers, serverless, and host deployments.
type: multi-code-lang
code_lang: java
code_lang_weight: 20
---

## Overview

To embed Git information in your Java build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.
- The Java client library version 1.48.0 or later is required for embedded Git properties. Version 1.12.0 or later is required for other options.

## Containers

If you are using Docker containers, you have the following options: embedding Git properties in your build artifact, using Docker, or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Embedded Git properties (recommended)" level="h3" %}}
{{% sci-java-git-properties %}}
{{% /collapse-content %}}

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have the following options depending on your serverless application's setup.

{{% collapse-content title="Embedded Git properties (recommended)" level="h3" %}}
{{% sci-java-git-properties %}}
{{% /collapse-content %}}

{{% collapse-content title="Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, you have the following options.

{{% collapse-content title="Embedded Git properties (recommended)" level="h3" %}}
{{% sci-java-git-properties %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

[1]: /agent/
