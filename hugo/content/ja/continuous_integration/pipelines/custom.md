---
aliases:
- /ja/continuous_integration/setup_pipelines/custom
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/guides/pipeline_data_model
  tag: ドキュメント
  text: パイプラインのデータモデルと実行タイプについて
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: カスタムパイプラインを Datadog に送信
---
## 概要{#overview}

CI プロバイダーがサポートされていない場合は、[パブリック API エンドポイント][1]を使用して HTTP 経由でカスタムパイプラインを送信できます。パイプライン実行のモデル化方法の詳細については、[パイプラインのデータモデルと実行タイプ][2]を参照してください。

### 互換性 {#compatibility}

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [ログ分析][20] | ログ分析 | 関連するログに対して LLM モデルを使用して、失敗した CI ジョブの根本原因を分析します。|
| ログの相関付け | ログの相関付け | パイプラインとジョブのスパンをログに関連付けます。[ログストレージ](#logs-storage)が必要です。|
| [Running pipelines][15] | Running pipelines | 稼働中のパイプライン実行を表示します。|
| [実行時のカスタムタグ][5][およびメジャー][6] | 実行時のカスタムタグおよびメジャー | 実行時の[カスタムタグおよびメジャー][7]を構成します。|
| [Manual steps][8] | Manual steps | 手動でトリガーされたパイプラインを表示します。|
| [Parameters][9] | Parameters | パイプラインがトリガーされたときにカスタムパラメーターを設定します。|
| [部分的なリトライ][10] | 部分パイプライン | 部分的にリトライされたパイプライン実行を表示します。|
| [パイプラインの障害理由][11] | パイプラインの障害理由 | エラーメッセージからパイプラインの障害理由を特定します。|
| [キュータイム][12] | キュータイム | パイプラインのジョブが処理される前にキューに残っている時間を表示します。|
| [クリティカルパスで CI ジョブをフィルタリングする][16] | クリティカルパスで CI ジョブをフィルタリングする | クリティカルパスのジョブでフィルタリングします。|
| [実行時間][17] | 実行時間  | パイプラインによるジョブ実行時間を表示します。|


## CI Visibility の構成 {#configure-ci-visibility}

プログラムでパイプラインイベントを Datadog に送信するには、[`DD_API_KEY`][14] が構成されていることを確認してください。

1. HTTP リクエストのヘッダーを設定します。

   - `DD-API-KEY`: [Datadog API キー][14]。
   - `Content-Type`: `application/json`。

2. cURL コマンドで[パイプライン実行][2]に関する情報を入力し、ペイロード本文を準備します。

   | パラメーター名 | 説明 | 例の値 |
   |---|---|---|
   | 一意の ID | パイプライン実行の UUID。ID は、部分的な再試行を含め、再試行やパイプライン全体で一意である必要があります。| `b3262537-a573-44eb-b777-4c0f37912b05` |
   | 名前 | パイプラインの名前。ビルドのすべてのパイプライン実行は、同じ名前である必要があります。| `Documentation Build` |
   | Git リポジトリ | パイプラインをトリガーした Git リポジトリの URL。| `https://github.com/Datadog/documentation` |
   | コミット作成者 | パイプラインをトリガーしたコミット作成者のメールアドレス。| `contributor@github.com` |
   | コミット SHA | パイプラインをトリガーしたコミットハッシュ。| `cf852e17dea14008ac83036430843a1c` |
   | ステータス | パイプラインの最終ステータス。許可される列挙値: `success`、`error`、`canceled`、`skipped`、`blocked`、または `running`。| `success` |
   | 部分再試行 | パイプラインが以前の試行の部分再試行であるかどうか。このフィールドにはブール値 (`true` または `false`) が必要です。部分再試行とは、元のジョブのサブセットのみを実行するものです。| `false` |
   | 開始 | パイプライン実行が開始された時刻 ([キュー時間][12]は含めないでください)。時刻の形式は RFC3339 である必要があります。| `2024-08-22T11:36:29-07:00` |
   | 終了 | パイプライン実行が終了した時刻。時刻の形式は RFC3339 である必要があります。終了時刻は、開始時刻から 1 年を超えてはなりません。| `2024-08-22T14:36:00-07:00` |
   | URL | CI プロバイダーの UI でパイプラインを確認するための URL。| `http://your-ci-provider.com/pipeline/{pipeline-id}` |

   たとえば、このペイロードは CI パイプラインイベントを Datadog に送信します。

   {{< code-block lang="bash" >}}
   curl -X POST "https://api.datadoghq.com/api/v2/ci/pipeline" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <YOUR_API_KEY>" \
   -d @- << EOF
   {
     "data": {
       "attributes": {
         "provider_name": "<YOUR_CI_PROVIDER>",
         "resource": {
           "level": "pipeline",
           "unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
           "name": "Documentation Build",
           "git": {
             "repository_url": "https://github.com/Datadog/documentation",
             "author_email": "contributor@github.com",
             "sha": "cf852e17dea14008ac83036430843a1c"
           },
           "status": "success",
           "start": "2024-08-22T11:36:29-07:00",
           "end": "2024-08-22T14:36:00-07:00",
           "partial_retry": false,
           "url": ""
         }
       },
       "type": "cipipeline_resource_request"
     }
   }
   EOF
   {{< /code-block >}}

3. パイプラインイベントを Datadog に送信した後、`stage`、`job`、`step` などの追加のイベントタイプをインテグレーションできます。詳細については、[Send Pipeline Event エンドポイント][1]を参照してください。

## 実行中のパイプライン {#running-pipelines}

`status` を `running` に設定して送信されたパイプラインイベントは、最終的なパイプラインイベントと同じ `unique_id` を持ちます。実行中のパイプラインは、実行中に追加情報を加えることで更新できます。実行中のパイプラインは、以下のイベントで構成されます。

1. `status` を `running` に設定した、最初の実行中のパイプラインイベント。
2. オプションとして、`N` 件の実行中のパイプラインイベントがあり、これらは同じ `unique_id` を持ち、`status` が `running` に設定されて追加情報でパイプラインを更新します。
3. 最終的なパイプラインイベントは、`running` のステータスが**なく**、同じ `unique_id` を持ちます。

**注**: フィールドが更新されたとき、UI に表示される値が常に最新の値とは限りません。たとえば、最初の実行中のパイプラインでタグ `my_tag` が `value1` に設定され、その後 `value2` に更新された場合、UI には `value1` ではなく `value2` が表示されることがあります。実行中のパイプラインを更新する場合は、既存のフィールドを変更するのではなく、フィールドを追加することをお勧めします。

## 実行中のジョブ {#running-jobs}

ジョブの実行中にも、`status` を `running` に設定することでジョブイベントを送信できます。実行中のパイプラインと同様に、同じジョブのすべてのイベントは同じ `id` と `pipeline_unique_id` を共有します。実行中のジョブは、以下のイベントで構成されます。

1. `status` を `running` に設定した、最初の実行中のジョブイベント。
2. 終了ステータス (`success` や `error` など) を持ち、同じ `id` と `pipeline_unique_id` を持つ最終的なジョブイベント。

実行中のジョブイベントには、`end` 時間は必要ありません。`end` 時間は、最終的なジョブイベントが送信されたときに設定されます。

## ジョブログの管理 {#manage-job-logs}

### ログ分析 {#logs-analysis}

ログ分析は、LLM モデルを使用して、CI プロバイダーから送信される関連ログに基づき、ジョブの失敗を根本原因別に分類します。
詳細については、[ログ分析ガイド][21]を参照してください。

ログ分析は Datadog でデフォルトで有効になっていますが、以下で説明するように、ジョブログ転送の設定が必要です。[CI/CD 最適化のリポジトリ設定][22]で、
組織または個々のリポジトリに対してログ分析を
有効または無効にできます。

カスタム CI ジョブのログ行を [CI ジョブログインテーク API][19]に送信します。[CI Visibility Pipelines API][1] を通じて送信するパイプラインイベント
およびジョブイベントと一致する識別子を使用してください。各ログオブジェクトには、3 つの必須フィールドがあります。

- `message`: ログ行の空ではないテキスト。
- `pipeline_unique_id`: パイプラインイベントの `resource.unique_id` および
  ジョブイベントの `resource.pipeline_unique_id` と一致する必要があります。
- `job_id`: ジョブイベントの `resource.id` と一致する必要があります。

他のすべてのログフィールドはオプションです。指定する場合、`provider_name` はパイプラインイベントの `provider_name` と一致する必要があります。
パイプラインイベントとログ行の両方からフィールドが省略されている場合、Datadog は `custom` を使用します。

ジョブの実行中にログ行をバッチで送信するか、ジョブの終了時にバッチを送信します。Datadog では、完了したジョブイベントを送信する前に、
すべてのバッチを送信することを推奨します。そのイベントを送信すると、Datadog は新しい行が受信されない状態が 20 秒続いた
後にジョブログを閉じます。ログが閉じられた後に受信した行は、ジョブの Logs タブに表示されない場合があります。

次のリクエストは、ジョブのログ行を 1 行送信します。この例では US1 サイトを使用しています。必要に応じて `datadoghq.com` を
ご利用の Datadog サイトに置き換えてください。

{{< code-block lang="bash" >}}
curl -X POST "https://http-intake.logs.datadoghq.com/api/v2/cilogs" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: <YOUR_API_KEY>" \
-d @- << EOF
{
  "message": "Running go test ./...",
  "pipeline_unique_id": "b3262537-a573-44eb-b777-4c0f37912b05",
  "job_id": "job-456",
  "provider_name": "<YOUR_CI_PROVIDER>"
}
EOF
{{< /code-block >}}

リクエストには、1 つのログオブジェクト、または最大 1,000 個のログオブジェクトの配列を含めることができ、非圧縮時のボディサイズは最大 5.1 MiB です。
圧縮、再試行のガイダンス、オプションの属性、ジョブごとの制限については、[CI ジョブログ送信 API リファレンス][19]を参照してください。

### ログストレージ {#logs-storage}

[ログ分析](#logs-analysis)の記述に従ってジョブログ配信を設定したら、
[CI/CD 最適化のリポジトリ設定][22]に移動し、組織または個々のリポジトリに対してログストレージを有効にします。
保存されたログは、ジョブの {{< ui >}}Logs{{< /ui >}} タブに表示されます。

ログストレージは、CI Visibility とは別に課金されます。ログの保持期間、除外フィルター、インデックスは
[Log Management][20] で構成します。

## Datadog でパイプラインデータを視覚化する {#visualize-pipeline-data-in-datadog}

[**CI Pipeline List**][3] ページおよび [**Executions**][4] ページには、パイプラインの処理が受け付けられた後にデータが表示されます。

**CI Pipeline List** ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。詳細については、[CI パイプラインの検索と管理][13]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/ci-visibility-pipelines/#send-pipeline-event
[2]: /ja/continuous_integration/guides/pipeline_data_model/
[3]: https://app.datadoghq.com/ci/pipelines
[4]: https://app.datadoghq.com/ci/pipeline-executions
[5]: /ja/glossary/#custom-tag
[6]: /ja/glossary/#custom-measure
[7]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /ja/glossary/#manual-step
[9]: /ja/glossary/#parameter
[10]: /ja/glossary/#partial-retry
[11]: /ja/glossary/#pipeline-failure
[12]: /ja/glossary/#queue-time
[13]: /ja/continuous_integration/search/#search-for-pipelines
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: /ja/glossary/#running-pipeline
[16]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[17]: /ja/glossary/#pipeline-execution-time
[19]: /ja/api/latest/ci-visibility-logs/send-ci-job-logs/
[20]: /ja/logs/
[21]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/
[22]: https://app.datadoghq.com/ci/settings/ci-cd/repositories