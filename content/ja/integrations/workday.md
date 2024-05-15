---
app_id: workday
app_uuid: 011547b7-572e-481a-988a-69c1ad8c6779
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10381
    source_type_name: Workday
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
git_integration_title: workday
integration_id: workday
integration_title: Workday ユーザーアクティビティログ
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: workday
public_title: Workday ユーザーアクティビティログ
short_description: Datadog で Workday のログを確認し、コンプライアンスおよび Cloud SIEM 分析のために利用します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Datadog で Workday のログを確認し、コンプライアンスおよび Cloud SIEM 分析のために利用します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Workday ユーザーアクティビティログ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要

このインテグレーションにより、Workday テナント内のユーザーアクティビティを記録する Workday ユーザーアクティビティログの収集が可能になります。このインテグレーションにより、次のことが可能になります。

- Workday のデータ保持期間を管理する。
- カスタムウィジェットやカスタムダッシュボードを構築する。
- [すぐに使えるログパイプライン][2]を使って [Cloud SIEM][1] の検出ルールをセットアップする。
- Workday のイベントを、スタック全体の他のサービスのデータと相互参照する。

Datadog の Workday インテグレーションでは、[Workday の User Activity Logging API][3] を使用してログを収集します。これにより生成されるログから、以下に対する洞察が得られます。

- どのユーザーが Workday でリクエストを行っているか
- どのタイプのリクエストが行われているのか
- 行われたリクエストの総量
- デバイスの種類や IP アドレスなど、イベントに関連するその他のメタデータ

## 計画と使用

### インフラストラクチャーリスト

**ステップ 1: テナントレベルでユーザーアクティビティロギングを有効にする**

1. **Edit Tenant Setup - System** タスクにアクセスし、**Enable User Activity Logging** チェックボックスが選択されていることを確認します。
2. **Edit Tenant Setup - Security** タスクにアクセスし、**OAuth 2.0 Clients Enabled** チェックボックスが選択されていることを確認します。

**ステップ 2: インテグレーションシステムユーザーを作成する**

1. **Create Integration System User** タスクにアクセスします。
   - Username: < ISU_Datadog >
   - Session Timeout Minutes: 0 (セッションの有効期限を無効にする)
   - Don't Allow UI Sessions: Yes (このチェックボックスを選択する)
2. **Create Security Group** タスクにアクセスします。
   - Type of Tenanted Security Group: Integration System Security Group (Unconstrained)
   - Name: < ISSG_Datadog_Monitoring >
3. 作成したグループの **Edit Integration System Security Group** (Unconstrained) タスクにアクセスします。
   - Integration System Users: < ISU_Datadog >
4. ドメイン System Auditing の **View Domain** タスクにアクセスします。
5. System Auditing 関連のアクションメニューから Domain > Edit Security Policy Permissions を選択します。
6. 作成したグループ Remote Security Monitoring を以下の両方のテーブルに追加します。
   - Report/Task Permissions テーブル: View access
   - Integration Permissions テーブル: Get access
7. Activate Pending Security Policy Changes タスクにアクセスし、行った変更を有効にします。

**ステップ 3: テナントにインテグレーション用の API クライアントを登録する**

1. **Register API Clients for Integrations** タスクにアクセスし、クライアントを登録します。
   - Client Name: < Datadog User Activity Monitor >
   - Non-Expiring Refresh Tokens: Yes
   - Scope: System

**ステップ 4: Datadog でモニターをセットアップするために必要な構成値を取得する**

1. View API Clients タスクにアクセスし、API Clients for Integrations タブを選択して、以下の設定を確認します。
   - Client Grant Type: Authorization Code Grant
   - Access Token Type: Bearer
2. 以下の 4 つの値をコピーして保存してください (最初の 2 つの値はページの一番上にあります)。
   - Workday REST API Endpoint
   - Token Endpoint
   - Client ID
   - Client Secret
3. Client 関連アクションメニューから、**API Client > Manage Refresh Token for Integration** を選択します。
   - Workday Account:< ISU_Datadog >
4. **Generate New Refresh Token** チェックボックスを選択し、そのトークンを保存します。
5. Datadog インテグレーションを作成する
   - 保存した値を Datadog Configuration タブに入力します。
   - URL のドメイン部分を入力します: **https://DOMAIN/**

## リアルユーザーモニタリング

### データセキュリティ

Workday には、メトリクスは含まれません。

### ワークフローの自動化

### ヘルプ

Workday インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "workday" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://app.datadoghq.com/security/home
[2]: https://app.datadoghq.com/logs/pipelines?search=workday
[3]: https://community.workday.com/sites/default/files/file-hosting/restapi/index.html#privacy/v1/get-/activityLogging
[4]: https://github.com/DataDog/integrations-internal-core/blob/master/workday/assets/service_checks.json
[5]: https://docs.datadoghq.com/ja/help/