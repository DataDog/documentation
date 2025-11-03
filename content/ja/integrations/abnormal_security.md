---
app_id: abnormal-security
app_uuid: 15f718fe-3819-4305-9681-ce80974c1b4b
assets:
  dashboards:
    abnormal-security-overview: assets/dashboards/abnormal_security_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21175237
    source_type_name: Abnormal Security
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- security
- log collection
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: abnormal_security
integration_id: abnormal-security
integration_title: Abnormal Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: abnormal_security
public_title: Abnormal Security
short_description: Abnormal Security と連携して脅威、ケース、監査ログを取得します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Abnormal Security と連携して脅威、ケース、監査ログを取得します。
  media:
  - caption: Abnormal Overview Dashboard
    image_url: images/overview-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Abnormal Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Abnormal Security は、人間の行動を理解するプラットフォームを用いて包括的なメール保護を提供します。フィッシング、ソーシャル エンジニアリング、アカウント乗っ取りなど、人間の行動を悪用する攻撃から保護します。

Datadog の Abnormal Security 連携は [Abnormal Security の API][1] を使用してログを収集し、次の 3 種類のログを生成します:
- **Threat Logs**: 組織、そのデータ、または人員に損害を与える可能性のある悪意のあるアクティビティまたは攻撃を含むログです。
- **Case Logs**: Abnormal Security によって識別された Abnormal Case を含むログです。通常、関連する脅威が含まれます。
- **Audit Logs**: Abnormal Portal 上で実行されたアクションを含むログです。


## セットアップ

### 構成

1. [Abnormal Security Account][2] にサインインします。
2. **Abnormal REST API** をクリックします。
3. Abnormal Portal で認証トークンを取得します。

このトークンは Abnormal で検出された脅威、ケース、監査ログを閲覧する際に使用します。

### 検証


## 収集データ

### メトリクス

Abnormal Security 連携にはメトリクスは含まれていません。

### ログ収集

Abnormal Security のインシデント、ケース、監査ログはソース `abnormal-security` に表示されます。

### イベント

Abnormal Security 連携にはイベントは含まれていません。

### サービス チェック

Abnormal Security 連携にはサービス チェックは含まれていません。

## トラブルシューティング

ヘルプが必要な場合は [Datadog support][3] までお問い合わせください。

[1]: https://app.swaggerhub.com/apis/abnormal-security/abx/1.4.3#/info
[2]: https://portal.abnormalsecurity.com/home/settings/integrations
[3]: https://docs.datadoghq.com/ja/help/