---
app_id: podman
app_uuid: ecc06845-18ac-448e-b352-1bbf31fdfcc3
assets:
  integration:
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Podman
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/podman/README.md
display_on_public_website: true
draft: false
git_integration_title: podman
integration_id: podman
integration_title: Podman
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: podman
oauth: {}
public_title: Podman
short_description: Podman コンテナのすべてのメトリクスを Datadog で追跡
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Category::Containers
  configuration: README.md#Setup
  description: Podman コンテナのすべてのメトリクスを Datadog で追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Podman
---



[Podman][1] は、Linux システムで OCI コンテナを開発、管理、実行するためのデーモンレスコンテナエンジンです。コンテナは、ルートで実行することも、ルートレスで実行することも可能です。

## 概要

Podman コンテナランタイムは、[コンテナ Agent チェック][2]でサポートされています。
このチェックは、起動に使用されたランタイムに関係なく、実行中のコンテナに関する一連のメトリクスを報告します。

**注**: `container` チェックレポートは、コンテナランタイムに関係なく、システム上で見つかったすべてのコンテナのメトリクスを標準化します。

## セットアップ

### インストール

[Podman][1] で管理されているコンテナを監視するには、[コンテナ Agent チェック][2]の[インストール手順][3]をご覧ください。

## 収集データ

### メトリクス

このインテグレーションによって提供されるメトリクスのリストについては、[metadata.csv][4] を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

[1]: https://podman.io/
[2]: https://docs.datadoghq.com/ja/integrations/container/
[3]: https://docs.datadoghq.com/ja/integrations/container/#setup
[4]: https://github.com/DataDog/integrations-core/blob/master/container/metadata.csv