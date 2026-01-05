---
app_id: mergify-oauth
app_uuid: 3b53fe32-b47e-4a29-881f-b90397a11589
assets:
  dashboards:
    Mergify Merge Queue Overview: assets/dashboards/mergify_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - mergify.merge_queue_length
      - mergify.time_to_merge.median
      - mergify.time_to_merge.mean
      - mergify.queue_checks_outcome
      - mergify.queue_freeze.duration
      metadata_path: metadata.csv
      prefix: mergify.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10350
    source_type_name: Mergify OAuth
  oauth: assets/oauth_clients.json
author:
  homepage: https://mergify.com
  name: Mergify
  sales_email: hello@mergify.com
  support_email: support@mergify.com
categories:
- 開発ツール
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/mergify_oauth/README.md
display_on_public_website: true
draft: false
git_integration_title: mergify_oauth
integration_id: mergify-oauth
integration_title: Mergify
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: mergify_oauth
public_title: Mergify
short_description: Mergify マージ キューの統計をモニタリング
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
  - Submitted Data Type::Metrics
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Mergify マージ キューの統計をモニタリング
  media:
  - caption: Mergify - Dashboard
    image_url: images/dashboard.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Mergify
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このインテグレーションは、[Mergify][1] で設定した各リポジトリのマージ キューの長さを監視し、Mergify のグローバルな稼働状況を追跡します。メトリクスを Datadog アカウントに送信することで、異常検知モニターを設定し、マージ キューのパフォーマンスを分析できます。Datadog インテグレーションを利用することで、Mergify サービスの稼働状況を把握し、開発ワークフローを最適化できます。

## セットアップ

- **Datadog で**: **Integrations** に移動し、Mergify タイルを選択して **Install Integration** をクリックします。
- **Connect Accounts** をクリックして、このインテグレーションの認可を開始します。[Mergify ダッシュボード][2]にリダイレクトされます。
- **Mergify dashboard で**: ログイン後、**Datadog Integration** を設定したい組織を選択し、**Connect the integration** をクリックします。

これで Mergify の統計が Datadog に表示されるようになります。

## アンインストール

1. [Mergify ダッシュボード][2]に移動してログインし、**Integrations** に進みます。
2. **Datadog** タイルで **Disconnect** ボタンをクリックします。

このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。

注: Datadog の [API Keys ページ][3]でインテグレーション名を検索し、本インテグレーションに関連するすべての API キーが無効化されていることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mergify-oauth" >}}


メトリクス `mergify.queue_checks_outcome` で利用可能な `outcome_type` タグは次のとおりです:

- `PR_DEQUEUED`: 手動でキューから除外された PR の数
- `PR_AHEAD_DEQUEUED`: キュー内で先行していた PR が除外されたために除外された PR の数
- `PR_AHEAD_FAILED_TO_MERGE`: 先行していた PR のマージ失敗により除外された PR の数
- `PR_WITH_HIGHER_PRIORITY_QUEUED`: より高い優先度の PR がキューに追加されたために除外された PR の数
- `PR_QUEUED_TWICE`: 重複して 2 回キューに追加されたために除外された PR の数
- `SPECULATIVE_CHECK_NUMBER_REDUCED`: 設定のスペキュレーティブ チェック数が変更されたために除外された PR の数
- `CHECKS_TIMEOUT`: スペキュレーティブ チェックがタイムアウトしたために除外された PR の数
- `CHECKS_FAILED`: スペキュレーティブ チェックが失敗したために除外された PR の数
- `QUEUE_RULE_MISSING`: PR をキューに追加したキュー ルールが設定から削除されたために除外された PR の数
- `UNEXPECTED_QUEUE_CHANGE`: ユーザーがキュー内のプル リクエストを操作したために除外された PR の数
- `PR_FROZEN_NO_CASCADING`: カスケード効果のないフリーズによって凍結されたために除外された PR の数
- `TARGET_BRANCH_CHANGED`: PR のターゲット ブランチが変更されたために除外された PR の数
- `TARGET_BRANCH_MISSING`: PR のターゲット ブランチが存在しなくなったために除外された PR の数
- `PR_UNEXPECTEDLY_FAILED_TO_MERGE`: 予期せずマージに失敗したために除外された PR の数
- `BATCH_MAX_FAILURE_RESOLUTION_ATTEMPTS`: バッチの失敗解決試行回数が上限に達したために除外された PR の数

### サービスチェック

Mergify にはサービスチェックが含まれていません。

### イベント

Mergify には、イベントは含まれません。

## サポート

ご不明な点は、[Mergify サポート][1]までお問い合わせください。

[1]: https://mergify.com
[2]: https://dashboard.mergify.com
[3]: https://app.datadoghq.com/organization-settings/api-keys?filter=Mergify
[4]: https://github.com/DataDog/integrations-extras/blob/master/mergify/metadata.csv