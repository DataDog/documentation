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
- link: https://www.datadoghq.com/blog/aws-codepipeline-ci-visibility/
  tag: ブログ
  text: Datadog CI Visibility で AWS CodePipeline 上の CI/CD を監視・改善する
title: AWS CodePipeline パイプラインでトレースをセットアップする
---

## 概要

[AWS CodePipeline][1] は、フルマネージド型の継続的デリバリーサービスで、アプリケーションとインフラストラクチャーを高速かつ確実にアップデートできるよう、リリースパイプラインの自動化を支援します。

AWS CodePipeline でトレースをセットアップすると、パイプラインの実行に関するデータを収集し、パフォーマンスのボトルネックや運用上の問題を分析し、デプロイメントワークフローを監視できます。

### 互換性

| Pipeline Visibility | プラットフォーム | 定義 |
|---|---|---|
| [部分的なリトライ][14] | 部分的なパイプライン | 部分的にリトライされたパイプラインの実行を表示します。 |
| *[実行中のパイプライン][15] | 実行中のパイプライン | 実行中のパイプラインを表示します。キューに置かれているパイプラインや待機中のパイプラインは、Datadog で "Running" のステータスと共に表示されます。 |
| **ログの相関付け | ログの相関付け | パイプラインとジョブスパンを相関付けして、[ジョブログの相関付け](#collect-job-logs)を可能にします。 |
| [承認待ち時間][17] | 承認待ち時間  | ジョブとパイプラインの相互承認の待ち時間を表示します。 |
| [カスタムスパン][18] | カスタムスパン | パイプラインのカスタムスパンを構成します。 |

*AWS CodePipeline の実行中のパイプラインは、終了するまで Git の情報を持ちません。\
**AWS CodePipeline のログの相関付けは、AWS CodeBuild のアクションにのみ利用可能です。

## Datadog インテグレーションの構成

[AWS CodePipeline][1] と Datadog CI Visibility との間のインテグレーションを設定するには、2 つの AWS リソースを作成します。

1. [API 送信先][2]: Datadog のインテークを指す HTTP エンドポイント。
2. [AWS EventBridge ルール][3]: CodePipeline イベントを API 送信先に転送するするルール。

これらのリソースは、EventBridge ルールの作成プロセス内で個別に作成することも、同時に作成することもできます。
パイプラインイベントの監視の詳細については、[AWS 公式ガイド][4]を参照してください。

### API 送信先の作成

1. AWS Console で **EventBridge > API destinations** に移動し、**Create API destination** をクリックします。
2. API 送信先の名前を選択し (例: **datadog-ci-visibility-api**)、オプションで説明を追加します。
3. **API destination endpoint** に <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook</code> と入力します。
4. **HTTP method** で **POST** を選択します。
5. Connection type で **Create a new connection** を選択します。
   1. 接続名を選択し (例: **datadog-ci-visibility-connection**)、オプションで説明を追加します。
   2. **Destination type** で **Other** を選択します。
   3. **Authorization type** で **API key** を選択します。
   **API key name** に `DD-API-KEY` と入力し、**Value** フィールドに [Datadog API キー][5]を入力します。
6. **Create** をクリックします。

### EventBridge ルールの作成

1. AWS Console で **EventBridge > Rules** に移動し、**Create Rule** をクリックします。
2. ルール名を選択し (例: **datadog-ci-visibility-integration**)、オプションで説明を追加します。
3. イベントバスは**デフォルト**のままとし、**Rule Type** で **Rule with an event pattern** を選択します。**Next** をクリックします。
4. **Event Source** で **AWS events or EventBridge partner events** を選択します。
5. **Creation Method** で **Custom pattern (JSON editor)** を選択し、**Event Pattern** で次の JSON を入力します。
   ```
   {
     "source": ["aws.codepipeline"],
     "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"]
   }
   ```
   上記の JSON ですべてのパイプラインのインテグレーションが設定されます。パイプラインのセットを制限するには、下の[特定のパイプラインのみ監視][7]セクションに従います。
6. **Next** をクリックします。
7. **Target Types** で **EventBridge API destination** を選択します。次に **Use an existing API Destination** を選択し、先ほど作成した API 宛先を選択します。または、[API 宛先の作成][6] セクションで説明した手順に従って API 宛先を作成することもできます。
8. **Headers Parameters** で **Add header parameter** をクリックします。キーに `DD-CI-PROVIDER-AWSCODEPIPELINE` と入力し、値に `true` と入力します。
9. **Create a new role for this specific resource** を選択します (または、既存のロールを使用)。
10. 情報が正しいことを確認し、ルールを作成します。

ルールの作成が完了したら、インテグレーションは完了で、Datadog でパイプラインを監視できます。

### 特定のパイプラインのみ監視

オプションで、Pipeline Visibility で監視するパイプラインを制限することもできます。
これを行うには、EventBridge ルールの作成時に定義したルールイベント パターンに `detail.pipeline` フィルターを追加します。例:

```
 {
   "source": ["aws.codepipeline"],
   "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change", "CodePipeline Stage Execution State Change"],
   "detail": {
     "pipeline": ["first-pipeline", "second-pipeline"]
   }
 }
 ```

上記のイベントパターンでは、`first-pipeline` と `second-pipeline` のパイプラインに対してのみ、インテグレーションが設定されます。

### パイプラインとテストの相関付け

[Test Visibility][8] を使用していて、パイプラインにテストを実行する [AWS CodeBuild][9] アクションが 1 つ以上含まれている場合、Datadog Pipeline Visibility 内でテストを関連するパイプラインと相関付けることができます。手順については、[パイプライン実行 ID の追加](#add-the-pipeline-execution-id-as-an-environment-variable) を参照してください。

### ログの相関付けの有効化

AWS CodePipeline インテグレーション は、**CodeBuild** アクションとそれぞれのジョブおよびパイプラインスパンとの相関付けをサポートしています。CodeBuild アクションに対してログ収集を有効にするには、[AWS ログ転送ガイド][16]を参照してください。

<div class="alert alert-danger"><strong>注</strong>: CodeBuild アクションを対象としたログの相関付けを行うには、CodeBuild プロジェクトにデフォルトの CloudWatch ロググループおよびログストリーム名が必要です。</div>

<div class="alert alert-info"><strong>注</strong>: ログは CI Visibility とは別に課金されます。ログの保持、除外、インデックスの構成は、ログの設定で行います。AWS CodeBuild のログは <code>source:codebuild</code> と <code>sourcecategory:aws</code> のタグで識別できます。</div>

<div class="alert alert-info"><strong>注</strong>: ログの収集は、<a href="https://docs.datadoghq.com/data_security/pci_compliance/?tab=logmanagement">PCI 準拠の組織</a>では利用できません。</div>

### パイプライン実行 ID を環境変数として追加する

パイプライン実行 ID は、Datadog がパイプライン実行を一意に識別するために必要とする識別子です。以下の手順を実行してパイプライン実行 ID を割り当て、パイプラインとテストおよびカスタムコマンドを相関付けます。

1. AWS Console でパイプライン構成に移動し、**Edit** をクリックします。
2. AWS CodeBuild アクションを含むステージに移動し、**Edit Stage** をクリックして、該当するアクションを編集します。
3. **Environment variables** で環境変数を追加します。
変数名は `DD_PIPELINE_EXECUTION_ID` とし、値は `#{codepipeline.PipelineExecutionId}` にします。タイプは _Plaintext_ のままにします。
4. **Done** をクリックして変更内容を保存します。

上記の手順で、パイプライン実行 ID を CodeBuild アクション環境変数に追加できます。変数の扱い方については、[AWS 公式ガイド][10] を参照してください。

## Datadog でパイプラインデータを視覚化する

パイプラインが終了した後に、[**CI Pipeline List**][11] と [**Executions**][12] のページでデータを確認します。

**CI Pipeline List** ページには、各リポジトリの[デフォルトブランチ][13]のデータのみが表示されます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/codepipeline/
[2]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-api-destinations.html
[3]: https://aws.amazon.com/eventbridge/
[4]: https://docs.aws.amazon.com/codepipeline/latest/userguide/detect-state-changes-cloudwatch-events.html
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/continuous_integration/pipelines/awscodepipeline/#create-the-api-destination
[7]: /ja/continuous_integration/pipelines/awscodepipeline/#only-monitor-specific-pipelines
[8]: https://docs.datadoghq.com/ja/continuous_integration/tests/
[9]: https://aws.amazon.com/codebuild/
[10]: https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-variables.html
[11]: https://app.datadoghq.com/ci/pipelines
[12]: https://app.datadoghq.com/ci/pipeline-executions
[13]: https://docs.datadoghq.com/ja/continuous_integration/troubleshooting/#the-default-branch-is-not-correct
[14]: /ja/glossary/#partial-retry
[15]: /ja/glossary/#running-pipeline
[16]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[17]: /ja/glossary/#approval-wait-time
[18]: /ja/glossary/#custom-span
