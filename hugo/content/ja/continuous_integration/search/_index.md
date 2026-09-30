---
aliases:
- /ja/continuous_integration/explorer/search/
description: CI パイプラインを検索する方法を学びます。
further_reading:
- link: /continuous_integration/explorer
  tag: ドキュメント
  text: パイプライン実行の検索とフィルタリング
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
  tag: ドキュメント
  text: パイプラインの所要時間を短縮するために、クリティカル パス上の CI ジョブを特定する
- link: /continuous_integration/guides/use_ci_jobs_failure_analysis/
  tag: ドキュメント
  text: CI ジョブの失敗分析を使って、失敗したジョブの根本原因を特定する
title: CI パイプラインの検索と管理
---

## 概要

自分のサービスのビルド パイプラインを常に把握しておきたい開発者にとって、[Pipelines ページ][1] は便利です。

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines ページ" style="width:100%" >}}

このページで確認できることは、次のとおりです。

- 特にデフォルト ブランチで、あなたのサービスのパイプラインは十分に高速で信頼できていますか？
- そうでない場合、根本原因は何ですか？

また、次のような高レベルの集計やトレンドも確認できます。

- パイプライン実行やブランチの集計統計に基づき、ビルド システム全体の健全性を俯瞰できます。
- 本番向けパイプラインの破損など、すぐに対応が必要な問題を素早く見つけて修正するための入口になります。
- 各パイプラインが時間の経過とともにどのように実行され、どんな結果・傾向が出ているかを確認できます。
- 各ビルド ステージでどこに時間が費やされているかの内訳を時系列で把握できるため、最も効果の大きい箇所に改善を集中できます。

## パイプラインを検索する

パイプラインを表示するには、[**Software Delivery** > **CI Visibility** > **CI Pipeline List**][1] に移動します。

[Pipelines ページ][1] では、選択した期間における各パイプラインのデフォルト ブランチの集計統計に加え、最新のパイプライン実行のステータスも確認できます。このページを使うと、すべてのパイプラインを一覧し、健全性を手早く把握できます。このページに表示されるのは、デフォルト ブランチ (通常は `main` または `prod`) に関連付けられた Git 情報を持つパイプラインと、Git 情報が一切ないパイプラインのみです。

表示されるメトリクスには、ビルド頻度、失敗率、所要時間の中央値、所要時間の中央値の変化 (絶対値と相対値) も含まれます。これにより、利用頻度が高くリソース消費が大きい可能性のあるパイプラインや、性能が悪化しているパイプラインを見分けられます。直近のビルド結果・所要時間・最終実行時刻から、最後のコミットの影響も把握できます。

パイプライン名でページをフィルタリングし、特に注視したいパイプラインだけを表示できます。遅い、または失敗しているパイプラインをクリックすると、どのコミットが性能劣化やビルド エラーを持ち込んだ可能性があるか、といった詳細を掘り下げられます。[Datadog Teams][6] を使用している場合は、チームのハンドルに一致する [カスタム タグ][7] を使って、チームに紐づく特定のパイプラインだけに絞り込めます。

## パイプラインの詳細と実行履歴

特定のパイプラインをクリックすると、指定した期間における選択パイプラインのデータをさまざまな角度から確認できる _Pipeline Details_ ページが表示されます。

{{< img src="ci/pipeline_branch_overview_updated.png" alt="単一のパイプラインの Pipeline Details ページ" style="width:100%;">}}

選択したパイプラインについて、実行総数と失敗実行数の推移、ビルド所要時間のパーセンタイル、エラー率、ステージ別の総所要時間の内訳などを把握できます。ステージとジョブのサマリー テーブルも用意されており、所要時間、全体実行時間に占める割合、失敗率といった観点で素早く並べ替えられます。

パイプライン実行リストには、選択したブランチについて、選択期間内にそのパイプライン (またはステージやジョブ) が実行されたすべての履歴が表示されます。左側のファセットを使って、見たいパイプライン、ステージ、ジョブだけにリストを絞り込んでください。

### クリティカル パスをハイライト表示する

トレース上でクリティカル パスをハイライト表示するには、パイプライン実行ページで `Critical path` チェック ボックスをクリックします。

クリティカル パスは、パイプライン全体の実行時間を短縮したいときに、優先して高速化すべきスパンを強調表示します。ある CI ジョブがクリティカル パス上にある場合、そのジョブは実行時間の観点でトレース内の最長経路の一部であることを意味します。クリティカル パス上の CI ジョブを高速化しない限り、CI パイプラインそのものは短縮できません。

CI パイプライン全体の所要時間を短縮するために、どのジョブを優先すべきかを判断するには、[このガイド][11] を参照してクリティカル パス上の CI ジョブを特定してください。

### サービス、リソース、ネットワーク イベントとの関連を確認する

いずれかの実行をクリックすると、パイプライン実行ビューが開き、パイプラインと各ステージのフレーム グラフまたはスパン リストを確認できます。左側の _Executions (n)_ リストから、同一コミットに対するパイプラインの再試行ごとのデータに素早くアクセスできます。

CI プロバイダのリンク (以下の画像の `gitlab-ci gitlab.pipeline > documentation`) をクリックすると、対象のパイプライン、ステージ、ジョブに対応する Resource、Service、Analytics ページを詳しく確認できます。タグの詳細情報や、ネットワーク監視イベントへのリンクも見つけられます。

{{< img src="ci/ci-pipeline-execution.png" alt="トレース情報とフレーム グラフ表示を含むパイプライン実行ビュー" style="width:100%;">}}

### ログとの関連を確認する

CI プロバイダでジョブ ログ収集がサポートされ、かつ有効になっている場合、関連するログ イベントはパイプライン実行ビューの _Logs_ タブで確認できます。

ジョブ ログ収集は、次のプロバイダでサポートされています。

- [AWS CodePipeline][8]
- [Azure][9]
- [CircleCI][10]
- [GitHub Actions][3]
- [GitLab][4]
- [Jenkins][5]

### 関連ログに基づく CI ジョブの失敗分析

CI Visibility は、失敗した各 CI ジョブから収集した関連ログをもとに、LLM モデルを使ってエラー メッセージをより分かりやすく生成し、ドメインとサブ ドメインで分類します。

CI ジョブの失敗で最も多い根本原因を把握するには、[CI ジョブの失敗分析][12] を利用してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pipelines
[3]: /ja/continuous_integration/pipelines/github/#enable-log-collection
[4]: /ja/continuous_integration/pipelines/gitlab/#enable-job-log-collection
[5]: /ja/continuous_integration/pipelines/jenkins#enable-job-log-collection
[6]: /ja/account_management/teams/
[7]: /ja/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /ja/continuous_integration/pipelines/awscodepipeline/#collect-job-logs
[9]: /ja/continuous_integration/pipelines/azure/#enable-job-log-collection
[10]: /ja/continuous_integration/pipelines/circleci/#enable-log-collection
[11]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
[12]: /ja/continuous_integration/guides/use_ci_jobs_failure_analysis/