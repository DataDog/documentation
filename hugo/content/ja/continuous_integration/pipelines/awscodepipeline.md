---
aliases:
- /ja/continuous_integration/setup_pipelines/codepipeline
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
- link: /continuous_integration/search/
  tag: ドキュメント
  text: CI パイプラインの検索と管理
- link: https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility を使用して AWS CodePipeline 上の CI/CD を監視および改善する
title: CI Visibility 向けの AWS CodePipeline のセットアップ
---
## 概要{#overview}

[AWS CodePipeline][1] は、アプリケーションとインフラストラクチャーを迅速かつ確実に更新できるようにするために、リリースパイプラインを自動化することができる、フルマネージドの継続的デリバリーサービスです。

AWS CodePipeline 用の CI Visibility をセットアップして、パイプライン実行に関するデータを収集し、パフォーマンスのボトルネックや運用上の問題を分析し、デプロイワークフローを監視します。

### 互換性 {#compatibility}

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [部分的なリトライ][14] | 部分パイプライン | 部分的にリトライされたパイプライン実行を表示します。|
| *[実行中のパイプライン][15] | 実行中のパイプライン | 稼働中のパイプライン実行を表示します。キューに入っているパイプラインまたは待機中のパイプラインは、Datadog では「Running (稼働中)」ステータスで表示されます。|
| **ログ相関 | ログ相関	| パイプラインとジョブのスパンをログに関連付けます。[ログストレージ](#logs-storage)が必要です。|
| [承認待ち時間][17] | 承認待ち時間  | ジョブとパイプラインの手動承認の待ち時間を表示します。|
| [カスタムスパン][18] | カスタムスパン | パイプラインのカスタムスパンを構成します。|
| [クリティカルパスで CI ジョブをフィルタリングする][19] | クリティカルパスで CI ジョブをフィルタリングする | クリティカルパスのジョブでフィルタリングします。|
| [実行時間][20] | 実行時間  | パイプラインによるジョブ実行時間を表示します。|

*AWS CodePipeline の稼働中のパイプラインには、完了するまで Git 情報は含まれません。\
**AWS CodePipeline のログ相関は、AWS CodeBuild アクションでのみ利用可能です。

### 用語 {#terminology}

次の表に、Datadog CI Visibility と AWS CodePipeline の概念の対応を示します。

| Datadog  | AWS CodePipeline |
|----------|------------------|
| パイプライン | パイプライン         |
| ステージ    | ステージ            |
| ジョブ      | アクション           |

## Datadog インテグレーションの構成 {#configure-the-datadog-integration}

[AWS CodePipeline][1] と Pipeline Visibility 間のインテグレーションをセットアップするには、2 つの AWS リソースを作成します。

[API 宛先][2]
: Datadog のインテークを指す HTTP エンドポイント。

[AWS EventBridge ルール][3]
: CodePipeline イベントを API 宛先に転送するルール。

これらのリソースは、個別に作成することも、EventBridge ルールの作成中に同時に作成することもできます。
パイプラインイベントの監視の詳細については、[公式の AWS ガイド][4]を参照してください。

## API 宛先を作成する {#create-the-api-destination}

1. AWS コンソールで、[{{< ui >}}EventBridge{{< /ui >}}] > [{{< ui >}}API destinations{{< /ui >}}] (API 宛先) に移動し、[{{< ui >}}Create API destination{{< /ui >}}] (API 宛先の作成) をクリックします。
2. API 宛先の名前 (例: `datadog-ci-visibility-api`) を選択し、必要に応じて説明を追加します。
3. [{{< ui >}}API destination endpoint{{< /ui >}}] (API 宛先エンドポイント) で、 <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code>を入力します。
4. [{{< ui >}}HTTP method{{< /ui >}}] (HTTP メソッド) で、[{{< ui >}}POST{{< /ui >}}] を選択します。
5. [Connection type] (接続タイプ) で、[{{< ui >}}Create a new connection{{< /ui >}}] (新規接続を作成) を選択します。
   1. 接続の名前 (例: `datadog-ci-visibility-connection`) を選択し、必要に応じて説明を追加します。
   2. [{{< ui >}}Destination type{{< /ui >}}] (宛先タイプ) で、[{{< ui >}}Other{{< /ui >}}] (その他) を選択します。
   3. [{{< ui >}}Authorization type{{< /ui >}}] (承認タイプ) で、[{{< ui >}}API key{{< /ui >}}] (API キー) を選択します。[{{< ui >}}API key name{{< /ui >}}] (API キー名) に `DD-API-KEY` を入力し、[{{< ui >}}Value{{< /ui >}}] (値) フィールドに [Datadog API キー][5]を追加します。
6. [{{< ui >}}Create{{< /ui >}}] (作成) をクリックします。

## EventBridge ルールを作成する {#create-the-eventbridge-rule}

1. AWS コンソールで、[{{< ui >}}EventBridge{{< /ui >}}] > [{{< ui >}}Rules{{< /ui >}}] (ルール) に移動し、[{{< ui >}}Create Rule{{< /ui >}}] (ルールを作成) をクリックします。
2. ルールの名前を選択し (例: `datadog-ci-visibility-integration`)、必要に応じて説明を追加します。
3. イベントバスは [{{< ui >}}default{{< /ui >}}] (デフォルト) のままにし、[{{< ui >}}Rule Type{{< /ui >}}] (ルールタイプ) で [{{< ui >}}Rule with an event pattern{{< /ui >}}] (イベントパターンのルール) を選択します。[{{< ui >}}Next{{< /ui >}}] (次へ) をクリックします。
4. [{{< ui >}}Event Source{{< /ui >}}] (ソース) で、[{{< ui >}}AWS events or EventBridge partner events{{< /ui >}}] (AWS イベントまたは EventBridge パートナーイベント) を選択します。
5. [{{< ui >}}Creation Method{{< /ui >}}] (メソッドを作成) で、[{{< ui >}}Custom pattern (JSON editor){{< /ui >}}] (カスタムパターン (JSON エディター)) を選択します。次に、[{{< ui >}}Event Pattern{{< /ui >}}] (イベントパターン) で、以下を入力します。

   ```json
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```

   上記の JSON は、すべてのパイプラインのインテグレーションをセットアップします。パイプラインのセットを制限するには、
   以下の「[モニター固有のパイプラインのみ](#only-monitor-specific-pipelines)」セクションに従ってください。

6. [{{< ui >}}Next{{< /ui >}}] (次へ) をクリックします。
7. [{{< ui >}}Target Types{{< /ui >}}] (タイプ) で、[{{< ui >}}EventBridge API destination{{< /ui >}}] (EventBridge API 宛先) を選択します。次に、[{{< ui >}}Use an existing API Destination{{< /ui >}}] (既存の API 宛先を使用) を選択し、前のステップで作成した API 宛先を選択します。または、「[API 宛先の作成](#create-the-api-destination)」セクションで説明されている手順に従って、API 宛先を作成することもできます。
8. [{{< ui >}}Headers Parameters{{< /ui >}}] (ヘッダーパラメーター) で、[{{< ui >}}Add header parameter{{< /ui >}}] (ヘッダーパラメーターの追加) をクリックします。キーとして `DD-CI-PROVIDER-AWSCODEPIPELINE` を入力し、値として `true` を入力します。
9. [{{< ui >}}Create a new role for this specific resource{{< /ui >}}] (この特定のリソースに新しいロールを作成する) を選択します (または既存のロールを使用します)。
10. 情報が正しいことを確認し、ルールを作成します。

ルールを作成すると、Datadog でパイプラインを監視できるようになります。

## 高度な構成 {#advanced-configuration}

### 特定のパイプラインのみを監視する {#only-monitor-specific-pipelines}

必要に応じて、Pipeline Visibility で監視するパイプラインを制限できます。
これを行うには、EventBridge ルールを作成する際に定義されるルールイベントパターンに `detail.pipeline` フィルターを追加します。例:

```json
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
 ```

イベントパターンによって、`first-pipeline` パイプラインと `second-pipeline` パイプラインに対してのみインテグレーションを設定します。

### パイプラインとテストを関連付ける {#correlate-pipelines-with-tests}

[Test Optimization][8] を使用しており、パイプラインにテストを実行するための [AWS CodeBuild][9] アクションが 1 つ以上含まれている場合は、Datadog Pipeline Visibility 内でテストを関連するパイプラインと関連付けることができます。手順については、「[パイプライン実行 ID を追加する](#add-the-pipeline-execution-id-as-an-environment-variable)」を参照してください。

### ログストレージ {#logs-storage}

AWS CodePipeline インテグレーションは、**CodeBuild** アクションと、それに対応するジョブおよびパイプラインのスパンの関連付けをサポートしています。CodeBuild アクションでログストレージを有効にするには、[AWS ログ転送ガイド][16]を参照してください。

<div class="alert alert-warning">CodeBuild アクションにカスタム CloudWatch ロググループ名またはログストリーム名を使用している場合は、Datadog がカスタムロググループとストリーム構成を解決できるように、AWS インテグレーションで<a href="/integrations/amazon_web_services/#resource-collection">クラウドリソースコレクション</a>を有効にしてください。</div>

ログストレージは、CI Visibility とは別に課金されます。ログの保持、除外、インデックスは [Log Management][21] で構成されます。AWS CodeBuild のログは、`source:codebuild` タグと `sourcecategory:aws` タグで識別できます。

### パイプライン実行 ID を環境変数として追加する {#add-the-pipeline-execution-id-as-an-environment-variable}

パイプライン実行 ID は、Datadog がパイプライン実行を一意に識別するために必要な識別子です。パイプラインをテストおよびカスタムコマンドに関連付けるために、以下の手順を実行してパイプライン実行 ID を割り当てます。

1. AWS Console でパイプライン構成に移動し、[{{< ui >}}Edit{{< /ui >}}] (編集) をクリックします。
2. AWS CodeBuild アクションを含むステージに移動し、[{{< ui >}}Edit Stage{{< /ui >}}] (ステージを編集) をクリックして、該当するアクションを編集します。
3. [{{< ui >}}Environment variables{{< /ui >}}] (環境変数) で、環境変数を追加します。
変数名として `DD_PIPELINE_EXECUTION_ID` を指定し、値を `#{codepipeline.PipelineExecutionId}` に設定します。タイプは _Plaintext_ のままにします。
4. [{{< ui >}}Done{{< /ui >}}] (完了) をクリックして変更内容を保存します。

上記の手順により、パイプライン実行 ID を CodeBuild アクションの環境変数に追加できます。変数の操作に関する詳細については、[公式の AWS ガイド][10]を参照してください。

## Datadog でパイプラインデータを視覚化する{#visualize-pipeline-data-in-datadog}

パイプラインが終了したら、[[**CI Pipeline List**] (CI パイプラインリスト)][11] ページおよび [[**Executions**] (実行)][12] ページでデータを確認します。

[{{< ui >}}CI Pipeline List{{< /ui >}}] (CI パイプラインリスト) ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。詳しくは、「[CI パイプラインの検索と管理][13]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/codepipeline/
[2]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /ja/tests/
[9]: https://aws.amazon.com/codebuild/
[10]: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html
[11]: https://app.datadoghq.com/ci/pipelines
[12]: https://app.datadoghq.com/ci/pipeline-executions
[13]: /ja/continuous_integration/search/#search-for-pipelines
[14]: /ja/glossary/#partial-retry
[15]: /ja/glossary/#running-pipeline
[16]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[17]: /ja/glossary/#approval-wait-time
[18]: /ja/glossary/#custom-span
[19]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[20]: /ja/glossary/#pipeline-execution-time
[21]: /ja/logs/guide/best-practices-for-log-management/