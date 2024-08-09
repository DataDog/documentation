---
aliases:
- /ja/account_management/audit_trail_events/
further_reading:
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: 監査証跡について
title: 監査証跡イベント
---

## 概要

[Datadog 監査証跡][1]は、Datadog プラットフォーム全体から 100 種類以上の監査イベントを記録します。これらの監査イベントは、イベント名として異なる製品カテゴリに分類されます。

#### プラットフォームイベント
- [アクセス管理](#access-management-events)
- [API リクエスト](#api-request-events)
- [認証](#authentication-events)
- [ダッシュボード](#dashboard-events)
- [インテグレーション](#integration-events)
- [モニター](#monitor-events)
- [ノートブック](#notebook-events)
- [OAuth](#oauth-events)
- [組織管理](#organization-management-events)
- [セキュリティ通知](#security-notification-events)

#### 製品別イベント
- [Application Performance Monitoring (APM)](#application-performance-monitoring-apm-events)
- [Application Security Management (ASM)](#application-security-management)
- [監査証跡](#audit-trail-events)
- [CI Visibility](#ci-visibility-events)
- [クラウドセキュリティプラットフォーム](#cloud-security-platform-events)
- [ログ管理](#log-management-events)
- [メトリクス](#metrics-events)
- [リアルユーザーモニタリング](#real-user-monitoring-events)
- [機密データスキャナー](#sensitive-data-scanner-events)
- [サービスレベル目標](#service-level-objectives-slo-events)
- [Synthetic モニタリング](#synthetic-monitoring-events)
- [リファレンステーブル](#reference-table-events)


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
| [パスワード][9] | 組織でユーザーがパスワードを変更した。 | `@evt.name:"Access Management" @asset.type:password @action:modified` |
| [制限ポリシー][86] | リソースの制限ポリシーが変更されました。 | `@evt.name:"Access Management" @asset.type:restriction_policy @action:(modified OR deleted)` |

### API リクエストイベント

| 名前  | 監査イベントの説明                          | 監査エクスプローラーのクエリ              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [API リクエスト][10] | Datadog プラットフォーム上で API リクエストが行われた。 | `@evt.name:Request @action:accessed` |

### Application Performance Monitoring (APM) イベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [保持フィルター][11] | ユーザーが[保持フィルター][12]を作成、変更、または削除し、その保持フィルターの構成の以前の値および/または新しい値。 | `@evt.name:APM @asset.type:retention_filter` |
| [スパンベースメトリクス][13] | ユーザーが[スパンベースメトリクス][14]を作成、変更、または削除し、そのメトリクスの構成の以前の値および/または新しい値。 | `@evt.name:APM @asset.type:custom_metrics` |
| [ファセット][15] | ユーザーが[ファセット][16]を作成、変更、または削除し、そのファセットの構成の以前の値および/または新しい値。 | `@evt.name:APM @asset.type:facet` |
| [プライマリオペレーション名][17] | ユーザーがサービスの[プライマリオペレーション名][18]を作成、変更、または削除し、その構成の以前の値および/または新しい値。 | `@evt.name:APM @asset.type:service_operation_name` |
| [セカンドプライマリタグ][19] | ユーザーが[セカンドプライマリタグ][20]を追加、変更、または削除し、その構成の以前の値および/または新しい値。  | `@evt.name:APM @asset.type:second_primary_tag` |
| [リモート構成されたサンプリングレート][21] | ユーザーがリモートで APM のサンプリングレートを構成した。  | `@evt.name:APM @asset.type:samplerconfig` |

### Application Security Management

| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [1 クリックアクティベーション][24] | ユーザーがサービス上で ASM をアクティブまたは非アクティブにした。 | `@evt.name:"Application Security" @asset.type:compatible_services` |
| [保護][23] | ユーザーが ASM 保護を有効または無効にした。 | `@evt.name:"Application Security" @asset.type:blocking_configuration` |
| [Denylist][22] | ユーザーが IP アドレスまたはユーザー ID のブロック、ブロック解除、ブロック期間の延長を行った。 | `@evt.name:"Application Security" @asset.type:ip_user_denylist` |
| [パスリスト][81] | ユーザーがパスリストにエントリーを追加、修正、または削除した。 | `@evt.name:"Application Security" @asset.type:passlist_entry` |
| [アプリ内 WAF ポリシー][82] | ユーザーがアプリ内 WAF ポリシーを作成、修正、または削除した。 | `@evt.name:"Application Security" @asset.type:policy_entry` |
| [アプリ内 WAF カスタムルール][83] | ユーザーがアプリ内 WAF カスタムルールを作成、修正、または削除した。 | `@evt.name:"Application Security" @asset.type:waf_custom_rule` |

### 監査証跡イベント

| 名前  | 監査イベントの説明                          | 監査エクスプローラーのクエリ              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [CSV でダウンロード][25] | ユーザーが監査イベントのリストを CSV でエクスポートする | `@evt.name:Audit Trail @asset.type:audit_events_csv` |

### 認証イベント

| 名前                    | 監査イベントの説明                                                                    | 監査エクスプローラーのクエリ                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [API キー][26] (組織設定)         | API キーが、組織設定ページでアクセス、一覧化、作成、または削除された。        | `@evt.name:Authentication @asset.type:api_key`          |
| [アプリケーションキー][27] (組織設定) | アプリケーションキーが、組織設定ページでアクセス、一覧化、作成、または削除された。| `@evt.name:Authentication @asset.type:application_key`  |
| [公開 API キー][28] (組織設定)  | 公開 API キーが、組織設定ページでアクセス、一覧化、作成、または削除された。  | `@evt.name:Authentication @asset.type:public_api_key`   |
| [ユーザーログイン][29]                     | ユーザーが Datadog にログインし、使用された認証方法。                                  | `@evt.name:Authentication @action:login`                |

### CI Visibility イベント
| 名前                            | 監査イベントの説明                                                                             | 監査エクスプローラーのクエリ                                                                          |
|---------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [リポジトリデフォルトブランチ][30] | ユーザーがリポジトリのデフォルトブランチを変更し、そのデフォルトブランチの以前の値と新しい値。 | `@evt.name:"CI Visibility" @asset.type:ci_app_repository`   

### クラウドセキュリティプラットフォームのイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [CWS Agent ルール][31] | ユーザーがクラウドセキュリティプラットフォーム内の CWS Agent ルールにアクセス (フェッチ) した。| `@evt.name:"Cloud Security Platform" @asset.type:cws_agent_rule @action:accessed` |
| [通知プロファイル][32] | ユーザーがクラウドセキュリティプラットフォームで通知プロファイルを作成、更新、または削除した。 | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile` |
| [セキュリティルール][33] | ユーザーがセキュリティルールを更新、削除、または作成し、そのルールの以前の値と新しい値。 | `@evt.name:"Cloud Security Platform" @asset.type:security_rule` |
| [セキュリティシグナル][34] | ユーザーがシグナルの状態を変更したり、シグナルの割り当てを行い、そのシグナルの前の値と新しい値。 | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |

### ダッシュボードイベント

| 名前               | 監査イベントの説明                                                                        | 監査エクスプローラーのクエリ                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [ダッシュボードの作成][35] | ダッシュボードが作成され、そのダッシュボードの新しい JSON 値。                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [ダッシュボードの削除][36] | ダッシュボードが削除され、そのダッシュボードの前の JSON 値。                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| [ダッシュボードの埋め込み][37] (Roadie) | Datadog のダッシュボードが[サードパーティに埋め込まれ][38]、ユーザーがダッシュボードを閲覧した。                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [ダッシュボードの変更][39] | ダッシュボードが変更され、そのダッシュボードの前の JSON 値と新しい JSON 値。                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [ダッシュボードユーザーの追加][40] | ユーザーがダッシュボードにアクセスできるユーザー ID を追加し、新規ユーザー ID の一覧。                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| [ダッシュボードユーザーの削除][41] | ユーザーがダッシュボードにアクセスできるユーザー ID を削除し、削除されたユーザー ID の一覧。       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| [公開 URL のアクセス][42] | 公開されているダッシュボードの URL がアクセスされた。                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|[公開 URL の生成または削除][43]  | ダッシュボードを閲覧するための公開 URL が生成または削除された。                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### インテグレーションイベント

| 名前     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [リソース][44] | インテグレーションにリソース (チャンネル、サービス、Webhook、アカウント、インスタンスなど) が追加、変更、削除されたとき、およびその構成の以前の値と新しい値。 | `@evt.name:Integration @asset.type:integration` |

### ログ管理イベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [アーカイブ構成][45] | ユーザーがアーカイブの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:archive` |
| [カスタムメトリクス][46] | ユーザーがログのカスタムメトリクスを作成、変更、または削除し、そのカスタムメトリクスの構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [除外フィルターの構成][47] | ユーザーが除外フィルターの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [ファセット][48] | ユーザーがログエクスプローラーでファセットを作成、変更、または削除し、そのファセット構成の以前の値と新しい値。| `@evt.name:"Log Management" @asset.type:facet` |
| [履歴ビュー][49] | ユーザーがログの履歴ビューを作成、変更、中止、または削除し、その履歴ビューの構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:historical_view` |
| [インデックス構成][50] | ユーザーがインデックスの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:index` |
| [ログパイプライン][51] | ユーザーがログパイプラインまたはネストされたパイプラインを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:pipeline` |
| [プロセッサー][52] | ユーザーがパイプライン内のプロセッサーを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [制限クエリの構成][53] | ユーザーがログの制限クエリの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [標準属性の構成][54] | ユーザーがログの標準属性の構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:standard_attribute` |
| [CSV でダウンロード][55] | ユーザーがログのリストを CSV でエクスポートする | `@evt.name:"Log Management" @asset.type:logs_csv` |

### メトリクスイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [カスタムメトリクスの作成][56] | ユーザーがカスタムメトリクスを作成し、そのカスタムメトリクス構成の新しい値。 | `@evt.name:Metrics @asset.type:metric @action:created` |
| [カスタムメトリクスの削除][57] | ユーザーがカスタムメトリクスを削除し、そのカスタムメトリクス構成の以前の値。 | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| [カスタムメトリクスの変更][58] | ユーザーがカスタムメトリクスを変更し、そのカスタムメトリクス構成の以前の値と新しい値。 | `@evt.name:Metrics @asset.type:metric @action:modified` |

### モニターイベント

| 名前             | 監査イベントの説明                                           | 監査エクスプローラーのクエリ                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [モニターの作成][59]  | モニターが作成され、そのモニターの新しい JSON 値。                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [モニターの削除][60]  | モニターが削除され、そのモニターの前の JSON 値。           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [モニターの変更][61] | モニターが変更され、そのモニターの前の JSON 値と新しい JSON 値。 | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [モニターの解決][62] | モニターが解決された。                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### ノートブックイベント

| 名前              | 監査イベントの説明                                            | 監査エクスプローラーのクエリ                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [ノートブックの作成][63]  | ノートブックが作成され、そのノートブックの新しい JSON 値。                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [ノートブックの削除][64]  | ノートブックが削除され、そのノートブックの前の JSON 値。           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| [ノートブックの変更][65] | ノートブックが変更され、そのノートブックの前の JSON 値と新しい JSON 値。 | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth イベント

| 名前         | 監査イベントの説明                                                                    | 監査エクスプローラーのクエリ                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| [OAuth クライアント][66] | ユーザーが OAuth クライアントを作成、変更、または削除し、その OAuth クライアントの以前の値と新しい値。 | `@evt.name:OAuth @asset.type:oauth_client` |

### 組織管理イベント

| 名前                 | 監査イベントの説明                                                       | 監査エクスプローラーのクエリ                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [監査証跡設定][67] | ユーザーが監査証跡設定を変更し、変更前と変更後の設定内容。 | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |

### リアルユーザーモニタリングイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [RUM アプリケーションの作成][68] | ユーザーが RUM でアプリケーションを作成または削除し、そのアプリケーションの種類 (Browser、Flutter、IOS、React Native、Android)。 | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| [RUM アプリケーションの変更][69] | ユーザーが RUM でアプリケーションを変更し、そのアプリケーションの新しい値、およびアプリケーションの種類 (Browser、Flutter、IOS、React Native、Android)。 | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:modified` |

### セキュリティ通知イベント
| 名前                 | 監査イベントの説明                                                       | 監査エクスプローラーのクエリ                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [トークンリーク][80］ | Datadog は、失効させるべき Datadog API またはアプリケーションキーのリークを検出しました。| `@evt.name:"Security Notification" @asset.type:(api_key OR application_key) @action:notification` |
| [ログイン方法のオーバーライド][85] | Datadog は、組織に設定されたデフォルトのログイン方法とは異なる、ユーザーのログイン方法のオーバーライドを検出しました。| `@evt.name:"Security Notification" @asset.type:user @action:notification` |
| [異常なログイン][84] | Datadog は、異常なログインイベントを検出しました。| `@evt.name:"Security Notification" @asset.type:unusual_login @action:notification` |

### 機密データスキャナーイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [スキャングループ][70] | ユーザーが機密データスキャナーのスキャングループを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [スキャンルール][71] | ユーザーが機密データスキャナーのスキャングループ内のスキャンルールを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### サービスレベル目標 (SLO) イベント

| 名前          | 監査イベントの説明                                                                       | 監査エクスプローラーのクエリ                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][72]           | ユーザーが SLO を作成、変更、または削除し、その SLO の以前の値と新しい値。| `@evt.name:SLO @asset.type:slo`            |
| [SLO 補正][73]| ユーザーが SLO 補正を作成、変更、または削除し、その SLO 補正の以前の値と新しい値。 | `@evt.name:SLO @asset.type:slo_correction` |


### Synthetic モニタリングイベント
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [プライベートロケーション][66] | ユーザーが Synthetic テスト用のプライベートロケーションを作成または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [Synthetic テストの作成または削除][74] | ユーザーが Synthetic テストを作成または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [Synthetic テストの変更][75] | ユーザーが Synthetic テストを修正し、その構成の以前の値と新しい値。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [Synthetic 変数][76] | ユーザーが Synthetic 変数を作成、変更、または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| [Synthetic 設定][77] | ユーザーが Synthetic 設定 (クォータ、PL アクセス) を変更し、変更前と変更後の設定値。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### リファレンステーブルのイベント
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [リファレンステーブル][78] | ユーザーがリファレンステーブルを作成、削除、または変更した。 | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [リファレンステーブルファイル][79] | ユーザーがクラウドプロバイダーにファイルをアップロードまたはインポートして、リファレンステーブルを作成した。 | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |                                                      |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /ja/account_management/audit_trail/
[3]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aapplication_key
[4]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Aidentity_provider
[5]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Auser
[6]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3Amodified
[7]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole%20%40action%3A%28created%20OR%20deleted%29
[8]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arole_request
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Apassword%20%40action%3Amodified
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aretention_filter
[12]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Acustom_metrics
[14]: /ja/tracing/trace_pipeline/generate_metrics/
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Afacet
[16]: /ja/tracing/trace_explorer/facets/
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aservice_operation_name
[18]: /ja/tracing/guide/configuring-primary-operation/
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Asecond_primary_tag
[20]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[21]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAPM%20%40asset.type%3Asamplerconfig
[22]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Aip_user_denylist
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Ablocking_configuration
[24]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Acompatible_services
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Audit%20Trail%22%20%40asset.type%3Aaudit_events_csv
[26]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table_file%20%40action%3A%28uploaded%20OR%20imported%29
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CCloud%20Security%20Platform%E2%80%9D%20%40asset.type%3Acws_agent_rule%20%40action%3Aaccessed
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Anotification_profile
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_rule
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_signal%20%40action%3Amodified
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[38]: https://roadie.io/docs/integrations/datadog/
[39]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[41]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[43]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[45]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[47]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Alogs_csv
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[65]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[66]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[67]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[68]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[69]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[70]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[71]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[72]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[73]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[74]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[75]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[76]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[77]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[78]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[79]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[80]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40asset.type%3A%28api_key%20OR%20application_key%29
[81]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apasslist_entry
[82]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apolicy_entry
[83]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Awaf_custom_rule
[84]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Aunusual_login
[85]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Security%20Notification%22%20%40action%3Anotification%20%40asset.type%3Auser
[86]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Access%20Management%22%20%40asset.type%3Arestriction_policy