---
app_id: akamai
app_uuid: 5ee63b45-092e-4d63-b980-1675f328bf6b
assets:
  dashboards:
    akamai-application-security-overview: assets/dashboards/akamai_application_security_overview.json
  integration:
    auto_install: false
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10392
    source_type_name: Akamai
author:
  homepage: https://www.datadoghq.com
  name: Ruby
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- セキュリティ
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: akamai_application_security
integration_id: akamai
integration_title: Akamai Application Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: akamai_application_security
public_title: Akamai Application Security
short_description: Akamai とインテグレーションし、Akamai 製品のイベントログを取得します。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Submitted Data Type::Logs
  - Category::Log Collection
  - Category::Security
  configuration: README.md#Setup
  description: Akamai とインテグレーションし、Akamai 製品のイベントログを取得します。
  media:
  - caption: Akamai Application Security ダッシュボードの概要
    image_url: images/akamai-application-security-dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Akamai Application Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

### Akamai Application Security

Akamai Application Security のインテグレーションにより、Datadog は Akamai のセキュリティ構成から生成されたセキュリティイベントログをキャプチャすることができます。
このインテグレーションにより、Web トラフィックのパターンをリアルタイムで視覚化し、悪質なアクティビティを迅速に検出することができます。また、DDoS 攻撃、ボットネットへの侵入、アプリケーション層の脆弱性などのセキュリティ脅威の特定にも役立ちます。

イベントの収集後、Datadog は[すぐに使える Akamai Application Security 概要ダッシュボード][1]に、攻撃データのセキュリティイベント、脅威情報、IP ログアクティビティ、および稀な IP アクティビティに関する情報を入力します。

## セットアップ

### インストール

インストールは不要です。

### 構成

#### ログ収集

Akamai のセキュリティ構成から生成されたセキュリティイベントログをキャプチャするには、Akamai アカウントで API クライアントを作成し、生成された資格情報を Datadog の [Akamai インテグレーションタイル][2]に入力します。

#### Akamai での API クライアントの作成
1. [Akamai アカウント][3]にサインインします。
2. **Identify and Access Management** を検索します。
3. **Create API Client** をクリックします。
4. **Select APIs** で **SIEM** を検索し、**READ-ONLY** アクセスを提供します。
5. **Select groups** で、**Manage SIEM** をセキュリティポリシーに関連するグループに割り当てます。
6. API クライアントを作成したら、**Create credential** をクリックして資格情報を生成します。
<!--4. 以下の手順に従って、Akamai 製品の各権限を割り当てます。-->
<!-- TODO: 別の Akamai 製品が追加された場合は、上記の #4-6 を削除し、上記の #4 のコメントを解除し、このセクションのコメントを解除して、同じフォーマットで他の Akamai 製品の手順を含めるようにしてください。

#### Akamai セキュリティイベント
1. **Select APIs** で **SIEM** を検索し、**READ-ONLY** アクセスを提供します。
2. **Select groups** で、**Manage SIEM** をセキュリティポリシーに関連するグループに割り当てます。
3. API クライアントを作成したら、**Create credential** をクリックして資格情報を生成します。
-->

#### アカウントの構成 ID の取得

1. ログインしたら、**Security Configurations** に移動します。
2. セキュリティ構成のリストから、ログを取得したい構成を選択します。
3. 選択された構成の構成 ID は URL にあります。URL の形式は、`http\://control.akamai.com/apps/security-config/#/next/configs/**CONFIG_ID**` です。
4. アカウントで **Add New** をクリックし、前のステップで見つかった構成 ID を入力します。

## リアルユーザーモニタリング

### データセキュリティ

Akamai インテグレーションには、メトリクスは含まれません。

### ワークフローの自動化

Akamai のインテグレーションは、Akamai アカウントのセキュリティイベントからログを収集します。Akamai の API の制限により、Datadog が収集できるのは過去 12 時間分の履歴イベントのみです。

### ヘルプ

Akamai インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "akamai_application_security" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://app.datadoghq.com/dash/integration/Akamai-Application-Security-Overview
[2]: https://app.datadoghq.com/integrations/akamai
[3]: https://control.akamai.com/apps/auth/#/login
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/akamai/assets/service_checks.json
[5]: https://docs.datadoghq.com/ja/help/