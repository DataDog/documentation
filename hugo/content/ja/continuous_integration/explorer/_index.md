---
description: CI Visibility Explorer でパイプライン実行の検索とフィルタリングを行う方法を説明します。
further_reading:
- link: /continuous_integration/pipelines/
  tag: ドキュメント
  text: ビルドの問題を解決するためにパイプラインデータを調査する
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: ブログ
  text: Datadog CI モニターによるパイプラインアラートの構成
title: Continuous Integration Visibility Explorer
---

## 概要

CI Visibility Explorer では、任意のタグを使用して、パイプライン実行を複数のレベルで[検索とフィルター](#search-and-filter)、[視覚化](#visualize)、[エクスポート](#export)することができます。

**Pipeline**、**Stage**、**Job**、**Step**、**Command** のレベルの CI パイプラインの実行結果を確認するには、[**Software Delivery** > **CI Visibility** > **Executions**][5] に移動します。

{{< img src="/continuous_integration/pipeline_executions.png" text="CI Pipeline Executions ページ" style="width:100%" >}}

## デフォルトの CI ファセット

左側の **CI** パネルには、パイプライン実行の検索に使用できるデフォルトのファセットが表示されます。

| ファセット | 説明 |
|---|---|
| CI Status | CI 実行のステータス: `Success`、`Failure`、または `Canceled` |
| CI Instance  | CI プロバイダーのインスタンス名。 |
| Duration | パイプラインが実行される時間。 |
| Pipeline ID | パイプラインの ID。 |
| CI Provider | CI プロバイダーの名前。 |
| Node Labels | ノードのラベル。 |
| Node Name | ノードの名前。 |
| Partial Pipeline  | 再試行、手動承認、またはその他の不完全なシーケンスを含む CI パイプライン実行を指します。 |
| Partial Retry | CI 実行が以前の実行の再試行であったかどうかを示します。 |
| Manually Triggered  | CI 実行が手動でトリガーされたかどうかを示します。 |
| パラメーター | パイプラインまたはジョブがトリガーされた際のユーザー定義パラメーター。 |
| Pipeline Number | パイプラインの番号。 |
| Pipeline URL | パイプラインの URL。 |
| Queue Time  | CI キューでジョブまたはタスクが実行前に待機していた合計時間。 |
| デプロイ | CI パイプラインとともにデプロイされた GitLab 環境。 |
| Deployment Action  | GitLab のデプロイされた環境内で実行されたアクション。 |
| Command Name  | CI パイプライン内の特定のコマンドに対するユーザー定義の識別子。 |
| コマンド | カスタムパイプラインスパンを生成するために実行されたコマンドライン。 |
| Downstream Pipeline  | このパイプラインが別のパイプラインの下流にあるかどうかを示します。 |
| Upstream Pipeline ID  | 現在のパイプラインの前に実行され、それをトリガーするパイプライン実行の識別子。 |
| Step Name  | CI パイプライン内の特定のステップに割り当てられた名前。 |
| エラードメイン | CI 実行時のエラーの種類 (プロバイダー、ユーザー、不明など) |
| Run time  | CI パイプラインの実行に費やされた合計時間。 |
| Wait time  | CI 実行において手動承認を待つのに費やされた合計時間。 |
| Is Deployment  | パイプライン内のジョブがデプロイを開始したかどうかを示します。 |
| Contains Deployment  | パイプラインにデプロイをトリガーするジョブが含まれているかどうかを示します。 |
| On Critical Path | ジョブが CI パイプラインの実行のクリティカル パス上にあるかどうかを示します。 |

CI Visibility Explorer で検索クエリの一部として使用できる一般的なファセットについては、[パイプライン実行ファセット][3]を参照してください。

## パイプライン実行の詳細とトレース

選択した時間枠でのパイプラインの実行に関する集計データを確認できます。検索フィールドとファセットを使用して、調査したい実行までリストをスコープします。上部のボタンを使用して、リストを変更してパイプライン、ステージ、またはジョブを表示します。

以下は、最もアクティブなパイプラインの継続時間、失敗したパイプラインの継続時間、パイプラインの実行時間を可視化する 3 つのグラフで、それぞれ継続時間の累積に切り替えるオプションがあります。これらのグラフは左上で選択したレベル (`Pipeline`、`Stage`、`Job` など) にスコープされます。

{{< img src="ci/pipeline_explorer_trends.png" alt="エクスプローラービューのトレンドグラフ: Duration、Errored、Executions" style="width:100%;">}}

各パイプラインの実行は、ステージとジョブの情報を含むトレースとして報告されます。リスト内の実行をクリックして、個々のパイプライン、ステージ、ジョブ実行トレースにアクセスします (Pipeline Details ビューからパイプラインの実行をクリックするのと同様)。

CI パイプラインデータは[ダッシュボード][6]と[ノートブック][7]で利用できるため、ビルドエンジニアリングチームは、優先度の高い作業と CI の傾向に関するコミュニケーションを長期にわたってカスタマイズできます。

## 検索とフィルター

左側のファセットをクリックするか、検索バーに独自のカスタムクエリを記述することで、パイプライン実行のサブセットに焦点を絞ったり、広げたり、シフトしたりできます。ファセットを選択または選択解除すると、検索バーに変更が自動的に反映されます。同様に、検索バーのクエリを変更するか、検索バーにクエリをゼロから記述して、左側のファセットを選択または選択解除できます。

- パイプラインの検索方法については、[検索と管理][1]を参照してください。
- クエリの作成方法については、[検索構文][2]を参照してください。

## 分析

情報を導出または統合するために、クエリされたパイプライン実行を、フィールド、パターン、トランザクションなどの上位エンティティにグループ化します。属性を検索するために作成する必要のない [ファセット][3]を使用すると、以下のアクションを実行できます。

- CI/CD パイプラインで実行されているテストの進捗を検索し、追跡します。
- すべての CI/CD ジョブの実行を調査して、失敗したテスト実行を特定してトラブルシューティングします。

## 視覚化

視覚化の種類を選択して、フィルターや集計の結果を視覚化し、パイプラインの実行をよりよく理解できます。例えば、パイプライン実行をリストで表示してパイプラインデータを列ごとに整理したり、[時系列グラフ][8]で表示してパイプラインデータの経時変化を測定したりできます。

## エクスポート

CI Visibility Explorer の[ビューをエクスポート][4]すると、後で別のコンテキストで再利用できます。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_integration/search
[2]: /ja/continuous_integration/explorer/search_syntax
[3]: /ja/continuous_integration/explorer/facets
[4]: /ja/continuous_integration/explorer/saved_views
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: https://app.datadoghq.com/dashboard/lists
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/ci/pipeline-executions?viz=timeseries