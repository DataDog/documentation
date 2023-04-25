---
aliases:
- /ja/continuous_integration/pipelines_setup/
- /ja/continuous_integration/explore_pipelines/
further_reading:
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: Datadog におけるパイプラインの可視化
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

パイプラインは、CI メニューの [Pipelines][1] ページに表示されます。

## セットアップ

{{< whatsnext desc="Datadog でパイプラインの可視化を設定するための CI プロバイダーを選択します。" >}}
    {{< nextlink href="continuous_integration/pipelines/buildkite" >}}Buildkite{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/circleci" >}}CircleCI{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/codefresh" >}}Codefresh{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/github" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/gitlab" >}}GitLab{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/jenkins" >}}Jenkins{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/teamcity" >}}TeamCity{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_commands" >}}カスタムコマンド{{< /nextlink >}}
    {{< nextlink href="continuous_integration/pipelines/custom_tags_and_metrics" >}}カスタムタグとメトリクス{{< /nextlink >}}
{{< /whatsnext >}}
## パイプラインの健全性の概要

Pipelines ページには、選択した時間枠での各パイプラインのデフォルトブランチの集計統計と、最新のパイプライン実行のステータスが表示されます。このページを使用して、すべてのパイプラインを確認し、その健全性をすばやく確認します。Pipelines ページには、通常は `main` や `prod` などの名前が付けられた_デフォルト_ブランチのメトリクスが表示されます。

表示されるメトリクスには、ビルド頻度、失敗率、平均期間、95 パーセンタイル期間が含まれます。この情報は、どのパイプラインが使用率が高く、潜在的にリソースの消費量が多いかを明らかにします。最後のビルド結果、期間、最後の実行時間は、最後のコミットの効果を示します。

パイプライン名でページをフィルタリングして、最も関心のあるパイプラインを確認できます。遅延または障害が発生しているパイプラインをクリックすると、パフォーマンスの低下やビルドエラーを引き起こした可能性のあるコミットが表示されます。

## パイプラインの詳細とブランチ

特定のパイプラインをクリックすると、_Pipeline Details_ ページが表示されます。このページには、指定した時間枠で選択したパイプラインのデータのビューが表示され、デフォルト以外のブランチを表示できます。

{{< img src="ci/ci-single-pipeline.png" alt="単一パイプラインの詳細" style="width:100%;">}}

時間の経過に伴う実行の合計と失敗、ビルド期間のパーセンタイル、ステージごとの内訳に費やされた合計時間など、選択したパイプラインに関する情報を取得します。ステージとジョブの要約テーブルもあるため、期間、全体的な実行時間の割合、または失敗率の観点からそれらをすばやく並べ替えることができます。

パイプラインの_デフォルト_ブランチを表示すると、ページ上の各ステージとジョブのサマリーテーブルに、ステージとジョブの期間の絶対的および相対的な変化を視覚化する _Duration Change_ グラフと、_Errored Executions_ のグラフが表示されます。

{{< img src="ci/pipeline_job_summary_duration_change.png" alt="ジョブサマリーテーブル" style="width:100%;">}}

パイプラインのフィーチャーブランチを表示する際、_Errored Executions_ のグラフが 2 つ表示されます。1 つはこのフィーチャーブランチでの実行に失敗したもの、もう 1 つはこのブランチの失敗を他の失敗と比較するものです。`Other Branches` と `Specific Branch` を切り替えるオプションがあります。`Other Branches` を選択すると、このフィーチャーブランチの実行失敗を他のすべてのブランチの失敗と集計して比較し、導入された (ローカル) 実行失敗と継承された (グローバル) 実行失敗を区別することができます。`Specific Branch` に追跡すると、このフィーチャーブランチの実行失敗と選択した別のブランチの実行失敗を直接比較し、パイプラインのパフォーマンスの変化を具体的に追跡するのに役立ちます。

オプションで、このフィーチャーブランチでの実行失敗と、選択した別のブランチでの実行失敗を直接比較することも可能です。

{{< img src="ci/pipeline_stage_summary_feature_branch.png" alt="ステージサマリーテーブル" style="width:100%;">}}

下部のパイプライン実行リストには、選択したブランチについて、選択した時間枠内にパイプライン (またはそのステージまたはジョブ) が実行されたすべての時間が表示されます。左側のファセットを使用して、表示するパイプライン、ステージ、またはジョブにリストを正確にフィルタリングします。

### サービス、リソース、ネットワークイベントへの接続を確認する

実行の 1 つをクリックしてパイプライン実行ビューを開き、パイプラインとそのステージのフレームグラフまたはスパンリストを表示します。左側の _Executions (n)_ リストを使用すると、同じコミットでパイプラインを再試行するたびにデータにすばやくアクセスできます。

CI プロバイダーリンク (次の画像の `gitlab-ci gitlab.pipeline > documentation`) をクリックして、パイプライン、ステージ、またはジョブの Resource、Service、または Analytics ページを具体的に調べます。また、完全なタグ情報と、ネットワーク監視イベントへのリンクもあります。

{{< img src="ci/ci-pipeline-execution.png" alt="パイプライン実行のトレース情報" style="width:100%;">}}

### ログへの接続を確認する

CI プロバイダーでジョブログ収集がサポートされ、有効になっている場合、関連するログイベントはパイプライン実行ビューの _Logs_ タブで確認できます。

**注**: ジョブログの収集は、限られたプロバイダーのみでサポートされています。
- [GitHub Actions][2]
- [GitLab][3] (ベータ版)
- [Jenkins][4]

## パイプライン実行の詳細とトレース

[Pipeline Executions][5] ページで、選択した時間枠でのパイプラインの実行に関する集計データを確認できます。検索フィールドとファセットを使用して、調査したい実行までリストをスコープします。上部のボタンを使用して、リストを変更してパイプライン、ステージ、またはジョブを表示します。

以下は、最もアクティブなパイプラインの継続時間、失敗したパイプラインの継続時間、パイプラインの実行時間を可視化する 3 つのグラフで、それぞれ継続時間の累積に切り替えるオプションがあります。これらのグラフは左上で選択したレベル (`Pipeline`、`Stage`、`Job` など) にスコープされます。

{{< img src="ci/pipeline_explorer_trends.png" alt="エクスプローラービューのトレンドグラフ" style="width:100%;">}}

各パイプラインの実行は、ステージとジョブの情報を含むトレースとして報告されます。リスト内の実行をクリックして、個々のパイプライン、ステージ、ジョブ実行トレースにアクセスします (Pipeline Details ページからパイプラインの実行をクリックするのと同様)。

または、[**Analytics**][6] ボタンをクリックして、パイプライン実行データをインタラクティブにフィルタリング、グループ化すれば、質問への回答やダッシュボードでの共有に使用することができます。

{{< img src="ci/ci-pipelines-execution.png" alt="パイプライン実行の分析" style="width:100%;">}}

## CI パイプラインデータについて伝達する

[ダッシュボード][7]と[ノートブック][8]でウィジェットを作成すると、CI パイプラインデータを利用できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/ci/pipelines
[2]: /ja/continuous_integration/pipelines/github/#enable-log-collection
[3]: /ja/continuous_integration/pipelines/gitlab/#enable-job-log-collection-beta
[4]: /ja/continuous_integration/pipelines/jenkins#enable-job-log-collection
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://app.datadoghq.com/notebook/list