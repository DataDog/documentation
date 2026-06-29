---
app_id: jfrog-platform-cloud
app_uuid: 798102cb-6c52-4a16-bc1b-48c2e6b54e71
assets:
  dashboards:
    JFrog Platform Cloud Log Analytics: assets/dashboards/jfrog_platform_cloud_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10419
    source_type_name: JFrog Platform Cloud
author:
  homepage: https://jfrog.com/
  name: JFrog
  sales_email: partners@jfrog.com
  support_email: support@jfrog.com
categories:
- ログの収集
- kubernetes
- incident-teams
- セキュリティ
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: jfrog_platform_cloud
integration_id: jfrog-platform-cloud
integration_title: JFrog Platform Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jfrog_platform_cloud
public_title: JFrog Platform Cloud
short_description: JFrog Artifactory Cloud のログの表示と分析
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Kubernetes
  - Category::Containers
  - Category::Security
  configuration: README.md#Setup
  description: JFrog Artifactory Cloud のログの表示と分析
  media:
  - caption: JFrog Artifactory ログダッシュボード - HTTP リクエスト
    image_url: images/jfrog_platform_cloud_logs_0.png
    media_type: image
  - caption: JFrog Artifactory ログダッシュボード - リクエストログ
    image_url: images/jfrog_platform_cloud_logs_1.png
    media_type: image
  - caption: JFrog Artifactory ログダッシュボード - 操作
    image_url: images/jfrog_platform_cloud_logs_2.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: JFrog Platform Cloud
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[JFrog][1] は、ユニバーサルハイブリッド型エンドツーエンドの DevOps プラットフォームです。JFrog Artifactory は、ソフトウェアサプライチェーン全体で使用されるすべてのアーティファクト、バイナリ、パッケージ、ファイル、コンテナ、コンポーネントを格納・管理するための単一のソリューションです。

JFrog Artifactory は DevOps の中心ハブとして機能し、ツールやプロセスと統合することで、自動化の向上、整合性の強化、ベストプラクティスの導入をサポートします。

JFrog の SaaS Log Streamer は、SaaS のお客様向けに JFrog が構築したログストリーミングソリューションで、お客様の JFrog SaaS インスタンスから Datadog インスタンスに直接 Artifactory ログをストリーミングします。

JFrog と Datadog を併用しているお客様は、事前に構成された Datadog ダッシュボードで Artifactory ログを可視化できます。このインテグレーションは Datadog のログパイプラインをサポートしており、JFrog からのログは事前処理されて Datadog のログフォーマットに自動変換されます。これにより、チームはニーズに応じてログに固有の名前を付けたり、検索可能なファセットを通じて Artifactory ログを掘り下げたり、JFrog SaaS インスタンスを監視することが可能になります。

このインテグレーションは、以下の Artifactory ログを Datadog にストリーミングします。

- **access-audit.log**
- **artifactory-request.log**
- **artifactory-access.log**
- **access-security-audit.log**

これらのログにより、お客様は誰がどのリポジトリにどんな頻度でアクセスしたのか、どの IP アドレスからアクセスがあったのかを簡単に把握できます。今後のアップデートで、traffic.log、artifactory-access.log、その他のリクエストログが追加される予定です。

JFrog の SaaS ログストリーミングは現在ベータ版です。ベータ期間中は、一部の JFrog Enterprise のお客様のみが MyJFrog ポータル内でクラウドログストリーミング機能を利用できます。JFrog は、2024 年第 2 四半期後半にこの機能を一般公開する予定で、その際にすべての JFrog Enterprise のお客様が利用可能になります。

## セットアップ

**注:** このインテグレーションには、JFrog Enterprise Plus のサブスクリプションが必要です。

### インストール

1. [Datadog API キー][2]を作成します。
2. [MyJFrog ポータル][3]で、Settings &gt; JFrog Cloud Log Streaming - BETA に進み、Log Streamer を有効にします。
3. ベンダーとして Datadog を選択します。
4. Datadog API キーを追加し、ドロップダウンメニューから [Datadog サイト][4]の Datadog インテーク URL を選択し、必要に応じて `ddtags` を追加します。Save をクリックします。

24 時間以内にログが Datadog にストリーミングされ始めます。

## サポート

ご不明な点は、[JFrog サポート][5]までお問い合わせください。

[1]: https://jfrog.com/
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://my.jfrog.com
[4]: https://docs.datadoghq.com/ja/getting_started/site/
[5]: https://support.jfrog.com/