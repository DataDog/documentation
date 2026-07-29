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
- The Ruby client library version 1.6.0 or later is required.

## Containers

If you are using Docker containers, you have the following options: using Docker or configuring your application with the `DD_TAGS` environment variable.

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker-ddtags %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_TAGS` environment variable" level="h3" %}}
{{% sci-dd-tags-env-variable %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have the following options depending on your serverless application's setup.

{{% collapse-content title="Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_TAGS` environment variable" level="h3" %}}
{{% sci-dd-tags-env-variable %}}
{{% /collapse-content %}}

## Host

If you are using a host, configure your application with the `DD_TAGS` environment variable.

{{% collapse-content title="`DD_TAGS` environment variable" level="h3" %}}
{{% sci-dd-tags-env-variable %}}
{{% /collapse-content %}}

[1]: /agent/
