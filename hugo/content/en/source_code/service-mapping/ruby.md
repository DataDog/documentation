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

- For container image label tagging, use [Datadog Agent][1] v7.35.0 or later. Other deployment models use their own Agent or serverless setup requirements.
- Use the Ruby client library version 1.21.0 or later for `DD_GIT_*` environment variables. For older versions, see [Legacy tag configuration](#legacy-tag-configuration).

## Containers

If you are using Docker containers, you have the following options: using Docker or configuring your application with the `DD_GIT_*` environment variables.

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have the following options depending on your serverless application's setup.

{{% collapse-content title="Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

If you are using a host, configure your application with the `DD_GIT_*` environment variables.

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Legacy tag configuration

For Ruby client library versions 1.6.0 through 1.20.x, use `DD_TAGS` to attach Git metadata. This method also works with later versions.

{{% sci-dd-tags-env-variable %}}

For Docker builds with these older versions:

{{% sci-docker-ddtags %}}

[1]: /agent/
