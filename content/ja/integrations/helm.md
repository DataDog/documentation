---
app_id: helm
app_uuid: 754a061c-d896-4f3c-b54e-87125bb66241
assets:
  dashboards:
    Helm - Overview: assets/dashboards/overview.json
  integration:
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: helm.release
      metadata_path: metadata.csv
      prefix: helm.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Helm
  monitors:
    '[helm] Monitor Helm failed releases': assets/monitors/monitor_failed_releases.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- 構成 & デプロイ
- コンテナ
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/helm/README.md
display_on_public_website: true
draft: false
git_integration_title: helm
integration_id: helm
integration_title: Helm チェック
integration_version: ''
is_public: true
kind: integration
manifest_version: 2.0.0
name: helm
oauth: {}
public_title: Helm チェック
short_description: Datadog で Helm のデプロイメントを追跡
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Configuration & Deployment
  - Category::Containers
  configuration: README.md#Setup
  description: Datadog で Helm のデプロイメントを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Helm チェック
---



## 概要

このチェックは、Datadog Agent を通じて Helm のデプロイメントを監視します。

Helm は複数のストレージバックエンドをサポートしています。v3 では、Helm のデフォルトは Kubernetes シークレットで、v2 では、Helm のデフォルトは ConfigMaps です。このチェックでは、両方のオプションに対応しています。

## セットアップ

### インストール

Helm チェックは [Datadog Agent][1] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

これはクラスターチェックです。詳細については、[クラスターチェックのドキュメント][2]を参照してください。

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `helm` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "helm" >}}


### イベント

このチェックは、`collect_events` オプションが `true` に設定されているときにイベントを発行します。デフォルトは `false` です。

このオプションを有効にすると、次の場合にチェックがイベントを発行します。
- 新しいリリースがデプロイされる。
- リリースが削除される。
- リリースがアップグレードされる (新しいリビジョン)。
- 例えば、デプロイ済みから置き換え済みへのステータス変更があります。

### サービスのチェック
{{< get-service-checks-from-git "helm" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ブログ: Datadog で Helm で管理された Kubernetes アプリケーションを監視する][7]


[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://github.com/DataDog/integrations-core/blob/master/helm/metadata.csv
[5]: https://github.com/DataDog/integrations-core/blob/master/helm/assets/service_checks.json
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/