---
aliases:
- /ja/account_management/audit_trail_events/
further_reading:
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: 監査証跡について
kind: documentation
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
- [サポート管理](#support-administration-events)

#### 製品別イベント
- [クラウドセキュリティプラットフォーム](#cloud-security-platform-events)
- [ログ管理](#log-management-events)
- [APM](#apm-events)
- [メトリクス](#metrics-events)
- [リアルユーザーモニタリング](#real-user-monitoring-events)
- [機密データスキャナー](#sensitive-data-scanner-events)
- [サービスレベル目標](#service-level-objectives-slo-events)
- [Synthetic モニタリング](#synthetic-monitoring-events)
- [リファレンステーブル](#reference-table-events)
- [CI Visibility](#ci-visibility-events)

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

### API リクエストイベント

| 名前  | 監査イベントの説明                          | 監査エクスプローラーのクエリ              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| [API リクエスト][9] | Datadog プラットフォーム上で API リクエストが行われた。 | `@evt.name:Request @action:accessed` |

### 認証イベント

| 名前                    | 監査イベントの説明                                                                    | 監査エクスプローラーのクエリ                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [API キー][10] (組織設定)         | API キーが、組織設定ページでアクセス、一覧化、作成、または削除された。        | `@evt.name:Authentication @asset.type:api_key`          |
| [アプリケーションキー][11] (組織設定) | アプリケーションキーが、組織設定ページでアクセス、一覧化、作成、または削除された。| `@evt.name:Authentication @asset.type:application_key`  |
| [公開 API キー][12] (組織設定)  | 公開 API キーが、組織設定ページでアクセス、一覧化、作成、または削除された。  | `@evt.name:Authentication @asset.type:public_api_key`   |
| [ユーザーログイン][13]                     | ユーザーが Datadog にログインし、使用された認証方法。                                  | `@evt.name:Authentication @action:login`                |

### クラウドセキュリティプラットフォームのイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [CWS Agent ルール][14] | ユーザーがクラウドセキュリティプラットフォーム内の CWS Agent ルールにアクセス (フェッチ) した。| `@evt.name:“Cloud Security Platform” @asset.type:cws_agent_rule @action:accessed` |
| [通知プロファイル][15] | ユーザーがクラウドセキュリティプラットフォームで通知プロファイルを作成、更新、または削除した。 | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile` |
| [セキュリティルール][16] | ユーザーがセキュリティルールを更新、削除、または作成し、そのルールの以前の値と新しい値。 | `@evt.name:"Cloud Security Platform" @asset.type:security_rule` |
| [セキュリティシグナル][17] | ユーザーがシグナルの状態を変更したり、シグナルの割り当てを行い、そのシグナルの前の値と新しい値。 | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |

### ダッシュボードイベント

| 名前               | 監査イベントの説明                                                                        | 監査エクスプローラーのクエリ                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| [ダッシュボードの作成][18] | ダッシュボードが作成され、そのダッシュボードの新しい JSON 値。                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| [ダッシュボードの削除][19] | ダッシュボードが削除され、そのダッシュボードの前の JSON 値。                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| [ダッシュボードの埋め込み][20] (Roadie) | Datadog のダッシュボードが[サードパーティに埋め込まれ][21]、ユーザーがダッシュボードを閲覧した。                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| [ダッシュボードの変更][22] | ダッシュボードが変更され、そのダッシュボードの前の JSON 値と新しい JSON 値。                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| [ダッシュボードユーザーの追加][23] | ユーザーがダッシュボードにアクセスできるユーザー ID を追加し、新規ユーザー ID の一覧。                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| [ダッシュボードユーザーの削除][24] | ユーザーがダッシュボードにアクセスできるユーザー ID を削除し、削除されたユーザー ID の一覧。       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| [公開 URL のアクセス][25] | 公開されているダッシュボードの URL がアクセスされた。                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|[公開 URL の生成または削除][26]  | ダッシュボードを閲覧するための公開 URL が生成または削除された。                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### インテグレーションイベント

| 名前     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [リソース][27] | インテグレーションにリソース (チャンネル、サービス、Webhook、アカウント、インスタンスなど) が追加、変更、削除されたとき、およびその構成の以前の値と新しい値。 | `@evt.name:Integration @asset.type:integration` |

### ログ管理イベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [アーカイブ構成][28] | ユーザーがアーカイブの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:archive` |
| [カスタムメトリクス][29] | ユーザーがログのカスタムメトリクスを作成、変更、または削除し、そのカスタムメトリクスの構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| [除外フィルターの構成][30] | ユーザーが除外フィルターの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| [ファセット][31] | ユーザーがログエクスプローラーでファセットを作成、変更、または削除し、そのファセット構成の以前の値と新しい値。| `@evt.name:"Log Management" @asset.type:facet` |
| [履歴ビュー][32] | ユーザーがログの履歴ビューを作成、変更、中止、または削除し、その履歴ビューの構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:historical_view` |
| [インデックス構成][33] | ユーザーがインデックスの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:index` |
| [ログパイプライン][34] | ユーザーがログパイプラインまたはネストされたパイプラインを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:pipeline` |
| [プロセッサー][35] | ユーザーがパイプライン内のプロセッサーを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| [制限クエリの構成][36] | ユーザーがログの制限クエリの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:restriction_query` |
| [標準属性の構成][37] | ユーザーがログの標準属性の構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:standard_attribute` |

### APM イベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [保持フィルター][38] | ユーザーが[保持フィルター][39]を作成、変更、または削除し、その保持フィルターの構成の以前の値および/または新しい値。 | `@evt.name:APM @asset.type:retention_filter` |
| [スパンベースメトリクス][40] | ユーザーが[スパンベースメトリクス][41]を作成、変更、または削除し、そのメトリクスの構成の以前の値および/または新しい値。 | `@evt.name:APM @asset.type:custom_metrics` |
| [ファセット][42] | ユーザーが[ファセット][43]を作成、変更、または削除し、そのファセットの構成の以前の値および/または新しい値。 | `@evt.name:APM @asset.type:facet` |
| [プライマリオペレーション名][44] | ユーザーがサービスの[プライマリオペレーション名][45]を作成、変更、または削除し、その構成の以前の値および/または新しい値。 | `@evt.name:APM @asset.type:service_operation_name` |
| [セカンドプライマリタグ][46] | ユーザーが[セカンドプライマリタグ][47]を追加、変更、または削除し、その構成の以前の値および/または新しい値。  | `@evt.name:APM @asset.type:second_primary_tag` |

### メトリクスイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| [カスタムメトリクスの作成][48] | ユーザーがカスタムメトリクスを作成し、そのカスタムメトリクス構成の新しい値。 | `@evt.name:Metrics @asset.type:metric @action:created` |
| [カスタムメトリクスの削除][49] | ユーザーがカスタムメトリクスを削除し、そのカスタムメトリクス構成の以前の値。 | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| [カスタムメトリクスの変更][50] | ユーザーがカスタムメトリクスを変更し、そのカスタムメトリクス構成の以前の値と新しい値。 | `@evt.name:Metrics @asset.type:metric @action:modified` |

### モニターイベント

| 名前             | 監査イベントの説明                                           | 監査エクスプローラーのクエリ                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| [モニターの作成][51]  | モニターが作成され、そのモニターの新しい JSON 値。                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| [モニターの削除][52]  | モニターが削除され、そのモニターの前の JSON 値。           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| [モニターの変更][53] | モニターが変更され、そのモニターの前の JSON 値と新しい JSON 値。 | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| [モニターの解決][54] | モニターが解決された。                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### ノートブックイベント

| 名前              | 監査イベントの説明                                            | 監査エクスプローラーのクエリ                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| [ノートブックの作成][55]  | ノートブックが作成され、そのノートブックの新しい JSON 値。                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| [ノートブックの削除][56]  | ノートブックが削除され、そのノートブックの前の JSON 値。           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| [ノートブックの変更][57] | ノートブックが変更され、そのノートブックの前の JSON 値と新しい JSON 値。 | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth イベント

| 名前         | 監査イベントの説明                                                                    | 監査エクスプローラーのクエリ                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| [OAuth クライアント][58] | ユーザーが OAuth クライアントを作成、変更、または削除し、その OAuth クライアントの以前の値と新しい値。 | `@evt.name:OAuth @asset.type:oauth_client` |

### 組織管理イベント

| 名前                 | 監査イベントの説明                                                       | 監査エクスプローラーのクエリ                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| [監査証跡設定][59] | ユーザーが監査証跡設定を変更し、変更前と変更後の設定内容。 | `@evt.name:"Organization Management" @asset.type:audit_logs_settings` |

### リアルユーザーモニタリングイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [RUM アプリケーションの作成][60] | ユーザーが RUM でアプリケーションを作成または削除し、そのアプリケーションの種類 (Browser、Flutter、IOS、React Native、Android)。 | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| [RUM アプリケーションの変更][61] | ユーザーが RUM でアプリケーションを変更し、そのアプリケーションの新しい値、およびアプリケーションの種類 (Browser、Flutter、IOS、React Native、Android)。 | `@evt.name:“Real User Monitoring” @asset.type:real_user_monitoring_application @action:modified` |

### 機密データスキャナーイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| [スキャングループ][62] | ユーザーが機密データスキャナーのスキャングループを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_group` |
| [スキャンルール][63] | ユーザーが機密データスキャナーのスキャングループ内のスキャンルールを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Sensitive Data Scanner" @asset.type:sensitive_data_scanner_scanning_rule` |

### サービスレベル目標 (SLO) イベント

| 名前          | 監査イベントの説明                                                                       | 監査エクスプローラーのクエリ                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| [SLO][64]           | ユーザーが SLO を作成、変更、または削除し、その SLO の以前の値と新しい値。| `@evt.name:SLO @asset.type:slo`            |
| [SLO 補正][65]| ユーザーが SLO 補正を作成、変更、または削除し、その SLO 補正の以前の値と新しい値。 | `@evt.name:SLO @asset.type:slo_correction` |

### サポート管理イベント

| 名前                 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| -------------------- | ------------------------------------------------------------------- | --------------------------------------------------|
| [サポート管理者アクセス][66] | Datadog のサポート管理者がアカウントにアクセスし、その理由。 | `@evt.name:"Support Administration" @action:login`  |

### Synthetic モニタリングイベント
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [プライベートロケーション][67] | ユーザーが Synthetic テスト用のプライベートロケーションを作成または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| [Synthetic テストの作成または削除][68] | ユーザーが Synthetic テストを作成または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| [Synthetic テストの変更][69] | ユーザーが Synthetic テストを修正し、その構成の以前の値と新しい値。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| [Synthetic 変数][70] | ユーザーが Synthetic 変数を作成、変更、または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| [Synthetic 設定][71] | ユーザーが Synthetic 設定 (クォータ、PL アクセス) を変更し、変更前と変更後の設定値。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

### リファレンステーブルのイベント
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| [リファレンステーブル][72] | ユーザーがリファレンステーブルを作成、削除、または変更した。 | `@evt.name:"Reference Tables" @asset.type:reference_table @action:(created OR deleted OR modified)` |
| [リファレンステーブルファイル][73] | ユーザーがクラウドプロバイダーにファイルをアップロードまたはインポートして、リファレンステーブルを作成した。 | `@evt.name:"Reference Tables" @asset.type:reference_table_file @action:(uploaded OR imported)` |

### CI Visibility イベント
| 名前                            | 監査イベントの説明                                                                             | 監査エクスプローラーのクエリ                                                                          |
|---------------------------------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| [リポジトリデフォルトブランチ][74] | ユーザーがリポジトリのデフォルトブランチを変更し、そのデフォルトブランチの以前の値と新しい値。 | `@evt.name:"CI Visibility" @asset.type:ci_app_repository`                                                         |

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
[9]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ARequest%20%40action%3Aaccessed
[10]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapi_key
[11]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Aapplication_key
[12]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40asset.type%3Apublic_api_key
[13]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AAuthentication%20%40action%3Alogin
[14]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CCloud%20Security%20Platform%E2%80%9D%20%40asset.type%3Acws_agent_rule%20%40action%3Aaccessed
[15]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Anotification_profile
[16]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_rule
[17]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_signal%20%40action%3Amodified
[18]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Acreated
[19]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Adeleted
[20]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Aembed%20%40action%3Aaccessed
[21]: https://roadie.io/docs/integrations/datadog/
[22]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Amodified
[23]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Acreated
[24]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_acl%20%40action%3Adeleted
[25]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard%20%40action%3Aaccessed
[26]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ADashboard%20%40asset.type%3Adashboard_share_link
[27]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AIntegration%20%40asset.type%3Aintegration
[28]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aarchive
[29]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22custom%20metric%22
[30]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3A%22exclusion%20filter%22
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Afacet
[32]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Ahistorical_view
[33]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Aindex
[34]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline
[35]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Apipeline_processor
[36]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Arestriction_query
[37]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40asset.type%3Astandard_attribute
[38]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aretention_filter
[39]: /ja/tracing/trace_pipeline/trace_retention/#retention-filters
[40]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Acustom_metrics
[41]: /ja/tracing/trace_pipeline/generate_metrics/
[42]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Afacet
[43]: /ja/tracing/trace_explorer/facets/
[44]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Aservice_operation_name
[45]: /ja/tracing/guide/configuring-primary-operation/
[46]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22APM%22%20%40asset.type%3Asecond_primary_tag
[47]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[48]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Acreated
[49]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Adeleted
[50]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMetrics%20%40asset.type%3Ametric%20%40action%3Amodified
[51]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Acreated
[52]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Adeleted
[53]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Amodified
[54]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AMonitor%20%40asset.type%3Amonitor%20%40action%3Aresolved
[55]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Acreated
[56]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Adeleted
[57]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ANotebook%20%40asset.type%3Anotebook%20%40action%3Amodified
[58]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3AOAuth%20%40asset.type%3Aoauth_client
[59]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Organization+Management%22+%40asset.type%3Aaudit_logs_settings
[60]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Real%20User%20Monitoring%22%20%40asset.type%3Areal_user_monitoring_application%20%40action%3A%28created%20OR%20deleted%29
[61]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CReal%20User%20Monitoring%E2%80%9D%20%40asset.type%3Areal_user_monitoring_application%20%40action%3Amodified
[62]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_group
[63]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Sensitive%20Data%20Scanner%22%20%40asset.type%3Asensitive_data_scanner_scanning_rule
[64]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo
[65]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3ASLO%20%40asset.type%3Aslo_correction
[66]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Support%20Administration%22%20%40action%3Alogin
[67]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_private_location
[68]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3A%28created%20OR%20deleted%29
[69]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_test%20%40action%3Amodified
[70]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_variable
[71]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Synthetics%20Monitoring%22%20%40asset.type%3Asynthetics_settings%20%40action%3Amodified
[72]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table%20%40action%3A%28created%20OR%20deleted%20OR%20modified%29
[73]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Reference%20Tables%22%20%40asset.type%3Areference_table_file%20%40action%3A%28uploaded%20OR%20imported%29
[74]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22CI+Visibility%22+%40asset.type%3Aci_app_repository