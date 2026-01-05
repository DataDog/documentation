---
aliases:
- /ja/continuous_integration/explorer/search/
description: CI パイプラインの検索方法について説明します。
further_reading:
- link: /continuous_integration/explorer
  tag: ドキュメント
  text: パイプライン実行を検索およびフィルターする
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
  tag: ドキュメント
  text: パイプラインの実行時間を短縮するためにクリティカルパス上の CI ジョブを特定する
title: CI パイプラインの検索と管理
---

## 概要

[Pipelines ページ][1]は、サービスのビルドパイプラインを常に監視したい開発者にとって役立ちます。

{{< img src="/continuous_integration/pipelines.png" text="CI Pipelines ページ" style="width:100%" >}}

このページでは、次のような疑問に答えます。

- 特にデフォルトブランチにおいて、サービスのパイプラインはパフォーマンス面と信頼性の面で問題なく稼働しているか？
- もし問題がある場合、その根本原因は何か？

このページでは、以下のような高レベルの集計データやトレンドにアクセスできます。

- パイプラインの実行やブランチに関する集計データをもとにした、ビルドシステム全体のヘルスの概要。
- 本番環境にデプロイするパイプラインが失敗するなど、緊急度の高い問題をすばやく発見して修正するためのビュー。
- 時間の経過とともに各パイプラインがどのように実行され、どのような結果やトレンドがあったか。
- 各ビルドステージでどこに時間が費やされているかの内訳を時系列で確認し、最も効果的に改善できるポイントに注力できる。

## パイプラインの検索

パイプラインを確認するには、[**Software Delivery** > **CI Visibility** > **CI Pipeline List**][1] に移動します。

[Pipelines ページ][1]では、選択した期間における各パイプラインのデフォルトブランチの集計データと、最新のパイプライン実行状況を表示します。このページを使って、すべてのパイプラインを一覧し、それらのヘルスを素早く確認できます。通常 `main` や `prod` と呼ばれるデフォルトブランチに紐づいた Git 情報を持つパイプライン、および Git 情報を持たないパイプラインのみがこのページに表示されます。

表示されるメトリクスには、ビルド頻度、失敗率、中央値の実行時間、中央値の実行時間の絶対値・相対値両方での変化率が含まれます。これらの情報から、どのパイプラインが利用頻度が高くリソース消費が大きいか、あるいは回帰が発生しているかを把握できます。最後のビルド結果、実行時間、直近の実行開始時刻を見れば、直前のコミットが与えた影響を確認できます。

ページをパイプライン名でフィルタリングすれば、気になるパイプラインにフォーカスできます。遅延がある、または失敗しているパイプラインをクリックすると、どのコミットによってパフォーマンスの低下やビルドエラーが発生したかを詳細に調査できます。[Datadog Teams][6] を使用している場合、チームハンドルに対応した[カスタムタグ][7]を用いて、自分のチームに関連する特定のパイプラインをフィルタリングできます。

## パイプラインの詳細と実行

特定のパイプラインをクリックすると、選択したパイプラインのデータを特定の期間で表示する _Pipeline Details_ ページに移動します。

{{< img src="ci/pipeline_branch_overview_updated.png" alt="単一パイプラインの Pipeline Details ページ" style="width:100%;">}}

選択したパイプラインに関して、合計および失敗した実行回数の推移、ビルド時間のパーセンタイル、エラー率、ステージごとの処理時間の内訳などを確認できます。ステージやジョブのサマリーテーブルもあり、実行時間や総実行時間に占める割合、失敗率などで簡単に並べ替えできます。

パイプラインの実行リストには、選択したブランチおよび期間において実行された、パイプライン (またはそのステージやジョブ) のすべての実行が表示されます。左側のファセットを使って、特定のパイプライン、ステージ、ジョブに絞り込むことができます。

### 統合パイプライントレースを表示する

統合パイプライントレースを表示するには、パイプライン実行ページの `View unified trace` チェックボックスをクリックします。

統合パイプライントレースでは、パイプラインの部分的なリトライが行われた際に生成された複数のトレースを、単一のトレースとしてまとめて表示します。パイプライン実行に部分的なリトライがない場合は、単一のパイプライン実行トレースのみが表示されます。

### クリティカルパスをハイライトする

トレース上でクリティカルパスをハイライト表示するには、パイプライン実行ページの `Critical path` チェックボックスをクリックします。

クリティカルパスは、パイプラインの全体的な実行時間を短縮したい場合に、どのスパンを高速化する必要があるかを示します。CI ジョブがクリティカルパス上にある場合、そのジョブは実行時間の観点で最も長い経路の一部を形成していることを意味します。パイプラインを高速化するには、クリティカルパス上の CI ジョブを高速化することが必須となります。

[こちらのガイド][11]を参照することで、クリティカルパスにある CI ジョブを特定し、パイプライン全体の実行時間を短縮するためにどのジョブを優先的に最適化するべきかを判断できます。

### サービス、リソース、およびネットワークイベントとの関連付けを調査する

いずれかの実行をクリックすると、パイプラインとそのステージに関するフレームグラフやスパンリストを表示するパイプライン実行ビューが開きます。左側の _Executions (n)_ リストから、同じコミットに対するパイプラインのリトライごとのデータに素早くアクセスできます。

CI プロバイダーのリンク (下記例では `gitlab-ci gitlab.pipeline > documentation`) をクリックすると、そのパイプラインやステージ、ジョブに関するリソースページ、サービスページ、または Analytics ページを調査できます。さらに、完全なタグ情報やネットワーク監視イベントへのリンクも確認できます。

{{< img src="ci/ci-pipeline-execution.png" alt="トレース情報とフレームグラフを表示したパイプライン実行ビュー" style="width:100%;">}}

### ログとの関連付けを調査する

CI プロバイダーがログ収集をサポートしており有効化されている場合、関連するログイベントはパイプライン実行ビューの _Logs_ タブで確認できます。

ジョブログの収集がサポートされているプロバイダーは以下の通りです。

- [AWS CodePipeline][8]
- [Azure][9]
- [CircleCI][10]
- [GitHub Actions][3]
- [GitLab][4]
- [Jenkins][5]

#### AI によるログサマリー

<div class="alert alert-info">AI によるログサマリーはプレビュー版です。アクセスをご希望の場合は、<a href="https://docs.google.com/forms/d/e/1FAIpQLSfBuPfdyhgqjjduDYpOM5twJdkdDnTTxJdCCWonauaBxWTCnQ/viewform">こちらのフォーム</a>にご記入ください。</div>

Pipeline Visibility では、CI ジョブログに基づき AI が生成したパイプラインエラーの説明を提供します。これらの説明は、各パイプライン実行の **Failed Jobs** タブで確認できます。これらのサマリーを活用することで、CI におけるエラーが開発者が記述したコードに起因するのか、あるいは CI パイプラインそのものに起因するのかを判断し、実行の失敗をトラブルシュートできます。

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
