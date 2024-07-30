---
algolia:
  tags:
  - pipeline visibility
  - usm
  - CI パイプライン
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: ブログ
  text: Datadog によるすべての CI パイプラインの監視
- link: https://www.datadoghq.com/blog/best-practices-for-ci-cd-monitoring/
  tag: ブログ
  text: CI/CD モニタリングのベストプラクティス
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: CI Pipeline Visibility について
- link: /monitors/types/ci
  tag: ドキュメント
  text: CI Pipeline Monitors について
title: CI Visibility の概要
---

## 概要

CI Visibility または CI Pipeline Visibility では、CI パイプラインの健全性を監視し、パイプライン実行のパフォーマンスをトレースとして視覚化できます。トレース内のスパンはパイプラインの異なるレベルを表します。

{{< img src="/getting_started/ci_visibility/pipelines_list.png" alt="Datadog CI Visibility の CI パイプラインのリスト表示" style="width:100%" >}}

CI Visibility では、CI ジョブのログを転送し、それらをパイプラインと自動的に関連付けることができます。使用しているプロバイダーによって、CI Visibility の [**Settings** ページ][1]でジョブログの収集を有効にするか、またはプロバイダーの設定で Datadog とのインテグレーションを行うことができます。

`datadog-ci` CLI を使用して、パイプライン内で[トレースコマンド][2]や[カスタムタグとメジャーコマンド][3]を実行し、パイプラインのトレースにユーザー定義のテキストタグや数値タグを追加することもできます。

CI Visibility は DevOps およびプラットフォームエンジニアリング組織に包括的なモニタリング、分析、ボトルネックの特定と解決、リソース割り当ての最適化、CI コストの削減を提供します。

パフォーマンスメトリクス、ログ、アラートを統合することで、組織は開発速度を向上させ、パイプラインの信頼性を高め、クラウド環境およびセルフホスト環境におけるデータに基づいた意思決定を行うことができます。

## CI プロバイダーの設定

CI Visibility は、CI パイプラインのパフォーマンスと結果を追跡し、パイプラインが終了した後に結果を表示します。

パイプラインメトリクスの送信を開始するには、以下の Datadog がサポートする CI プロバイダーのいずれかのドキュメントを参照してください。

{{< partial name="continuous_integration/ci-pipelines-getting-started.html" >}}

</br>

CI プロバイダーがサポートされていない場合、プログラムを使用してパイプラインイベントを Datadog に送信できます。詳細は[パイプライン イベントを Datadog に送信するセクション](#send-pipeline-events-to-datadog)を参照してください。

選択した CI プロバイダーによっては、CI Visibility がパイプラインのすべてのレベル (ステージ、ジョブ、ステップ、コマンド) をサポートしていない場合があります。CI Visibility がどのように CI パイプラインを定義するかについては、[用語セクション][4]を参照してください。

## CI パイプラインデータの利用

パイプラインのメトリクス (キュー時間、継続時間、パーセンタイル、ステータスなど) にアクセスし、CI プロバイダー全体で収集されたデータを使用して重要な傾向とパターンを特定し始めます。

{{< img src="/getting_started/ci_visibility/pipelines_dashboard.png" alt="すぐに使えるダッシュボードで、CI Visibility のパイプライン、ジョブ、ステージから収集したデータを表示するウィジェット" style="width:100%" >}}

[ダッシュボード][5]を作成してパイプラインで障害が発生しているポイントを視覚化することや、[すぐに使えるダッシュボード][6]で CI Visibility で収集したデータを入力したウィジェットを使用して、CI パイプライン、ステージ、ジョブの健全性とパフォーマンスを視覚化することができます。

## CI パイプラインの検索と管理

[**CI Pipeline List** ページ][7]は、デフォルトブランチの CI パイプラインのパフォーマンスと信頼性に関する包括的なビューを提供します。集計された統計、トレンド、およびパイプラインに関する情報にアクセスし、障害や回帰などの問題を特定して解決します。

トラブルシューティングを強化し、パイプライン管理プロセスを合理化するために、パイプラインをクリックしてインサイトにアクセスし、実行履歴をレビューし、ログや関連するテレメトリーデータにピボットします。詳細については、[CI パイプラインの検索と管理][8]を参照してください。

## CI Visibility Explorer で結果を確認

[CI Visibility Explorer][9] では、CI プロバイダーから収集したデータを使用してパイプラインスパンの視覚化やフィルタリングを行うことができます。各パイプライン実行は、ステージとジョブ情報を含むトレースとして報告されます。

{{< tabs >}}
{{% tab "パイプライン" %}}

[**Software Delivery** > **CI Visibility** > **Executions**][101] に移動し、`Pipeline` を選択してパイプラインスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/ci_visibility/pipeline_view.png" alt="Shopist リポジトリでフィルタリングされた CI Visibility Explorer のパイプライン実行結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Apipeline

{{% /tab %}}
{{% tab "ステージ" %}}

[**Software Delivery** > **CI Visibility** > **Executions**][101] に移動し、`Stage` を選択してステージスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/ci_visibility/stage_view.png" alt="Shopist リポジトリでフィルタリングされた CI Visibility Explorer のステージ結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Astage

{{% /tab %}}
{{% tab "ジョブ" %}}

[**Software Delivery** > **CI Visibility** > **Executions**][101] に移動し、`Job` を選択してジョブスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/ci_visibility/job_view.png" alt="Shopist リポジトリでフィルタリングされた CI Visibility Explorer のジョブ結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Ajob

{{% /tab %}}
{{% tab "ステップ" %}}

[**Software Delivery** > **CI Visibility** > **Executions**][101] に移動し、`Step` を選択してステップスパンの結果のフィルタリングを開始します。

{{< img src="/getting_started/ci_visibility/step_view.png" alt="Shopist リポジトリでフィルタリングされた CI Visibility Explorer のステップ結果" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/pipeline-executions?query=ci_level%3Astep

{{% /tab %}}
{{< /tabs >}}

[ファセット][9]を使用して検索クエリをカスタマイズし、パイプラインの各レベルで費やされた時間の変化を特定します。

パイプラインをクリックすると、**Pipeline Executions** セクションにリストされている個々のパイプライン実行にアクセスできます。パイプラインの実行をクリックすると、**Trace** タブでフレームグラフやスパンのリストを見ることができます。

{{< img src="/getting_started/ci_visibility/executions.png" alt="ステージングビルドおよびテストパイプラインのフレームグラフとして視覚化されたパイプライン実行結果" style="width:100%" >}}

パイプラインのボトルネックを特定し、実行時間の割合が大きいものから小さいものへとランク付けされた個々のノードを調査できます。

Test Visibility を設定した後、パイプライン実行のサイドパネルの Test Runs タブで、テストのステータス (Failed、New Flaky、Passed、Skipped) を含む CI パイプラインで実行されたテストに関する情報にアクセスできます。詳細については、[Flaky Test Management ドキュメント][10]を参照してください。

パイプライン実行のサイドパネルの Logs タブで、クラウドおよびセルフホスト型ランナー全体のパイプラインまたはジョブのログにアクセスし、ランナーに関する情報を確認できます。

[サポートされているプロバイダー][11]を使用している場合、インフラストラクチャーのメトリクスと GitLab ジョブを関連付け、GitLab ジョブのホスト、システム、ホストタグ、ホストメトリクスの情報にアクセスできます。詳細については、[Datadog で GitLab ジョブとインフラストラクチャーメトリクスを相関させる][12]を参照してください。

## パイプラインイベントを Datadog に送信

他のパイプラインプロバイダーやカスタムパイプラインの場合、[CI Visibility Pipelines API][16] を使用してパイプラインイベントを Datadog にプログラムで送信できます。詳細については、[パイプラインデータモデルと実行タイプ][13]を参照してください。

リクエストには、パイプライン実行のトリガーとなったコミットの以下の Git 情報 (リポジトリ URL、コミット SHA、および作者のメール) を含めてください。

## CI パイプラインモニターを作成

[CI モニター][14]を使用して、CI パイプラインで障害が発生したり、期間のしきい値を超えたりしたときに、パイプラインの健全性やパフォーマンスの低下を組織の関連チームに警告します。

{{< img src="/getting_started/ci_visibility/avg_duration_monitor.png" alt="テストとデプロイカートパイプラインの平均継続時間が過去 1 日で 5 分を超えたときにトリガーするように構成された CI パイプラインモニター" style="width:100%" >}}

過去 1 日の平均継続時間が 5 分のしきい値を超えたときに CI パイプラインに警告を出すモニターを設定するには、以下の手順に従います。

1. [**Monitors** > **New Monitor**][15] に移動し、**CI** を選択します。
1. CI パイプラインの一般的なモニタータイプを選択して開始します。たとえば、パイプラインの実行時間が長すぎる場合に警告をトリガーする `Long Running Pipeline` や、ジョブの失敗に対して警告をトリガーする `Failed Job` を選択するか、独自の検索クエリをカスタマイズします。この例では、`@ci.pipeline.name:test_and_deploy_cart` を入力し、`Duration (@duration)` の平均を選択します。
1. `Evaluate the query over the` セクションで、**last 1 day** を選択します。
1. 評価された値がしきい値を**超えたとき**に警告をトリガーするように警告条件を設定し、`Alert threshold > 300000000000` のように警告や注意のしきい値を指定します。
1. `Notify your team` セクションで、モニターの通知設定を構成します。
1. モニターの権限を設定します。
1. **Create** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings
[2]: /ja/continuous_integration/pipelines/custom_commands/
[3]: /ja/continuous_integration/pipelines/custom_tags_and_measures/
[4]: /ja/continuous_integration/pipelines/?tab=githubactions#terminology
[5]: /ja/dashboards/
[6]: https://app.datadoghq.com/dash/integration/30516/ci-visibility---pipelines-dashboard
[7]: https://app.datadoghq.com/ci/pipelines
[8]: /ja/continuous_integration/search/
[9]: /ja/continuous_integration/explorer?tab=pipelineexecutions
[10]: /ja/tests/guides/flaky_test_management/
[11]: /ja/continuous_integration/pipelines/?tab=githubactions#supported-features
[12]: /ja/continuous_integration/guides/infrastructure_metrics_with_gitlab/
[13]: /ja/continuous_integration/guides/pipeline_data_model/
[14]: /ja/monitors/types/ci/?tab=pipelines
[15]: https://app.datadoghq.com/monitors/create
[16]: /ja/api/latest/ci-visibility-pipelines/