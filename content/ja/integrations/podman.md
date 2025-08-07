---
app_id: podman
categories:
- incident-teams
custom_kind: インテグレーション
description: Podman コンテナのすべてのメトリクスを Datadog で追跡
integration_version: 1.0.0
media: []
supported_os:
- linux
title: Podman
---
[Podman](https://podman.io/) is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Containers can either be run as root or in rootless mode.

## 概要

Podman container runtime is supported by the [container Agent check](https://docs.datadoghq.com/integrations/container/).
This check reports a set of metrics on any running containers, regardless of the runtime used to start them.

**注**: `container` チェックレポートは、コンテナランタイムに関係なく、システム上で見つかったすべてのコンテナのメトリクスを標準化します。

## セットアップ

### インストール

To monitor containers managed by [Podman](https://podman.io/), see the [installation instructions](https://docs.datadoghq.com/integrations/container/#setup) for the [container Agent check](https://docs.datadoghq.com/integrations/container/).

## 収集されるデータ

### メトリクス

See [metadata.csv](https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv) for a list of metrics provided by this integration.

## トラブルシューティング

Need help? Contact [Datadog support](https://podman.io/).