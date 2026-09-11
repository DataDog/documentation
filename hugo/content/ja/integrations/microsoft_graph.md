---
app_id: microsoft-graph
app_uuid: 6341e6d9-953d-4fad-8ff1-7a80d6ba6821
assets:
  dashboards:
    microsoft-graph: assets/dashboards/microsoft_graph_security_alerts.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30155012
    source_type_name: Microsoft Graph
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- security
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_graph
integration_id: microsoft-graph
integration_title: Microsoft Graph
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_graph
public_title: Microsoft Graph
short_description: Defender、Purview、Entra ID、Sentinel からセキュリティ ログを収集するために Microsoft
  Graph と統合します。
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
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Defender、Purview、Entra ID、Sentinel からセキュリティ ログを収集するために Microsoft Graph
    と統合します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Graph
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

[Microsoft Graph][1] のセキュリティ API を使用して、Microsoft のセキュリティ プロダクト、サービス、パートナーを接続し、セキュリティ運用を効率化して、脅威の防御・検出・対応能力を向上させます。

Microsoft Graph のセキュリティ API は、複数の Microsoft Graph のセキュリティ プロバイダー (security providers または providers) に接続するための単一のプログラムによるインターフェイスを提供する、仲介サービス (またはブローカー) です。Microsoft Graph のセキュリティ API へのリクエストは、該当するすべてのセキュリティ プロバイダーに委譲されます。結果は集約され、共通スキーマで要求元アプリケーションに返されます。

このインテグレーションは、次のプロダクトからセキュリティ イベントを収集します:

* Microsoft Entra ID Protection
* Microsoft 365 Defender
* Microsoft Defender for Cloud Apps
* Microsoft Defender for Endpoint
* Microsoft Defender for Identity
* Microsoft Defender for Office 365
* Microsoft Purview Data Loss Prevention
* Microsoft Sentinel

## セットアップ

Microsoft Graph を Datadog と統合するには、Datadog が OAuth を使用して Microsoft に接続します。統合には、認証済みユーザーに次の権限スコープが必要です:

- `offline_access`
- `APIConnectors.Read.All`
- `SecurityAlert.Read.All`

### インストール

1. [Integrations Page][2] に移動し、"Microsoft Graph" Integration を検索します。
2. タイルをクリックします。
3. インテグレーションをインストールするアカウントを追加するには、**Add Microsoft Account** ボタンをクリックします。
4. モーダル ダイアログの手順を確認したら、**Authorize** ボタンをクリックします。Microsoft Login Page にリダイレクトされます。
6. アクセス許可を求める画面で **Authorize** をクリックします。これにより、Datadog がセキュリティ イベントを閲覧できるようになります。
7. 新しいアカウントで Datadog の Microsoft Graph タイルにリダイレクトされます。Datadog は 'Account Name' を覚えやすい名前に変更することを推奨します。

### 構成


### 検証


## 収集データ

### ログ

Microsoft Graph は、利用可能な Microsoft Graph のセキュリティ イベントをすべて収集します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://learn.microsoft.com/en-us/graph/security-concept-overview
[2]: https://app.datadoghq.com/integrations?integrationId=microsoft-graph
[3]: https://docs.datadoghq.com/ja/help/