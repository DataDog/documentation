---
title: Embed Git Information in Ruby Build Artifacts
description: Embed Git information in Ruby build artifacts for containers, serverless, and host deployments.
type: multi-code-lang
code_lang: ruby
code_lang_weight: 60
---

## Overview

To embed Git information in your Ruby build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.
- The Ruby client library version 1.21.0 or later is required.

## Containers

If you are using Docker containers, use Docker or set the `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` environment variables.

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="Environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have the following options depending on your serverless application's setup.

{{% collapse-content title="Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="Environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, set the `DD_GIT_REPOSITORY_URL` and `DD_GIT_COMMIT_SHA` environment variables.

{{% collapse-content title="Environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

[1]: /agent/
