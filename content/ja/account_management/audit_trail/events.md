---
title: Audit Trail Events
aliases:
    - /account_management/audit_trail_events/
further_reading:
- link: /account_management/audit_trail/
  tag: Documentation
  text: Learn more about Audit Trail
---

## 概要

[Datadog 監査証跡][1]は、Datadog プラットフォーム全体から 100 種類以上の監査イベントを記録します。これらの監査イベントは、イベント名として異なる製品カテゴリに分類されます。

#### プラットフォームイベント
- [アクセス管理](#access-management-events)
- [Agent](#agent)
- [API リクエスト](#api-request-events)
- [認証](#authentication-events)
- [ダッシュボード](#dashboard-events)
- [インテグレーション](#integration-events)
- [モニター](#monitor-events)
- [ノートブック](#notebook-events)
- [OAuth](#oauth-events)
- [組織管理](#organization-management-events)
- [セキュリティ通知](#security-notification-events)
- [Teams management](#teams-management-events)

#### 製品別イベント
- [Application Performance Monitoring (APM)](#application-performance-monitoring-apm-events)
- [Application Security Management (ASM)](#application-security-management)
- [監査証跡](#audit-trail-events)
- [CI Visibility](#ci-visibility-events)
- [クラウドセキュリティプラットフォーム](#cloud-security-platform-events)
- [Dynamic Instrumentation](#dynamic-instrumentation-events)
- [Error Tracking](#error-tracking-events)
- [ログ管理](#log-management-events)
- [メトリクス](#metrics-events)
- [リアルユーザーモニタリング](#real-user-monitoring-events)
- [機密データスキャナー](#sensitive-data-scanner-events)
- [サービスレベル目標](#service-level-objectives-slo-events)
- [Synthetic モニタリング](#synthetic-monitoring-events)
- [リファレンステーブル](#reference-table-events)
- [ワークフロー](#workflow-events)


監査証跡の設定と構成については、[監査証跡ドキュメント][2]を参照してください。

## 監査イベント

### アクセス管理イベント

| 名前        | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [アプリケーションキー][3] (サービスアカウントユーザー) | ユーザーがサービスアカウントユーザーのアプリケーションキーを作成、変更、または削除した。 | `@evt.name:"Access Management" @asset.type:application_key` |
| [認証方法][4] (組織) | ユーザーが組織で許可される認証方法を変更し、前と後の値がどうなったか。 | `@evt.name:"Access Management" @asset.type:identity_provider` |
| [メール][5]       | Datadog アカウントのユーザーとして、メールアドレスが追加、無効化、または検証された。 | `@evt.name:"Access Management" @asset.type:user` |
| [ロールの変更][6]  | ロールが変更され、以前の権限と新しい権限がどうなったか。 | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [ロールの作成または削除][7] | 組織内でロールが作成または削除された。 | `@evt.name:"Access Management" @asset.type:role @action:(created OR deleted)` |
| [ロールアクセスリクエスト][8] | ユーザーが、ロールに対するアクセスリクエストを作成、応答、または削除し、そのアクセスリクエストの値。 | `@evt.name:"Access Management" @asset.type:role_request` |
| [ユーザーのロール][6] | ユーザーが組織内のロールに追加または削除された。 | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| [パスワード][9] | A user modified or reset their password in the org. Password reset events are delivered to all orgs that user is active in, even if the org does not have password authentication configured. | `@evt.name:"Access Management" @asset.type:password @action:modified` |
| [Restriction policy][10] | リソースの制限ポリシーが変更されました。 | `@evt.name:"Access Management" @asset.type:restriction_policy @action:(modified OR deleted)` |
| [Email update (Support)][11] | A user's email was updated by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:user @action:modified` |
| [User invite (Support)][12] | A user was invited to the org by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:user @action:created` |
| [User's role (Support)][100] | A user was added or deleted from a role in the org by Datadog Support. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:role @action:modified` |
| [Role modified (Support)][101] | A role was modified by Datadog Support, and what the previous and new permissions are. | `@evt.name:"Access Management" @evt.actor.type:SUPPORT_USER @asset.type:role @action:modified` |

### Agent

| 名前                                    | 監査イベントの説明                          | 監査エクスプローラーのクエリ                                             |
|-----------------------------------------| --------------------------------------------------  | ------------------------------------------------------------------- |
| [Agent enabled][13]                    | A new Datadog Agent was enabled.                    | `@evt.name:"Datadog Agent" @action:created`                         |
| [Agent flare created][14]               | Datadog Agent flare is created for support tickets. | `@evt.name:"Datadog Agent" @action:created @asset.type:agent_flare` |
| [Agent configuration updated][15]      | A Datadog Agent configuration was updated.          | `@evt.name:"Datadog Agent" @action:modified`                        |


### API リクエストイベント

| 名前  | 監査イベントの説明                          | 監査エクスプローラーのクエリ              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [API Request][16] | Datadog プラットフォーム上で API リクエストが行われた。 | `@evt.name:Request @action:accessed` |

### Application Performance Monitoring (APM) イベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Retention filter][17] | A user created, modified, or deleted a [retention filter][18] and the previous and/or new values for the retention filter configuration. | `@evt.name:APM @asset.type:retention_filter` |
| [Span-based metric][19] | A user created, modified, or deleted a [span-based metric][20] and the previous and/or new values for the metric configuration. | `@evt.name:APM @asset.type:custom_metrics` |
| [ファセット][21] | A user created, modified, or deleted a [facet][22] and the previous and/or new values for the facet configuration. | `@evt.name:APM @asset.type:facet` |
| [Primary operation name][23] | A user created, modified, or deleted the [primary operation name][24] of a service and the previous and/or new values for the configuration. | `@evt.name:APM @asset.type:service_operation_name` |
| [Second Primary tag][25] | A user added, modified, or deleted the [second primary tag][26] and the previous and/or new values for the configuration.  | `@evt.name:APM @asset.type:second_primary_tag` |
| [Sampling rates remotely configured][27] | ユーザーがリモートで APM のサンプリングレートを構成した。  | `@evt.name:APM @asset.type:samplerconfig` |

### Application Security Management

{{% audit-trail-asm %}}

### 監査証跡イベント

| 名前  | 監査イベントの説明                          | 監査エクスプローラーのクエリ              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [Download as CSV][28] | ユーザーが監査イベントのリストを CSV でエクスポートする | `@evt.name:Audit Trail @asset.type:audit_events_csv` |

### 認証イベント

| 名前                    | 監査イベントの説明                                                                    | 監査エクスプローラーのクエリ                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [API key][29] (Org settings)         | API キーが、組織設定ページでアクセス、一覧化、作成、または削除された。        | `@evt.name:Authentication @asset.type:api_key`          |
| [Application key][30] (Org settings) | アプリケーションキーが、組織設定ページでアクセス、一覧化、作成、または削除された。| `@evt.name:Authentication @asset.type:application_key`  |
| [Public API key][31] (Org settings)  | 公開 API キーが、組織設定ページでアクセス、一覧化、作成、または削除された。  | `@evt.name:Authentication @asset.type:public_api_key`   |
| [User login][32]                     | ユーザーが Datadog にログインし、使用された認証方法。                                  | `@evt.name:Authentication @action:login`                |

### CI Visibility イベント
| 名前                            | 監査イベントの説明                                   | 監査エクスプローラーのクエリ                                                                                               |
|---------------------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| [Repository default branch][33] | ユーザーがリポジトリのデフォルトブランチを変更した。          | `@evt.name:"CI Visibility" @asset.type:ci_app_repository @action:modified`                                            |
| [Test service settings][34]     | ユーザーがテストサービスの設定を作成または変更した。   | `@evt.name:"CI Visibility" @asset.type:ci_app_test_service_settings (@action:created OR @action:modified)`            |
| [GitHub account settings][35]   | ユーザーが GitHub アカウント設定を変更した。             | `@evt.name:"CI Visibility" @asset.type:github_opt_ins (@action:modified OR @action:deleted)`                          |
| [Exclusion filters][36]         | 除外フィルターが変更された。                    | `@evt.name:"CI Visibility" @asset.type:ci_app_exclusion_filters @action:modified`                                     |
| [Quality gates rule][37]        | ユーザーが Quality Gates ルールを作成、修正、または削除した。 | `@evt.name:"CI Visibility" @asset.type:ci_app_quality_gates (@action:created OR @action:modified OR @action:deleted)` |

### クラウドセキュリティプラットフォームのイベント

{{% audit-trail-security-platform %}}

### ダッシュボードイベント

| 名前               | 監査イベントの説明                                                                        | 監査エクスプローラーのクエリ                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [Dashboard created][38] | ダッシュボードが作成され、そのダッシュボードの新しい JSON 値。                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [Dashboard deleted][39] | ダッシュボードが削除され、そのダッシュボードの前の JSON 値。                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| [Dashboard embedded][40] (Roadie) | A Datadog dashboard is [embedded into a third party][41] and a user views the dashboard.                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [Dashboard modified][42] | ダッシュボードが変更され、そのダッシュボードの前の JSON 値と新しい JSON 値。                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [Dashboard user(s) added][43] | ユーザーがダッシュボードにアクセスできるユーザー ID を追加し、新規ユーザー ID の一覧。                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| [Dashboard user(s) deleted][44] | ユーザーがダッシュボードにアクセスできるユーザー ID を削除し、削除されたユーザー ID の一覧。       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| [Public URL accessed][45] | 公開されているダッシュボードの URL がアクセスされた。                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|[Public URL generated or deleted][46]  | ダッシュボードを閲覧するための公開 URL が生成または削除された。                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### Dynamic Instrumentation events

| 名前     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Logs Probe][47] | A user has successfully created, modified or deleted a logs probe with Dynamic Instrumentation. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:log_probe` |
| [Metrics Probe][48] | A user has successfully created, modified or deleted a metrics probe with Dynamic Instrumentation. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:span_probe` |
| [Spans Probe][49] | A user has successfully created, modified or deleted a spans probe with Dynamic Instrumentation. | `@evt.name:"Dynamic Instrumentation" @action:(created OR modified OR deleted) @asset.type:metric_probe` |

### Error Tracking events

| 名前     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Error Tracking for Logs activation][50] | A user has enabled or disabled Error Tracking for Logs product. | `@evt.name:"Error Tracking" @action:(created OR deleted) @asset.type:error_tracking_logs` |
| [Create or Modify inclusion filter][51] | A user has added or modified an inclusion filter. | `@evt.name:"Error Tracking" @asset.type:error_tracking_inclusion_filter` |

### インテグレーションイベント

| 名前     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Resource][52] | インテグレーションにリソース (チャンネル、サービス、Webhook、アカウント、インスタンスなど) が追加、変更、削除されたとき、およびその構成の以前の値と新しい値。 | `@evt.name:Integration @asset.type:integration` |

### ログ管理イベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Archive configuration][53] | ユーザーがアーカイブの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:archive` |
| [Custom metric][54] | ユーザーがログのカスタムメトリクスを作成、変更、または削除し、そのカスタムメトリクスの構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [Exclusion filter configuration][55] | ユーザーが除外フィルターの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [Facet][56] | ユーザーがログエクスプローラーでファセットを作成、変更、または削除し、そのファセット構成の以前の値と新しい値。| `@evt.name:"Log Management" @asset.type:facet` |
| [Historical view][57] | ユーザーがログの履歴ビューを作成、変更、中止、または削除し、その履歴ビューの構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:historical_view` |
| [Index configuration][58] | ユーザーがインデックスの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:index` |
| [Log pipeline][59] | ユーザーがログパイプラインまたはネストされたパイプラインを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:pipeline` |
| [Processor][60] | ユーザーがパイプライン内のプロセッサーを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [Query][61] (Public Beta)| ユーザーがログエクスプローラー、ダッシュボード、または公開 API を介してログ管理リストクエリを実行した。 | `@evt.name:"Log Management" @asset.type:logs_query` |
| [Restriction query configuration][62] | ユーザーがログの制限クエリの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [Standard attribute configuration][63] | ユーザーがログの標準属性の構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:standard_attribute` |
| [Download as CSV][64] | ユーザーがログのリストを CSV でエクスポートする | `@evt.name:"Log Management" @asset.type:logs_csv` |

### メトリクスイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [Custom metric created][65] | ユーザーがカスタムメトリクスを作成し、そのカスタムメトリクス構成の新しい値。 | `@evt.name:Metrics @asset.type:metric @action:created` |
| [Custom metric deleted][66] | ユーザーがカスタムメトリクスを削除し、そのカスタムメトリクス構成の以前の値。 | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| [Custom metric modified][67] | ユーザーがカスタムメトリクスを変更し、そのカスタムメトリクス構成の以前の値と新しい値。 | `@evt.name:Metrics @asset.type:metric @action:modified` |

### モニターイベント

| 名前             | 監査イベントの説明                                           | 監査エクスプローラーのクエリ                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [Monitor created][68]  | モニターが作成され、そのモニターの新しい JSON 値。                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [Monitor deleted][69]  | モニターが削除され、そのモニターの前の JSON 値。           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [Monitor modified][70] | モニターが変更され、そのモニターの前の JSON 値と新しい JSON 値。 | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [Monitor resolved][71] | モニターが解決された。                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### ノートブックイベント

| 名前              | 監査イベントの説明                                            | 監査エクスプローラーのクエリ                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [Notebook created][72]  | ノートブックが作成され、そのノートブックの新しい JSON 値。                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [Notebook deleted][73]  | ノートブックが削除され、そのノートブックの前の JSON 値。           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| [Notebook modified][74] | ノートブックが変更され、そのノートブックの前の JSON 値と新しい JSON 値。 | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth イベント

| 名前         | 監査イベントの説明                                                                    | 監査エクスプローラーのクエリ                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| [OAuth client][75] | ユーザーが OAuth クライアントを作成、変更、または削除し、その OAuth クライアントの以前の値と新しい値。 | `@evt.name:OAuth @asset.type:oauth_client` |

### 組織管理イベント

| 名前                 | 監査イベントの説明                                                       | 監査エクスプローラーのクエリ                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Audit Trail settings][76] | ユーザーが監査証跡設定を変更し、変更前と変更後の設定内容。 | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |
| [Child org created][77] | ユーザーが既存の Datadog 組織に新しい子組織を作成した。 | `@evt.name:"Organization Management" @asset.type:organization @action:created` |

### リアルユーザーモニタリングイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [RUM application created][78] | ユーザーが RUM でアプリケーションを作成または削除し、そのアプリケーションの種類 (Browser、Flutter、iOS、React Native、Android)。 | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| [RUM application modified][79] | ユーザーが RUM でアプリケーションを変更し、そのアプリケーションの新しい値、およびアプリケーションの種類 (Browser、Flutter、iOS、React Native、Android)。 | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:modified` |
| [Session replay viewed][80] | A user viewed a session replay. | `@evt.name:"Real User Monitoring" @asset.type:session_replay @action:accessed` |

### セキュリティ通知イベント
| 名前                 | 監査イベントの説明                                                       | 監査エクスプローラーのクエリ                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [Token leaked][81] | Datadog は、失効させるべき Datadog API またはアプリケーションキーのリークを検出しました。| `@evt.name:"Security Notification" @asset.type:(api_key OR application_key) @action:notification` |
| [Login method override][82] | Datadog は、組織に設定されたデフォルトのログイン方法とは異なる、ユーザーのログイン方法のオーバーライドを検出しました。| `@evt.name:"Security Notification" @asset.type:user @action:notification` |
| [Unusual login][83] | Datadog が異常なログインイベントを検出した。| `@evt.name:"Security Notification" @asset.type:unusual_login @action:notification` |
| [User invited with throwaway email][102] | Datadog has detected that a user with an email from a free or disposable email provider was invited to the organization.| `@evt.name:"Security Notification" @asset.type:user_invite @action:notification` |

### 機密データスキャナーイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [Scanning group][84] | ユーザーが機密データスキャナーのスキャングループを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [Scanning rule][85] | ユーザーが機密データスキャナーのスキャングループ内のスキャンルールを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### サービスレベル目標 (SLO) イベント

| 名前          | 監査イベントの説明                                                                       | 監査エクスプローラーのクエリ                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][86]           | ユーザーが SLO を作成、変更、または削除し、その SLO の以前の値と新しい値。| `@evt.name:SLO @asset.type:slo`            |
| [SLO correction][87]| ユーザーが SLO 補正を作成、変更、または削除し、その SLO 補正の以前の値と新しい値。 | `@evt.name:SLO @asset.type:slo_correction` |


### Synthetic モニタリングイベント
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Private location][88] | ユーザーが Synthetic テスト用のプライベートロケーションを作成または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [Synthetic test created or deleted][89] | ユーザーが Synthetic テストを作成または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [Synthetic test modified][90] | ユーザーが Synthetic テストを修正し、その構成の以前の値と新しい値。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [Synthetic variable][91] | ユーザーが Synthetic 変数を作成、変更、または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| [Synthetic settings][92] | ユーザーが Synthetic 設定 (クォータ、PL アクセス) を変更し、変更前と変更後の設定値。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### リファレンステーブルのイベント
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Reference Table][93] | ユーザーがリファレンステーブルを作成、削除、または変更した。 | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [Reference Table File][94] | ユーザーがクラウドプロバイダーにファイルをアップロードまたはインポートして、リファレンステーブルを作成した。 | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |                                                      |

### Teams Management events
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Teams Management][95] | A user created, deleted, or modified a team or team association. | `@evt.name:"Teams Management" @action:(created OR deleted OR modified)` |

### ワークフローイベント
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [Workflow][96] | ユーザーがワークフローを作成、削除、修正した、またはワークフローが実行された。 | `@evt.name:"Workflows" @asset.type:workflow @action:(created OR deleted OR modified OR executed)` |
| [Workflow Schedule][97] | ユーザーがワークフローのスケジュールを作成、削除、または変更した。 | `@evt.name:"Workflows" @asset.type:workflow_schedule @action:(created OR deleted OR modified)` |
| [Workflow Action][98] | ワークフローの実行中に、ユーザーが Slack のプロンプトに応答した。 | `@evt.name:"Workflows" @asset.type:workflow_action @action:(responded)` |
| [Custom Connection][99] | ユーザが接続を作成、削除、または変更した。 | `@evt.name:"Custom Connections" @asset.type:custom_connection @action:(created OR deleted OR modified)` |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /account_management/audit_trail/
[3]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aapplication_key
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aidentity_provider
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Auser
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3Amodified
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3A%28created%20OR%20deleted%29
[8]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole_request
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Apassword%20%40action%3Amodified
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arestriction_policy
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Auser%20%40action%3Amodified%20
[12]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Auser%20%40action%3Acreated%20
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40action%3Acreated%20
[14]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40asset.type%3Aagent_flare%20%40action%3Acreated
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Datadog%20Agent%22%20%40action%3Amodified%20
[16]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aretention_filter
[18]: /tracing/trace_pipeline/trace_retention/#retention-filters
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Acustom_metrics
[20]: /tracing/trace_pipeline/generate_metrics/
[21]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Afacet
[22]: /tracing/trace_explorer/facets/
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aservice_operation_name
[24]: /tracing/guide/configuring-primary-operation/
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Asecond_primary_tag
[26]: /tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40asset.type%3Asamplerconfig
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Audit%20Trail%22%20%40asset.type%3Aaudit_events_csv
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_repository%20%40action%3Amodified
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_test_service_settings%20%28%40action%3Acreated%20OR%20%40action%3Amodified%29
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Agithub_opt_ins%20%28%40action%3Amodified%20OR%20%40action%3Adeleted%29
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_exclusion_filters%20%40action%3Amodified
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI%20Visibility%22%20%40asset.type%3Aci_app_quality_gates%20%28%40action%3Acreated%20OR%20%40action%3Amodified%20OR%20%40action%3Adeleted%29
[38]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[39]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[41]: https://roadie.io/docs/integrations/datadog/
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[43]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[45]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[47]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Alog_probe
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Ametric_probe
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Dynamic%20Instrumentation%22%20%40asset.type%3Aspan_probe
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Error%20Tracking%22%20%40asset.type%3Aerror_tracking_logs%20%40action%3A%28created%20OR%20deleted%29
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Error%20Tracking%22%20%40asset.type%3Aerror_tracking_inclusion_filter
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_query
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_csv
[65]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[66]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[67]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[68]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[69]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[70]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[71]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[72]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[73]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[74]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[75]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[76]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[77]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization%20Management%22%20%40asset.type%3Aorganization%20%40action%3Acreated
[78]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[79]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[80]: https://app.datadoghq.com/audit-trail?query=%40asset.type%3Asession_replay%20%40evt.name%3A%22Real%20User%20Monitoring%22%20%40action%3Aaccessed%20
[81]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40asset.type%3A%28api_key%20OR%20application_key%29
[82]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser
[83]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Aunusual_login
[84]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[85]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[86]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[87]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[88]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[89]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[90]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[91]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[92]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[93]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[94]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28uploaded%20OR%20imported%29
[95]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Teams%20Management%22%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[96]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow%20%40action%3A%28modified%20OR%20created%20OR%20deleted%20OR%20executed%29
[97]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_schedule%20%40action%3A%28modified%20OR%20created%20OR%20deleted%29
[98]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AWorkflows%20%40asset.type%3Aworkflow_action%20%40action%3Aresponded
[99]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Custom%20Connections%22%20%40asset.type%3Acustom_connection
[100]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Arole%20%40action%3Amodified%20
[101]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40evt.actor.type%3ASUPPORT_USER%20%40asset.type%3Arole%20%40action%3Amodified%20
[102]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser_invite
