---
app_id: oke
app_uuid: c3361861-32be-4ed4-a138-d68b85b8d88b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10255
    source_type_name: Oracle Container Engine for Kubernetes - OKE
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- kubernetes
- oracle
- orchestration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oke/README.md
display_on_public_website: true
draft: false
git_integration_title: oke
integration_id: oke
integration_title: Oracle Container Engine for Kubernetes
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: oke
public_title: Oracle Container Engine for Kubernetes
short_description: OKE は、Oracle が管理するコンテナオーケストレーションサービスです。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Oracle
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: OKE は、Oracle が管理するコンテナオーケストレーションサービスです。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle Container Engine for Kubernetes
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE) は、Oracle Cloud 上でコンテナ化されたアプリケーションをデプロイして実行するための、フルマネージド Kubernetes サービスです。Datadog は、OKE によって管理される Kubernetes クラスターに対する包括的な可視性を提供します。Datadog のインテグレーションを有効にすると、Kubernetes インフラストラクチャーの表示、ライブ・プロセスの監視、すべてのポッドとコンテナからの主要メトリクスの追跡を 1 箇所で行うことができます。

## 計画と使用

Datadog は既に Kubernetes と統合されているため、すぐに OKE を監視することができます。Kubernetes クラスターで実行中の Agent を OKE に移行する予定がある場合に、Datadog でクラスターの監視を続行できます。

さらに、OKE ノードプールもサポートされています。


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

## その他の参考資料

- [Datadog を使用した OKE の監視方法][2]

[1]: https://docs.datadoghq.com/ja/help/
[2]: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/