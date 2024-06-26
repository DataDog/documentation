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
further_reading:
- link: /monitors/types/ci/
  tag: ドキュメント
  text: CI Pipeline モニターの作成
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: CI の表示に関するトラブルシューティング
title: Datadog の CI Pipeline Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

## 概要

[Pipeline Visibility][1] は、パイプラインからの重要なメトリクスと結果を表示することで、CI の健全性に対するパイプライン中心のビューを提供します。これにより、パイプラインの障害のトラブルシューティング、パフォーマンスのボトルネックへの対応、および時間とともに CI のパフォーマンスと信頼性を追跡することができます。

## インテグレーションダッシュボードの作成

{{< whatsnext desc="Datadog で Pipeline Visibility を設定するための CI プロバイダーを選択します。" >}}
    {{< nextlink href="continuous_integration/pipelines/awscodepipeline" >}}AWS CodePipeline{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/azure" >}}Azure{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/buildkite" >}}Buildkite{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/circleci" >}}CircleCI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/codefresh" >}}Codefresh{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/github" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/teamcity" >}}TeamCity{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom" >}}その他の CI プロバイダー{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}カスタムコマンド{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_metrics" >}}カスタムタグとメトリクス{{< /nextlink >}}
{{< /whatsnext >}}

### 用語

CI パイプラインの概念はプロバイダーによって変わる可能性がありますが、それらの概念が Datadog Pipeline Visibility における CI パイプラインの定義にどのように対応するかをご覧ください。

{{< tabs >}}
{{% tab "GitHub Actions" %}}

| CSM Enterprise | Web ビュー追跡 |
|---|---|
| パイプライン | ワークフロー |
| ステージ |  |
| ジョブ | ジョブ |
| 手順 | 手順 |

{{% /tab %}}
{{% tab "GitLab" %}}

| トラブルシューティング | RUM イベントの検索 |
|---|---|
| パイプライン | パイプライン |
| ステージ | ステージ |
| ジョブ | ジョブ |
| ステップ* | スクリプト |

_\*パイプラインのステップ粒度は、Datadog では利用できません。_

{{% /tab %}}
{{% tab "Jenkins" %}}

| Ruby | Flutter エラーを追跡する |
|---|---|
| パイプライン | パイプライン |
| ステージ | ステージ |
| ジョブ | 手順 |
| 手順 |  |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Ruby | Aurora |
|---|---|
| パイプライン | パイプライン |
| ステージ | ワークフロー |
| ジョブ | ジョブ |
| ステップ* | 手順 |

_\*パイプラインのステップ粒度は、Datadog では利用できません。_

{{% /tab %}}
{{% tab "Buildkite" %}}

| Ruby | RDS |
|---|---|
| パイプライン | パイプライン |
| ステージ |  |
| ジョブ | ジョブ |
| ステップ* | 手順 |

_\*パイプラインのステップ粒度は、Datadog では利用できません。_

{{% /tab %}}
{{% tab "TeamCity" %}}

| Ruby | MySQL の設定 |
|---|---|
| パイプライン | ビルドチェーン |
| ステージ |  |
| ジョブ | ビルド |
| ステップ* | 手順 |

_\*パイプラインのステップ粒度は、Datadog では利用できません。_

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Ruby | Azure Pipelines |
|---|---|
| パイプライン | パイプライン |
| ステージ | ステージ |
| ジョブ | ジョブ |
| ステップ* | 手順 |

_\*パイプラインのステップ粒度は、Datadog では利用できません。_

{{% /tab %}}
{{% tab "AWS CodePipeline" %}}

| Ruby | Postgres の設定 |
|---|---|
| パイプライン | パイプライン |
| ステージ | ステージ |
| ジョブ | アクション |
| 手順 |  |

{{% /tab %}}

{{% tab "その他の CI プロバイダー" %}}

| Ruby | その他の CI プロバイダー |
|---|---|
| パイプライン | パイプライン |
| ステージ | ステージ |
| ジョブ | ジョブ |
| 手順 | 手順 |

{{% /tab %}}
{{< /tabs >}}

CI プロバイダーが対応していない場合は、[公開 API エンドポイント][2]から Pipeline Visibility を設定してみてください。

### サポートされる機能

|  | Flutter エラーを追跡する | React Native エラーの追跡 | Aurora | RDS | Expo エラーの追跡 | Azure Pipelines | Google Cloud SQL | MySQL の設定 | AWS Code Pipeline | その他の CI プロバイダー |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="パイプライントレースの視覚化" >}}関連トレーシングを伴うパイプライン実行の視覚化。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Running pipelines" >}}稼働中のパイプライン実行とそれに関連するトレースの識別。{{< /ci-details >}} | | {{< X >}} | | | {{< X >}} | | | | |
| {{< ci-details title="部分的なリトライ" >}}部分的なリトライの識別 (例: ジョブの一部のみがリトライされた場合)。{{< /ci-details >}} |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="ステップスパン" >}}ステップレベルのスパンは、より詳細な可視性を得るために利用できます。{{< /ci-details >}} | {{< X >}} (_ただし、ジョブスパンとして表示されます_) |  |  |  | {{< X >}} |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="手動ステップ" >}}パイプライン全体で、手動承認フェーズを持つジョブがいつ存在するかの識別。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="承認待機時間">}}パイプラインまたはジョブが手動承認を待っている時間の特定。{{< /ci-details >}} |  |  |  |  |  {{< X >}}  |   |   |  |  |  |
| {{< ci-details title="キュー時間" >}}実行前にパイプラインまたはジョブがキューに入っていた時間の識別。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="ログの相関" >}}CI プロバイダーからのパイプラインまたはジョブのログの取得。ログは、パイプライン実行ビューの<strong>Logs</strong> タブに表示されます。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="インフラストラクチャーメトリクスの相関" >}}Datadog Agent、CI パイプライン、またはジョブランナーのホストレベルの情報と CI パイプライン実行データの相関。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |  |
| {{< ci-details title="datadog-ci を使ってトレースされるコマンド用のカスタムスパン" >}}パイプラインフレームグラフの視覚化に組み込まれるコマンドレベルイベントの CI Visibility への送信をサポートします。その後、<a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">これらのイベント</a>に対するクエリや分析が可能です。{{< /ci-details >}} | {{< X >}} |  | {{< X >}} |  |  |  |  |  |  |  |
| {{< ci-details title="事前定義のカスタムタグ" >}}実行間で変化しない静的なパイプラインタグをCI プロバイダーで設定する機能をサポートします。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  |  |  |
| {{< ci-details title="ランタイムのカスタムタグおよびメトリクス" >}}CI Visibility でパイプラインとジョブに<a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_metrics/">ユーザー定義のテキストおよび数値タグ</a>を追加する機能をサポートします。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  |  |  {{< X >}} |
| {{< ci-details title="パラメーター" >}}ユーザーが設定するカスタムパイプラインパラメーター (例: <code>DYNAMICS_IS_CHILD:true</code>) を追加する機能をサポートします。その後、<a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility Explorer</a> 内でこれらのパラメーターを使って検索し、特定のパラメーターを持つすべてのイベントを見つけることができます。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} |  |  |  {{< X >}} |
| {{< ci-details title="パイプラインの障害理由" >}}パイプラインまたはジョブの障害の背後にある特定の理由の識別。{{< /ci-details >}} | {{< X >}} | {{< X >}} |  |  |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |

## CI パイプラインデータの使用

[ダッシュボード][8]または[ノートブック][9]を作成する際、検索クエリで CI パイプラインデータを使用すると、視覚化ウィジェットのオプションが更新されます。詳細については、[ダッシュボード][10]と[ノートブックのドキュメント][11]を参照してください。

## パイプラインデータのアラート

**Export** ボタンをクリックすると、[**Pipelines Executions** ページ][6]または [**Test Runs** ページ][13]の [CI Pipeline モニター][12]に検索クエリをエクスポートできます。

## その他の参考資料

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