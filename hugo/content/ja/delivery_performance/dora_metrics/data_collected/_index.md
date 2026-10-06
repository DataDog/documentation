---
aliases:
- /ja/dora_metrics/data_collected/
description: デプロイ頻度、変更リードタイム、変更失敗分析のための DORA Metrics のイベント、フィールド、タグ、および変更リードタイムのステージについて説明します。
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: ドキュメント
  text: DORA Metrics について
- link: /delivery_performance/dora_metrics/setup/
  tag: ドキュメント
  text: DORA Metrics のデータソースのセットアップ
- link: /metrics/
  tag: ドキュメント
  text: メトリクスについて
- link: /getting_started/tagging/
  tag: ドキュメント
  text: タグの概要
title: DORA Metrics のデータ収集
---
## 概要 {#overview}

DORA Metrics は、関連付けられているフィールドとタグを含むイベントを生成します。

| イベントタイプ | 説明 |
| :--- | :--- |
|デプロイメント | env、service、および version タグによって一意に識別される単一のコードデプロイメント。<br><br>デプロイメントは [失敗としてマーク][17] でき、デプロイメントの頻度、変更失敗率、および失敗したデプロイメントの復旧時間の計算に使用されます。
|プルリクエスト | デプロイメントに含まれるプルリクエスト。作成者、レビュアー、ラベル、およびドラフト作成、レビュー、マージにかかった時間などのメタデータが含まれます。コミットは、関連付けられているプルリクエスト内にネストされます。<br><br>プルリクエストは、コードレビューワークフローと PR レベルのサイクルタイムの分析に使用されます。
|コミット | デプロイメントに含まれる個別のコミットに対して生成されるイベント。メタデータが含まれており、対応するデプロイメントに自動的にリンクされます。コミットは、関連付けられているプルリクエスト内にネストされます。<br><br>コミットは、変更リードタイムの計算に使用されます。

**注**: DORA Metrics のイベントの保持期間は 2 年間です。

### デフォルトのタグ {#default-tags}

すべてのイベントには、利用可能な場合は以下のタグが含まれます。

- `service`
- `team`
- `env`
- `version`
- `source`
- `repository_id`

タグの使用に関する詳細については、[タグの概要][6] を参照してください。

### カスタムタグ {#custom-tags}

デプロイメントイベントは、DORA Metrics をフィルタリングするためにカスタムタグでエンリッチできます。これらのタグには 2 つの潜在的なソースがあります。

- カタログ: デプロイメントイベントがカタログ内のサービスに関連付けられている場合、`language`タグと [サービス定義で定義されたカスタムタグ][13] で自動的にエンリッチされます。
- DORA Metrics API: ユーザーが提供する最大 100 個のカスタムタグを [API][7] のデプロイイベントに追加できます。

DORA Metrics でのカスタムタグの使用に関する詳細については、[DORA Metrics の概要][16] を参照してください。

## イベント固有のフィールド {#event-specific-fields}

### デプロイメントフィールド{#deployment-fields}

| フィールド                      | 説明                |
|----------------------------|----------------------------|
| `Duration` | デプロイメントの期間。|
| `Avg Change Lead Time`      | すべてのコミットの[変更リードタイム](#commit-fields)の平均期間。 |
| `Avg Time to PR Ready`          | すべてのコミットの[PR 準備完了までの](#commit-fields)所要時間の平均期間。|
| `Avg Review Time`       | すべてのコミットの[レビュー時間](#commit-fields)の平均期間。|
| `Avg Merge Time`       | すべてのコミットの[マージ時間](#commit-fields)の平均期間。|
| `Avg Time to Deploy`       | すべてのコミットの[デプロイまでの所要時間](#commit-fields)の平均期間。|
| `Number of Commits`        | デプロイメントに含まれるすべてのコミットの数。|
| `Deployment Type` | デプロイメントのタイプ (`standard`、`rollback`、または`rollforward`)。|
| `Change Failure` | デプロイメントが変更失敗としてマークされているかどうかを示すブール値。|
| `Recovery Time` | 失敗したデプロイメントの `finished_at` からその修復の `finished_at` までの期間 (秒単位)。変更失敗としてマークされたデプロイメントでのみ利用可能です。|
| `Remediation Type` | 適用された修復のタイプ (`rollback`または`rollforward`)。変更失敗としてマークされたデプロイメントでのみ利用可能です。|

### プルリクエストフィールド{#pull-request-fields}

| フィールド  | 説明                |
|------------|----------------------------|
| `PR Cycle Time`       | 最初のコミットからマージまでの合計期間。|
| `Time to PR Ready`       | 最初のコミットから PR がレビュー準備完了とマークされるまでの期間。|
| `Review Time`       | PR がレビュー準備完了とマークされてから承認されるまでの期間。|
| `Merge Time`       | PR が承認されてからマージされるまでの期間。|
| `Time to Deploy`       | マージからデプロイメント開始までの期間。|
| `Deploy Time`       | デプロイメント開始からデプロイメント終了までの期間。|
| `Number of Commits`       | プルリクエストに含まれるコミットの数。|
| `Number of Reviewers`       | プルリクエストをレビューしたレビュアーの数。|
| `Number of Files Changed` | プルリクエストで変更されたファイルの数。GitHub でのみ利用可能です。|
| `Number of Lines Added` | プルリクエストで追加された行の数。GitHub でのみ利用可能です。|
| `Number of Lines Deleted` | プルリクエストで削除された行の数。GitHub でのみ利用可能です。|
| `Total Number of Lines Changed` | プルリクエストで追加および削除された行の合計数。GitHub でのみ利用可能です。|
| `Time to First Human Review` | プルリクエストが人間による最初のレビューを受けるまでの期間。GitHub でのみ利用可能です。|
| `Number of Comments` | プルリクエストに対するコメントの数。GitHub でのみ利用可能です。|
| `Number of Human Comments` | プルリクエストに対する人間によるコメント数。GitHub でのみ利用可能です。|
| `Fully Automated` | プルリクエストが人間の関与なしに作成およびマージされたかどうかを示すブール値。|
| `Creator Bot Type` | プルリクエストを作成したボットの種類。|
| `Creator Bot Name` | プルリクエストを作成したボットの名前。|
| `Time CI Failing` | プルリクエスト内のすべてのコミットで CI が失敗状態であった合計期間。CI Visibility が必要です。|
| `Test Session Duration` | プルリクエストのヘッドコミットまたはマージコミットのテストセッションの合計期間。Test Optimization が必要です。|
| `Test Session Duration After Approval` | プルリクエスト承認後のそのプルリクエストのヘッドコミットまたはマージコミットのテストセッションの合計期間。Test Optimization が必要です。|
| `Time to Pass` | プルリクエストのヘッドコミットまたはマージコミットに対する最初の CI 試行から最初のパイプライン実行成功までの期間。CI Visibility が必要です。|
| `Time to Pass After Approval` | プルリクエスト承認後の、プルリクエストのヘッドコミットまたはマージコミットに対する最初の CI 試行から最初のパイプライン実行成功までの期間。CI Visibility が必要です。|
| `Patch Coverage` | プルリクエストのヘッドコミットまたはマージコミットにおいて、テストによってカバーされている新規または変更された行の割合。Code Coverage が必要です。|


### コミットフィールド {#commit-fields}

| フィールド  | 説明                |
|------------|----------------------------|
| `Change Lead Time`       | コミットが本番環境に反映されるまでの所要期間。|
| `Time to PR Ready`       | コミット作成から PR がレビュー準備完了とマークされるまでの期間。|
| `Review Time`       | PR がレビュー準備完了とマークされてから承認されるまでの期間。|
| `Merge Time`       | PR が承認されてからマージされるまでの期間。|
| `Time to Deploy`       | マージからデプロイメント開始までの期間。|
| `Deploy Time`       | デプロイメント開始からデプロイメント終了までの期間。|
| `Has Failed Jobs` | コミットに対して CI ジョブの実行が失敗したかどうかを示すブール値 (再試行後に成功した失敗も含む)。CI Visibility が必要です。|
| `Has Failed Tests` | コミット内の非不安定テストが原因でテスト実行が失敗したかどうかを示すブール値。Test Optimization が必要です。|
| `Has New Flaky Tests` | コミットのテストセッションで新しい不安定なテストが検出されたかどうかを示すブール値。Test Optimization が必要です。|

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/events/explorer/
[2]: /ja/api/latest/metrics/#query-timeseries-points
[3]: /ja/api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /ja/getting_started/tagging/
[7]: /ja/api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/ja/metrics/
[10]: /ja/delivery_performance/dora_metrics/setup/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true
[12]: /ja/delivery_performance/dora_metrics/setup/#limitations
[13]: https://www.datadoghq.com/blog/service-catalog-setup/
[16]: /ja/delivery_performance/dora_metrics/
[17]: /ja/delivery_performance/dora_metrics/change_failure_detection/