---
title: Embed Git Information in PHP Build Artifacts
description: Embed Git information in PHP build artifacts for containers and host deployments.
type: multi-code-lang
code_lang: php
code_lang_weight: 40
---

## Overview

To embed Git information in your PHP build artifacts, follow the instructions for your deployment model: [Containers](#containers) or [Host](#host).

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.
- The PHP client library version 1.13.0 or later is required, or 1.2.0 or later if using tracing only without profiling.

## Containers

If you are using Docker containers, you have the following options: using Docker or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, configure your application with `DD_GIT_*` environment variables.

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

[1]: /agent/
