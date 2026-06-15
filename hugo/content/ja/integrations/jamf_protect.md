---
app_id: jamf-protect
app_uuid: a863cfe8-5ba4-45ae-923c-d273510f099c
assets:
  dashboards:
    jamf-protect-overview: assets/dashboards/jamf_protect_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10433
    source_type_name: jamf_logs
author:
  homepage: https://www.jamf.com/products/jamf-protect/
  name: Jamf Protect
  sales_email: support@jamf.com
  support_email: support@jamf.com
categories:
- security
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/jamf_protect/README.md
display_on_public_website: true
draft: false
git_integration_title: jamf_protect
integration_id: jamf-protect
integration_title: Jamf Protect
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: jamf_protect
public_title: Jamf Protect
short_description: Mac とモバイル デバイス向けのエンドポイント セキュリティおよびモバイル脅威防御 (MTD)。
supported_os:
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Mac とモバイル デバイス向けのエンドポイント セキュリティおよびモバイル脅威防御 (MTD)。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Jamf Protect
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
[Jamf Protect][1] は、macOS、iOS、iPadOS を含む Apple エンドポイントおよびその他の対応プラットフォーム向けに設計された包括的なセキュリティ ソリューションです。Jamf Protect は Apple の組み込みセキュリティ機能を強化し、悪意のあるアプリケーション、スクリプト、ユーザー アクティビティをリアルタイムで検知します。

Jamf Protect は既知のマルウェアやアドウェアを検知するだけでなく、未知の脅威を防止し、C&C トラフィックやリスク ドメインをブロックします。さらに、エンドポイント アクティビティを詳細に可視化してエンドポイントの健全性とコンプライアンスを維持し、ワークフローを自動化してインシデント レスポンスを支援します。このインテグレーションは Jamf Protect のイベント ログを収集し、Datadog で分析できるようにします。macOS Security と Jamf Security Cloud の両方の Jamf Protect ログを監視します。

## セットアップ

### 前提条件

- Datadog インテーク URL。ページ上部で Datadog Site を選択し、[Datadog API Logs ドキュメント][2] を参照してください。
- [Datadog API と App キー][3]。

### インストール

[Integrations ページ][4] に移動し、"Jamf Protect" タイルを検索します。

### macOS Security Portal
1. Jamf Protect で **Actions** をクリックします。
2.  **Create Actions** をクリックします。
3.  *Action Config Name* フィールドに名前 (例: `Datadog`) を入力します。
4.  (任意) アラートを収集する場合は **Remote Alert Collection Endpoints** をクリックし、以下を追加します。

    a. **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=alerts`

    b. **Min Severity & Max Severity** を設定します。

    c. **+ Add HTTP Header** を 2 回クリックし、次の HTTP ヘッダー フィールドを追加します。
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

5. (任意) 統合ログを収集する場合は **+ Unified Logs Collection Endpoints** をクリックし、以下を追加します。

    a. **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=unifiedlogs`

    b. **+ Add HTTP Header** を 2 回クリックし、次の HTTP ヘッダー フィールドを追加します。
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

6. (任意) テレメトリ データを収集する場合は **+ Telemetry Collection Endpoints** をクリックします。

    a.  **URL:** `https://${DATADOG_INTAKE_URL}/api/v2/logs?ddsource=jamfprotect&service=telemetry`

    b. **+ Add HTTP Header** を 2 回クリックし、次の HTTP ヘッダー フィールドを追加します。
      ```
      Name: DD-API-KEY
      Value: <API_Key>
      ```
      ```
      Name: DD-APPLICATION-KEY
      Value: <APPLICATION_KEY>
      ```

7. **Save** をクリックします。

### 設定済み Actions の適用

1. **Plans** をクリックします。
1. デバイスに割り当てられているプランを探します。
1. プラン名の隣にある **Edit** をクリックします。
1. Action Configuration* ドロップダウンから対象の Action を選択します (Datadog 設定を含む Action Config Name)。
1. **Save** をクリックします。

### (任意) Jamf Security Cloud

1.  Threat Events Stream で **Integrations** をクリックします。
2.  **Data Streams** をクリックします。
3.  **New Configuration** をクリックします。
4.  **Threat Events** を選択します。
5.  **Generic HTTP** を選択し
6.  **Continue** をクリックします。
    | **設定項目** | **詳細** |
    |--------------------------|-------------------------------------|
    | **Name**                 | Datadog (Threat)                    |
    | **Protocol**             | HTTPS                               |
    | **Server Hostname/IP**   | `${DATADOG_INTAKE_URL}`             |
    | **Port**                 | 443                                 |
    | **Endpoint**             | `api/v2/logs?ddsource=jamfprotect&` |

7.  **Create option "DD-API-KEY"** をクリックします。
    ```
    Header Value: <API_Key>
    Header Name: DD-APPLICATION-KEY
    ```
8.  **Create option "DD-APPLICATION-KEY"** をクリックします。
    ```
    Header Value: <APPLICATION_KEY>
    ```
9.  **Test Configuration** をクリックします。

10.  成功したら **Create Configuration** をクリックします。

### (任意) Network Traffic Stream

1.  **Integrations** をクリックします。
2.  **Data Streams** をクリックします。
3.  **New Configuration** をクリックします。
4.  **Threat Events** を選択します。

5. **Generic HTTP** を選択し

6.  **Continue** をクリックします。
    a. **Configuration Name:** Datadog (Threat)

    b. **Protocol:** **HTTPS**

    c. **Server Hostname/IP:** `${DATADOG_INTAKE_URL}`

    d. **Port:** **443**

    e. **Endpoint:** `api/v2/logs?ddsource=jamfprotect&service=networktraffic`

    f. **Additional Headers:**

        i.  **Header Name:** DD-API-KEY

        1.  Click **Create option "DD-API-KEY"**.

        ii.  **Header Value:** <API_Key>

           i. Header Name: DD-APPLICATION-KEY

        iv.  Click **Create option "DD-APPLICATION-KEY"**.

           i. Header Value: <APPLICATION_KEY>

7.  **Test Configuration** をクリックします。
8.  成功したら **Create Configuration** をクリックします。

### 検証

[Logs Explorer][5] で `source:jamfprotect` を検索し、ログが受信されていることを確認します。

## 収集されるデータ

### ログ

Jamf Protect インテグレーションを使用すると、[Jamf 監査ログ][6] を Datadog に送信できます。

### メトリクス

Jamf Protect にはメトリクスは含まれていません。

### サービスチェック

Jamf Protect にはサービス チェックは含まれていません。

### イベント

Jamf Protect にはイベントは含まれていません。

## トラブルシューティング

お困りの場合は [Datadog サポート][7] までお問い合わせください。

## 参考情報

その他の有用なドキュメント、リンク、記事:

[Jamf ドキュメント Datadog と Jamf Protect の統合][8]

[1]: https://www.jamf.com/products/jamf-protect/
[2]: https://docs.datadoghq.com/ja/api/latest/logs/#send-logs
[3]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/logs
[6]: https://learn.jamf.com/bundle/jamf-protect-documentation/page/Audit_Logs.html
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://learn.jamf.com/en-US/bundle/jamf-protect-documentation/page/SecurityIntegration_Datadog.html