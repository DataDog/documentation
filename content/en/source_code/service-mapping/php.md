---
title: Embed Git Information in Your PHP Build Artifacts
---

## Overview

To embed Git information in your PHP build artifacts, follow the instructions for your deployment model: [Containers](#containers) or [Host](#host).

## Prerequisites

- Datadog Agent v7.35.0 or later is required.
- PHP client library version 1.13.0 or later is required, or 1.2.0 or later if using tracing only without profiling.
- If your CI build runs inside a Docker container, see [Build inside a Docker container](/source_code/service-mapping/#build-inside-a-docker-container) to make your `.git` folder available before building.

## Containers

If you are using Docker containers, you have two options: using Docker or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Option 1: Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="Option 2: `DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}
