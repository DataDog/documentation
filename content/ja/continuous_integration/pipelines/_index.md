---
aliases:
- /ja/continuous_integration/pipelines_setup/
- /ja/continuous_integration/explore_pipelines/
- /ja/continuous_integration/setup_pipelines/
cascade:
  algolia:
    rank: 70
    tags:
    - CI パイプライン
    - CI パイプライン
    - サポートされる機能
further_reading:
- link: /monitors/types/ci/
  tag: ドキュメント
  text: CI Pipeline モニターの作成
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: CI Visibility のトラブルシューティング
title: Datadog の CI Pipeline Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[Pipeline Visibility][1] は、CI の健全性をパイプライン中心で表示し、パイプラインからの重要なメトリクスと結果を提供します。これにより、パイプラインの障害をトラブルシュートし、パフォーマンスのボトルネックに対処し、CI のパフォーマンスと信頼性を長期的に追跡するのに役立ちます。

## セットアップ

{{< whatsnext desc="Datadog で Pipeline Visibility を設定するための CI プロバイダーを選択します。" >}}
 {{< nextlink href="continuous_integration/pipelines/awscodepipeline" >}}AWS CodePipeline{{< /nextlink >}}
{{< nextlink href="continuous_integration/pipelines/azure" >}}Azure{{< /nextlink >}}    {{< nextlink href="continuous_integration/pipelines/buildkite" >}}Buildkite{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/circleci" >}}CircleCI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/codefresh" >}}Codefresh{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/github" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/teamcity" >}}TeamCity{{< /nextlink >}}
 {{< nextlink href="continuous_integration/pipelines/custom" >}}その他の CI プロバイダー{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}カスタムコマンド{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_measures" >}}カスタムタグと測定値{{< /nextlink >}}
{{< /whatsnext >}}

### 用語

CI パイプラインの概念はプロバイダーによって異なる場合がありますが、Datadog Pipeline Visibility での CI パイプラインの定義とそれらの概念がどのように対応しているかを確認してください。

{{< tabs >}}
{{% tab "GitHub Actions" %}}

| Datadog  | GitHub Actions |
|----------|----------------|
| パイプライン | ワークフロー       |
| ジョブ      | ジョブ            |
| 手順     | 手順           |

{{% /tab %}}
{{% tab "GitLab" %}}

| Datadog                    | GitLab   |
|----------------------------|----------|
| パイプライン                   | パイプライン |
| ステージ                      | ステージ    |
| ジョブ                        | ジョブ      |
| _Datadog では利用不可_ | スクリプト   |

{{% /tab %}}
{{% tab "Jenkins" %}}

| Datadog  | Jenkins  |
|----------|----------|
| パイプライン | パイプライン |
| ステージ    | ステージ    |
| ジョブ      | 手順     |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Datadog                    | CircleCI  |
|----------------------------|-----------|
| パイプライン                   | ワークフロー  |
| ジョブ                        | ジョブ       |
| _Datadog では利用不可_ | 手順      |

{{% /tab %}}
{{% tab "Buildkite" %}}

| Datadog                    | Buildkite |
|----------------------------|-----------|
| パイプライン                   | パイプライン  |
| ジョブ                        | ジョブ       |
| _Datadog では利用不可_ | 手順      |

{{% /tab %}}
{{% tab "TeamCity" %}}

| Datadog                    | TeamCity    |
|----------------------------|-------------|
| パイプライン                   | ビルドチェーン |
| ジョブ                        | ビルド       |
| _Datadog では利用不可_ | 手順        |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Datadog                    | Azure Pipelines |
|----------------------------|-----------------|
| パイプライン                   | パイプライン        |
| ステージ                      | ステージ           |
| ジョブ                        | ジョブ             |
| _Datadog では利用不可_ | 手順            |

{{% /tab %}}
{{% tab "AWS CodePipeline" %}}

| Datadog  | AWS CodePipeline |
|----------|------------------|
| パイプライン | パイプライン         |
| ステージ    | ステージ            |
| ジョブ      | アクション           |

{{% /tab %}}

{{% tab "その他の CI プロバイダー" %}}

| Datadog  | その他の CI プロバイダー |
|----------|--------------------|
| パイプライン | パイプライン           |
| ステージ    | ステージ              |
| ジョブ      | ジョブ                |
| 手順     | 手順               |

{{% /tab %}}
{{< /tabs >}}

CI プロバイダーが対応していない場合は、[公開 API エンドポイント][2]から Pipeline Visibility を設定してみてください。

### サポートされる機能

|  | Jenkins | GitLab | CircleCI | Buildkite | GitHub Actions | Azure Pipelines | Codefresh | TeamCity | AWS CodePipeline | その他の CI プロバイダー |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="パイプライントレースの可視化" >}}パイプライン実行と関連するトレースの可視化。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="実行中のパイプライン" >}}稼働中のパイプライン実行の識別と関連するトレース。{{< /ci-details >}} | | {{< X >}} | | | {{< X >}} | | | | {{< X >}} |
| {{< ci-details title="部分再試行" >}}部分再試行の識別 (例えば、ジョブの一部のみが再試行された場合)。{{< /ci-details >}} |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="ステップスパン" >}}ステップレベルのスパンは、より詳細な可視性を得るために利用できます。{{< /ci-details >}} | {{< X >}} (_ただし、ジョブスパンとして表示されます_) |  |  |  | {{< X >}} |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="手動ステップ" >}}パイプライン全体に手動承認フェーズがあるジョブの識別。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="承認待ち時間" >}}パイプラインまたはジョブが手動承認を待っている時間。{{< /ci-details >}} |  | {{< X >}} |  |  |  {{< X >}}  | {{< X >}}  |   |  | {{< X >}} |  |
| {{< ci-details title="キュー時間" >}}パイプラインまたはジョブが実行前にキューにあった時間。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="実行時間" >}}パイプラインがジョブをアクティブに稼働した時間。{{< /ci-details >}} | | {{< X >}} | | | | | | | | |
| {{< ci-details title="ログの相関付け" >}}CI プロバイダーからのパイプラインまたはジョブのログの取得。ログは、パイプライン実行ビューの <strong>Logs</strong> タブに表示されます。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |  |
| {{< ci-details title="インフラストラクチャーメトリクスの相関付け" >}}Datadog Agent、CI パイプライン、またはジョブランナーのホストレベルの情報を CI パイプラインの実行データと相関付け。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="datadog-ci を使用したトレースコマンドのカスタムスパン" >}}パイプラインのフレームグラフによる視覚化に組み込むために、コマンドレベルイベントの CI Visibility への送信をサポート。その後、<a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">これらのイベント</a>のクエリと分析が可能になります。{{< /ci-details >}} | {{< X >}} |  | {{< X >}} |  |  |  |  |  |  |  |
| {{< ci-details title="カスタム事前定義タグ" >}}CI プロバイダーで、実行間で変化しない静的なパイプラインタグの設定をサポート。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |
| {{< ci-details title="カスタムタグとランタイムの測定値" >}}CI Visibility で、<a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">テキストと数字で構成されたユーザー定義タグ</a>のパイプラインおよびジョブへの追加をサポート。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  |  {{< X >}} |
| {{< ci-details title="パラメーター" >}}ユーザーが設定したカスタムパイプラインパラメーター (例: <code>DYNAMICS_IS_CHILD:true</code>) の追加をサポート。その後、<a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility Explorer</a> でこれらのパラメーターを使って検索を行い、特定のパラメーターを持つすべてのイベントを見つけることができます。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="パイプラインの失敗理由" >}}パイプラインやジョブの失敗の背後にある具体的な理由の特定。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |

## CI パイプラインデータの使用

[ダッシュボード][8]または[ノートブック][9]を作成する際、検索クエリで CI パイプラインデータを使用すると、視覚化ウィジェットのオプションが更新されます。詳細については、[ダッシュボード][10]と[ノートブックのドキュメント][11]を参照してください。

## パイプラインデータのアラート

**Export** ボタンをクリックすると、[**Executions** ページ][6]または [**Test Runs** ページ][13]の [CI Pipeline モニター][12]に検索クエリをエクスポートできます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[2]: /ja/api/latest/ci-visibility-pipelines/#send-pipeline-event
[6]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /ja/dashboards
[11]: /ja/notebooks
[12]: /ja/monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs