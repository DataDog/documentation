---
app_id: forcepoint-security-service-edge
app_uuid: 2a8fcdbf-9f07-4729-9f65-b4b60794e6b8
assets:
  dashboards:
    Forcepoint Security Service Edge - Access Logs: assets/dashboards/forcepoint_security_service_edge_access_logs.json
    Forcepoint Security Service Edge - Admin Logs: assets/dashboards/forcepoint_security_service_edge_admin_logs.json
    Forcepoint Security Service Edge - Cloud Logs: assets/dashboards/forcepoint_security_service_edge_cloud_logs.json
    Forcepoint Security Service Edge - Health Logs: assets/dashboards/forcepoint_security_service_edge_health_logs.json
    Forcepoint Security Service Edge - Overview: assets/dashboards/forcepoint_security_service_edge_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 35705978
    source_type_name: Forcepoint Security Service Edge
  logs:
    source: forcepoint-security-service-edge
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/forcepoint_security_service_edge/README.md
display_on_public_website: true
draft: false
git_integration_title: forcepoint_security_service_edge
integration_id: forcepoint-security-service-edge
integration_title: Forcepoint Security Service Edge
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: forcepoint_security_service_edge
public_title: Forcepoint Security Service Edge
short_description: Forcepoint Security Service Edge のログから洞察を得る
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Forcepoint Security Service Edge のログから洞察を得る
  media:
  - caption: Forcepoint Security Service Edge - Access Logs
    image_url: images/forcepoint_security_service_edge_access_logs.png
    media_type: image
  - caption: Forcepoint Security Service Edge - Admin Logs
    image_url: images/forcepoint_security_service_edge_admin_logs.png
    media_type: image
  - caption: Forcepoint Security Service Edge - Cloud Logs
    image_url: images/forcepoint_security_service_edge_cloud_logs.png
    media_type: image
  - caption: Forcepoint Security Service Edge - Health Logs
    image_url: images/forcepoint_security_service_edge_health_logs.png
    media_type: image
  - caption: Forcepoint Security Service Edge - Overview
    image_url: images/forcepoint_security_service_edge_overview.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Forcepoint Security Service Edge
---

<!-- SOURCED FROM https://github.com/DataDog/integrations-core -->
## 概要

[Forcepoint Security Service Edge][1] は、エッジで安全なアクセスとデータ保護を提供することで、セキュリティをシンプルにします。Security Service Edge (SSE) は、ポリシーの設定、適用、レポーティングを単一のプラットフォームに統合し、カバレッジの抜け漏れをなくします。


このインテグレーションは、次のログを取り込みます:

- **Cloud Logs (CloudSummary, CloudAudit)**: クラウド アプリケーション上のファイルの最新ステータスや、アカウント内の各ファイルに対するスキャン結果に関連するログ。
- **Access Logs**: 各種アプリケーションの操作に関連するログ。
- **Admin Logs**: 管理ポータルで実行された管理者イベント。
- **Health Logs (HealthProxy, HealthApi, HealthSystem)**: システム、API、プロキシのヘルスに関連するログ。


Forcepoint Security Service Edge インテグレーションは、これらのログを収集して Datadog に転送し、スムーズに分析できるようにします。Datadog は組み込みのログ パイプラインでログをパースして情報を付加するため、検索や深掘り分析が容易になります。事前設定済みのダッシュボードにより、Forcepoint Security Service Edge プラットフォーム内のアクティビティを明確に可視化できます。さらに、監視とセキュリティを強化するための Cloud SIEM 検知ルールもすぐに利用できます。


## セットアップ

### Forcepoint Security Service Edge で OAuth トークンを生成する:
1. Forcepoint ONE Security Service Edge Platform にログインします。
2. **SETTINGS > API Interface > OAuth** に移動します。
3. 表示された **REST API OAuth Configuration** ページで、API 権限のレベルを追加し、設定します。
4. 新しい設定を追加するには、**緑** のプラス アイコンをクリックします。
5. **Edit Application** ダイアログで、次のとおり入力します:

    a. **Name**: 新しいアプリケーション設定の名前

    b. **Permissions**: **Access your Forcepoint logs (logs api)** オプションを選択します。

    c. **Permitted User Group**: 既定は **All** です。要件に合わせて選択します。

    d. **Ok** をクリックして変更を保存します。アプリケーションが一覧に追加されますが、ステータスは **Pending** と表示されます。

6. **Application** 列でアプリケーション名を選択し、**Edit Application** を開きます。

    a. **Edit Application** ダイアログで **Token Authorization URL** をクリックし、現在の権限を認可して Access Token を取得します。

    b. **Requested Access** ページで、この URL を許可対象ユーザーに共有し、各ユーザーにアクセスの **Approve** を依頼します。**Requested Access** ページでは、アプリケーションの権限設定を **Approve** または **Deny** できます。

7. ユーザーが承認すると、そのユーザー専用の **Access Token** が発行されます。この Access Token は Datadog でインテグレーションを設定する際に必要です。有効期限はなく、認可のための各リクエストに必ず含める必要があります。
8. アクセスが承認されると、**Status** が **Authorized** に変わります。


詳細は、ドキュメント「[OAuth トークンの設定][2]」を参照してください。

### Forcepoint Security Service Edge アカウントを Datadog に接続する

1. Access Token を追加します。
   | パラメーター          | 説明                                                                           |
   | ------------------- | ------------------------------------------------------------------------------------- |
   | Access Token        | Forcepoint Security Service Edge で取得した Access Token                         |

2. **Save** をクリックします。

## 収集されるデータ

### ログ

Forcepoint Security Service Edge インテグレーションは、Cloud Logs (CloudSummary, CloudAudit)、Access Logs、Admin Logs、Health Logs (HealthProxy, HealthApi, HealthSystem) を収集し、Datadog に転送します。

### メトリクス

Forcepoint Security Service Edge インテグレーションには、メトリクスは含まれません。

### イベント

Forcepoint Security Service Edge インテグレーションには、イベントは含まれません。

## サポート

追加のサポートが必要な場合は、[Datadog サポート][2] にお問い合わせください。

[2]:https://help.forcepoint.com/fpone/sse_admin/prod/oxy_ex-1/deployment_guide/guid-18f77855-8dc9-436a-9fba-179f06a81066.html
[1]: https://www.forcepoint.com/use-case/security-service-edge-sse
[2]: https://docs.datadoghq.com/ja/help/