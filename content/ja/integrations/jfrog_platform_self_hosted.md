---
app_id: jfrog-platform
app_uuid: b2748652-b976-461c-91dd-5abd4467f361
assets:
  dashboards:
    Artifactory Metrics: assets/dashboards/jfrog_artifactory_metrics_(self-hosted).json
    Jfrog Artifactory Dashboard: assets/dashboards/jfrog_artifactory_logs_(self-hosted).json
    Xray Logs: assets/dashboards/jfrog_xray_logs_(self-hosted).json
    Xray Metrics: assets/dashboards/jfrog_xray_metrics_(self-hosted).json
    Xray Violations: assets/dashboards/jfrog_xray_violations_(self-hosted).json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: jfrog.artifactory.app_disk_free_bytes
      metadata_path: metadata.csv
      prefix: jfrog.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10121
    source_type_name: JFrog Platform
author:
  homepage: https://github.com/jfrog/log-analytics-datadog
  name: JFrog
  sales_email: partners@jfrog.com
  support_email: support@jfrog.com
categories:
- incident-teams
- ログの収集
- メトリクス
- セキュリティ
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform_self_hosted/README.md
display_on_public_website: true
draft: false
git_integration_title: jfrog_platform_self_hosted
integration_id: jfrog-platform
integration_title: JFrog Platform (セルフホスト)
integration_version: 1.3.0
is_public: true
manifest_version: 2.0.0
name: jfrog_platform_self_hosted
public_title: JFrog Platform (セルフホスト)
short_description: JFrog Artifactory と Xray のログ、違反、およびメトリクスを表示、分析します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Log Collection
  - Category::Metrics
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: JFrog Artifactory と Xray のログ、違反、およびメトリクスを表示、分析します。
  media:
  - caption: JFrog Artifactory ログダッシュボード
    image_url: images/jfrog_artifactory_logs.png
    media_type: image
  - caption: JFrog Artifactory メトリクスダッシュボード
    image_url: images/jfrog_artifactory_metrics.png
    media_type: image
  - caption: JFrog Xray ログダッシュボード
    image_url: images/jfrog_xray_logs.png
    media_type: image
  - caption: JFrog Xray 違反ダッシュボード
    image_url: images/jfrog_xray_violations.png
    media_type: image
  - caption: JFrog Xray メトリクスダッシュボード
    image_url: images/jfrog_xray_metrics.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: JFrog Platform (セルフホスト)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
<div class="alert alert-warning">The existing agent check to gather JFrog metrics has been replaced with Fluentd. The agent check is deprecated.</div>

## 概要

[JFrog][1] は、汎用的でハイブリッドなエンドツーエンドの DevOps プラットフォームです。このインテグレーションを利用することで、JFrog のセルフホスト版をご利用のお客様が、JFrog Artifactory や JFrog Xray から Datadog に直接、ログ 、違反、およびメトリクスをシームレスにストリーミングできます。このインテグレーションは、Datadog [ログパイプライン][2]と共にパッケージ化されており、パイプラインがログをリッチ化およびインデックス化し、Datadog [ファセット][3]を使用して検索性と処理性を高めます。

インテグレーションに関して改善のご要望があれば、JFrog までお知らせください。より詳細なドキュメントについては、[GitHub][4] をご覧ください。

### JFrog ダッシュボード

このインテグレーションとパッケージになっているダッシュボードは、インテグレーションタイルの Assets タブで確認できます。

#### JFrog Artifactory ダッシュボード
このダッシュボードは Application、Audit、Requests の 3 つのセクションに分かれています。
* **Application** - このセクションでは、ログの量 (さまざまなログソースに関する情報) と経時的な Artifactory エラー (他の方法では検出されない可能性のあるアプリケーションエラーのバースト) を追跡します。
* **Audit** - このセクションでは、誰がどこから Artifactory インスタンスにアクセスしているのかを判断するのに役立つ監査ログを追跡します。監査ログは、期限切れの資格情報を使用した悪質性の疑われる要求や処理 (CI ジョブなど) を追跡するのに役立ちます。
* **Requests** - このセクションでは、HTTPレスポンスコードと、アップロードとダウンロードで使用された上位 10 個の IP アドレスを追跡します。

#### JFrog Artifactory メトリクスダッシュボード
このダッシュボードは、Artifactory システムメトリクス、JVM メモリ、ガベージコレクション、データベース接続、HTTP 接続メトリクスを追跡します。

#### JFrog Xray ログダッシュボード
このダッシュボードは、Xray に関連するアクセス、サービス 、トラフィックログ量の概要を提供します。また、さまざまな HTTP レスポンスコード、HTTP 500 エラー、ログエラーを追跡し、オペレーションに関するインサイトを深めることもできます。

#### JFrog Xray 違反ダッシュボード
このダッシュボードは、Xray が発見したすべてのライセンス違反とセキュリティ脆弱性の集計サマリーを提供します。情報は、監視ポリシーとルールごとに区分されています。違反の種類と重大度に関する傾向情報が時系列で提供されるほか、最も頻繁に発生する CVE、最も影響を受けるアーティファクトやコンポーネントに関するインサイトも提供されます。

#### JFrog Xray メトリクスダッシュボード
このダッシュボードは、スキャンされたアーティファクトおよびスキャンされたコンポーネントに関するシステムメトリクスおよびデータメトリクスを追跡します。

## Setup

### 要件

* [Datadog API キー][5]。
* JFrog Platform (セルフホスト) インテグレーションをインストールします。

### Fluentd のインストール
環境に合ったインストールガイドに従うことをお勧めします。

* [OS / Virtual Machine][6]
* [Docker][7]
* [Helm を使った Kubernetes デプロイメント][8]

## Data Collected

### Metrics
{{< get-metrics-from-git "jfrog_platform_self_hosted" >}}


### Events

The JFrog check does not include any events.

### Service Checks

The JFrog check does not include any service checks.

## Support

Need help? Contact [support@jfrog.com][10] or open a support ticket on JFrog [Customer Support Portal][11]

### Troubleshooting

**Q : I am about to upgrade from on-prem to JFrog Cloud. Can I expect all the same logs to stream into Datadog from my SaaS instance post-migration when I install the SaaS version of the integration?**

A: At launch, the SaaS version of the integration will only stream the artifactory-request, access-audit and access-security-audit logs from your SaaS JFrog instance to Datadog.


[1]: https://jfrog.com/
[2]: https://docs.datadoghq.com/ja/logs/log_configuration/pipelines/?tab=source
[3]: https://docs.datadoghq.com/ja/logs/explorer/facets/
[4]: https://github.com/jfrog/log-analytics-datadog
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://github.com/jfrog/log-analytics-datadog#os--virtual-machine
[7]: https://github.com/jfrog/log-analytics-datadog#docker
[8]: https://github.com/jfrog/log-analytics-datadog#kubernetes-deployment-with-helm
[9]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/metadata.csv
[10]: support@jfrog.com
[11]: https://support.jfrog.com/s/login/?language=en_US&ec=302&startURL=%2Fs%2F