---
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- oracle
- containers
- orchestration
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oke/README.md
display_name: Oracle Container Engine for Kubernetes - OKE
draft: false
git_integration_title: oke
guid: a9d60438-8782-44cb-bd27-1ffc6c5688c1
integration_id: oke
integration_title: Oracle Container Engine for Kubernetes
integration_version: ''
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: oke.
metric_to_check: ''
name: oke
public_title: Datadog-Oracle Container Engine for Kubernetes インテグレーション
short_description: OKE は、Oracle が管理するコンテナオーケストレーションサービスです。
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE) は、Oracle Cloud 上でコンテナ化されたアプリケーションをデプロイして実行するための、フルマネージド Kubernetes サービスです。Datadog は、OKE によって管理される Kubernetes クラスターに対する包括的な可視性を提供します。Datadog のインテグレーションを有効にすると、Kubernetes インフラストラクチャーの表示、ライブ・プロセスの監視、すべてのポッドとコンテナからの主要メトリクスの追跡を 1 箇所で行うことができます。

## セットアップ

Datadog は既に Kubernetes と統合されているため、すぐに OKE を監視することができます。Kubernetes クラスターで実行中の Agent を OKE に移行する予定がある場合に、Datadog でクラスターの監視を続行できます。

さらに、OKE ノードプールもサポートされています。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][1]までお問合せください。

## その他の参考資料

- [Datadog を使用した OKE の監視方法][2]

[1]: https://docs.datadoghq.com/ja/help/
[2]: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/