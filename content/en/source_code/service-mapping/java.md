---
title: Embed Git Information in Your Java Build Artifacts
---

## Overview

To embed Git information in your Java build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- Datadog Agent v7.35.0 or later is required.
- The Java client library version 1.48.0 or later is required for embedded git properties. Version 1.12.0 or later is required for other options.
- If your CI build runs inside a Docker container, see [Build inside a Docker container](/source_code/service-mapping/#build-inside-a-docker-container) to make your `.git` folder available before building.

## Containers

If you are using Docker containers, you have three options: embedding git properties in your build artifact, using Docker, or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Option 1: Embedded git properties (recommended)" level="h3" %}}
{{% sci-java-git-properties %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 3: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have three options depending on your serverless application's setup.

{{% collapse-content title="Option 1: Embedded git properties (recommended)" level="h3" %}}
{{% sci-java-git-properties %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 3: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, you have two options.

{{% collapse-content title="Option 1: Embedded git properties (recommended)" level="h3" %}}
{{% sci-java-git-properties %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}
