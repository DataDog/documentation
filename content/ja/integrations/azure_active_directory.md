---
assets:
  dashboards: {}
  logs:
    source: azure.active_directory
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - azure
  - ログの収集
  - セキュリティ
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/azure_active_directory/README.md
display_name: Azure Active Directory
draft: false
git_integration_title: azure_active_directory
guid: 1f6dbea8-db4a-4b0e-bfe8-f69efb3e877b
integration_id: azure-active-directory
integration_title: Azure Active Directory
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: azure_active_directory.
metric_to_check: ''
name: azure_active_directory
public_title: Datadog-Azure Active Directory インテグレーション
short_description: Azure Active Directory アクティビティログを分析
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Azure Active Directory は、Microsoft Azure によるクラウドホスト型 Active Directory 製品です。
このインテグレーションにより、[Azure AD アクティビティログ][1] (監査ログとサインインログ) を Datadog に取り込むことができます。

## セットアップ

### インストール

このインテグレーションにより、 Azure Event Hubs を使用してログが Datadog に転送されます。アクティビティログをイベントハブに転送するように Azure AD を構成します。

### コンフィギュレーション

1. [ログ収集のドキュメント][2]に従い、Event Hubs 使用して Azure から Datadog へのログ転送パイプラインを設定します。

2. Azure ポータルで、 _Azure Active Directory > Monitoring > Audit logs_ を選択します。

3. **Export Settings** を選択します。

4. 診断設定ペインで、以下を実行します。

   - 既存の設定を変更するには、**Edit setting** を選択します。
   - 新しい設定を追加するには、**Add diagnostics setting** を選択します。最大3つまで設定できます。

5. **Stream to an event hub** チェックボックスを選択してから、**Event Hub/Configure** を選択します。

6. ログを送信するために作成した Azure サブスクリプションと Event Hubs ネームスペースを選択します。

7. OK を選択してイベントハブコンフィギュレーションを終了します。

8. 以下のいずれかまたは両方を実行します。Datadog では両方選択することを推奨します。

   - 監査ログを送信するには、**AuditLogs** チェックボックスを選択します。
   - サインインログを送信するには、**SignInLogs** チェックボックスを選択します。

9. **Save** を選択します。

15 分以内に Datadog はログを受け取り始めます。
セットアップに関する詳細は、[Azure チュートリアル][3]を参照してください。

## 収集データ

#### ログの収集

このインテグレーションにより、Azure Active Directory アクティビティログのログ取り込みを設定できます。

これには以下が含まれます。

   - Sign-ins - 管理対象のアプリケーションおよびユーザーのサインインアクティビティの使用状況に関する情報を提供します。

   - Audit logs - Azure AD 内のさまざまな機能が行った変更のログを介してトレーサビリティを提供します。

### メトリクス

Azure Active Directory には、メトリクスは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/overview-reports#activity-reports
[2]: https://docs.datadoghq.com/ja/integrations/azure/?tab=eventhub#log-collection
[3]: https://docs.microsoft.com/en-us/azure/active-directory/reports-monitoring/tutorial-azure-monitor-stream-logs-to-event-hub
[4]: https://docs.datadoghq.com/ja/help