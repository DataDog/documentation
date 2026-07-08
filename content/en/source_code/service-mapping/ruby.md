---
title: Embed Git Information in Your Ruby Build Artifacts
---

## Overview

To embed Git information in your Ruby build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.
- The Ruby client library version 1.6.0 or later is required.
- If your CI build runs inside a Docker container, see [Build inside a Docker container](/source_code/service-mapping/#build-inside-a-docker-container) to make your `.git` folder available before building.

## Containers

If you are using Docker containers, you have two options: using Docker or configuring your application with the `DD_TAGS` environment variable.

{{% collapse-content title="Option 1: Docker" level="h3" %}}
{{% sci-docker-ddtags %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: `DD_TAGS` environment variable" level="h3" %}}
{{% sci-dd-tags-env-variable %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have two options depending on your serverless application's setup.

{{% collapse-content title="Option 1: Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: `DD_TAGS` environment variable" level="h3" %}}
{{% sci-dd-tags-env-variable %}}
{{% /collapse-content %}}

## Host

If you are using a host, configure your application with the `DD_TAGS` environment variable.

{{% collapse-content title="`DD_TAGS` environment variable" level="h3" %}}
{{% sci-dd-tags-env-variable %}}
{{% /collapse-content %}}

[1]: /agent/
