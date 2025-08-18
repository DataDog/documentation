---
app_id: akamai-zero-trust
app_uuid: d5f7fcaf-fab5-4944-af31-6df7f2efccb9
assets:
  dashboards:
    akamai-zero-trust-overview: assets/dashboards/akamai_zero_trust_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - akamai.eaa.active_dialout_count
      metadata_path: metadata.csv
      prefix: akamai.eaa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10423
    source_type_name: Akamai Zero Trust
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- ログの収集
- security
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: akamai_zero_trust
integration_id: akamai-zero-trust
integration_title: Akamai Zero Trust
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_zero_trust
public_title: Akamai Zero Trust
short_description: Akamai SIA および EAA 製品との統合
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::Log Collection
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Akamai SIA および EAA 製品との統合
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Akamai Zero Trust
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

Akamai Zero Trust には、Enterprise Application Access と Secure Internet Access の両方が含まれます。

Akamai Enterprise Application Access は、アイデンティティとコンテキストに基づき、プライベートアプリケーションへの正確なアクセスを提供するゼロトラストネットワークアクセスソリューションです。ID ベースのポリシーと、ユーザーの場所、時間、およびデバイスのセキュリティなどのリアルタイムデータを使用して、ユーザーが必要なアプリケーションのみにアクセスできるようにし、ネットワーク レベルのアクセスを排除します。Akamai MFA とシームレスに連携し、強力なユーザー認証を実現します。

Secure Internet Access Enterprise は、クラウドベースの標的型脅威対策ソリューションです。DNS および Web ベースの脅威から組織を保護し、認証および利用規定を強制し、ユーザーのインターネットアクセスを監査します。

Akamai Zero Trust は、Secure Internet Access (SIA) および Enterprise Application Access (EAA) の両方でログを収集します。また、SIA 用にコレクターメトリクスを収集することもできます。

## セットアップ

### 構成

1. [Akamai アカウント][1]にサインインします。
2. **Identity and Access Management** を検索します。
3. **Create API Client** をクリックします。
4. **Select APIs** で **SIA と EAA** を検索し、**READ-ONLY** アクセス権を付与します。
5. API クライアントを作成後、**Create Credential** をクリックして資格情報のセットを生成します。
6. 生成された資格情報から**アクセストークン、クライアントトークン、ホスト、クライアントシークレット**をコピーします。
7. EAA ログおよびメトリクスを収集する場合は、アカウントの**契約 ID** を入力します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "akamai-zero-trust" >}}


### Logs

Akamai SIA および EAA のイベントは、ソース `akamai_zero_trust` の下にログとして表示されます。

### サービスチェック

Akamai Zero Trust には、サービスのチェック機能は含まれません。

### イベント

Akamai Zero Trust には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## 参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog Cloud SIEM で Akamai Zero Trust と Application Security を監視する][4]

[1]: https://control.akamai.com/apps/auth/#/login
[2]: https://github.com/DataDog/integrations-internal-core/blob/main/akamai_zero_trust/metadata.csv
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/akamai-zero-trust-application-security/
