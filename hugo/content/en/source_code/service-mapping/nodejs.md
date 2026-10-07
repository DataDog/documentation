---
title: Embed Git Information in Node.js Build Artifacts
description: Embed Git information in Node.js build artifacts for containers, serverless, and host deployments.
type: multi-code-lang
code_lang: nodejs
code_lang_weight: 30
---

## Overview

To embed Git information in your Node.js build artifacts, follow the instructions for your deployment model: [Containers](#containers), [Serverless](#serverless), or [Host](#host).

<div class="alert alert-info">For transpiled Node.js applications (for example, TypeScript), generate and publish source maps with the deployed application. Run Node.js with the <a href="https://nodejs.org/docs/latest/api/cli.html#--enable-source-maps"><code>--enable-source-maps</code></a> flag. Otherwise, code links and snippets do not work.</div>

## Prerequisites

- [Datadog Agent][1] v7.35.0 or later is required.
- The Node.js client library version 3.21.0 or later is required.

## Containers

If you are using Docker containers, you have the following options: using a bundler plugin, using Docker, or configuring your application with `DD_GIT_*` environment variables.

{{% collapse-content title="Bundler plugin" level="h3" %}}
{{% sci-dd-tags-bundled-node-js %}}
{{% /collapse-content %}}

{{% collapse-content title="Docker" level="h3" %}}
{{% sci-docker %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Serverless

If you are using Serverless, you have the following options depending on your serverless application's setup.

{{% collapse-content title="Bundler plugin" level="h3" %}}
{{% sci-dd-tags-bundled-node-js %}}
{{% /collapse-content %}}

{{% collapse-content title="Datadog tooling" level="h3" %}}
{{% sci-dd-serverless %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

## Host

For host-based environments, you have the following options based on your build and deploy configuration.

{{% collapse-content title="Bundler plugin" level="h3" %}}
{{% sci-dd-tags-bundled-node-js %}}
{{% /collapse-content %}}

{{% collapse-content title="`DD_GIT_*` environment variables" level="h3" %}}
{{% sci-dd-git-env-variables %}}
{{% /collapse-content %}}

[1]: /agent/
