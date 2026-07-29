---
title: Embed Git Information in Python Build Artifacts
description: Embed Git information in Python build artifacts for containers, serverless, and host deployments.
type: multi-code-lang
code_lang: python
code_lang_weight: 50
---

## Overview

To embed Git information in your Python build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.
- The Python client library version 1.12.0 or later is required.

## Containers

If you are using Docker containers, you have the following options: using Docker, using Setuptools, or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="Setuptools or unified Python project settings file" level="h3" %}}
{{% sci-dd-setuptools-unified-python %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have the following options depending on your serverless application's setup.

{{% collapse-content title="Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="Setuptools or unified Python project settings file" level="h3" %}}
{{% sci-dd-setuptools-unified-python %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, you have the following options.

{{% collapse-content title="Setuptools or unified Python project settings file" level="h3" %}}
{{% sci-dd-setuptools-unified-python %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

[1]: /agent/
