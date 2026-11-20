---
aliases:
- /ja/continuous_integration/pipelines_setup/
- /ja/continuous_integration/explore_pipelines/
- /ja/continuous_integration/setup_pipelines/
cascade:
  algolia:
    rank: 70
    tags:
    - ci pipeline
    - ci pipelines
    - supported features
disable_sidebar: true
further_reading:
- link: /monitors/types/ci/
  tag: ドキュメント
  text: CI Pipeline モニターの作成
- link: /account_management/billing/ci_visibility
  tag: ドキュメント
  text: CI Visibility の課金について学習する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: Datadog における CI Pipeline Visibility
---
## 概要{#overview}

[CI Visibility][1] は、パイプラインからの重要なメトリクスと結果を表示することで、CI の健全性に関するパイプラインを主としたビューを提供します。これは、パイプラインの障害のトラブルシューティング、パフォーマンスのボトルネックへの対処、および一定期間における CI のパフォーマンスと信頼性の追跡に役立ちます。

## セットアップ {#setup}

Datadog で CI Visibility をセットアップするには、CI プロバイダーを選択します。

{{< card-grid card_width="225px" >}}
  {{< image-card href="/continuous_integration/pipelines/awscodepipeline/" src="integrations_logos/aws-codepipeline_small.svg" alt="aws codepipeline" >}}
  {{< image-card href="/continuous_integration/pipelines/azure/" src="integrations_logos/azure-pipelines_small.svg" alt="azure devops extension" >}}
  {{< image-card href="/continuous_integration/pipelines/buildkite/" src="integrations_logos/buildkite_small.svg" alt="buildkite" >}}
  {{< image-card href="/continuous_integration/pipelines/circleci/" src="integrations_logos/circleci.png" alt="circleci orb" >}}
  {{< image-card href="/continuous_integration/pipelines/codefresh/" src="integrations_logos/codefresh_small.svg" alt="codefresh" >}}
  {{< image-card href="/continuous_integration/pipelines/github/" src="integrations_logos/github_small.svg" alt="github actions" >}}
  {{< image-card href="/continuous_integration/pipelines/gitlab/" src="integrations_logos/gitlab-logo-100.svg" alt="gitlab" >}}
  {{< image-card href="/continuous_integration/pipelines/jenkins/" src="integrations_logos/jenkins.png" alt="jenkins" >}}
  {{< image-card href="/continuous_integration/pipelines/teamcity/" src="integrations_logos/teamcity_small.svg" alt="teamcity" >}}
  {{< image-card href="/continuous_integration/pipelines/custom/" src="integrations_logos/docs_other_ci_providers.png" alt="その他の CI プロバイダー" >}}
{{< /card-grid >}}

{{< whatsnext desc="カスタマイズオプションについては、以下のセクションを参照してください。" >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}カスタムコマンド{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_measures" >}}カスタムタグと測定値{{< /nextlink >}}
{{< /whatsnext >}}

## サポートされる機能 {#supported-features}

### Pipeline Visibility と実行 {#pipeline-visibility-and-execution}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | その他の CI プロバイダー |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="ログストレージ" >}}CI プロバイダーからのパイプラインログまたはジョブログのストレージ。ログは、[Pipeline Execution] (パイプライン実行) ビューの [<strong>Logs</strong>] (ログ) タブに表示されます。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="インフラストラクチャーの相関" >}}Datadog Agent、CI パイプライン、またはジョブランナーのホストレベル情報と CI パイプライン実行データの相関。{{< /ci-details >}} |  |  | {{< X >}} |  |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="実行中のパイプライン" >}}稼働中のパイプライン実行の識別と関連するトレース。{{< /ci-details >}} | {{< X >}} | | | | | {{< X >}} | {{< X >}} | {{< X >}} | | {{< X >}} |
| {{< ci-details title="実行中のジョブ" >}}稼働中のジョブ実行の識別と関連するトレース。{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  | {{< X >}} |
| {{< ci-details title="部分的なリトライ" >}}部分再試行の識別 (たとえば、ジョブの一部のみが再試行された場合)。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  {{< X >}} |
| {{< ci-details title="ステップの粒度" >}}ステップレベルのスパンは、より詳細な可視性を得るために利用できます。{{< /ci-details >}} |  |  |  |  | {{< X >}} | {{< X >}} |  | {{< X >}} <br /> (_ジョブスパンとして表示されます_) |  |  {{< X >}} |
| {{< ci-details title="手動ステップ" >}}パイプライン全体に手動承認フェーズがあるジョブの識別。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |

### 自動分析とアクション {#automatic-analysis-and-actions}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | その他の CI プロバイダー |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="ログ分析" >}}関連するログに対して LLM モデルを使用し、失敗した CI ジョブの根本原因を分析します。<a href="https://docs.datadoghq.com/continuous_integration/guides/use_ci_jobs_failure_analysis/">詳細情報</a>。{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | |  |  |
| {{< ci-details title="クリティカルパス" >}}パイプラインのクリティカルパス上にある CI ジョブの識別。<a href="https://docs.datadoghq.com/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/">詳細情報</a>{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="自動ジョブ再試行" >}}Datadog は、AI エラーモデルによって一時的なものと分類された失敗ジョブを再試行します。<a href="https://docs.datadoghq.com/continuous_integration/pipelines/automatic_retries/">詳細情報</a>。{{< /ci-details >}} |  |  |  |  |  | {{< X >}} | {{< X >}} |  |  |  |

### 期間の内訳 {#duration-breakdown}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | その他の CI プロバイダー |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="実行時間" >}}パイプラインがアクティブにジョブを実行していた時間。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |
| {{< ci-details title="Queue time" >}}パイプラインまたはジョブが実行前にキューにあった時間。{{< /ci-details >}} |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  {{< X >}} |
| {{< ci-details title="承認待ち時間">}}パイプラインまたはジョブが手動承認を待っている時間。{{< /ci-details >}} | {{< X >}} | {{< X >}}  |  |  |   |  {{< X >}}  | {{< X >}} |  |  |  |

### カスタマイズと拡張性 {#customization-and-extensibility}

| <div style="width:200px"><div> | AWS CodePipeline | Azure Pipelines | Buildkite | CircleCI | Codefresh | GitHub Actions | GitLab | Jenkins | TeamCity | その他の CI プロバイダー |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| {{< ci-details title="カスタムコマンド" >}}datadog-ci を使用してコマンドレベルのイベントを CI Visibility に送信し、パイプラインのウォーターフォール視覚化に組み込むためのサポート。その後、<a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_commands/">これらのイベント</a>をクエリして分析できます。{{< /ci-details >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="静的タグ" >}}CI プロバイダーで、実行間で変化しない静的なパイプラインタグの設定をサポート。{{< /ci-details >}} |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  |
| {{< ci-details title="ランタイムタグ" >}}CI Visibility のパイプラインおよびジョブへの<a href="https://docs.datadoghq.com/continuous_integration/pipelines/custom_tags_and_measures/">ユーザー定義のテキストタグおよび数値タグ</a>の追加のサポート。{{< /ci-details >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} | {{< X >}} |  |  {{< X >}} |
| {{< ci-details title="パラメーター" >}}ユーザーが設定するカスタムパイプラインパラメーターの追加のサポート (例:<code>DYNAMICS_IS_CHILD:true</code>)。その後、<a href="https://docs.datadoghq.com/continuous_integration/explorer/?tab=pipelineexecutions">CI Visibility エクスプローラー</a>でこれらのパラメーターを使用して検索し、特定のパラメーターを持つすべてのイベントを検索できます。{{< /ci-details >}} |  |  |  |  | {{< X >}} |  | {{< X >}} | {{< X >}} |  |  {{< X >}} |

## CI パイプラインデータの使用 {#use-ci-pipelines-data}

[ダッシュボード][8]または[ノートブック][9]を作成する際、検索クエリで CI パイプラインデータを使用すると、視覚化ウィジェットのオプションが更新されます。詳細については、[ダッシュボード][10]および[ノートブックのドキュメント][11]を参照してください。

## パイプラインデータのアラート {#alert-on-pipeline-data}

[{{< ui >}}Export{{< /ui >}}] (エクスポート) ボタンをクリックして、[[{{< ui >}}Executions{{< /ui >}}] (実行) ページ][6]または [[{{< ui >}}Test Runs{{< /ui >}}] (テスト実行) ページ][13]の [CI パイプラインモニター][12]に検索クエリをエクスポートできます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[6]: https://app.datadoghq.com/ci/pipeline-executions
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/notebook/list
[10]: /ja/dashboards
[11]: /ja/notebooks
[12]: /ja/monitors/types/ci
[13]: https://app.datadoghq.com/ci/test-runs
[14]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/