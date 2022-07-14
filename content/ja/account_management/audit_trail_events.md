---
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
- [メトリクス](#metrics-events)
- [リアルユーザーモニタリング](#real-user-monitoring-events)
- [機密データスキャナー](#sensitive-data-scanner-events)
- [サービスレベル目標](#service-level-objectives-slo-events)
- [Synthetic モニタリング](#synthetic-monitoring-events)

監査証跡の設定と構成については、[監査証跡ドキュメント][2]を参照してください。

## 監査イベント

### アクセス管理イベント

| 名前        | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ----------- | ------------------------------------------------------------------- | --------------------------------------------------|
| アプリケーションキー (サービスアカウントユーザー) | ユーザーがサービスアカウントユーザーのアプリケーションキーを作成、変更、または削除した。 | `@evt.name:"Access Management" @asset.type:application_key` |
| 認証方法 (組織) | ユーザーが組織で許可される認証方法を変更し、前と後の値がどうなったか。 | `@evt.name:"Access Management" @asset.type:identity_provider` |
| Email       | Datadog アカウントのユーザーとして、メールアドレスが追加、無効化、または検証された。 | `@evt.name:"Access Management" @asset.type:user` |
| ロールの変更  | ロールが変更され、以前の権限と新しい権限がどうなったか。 | `@evt.name:"Access Management" @asset.type:role @action:modified` |
| ロールの作成または削除 | 組織内でロールが作成または削除された。 | `@evt.name:"Access Management" @asset.type:role @action:(created OR deleted)` |
| ロールアクセスリクエスト | ユーザーが、ロールに対するアクセスリクエストを作成、応答、または削除し、そのアクセスリクエストの値。 | `@evt.name:"Access Management" @asset.type:role_request` |
| ユーザーのロール | ユーザーが組織内のロールに追加または削除された。 | `@evt.name:"Access Management" @asset.type:role @action:modified` |

### API リクエストイベント

| 名前  | 監査イベントの説明                          | 監査エクスプローラーのクエリ              |
|-------------| --------------------------------------------------  | ------------------------------------ |
| API リクエスト | Datadog プラットフォーム上で API リクエストが行われた。 | `@evt.name:Request @action:accessed` |

### 認証イベント

| 名前                    | 監査イベントの説明                                                                    | 監査エクスプローラーのクエリ                                 |
|--------------------------------| --------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| API キー (組織設定)         | API キーが、組織設定ページでアクセス、一覧化、作成、または削除された。        | `@evt.name:Authentication @asset.type:api_key`          |
| アプリケーションキー (組織設定) | アプリケーションキーが、組織設定ページでアクセス、一覧化、作成、または削除された。| `@evt.name:Authentication @asset.type:application_key`  |
| 公開 API キー (組織設定)  | 公開 API キーが、組織設定ページでアクセス、一覧化、作成、または削除された。  | `@evt.name:Authentication @asset.type:public_api_key`   |
| ユーザーログイン                     | ユーザーが Datadog にログインし、使用された認証方法。                                  | `@evt.name:Authentication @action:login`                |

### クラウドセキュリティプラットフォームのイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| CWS Agent トルール | ユーザーがクラウドセキュリティプラットフォーム内の CWS Agent ルールにアクセス (フェッチ) した。| `@evt.name:“Cloud Security Platform” @asset.type:cws_agent_rule @action:accessed` |
| 通知プロファイル | ユーザーがクラウドセキュリティプラットフォームで通知プロファイルを作成、更新、または削除した。 | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile` |
| セキュリティルール | ユーザーがセキュリティルールを更新、削除、または作成し、そのルールの以前の値と新しい値。 | `@evt.name:"Cloud Security Platform" @asset.type:security_rule` |
| セキュリティシグナル | ユーザーがシグナルの状態を変更したり、シグナルの割り当てを行い、そのシグナルの前の値と新しい値。 | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |

### ダッシュボードイベント

| 名前               | 監査イベントの説明                                                                        | 監査エクスプローラーのクエリ                                               |
| -------------------| ------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------   |
| ダッシュボードの作成 | ダッシュボードが作成され、そのダッシュボードの新しい JSON 値。                                    | `@evt.name:Dashboard @asset.type:dashboard @action:created`             |
| ダッシュボードの削除 | ダッシュボードが削除され、そのダッシュボードの前の JSON 値。                              | `@evt.name:Dashboard @asset.type:dashboard @action:deleted`             |
| ダッシュボードの埋め込み (Roadie) | Datadog のダッシュボードが[サードパーティに埋め込まれ][3]、ユーザーがダッシュボードを閲覧した。                      | `@evt.name:Dashboard @asset.type:embed @action:accessed`                |
| ダッシュボードの変更 | ダッシュボードが変更され、そのダッシュボードの前の JSON 値と新しい JSON 値。                   | `@evt.name:Dashboard @asset.type:dashboard @action:modified`            |
| ダッシュボードユーザーの追加 | ユーザーがダッシュボードにアクセスできるユーザー ID を追加し、新規ユーザー ID の一覧。                 | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:created`   |
| ダッシュボードユーザーの削除 | ユーザーがダッシュボードにアクセスできるユーザー ID を削除し、削除されたユーザー ID の一覧。       | `@evt.name:Dashboard @asset.type:dashboard_share_acl @action:deleted`   |
| 公開 URL のアクセス | 公開されているダッシュボードの URL がアクセスされた。                                                               | `@evt.name:Dashboard @asset.type:dashboard @action:accessed`            |
|公開 URL の生成または削除  | ダッシュボードを閲覧するための公開 URL が生成または削除された。                             | `@evt.name:Dashboard @asset.type:dashboard_share_link`            |

### インテグレーションイベント

| 名前     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| -------- | ------------------------------------------------------------------- | --------------------------------------------------|
| Resource | インテグレーションにリソース (チャンネル、サービス、Webhook、アカウント、インスタンスなど) が追加、変更、削除されたとき、およびその構成の以前の値と新しい値。 | `@evt.name:Integration @asset.type:integration` |

### ログ管理イベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| アーカイブ構成 | ユーザーがアーカイブの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:archive` |
| カスタムメトリクス | ユーザーがログのカスタムメトリクスを作成、変更、または削除し、そのカスタムメトリクスの構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:"custom metric"` |
| 除外フィルターの構成 | ユーザーが除外フィルターの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:"exclusion filter"` |
| ファセット | ユーザーがログエクスプローラーでファセットを作成、変更、または削除し、そのファセット構成の以前の値と新しい値。| `@evt.name:"Log Management" @asset.type:facet` |
| 履歴ビュー | ユーザーがログの履歴ビューを作成、変更、中止、または削除し、その履歴ビューの構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:historical_view` |
| インデックス構成 | ユーザーがインデックスの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:index` |
| ログパイプライン | ユーザーがログパイプラインまたはネストされたパイプラインを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:pipeline` |
| プロセッサー | ユーザーがパイプライン内のプロセッサーを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:pipeline_processor` |
| 制限クエリの構成 | ユーザーがログの制限クエリの構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:restriction_query` |
| 標準属性の構成 | ユーザーがログの標準属性の構成を作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:"Log Management" @asset.type:standard_attribute` |

### メトリクスイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- |------------------------------------------------------------------- | --------------------------------------------------|
| カスタムメトリクスの作成 | ユーザーがカスタムメトリクスを作成し、そのカスタムメトリクス構成の新しい値。 | `@evt.name:Metrics @asset.type:metric @action:created` |
| カスタムメトリクスの削除 | ユーザーがカスタムメトリクスを削除し、そのカスタムメトリクス構成の以前の値。 | `@evt.name:Metrics @asset.type:metric @action:deleted` |
| カスタムメトリクスの変更 | ユーザーがカスタムメトリクスを変更し、そのカスタムメトリクス構成の以前の値と新しい値。 | `@evt.name:Metrics @asset.type:metric @action:modified` |

### モニターイベント

| 名前             | 監査イベントの説明                                           | 監査エクスプローラーのクエリ                                  |
| ---------------- | -------------------------------------------------------------------- | ---------------------------------------------------------|
| モニターの作成  | モニターが作成され、そのモニターの新しい JSON 値。                 | `@evt.name:Monitor @asset.type:monitor @action:created`  |
| モニターの削除  | モニターが削除され、そのモニターの前の JSON 値。           | `@evt.name:Monitor @asset.type:monitor @action:deleted`  |
| モニターの変更 | モニターが変更され、そのモニターの前の JSON 値と新しい JSON 値。 | `@evt.name:Monitor @asset.type:monitor @action:modified` |
| モニターの解決 | モニターが解決された。                                               | `@evt.name:Monitor @asset.type:monitor @action:resolved` |

### ノートブックイベント

| 名前              | 監査イベントの説明                                            | 監査エクスプローラーのクエリ                                     |
| ----------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| ノートブックの作成  | ノートブックが作成され、そのノートブックの新しい JSON 値。                 | `@evt.name:Notebook @asset.type:notebook @action:created`   |
| ノートブックの削除  | ノートブックが削除され、そのノートブックの前の JSON 値。           | `@evt.name:Notebook @asset.type:notebook @action:deleted`   |
| ノートブックの変更 | ノートブックが変更され、そのノートブックの前の JSON 値と新しい JSON 値。 | `@evt.name:Notebook @asset.type:notebook @action:modified`  |

### OAuth イベント

| 名前         | 監査イベントの説明                                                                    | 監査エクスプローラーのクエリ                  |
| ------------ | --------------------------------------------------------------------------------------------- | -----------------------------------------|
| OAuth クライアント | ユーザーが OAuth クライアントを作成、変更、または削除し、その OAuth クライアントの以前の値と新しい値。 | `@evt.name:OAuth @asset.type:oauth_client` |

### 組織管理イベント

| 名前                 | 監査イベントの説明                                                       | 監査エクスプローラーのクエリ                                           |
| -------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------|
| 監査証跡設定 | ユーザーが監査証跡設定を変更し、変更前と変更後の設定内容。 | `@evt.name:"Organization Settings" @asset.type:audit_logs_settings` |

### リアルユーザーモニタリングイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| RUM アプリケーションの作成 | ユーザーが RUM でアプリケーションを作成または削除し、そのアプリケーションの種類 (Browser、Flutter、IOS、React Native、Android)。 | `@evt.name:"Real User Monitoring" @asset.type:real_user_monitoring_application @action:(created OR deleted)` |
| RUM アプリケーションの変更 | ユーザーが RUM でアプリケーションを変更し、そのアプリケーションの新しい値、およびアプリケーションの種類 (Browser、Flutter、IOS、React Native、Android)。 | `@evt.name:“Real User Monitoring” @asset.type:real_user_monitoring_application @action:modified` |

### 機密データスキャナーイベント
| 名前 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ---- | ------------------------------------------------------------------- | --------------------------------------------------|
| スキャングループ | ユーザーが機密データスキャナーのスキャングループを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:Sensitive Data Scanner @asset.type:sensitive_data_scanner_scanning_group` |
| スキャンルール | ユーザーが機密データスキャナーのスキャングループ内のスキャンルールを作成、変更、または削除し、その構成の以前の値と新しい値。 | `@evt.name:Sensitive Data Scanner @asset.type:sensitive_data_scanner_scanning_rule` |

### サービスレベル目標 (SLO) イベント

| 名前          | 監査イベントの説明                                                                       | 監査エクスプローラーのクエリ                  |
| ------------- | ------------------------------------------------------------------------------------------------ | -----------------------------------------|
| SLO           | ユーザーが SLO を作成、変更、または削除し、その SLO の以前の値と新しい値。| `@evt.name:SLO @asset.type:slo`            |
| SLO 補正| ユーザーが SLO 補正を作成、変更、または削除し、その SLO 補正の以前の値と新しい値。 | `@evt.name:SLO @asset.type:slo_correction` |

### サポート管理イベント

| 名前                 | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| -------------------- | ------------------------------------------------------------------- | --------------------------------------------------|
| サポート管理者アクセス | Datadog のサポート管理者がアカウントにアクセスし、その理由。 | `@evt.name:"Support Administration" @action:login`  |

### Synthetic モニタリングイベント
| 名前                     | 監査イベントの説明                                          | 監査エクスプローラーのクエリ                           |
| ------------------------ | ------------------------------------------------------------------- | --------------------------------------------------|
| プライベートロケーション | ユーザーが Synthetic テスト用のプライベートロケーションを作成または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_private_location` |
| Synthetic テストの作成または削除 | ユーザーが Synthetic テストを作成または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:(created OR deleted)` |
| Synthetic テストの変更 | ユーザーが Synthetic テストを修正し、その構成の以前の値と新しい値。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_test @action:modified` |
| Synthetic 変数 | ユーザーが Synthetic 変数を作成、変更、または削除した。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_variable` |
| Synthetic 設定 | ユーザーが Synthetic 設定 (クォータ、PL アクセス) を変更し、変更前と変更後の設定値。 | `@evt.name:"Synthetics Monitoring" @asset.type:synthetics_settings @action:modified` |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/audit-trail
[2]: /ja/account_management/audit_trail/
[3]: https://roadie.io/docs/integrations/datadog/