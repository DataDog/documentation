---
aliases:
- /ja/continuous_integration/explorer/search/
description: CI パイプラインの検索方法について学びます。
further_reading:
- link: /continuous_integration/explorer
  tag: ドキュメント
  text: パイプライン実行を検索およびフィルターする
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
  tag: ドキュメント
  text: パイプラインの実行時間を短縮するためにクリティカルパス上の CI ジョブを特定する
- link: /continuous_integration/guides/use_ci_jobs_failure_analysis/
  tag: ドキュメント
  text: ログ分析を使用して、失敗した CI ジョブの根本原因を特定する
title: CI パイプラインの検索と管理
---
## 概要{#overview}

[[Pipelines] (パイプライン) ページ][1]は、サービスのビルドパイプラインを監視する必要がある開発者に役立ちます。

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines page" style="width:100%" >}}

このページでは、以下の質問に答えます。

- 特にデフォルトのブランチで、サービスのパイプラインのパフォーマンスと信頼性は高いですか。
- そうでない場合、根本原因は何ですか。

以下などのおおまかな蓄積と傾向にアクセスできます。

- パイプラインの実行とブランチの集計された統計を含む、ビルドシステム全体の状態の概要。
- プロダクションパイプラインの破損など、緊急の問題をすばやく見つけて修正するためのウィンドウ。
- 時間の経過とともに各パイプラインがどのように実行されたか、また、どのような結果と傾向が見られるか。
- 時間の経過に伴う、各ビルド段階で費やされた時間の内訳。これにより、最大の違いを生む場所に改善努力を集中させることができます。

## パイプラインを検索する {#search-for-pipelines}

パイプラインを表示するには、[[**Software Delivery**] > [**CI Visibility**] > [**CI Pipeline List**] (CI パイプラインリスト)][1] に移動します。

[[Pipelines] ページ][1]には、選択した期間における各パイプラインのデフォルトブランチの集計統計と、最新のパイプライン実行のステータスが表示されます。このページを使用して、すべてのパイプラインを表示し、その健全性をすばやく確認します。このページに表示されるのは、デフォルトのブランチ (通常は `main` または `prod`) に関連付けられた Git 情報を持つパイプライン、および Git 情報を持たないパイプラインのみです。

表示されるメトリクスには、ビルド頻度、失敗率、所要時間の中央値、所要時間の中央値の変化 (絶対値と相対値の両方) が含まれます。この情報により、利用率が高くリソース消費が大きい可能性のあるパイプラインや、性能が悪化しているパイプラインが明らかになります。最新のビルド結果、所要時間、最終実行時刻から、最後のコミットの影響も把握できます。

パイプライン名でページをフィルタリングし、特に関心があるパイプラインのみを表示できます。低速のパイプラインや失敗しているパイプラインをクリックして詳細を掘り下げると、パフォーマンスの低下やビルドエラーの原因となった可能性があるコミットを把握できます。[Datadog Teams][6] を使用している場合は、チームのハンドルに一致する[カスタムタグ][7]を使用して、チームに関連付けられている特定のパイプラインに絞り込むことができます。

## パイプラインの詳細と実行 {#pipeline-details-and-executions}

特定のパイプラインをクリックすると、[{{< ui >}}Pipeline Details{{< /ui >}}] (パイプラインの詳細) ページが表示されます。このページでは、指定された時間枠で選択したパイプラインのデータを閲覧できます。

{{< img src="ci/pipeline_branch_overview_updated.png" alt="単一パイプラインの [Pipeline Details] ページ" style="width:100%;">}}

選択したパイプラインについて、総実行数と失敗実行数の推移、ビルド所要時間のパーセンタイル、エラー率、ステージ別の総所要時間の内訳などを把握できます。ステージとジョブのサマリーテーブルも用意されており、所要時間、総実行時間に占める割合、失敗率などの項目ですばやく並べ替えることができます。

パイプライン実行リストには、選択したブランチについて、選択期間内にそのパイプライン (またはステージやジョブ) が実行されたすべての時間が表示されます。左側のファセットを使用して、目的のパイプライン、ステージ、ジョブのみが表示されるようにリストを絞り込みます。

### クリティカルパスをハイライト表示する {#highlight-critical-path}

トレース上でクリティカルパスをハイライト表示するには、パイプライン実行ページで [{{< ui >}}Critical path{{< /ui >}}] (クリティカルパス) チェックボックスをクリックします。

クリティカルパスでは、パイプラインの総実行時間を短縮したい場合に、高速化する必要があるスパンがハイライト表示されます。CI ジョブがクリティカルパス上にある場合、そのジョブは実行時間の観点からトレース内の最長経路の一部となります。CI パイプラインを高速化するには、クリティカルパス上の CI ジョブの高速化が絶対に必要です。

CI パイプラインの総所要時間を短縮するために、どのジョブに優先的に対応すべきかを判断するには、[このガイド][11]を参照してクリティカルパス上の CI ジョブを特定してください。

### サービス、リソース、ネットワークイベントへの接続を確認する {#explore-connections-to-services-resources-and-network-events}

いずれかの実行をクリックすると、パイプライン実行ビューが開き、パイプラインと各ステージのフレームグラフまたはスパンリストを確認できます。左側の [{{< ui >}}Executions (n){{< /ui >}}] (実行 (n)) リストから、同一コミットに対するパイプラインの各再試行のデータにすばやくアクセスできます。

CI プロバイダーのリンク (以下の画像の `gitlab-ci gitlab.pipeline > documentation`) をクリックすると、パイプライン、ステージ、ジョブに対応する [Resource] (リソース)、[Service] (サービス)、[Analytics] (分析) ページを詳しく確認できます。タグの詳細情報を確認することや、ネットワーク監視イベントへのリンクを利用することもできます。

{{< img src="ci/ci-pipeline-execution.png" alt="トレース情報とフレームグラフが表示されているパイプライン実行ビュー" style="width:100%;">}}

### ログへの接続を確認する {#explore-connections-to-logs}

CI プロバイダーでログストレージが有効になっている場合、パイプライン実行スライドアウトパネルの [{{< ui >}}Logs{{< /ui >}}] (ログ) タブで、特定のパイプライン実行に関連するログイベントを確認できます。

ログストレージは、以下のプロバイダーでサポートされています。

- [AWS CodePipeline][8]
- [Azure][9]
- [Buildkite][13]
- [CircleCI][10]
- [GitHub Actions][3]
- [GitLab][4]
- [Jenkins][5]

### 関連ログに基づくログ分析 {#logs-analysis-based-on-relevant-logs}

CI Visibility は LLM モデルを使用して、失敗したすべての CI ジョブから収集された関連ログに基づいて、強化されたエラーメッセージを生成し、それらをドメインおよびサブドメインで分類します。

[ログ分析][12]を使用して、CI ジョブの失敗の最も一般的な根本原因を特定します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[3]: /ja/continuous_integration/pipelines/github/#logs-storage
[4]: /ja/continuous_integration/pipelines/gitlab/#logs-storage
[5]: /ja/continuous_integration/pipelines/jenkins#logs-storage
[6]: /ja/account_management/teams/
[7]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /ja/continuous_integration/pipelines/awscodepipeline/#logs-storage
[9]: /ja/continuous_integration/pipelines/azure/#logs-storage
[10]: /ja/continuous_integration/pipelines/circleci/#logs-storage
[11]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
[12]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/
[13]: /ja/continuous_integration/pipelines/buildkite/#logs-storage