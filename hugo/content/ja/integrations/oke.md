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
- 構成とデプロイ
- incident-teams
- kubernetes
- モニター
- oracle
- オーケストレーション
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oke/README.md
display_on_public_website: true
draft: false
git_integration_title: oke
integration_id: oke
integration_title: Oracle Container Engine for Kubernetes
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: oke
public_title: Oracle Container Engine for Kubernetes
short_description: OKE は、OCI が管理するコンテナオーケストレーションサービスです。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Configuration & Deployment
  - Category::Containers
  - Category::Kubernetes
  - Category::Metrics
  - Category::Oracle
  - Category::Orchestration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: OKE は、OCI が管理するコンテナオーケストレーションサービスです。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/
  support: README.md#Support
  title: Oracle Container Engine for Kubernetes
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Oracle Cloud Infrastructure Container Engine for Kubernetes (OKE) は、大規模なエンタープライズ級 Kubernetes 環境の運用を簡略化するマネージド Kubernetes サービスです。

このインテグレーションは、[`oci_oke`][1] ネームスペースからメトリクスとタグを収集して、Kubernetes コントロールプレーン、クラスター、ノードの状態を監視するのに役立ちます。

OKE クラスター上に [Datadog Agent][2] をデプロイすることで、クラスター、ポッド、各ノードの負荷を追跡し、リソースのプロビジョニングおよびデプロイ方法に関するより的確な洞察を得ることができます。

ノード、ポッド、コンテナの監視に加え、Agent はクラスター内で稼働するサービスからメトリクスを収集・報告することもでき、以下が可能になります。

- [事前構成済みの Kubernetes ダッシュボード][3]を使用して OKE クラスターを探索する
- コンテナおよびプロセスをリアルタイムで監視する
- コンテナ化されたサービスを自動的に追跡・監視する

## セットアップ

[Oracle Cloud Infrastructure][4] インテグレーションを設定したら、`oci_oke` ネームスペースが [Connector Hub][5] に含まれていることを確認してください。

Datadog は既に Kubernetes と統合されているため、すぐに OKE を監視することができます。Kubernetes クラスターで実行中の Agent を OKE に移行する予定がある場合に、Datadog でクラスターの監視を続行できます。

[Helm チャート][6] を使用して Agent を DaemonSet としてデプロイすることは、最もシンプルで推奨される方法です。これにより、クラスター内のすべてのノードで Agent がポッドとして実行され、新しいノードが追加されるたびに自動的に Agent がインストールされます。また、Helm の values ファイルに数行追加するだけで、Agent がプロセスデータ、トレース、ログを収集するよう構成できます。さらに、OKE ノードプールにも対応しています。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## その他の参考資料

- [Datadog で OKE を 監視する方法][8]

[1]: https://docs.oracle.com/en-us/iaas/Content/ContEng/Reference/contengmetrics.htm
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/#installation
[3]: https://app.datadoghq.com/dashboard/lists/preset/3?q=kubernetes
[4]: https://docs.datadoghq.com/ja/integrations/oracle_cloud_infrastructure/
[5]: https://cloud.oracle.com/connector-hub/service-connectors
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=helm
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/monitor-oracle-kubernetes-engine/