---
aliases:
- /ja/synthetics/cicd_testing/ci_results_explorer
- /ja/synthetics/ci_results_explorer
- /ja/synthetics/explorer
description: Continuous Testing のテストを実行する CI ジョブを調査します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: GitHub
  text: Datadog Synthetic テストを CI/CD パイプラインに組み込む
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: ラーニングセンター
  text: CI/CD パイプラインで Synthetic テストを実行する方法を学ぶ
- link: /continuous_testing/explorer/search/
  tag: ドキュメント
  text: テストバッチを検索する方法を学ぶ
- link: /continuous_testing/explorer/search_runs/
  tag: ドキュメント
  text: テスト実行を検索する方法を学ぶ
kind: documentation
title: Synthetic Monitoring & Continuous Testing Explorer
---

## 概要

[Explorer][1] は、**Synthetic Monitoring** および **Continuous Testing** のためのすべてのテスト実行および CI バッチを視覚化するものです。

{{< tabs >}}
{{% tab "CI Batches" %}}
{{< img src="continuous_testing/explorer_ci_batches.png" alt="Synthetic Monitoring & Continuous Testing Explorer で CI バッチの検索と管理を行います" style="width:100%;">}}
{{% /tab %}}
{{% tab "テスト実行" %}}
{{< img src="continuous_testing/explorer_test_runs.png" alt="Synthetic Monitoring & Continuous Testing Explorer でテスト実行の検索と管理を行います" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

以下のアクションを実現できます。

* さまざまなデバイスおよびブラウザに対して実行されたテスト実行を比較して、ブラウザ間およびデバイス間の問題を特定します
* 結果タイミングのファセットでパフォーマンスの問題を調査し、失敗したステータスコードで実行をフィルタリングする
* Explorer で検索を始めるために、検索クエリのオンボードを試してみる

## 検索クエリを作成する

[**UX Monitoring** > **Explorer**][1] に移動し、すぐに使える検索クエリをクリックすると、テストバッチまたは実行の表示と視覚化を開始できます。

{{< img src="continuous_testing/explorer_search_query.png" alt="Explorer ですぐに使える検索クエリ" style="width:100%;">}}

- CI パイプラインで実行されている失敗したテストをブロックステータスでフィルターして表示し、それらが新しいリリースをブロックしているかどうかを確認します。
- 失敗したテスト実行を HTTP エラーステータスコードで分析し、予期しないステータスコードを持つ API テストを特定します。
- 最初に失敗し、再試行後に合格したテスト実行を調べます。
- CI パイプラインに含めるテスト ID にアクセスします。

詳しくは、[検索構文][5]をご覧ください。

## テストの実行を確認する

Explorer には、[Synthetic Monitoring][7] および [Continuous Testing][8] で実行したすべてのテストが表示されます。すべてのテストは、高速再試行を含む、特定のテストサブタイプのテスト実行に対応します。Explorer でテストをクリックすると、テスト実行のページにアクセスできます。

{{< img src="continuous_testing/api_test_run.png" alt="API テスト実行詳細ページ" style="width:100%;">}}

1. テスト実行をクリックすると、テスト結果または詳細ページに移動します。
2. テスト実行のパフォーマンス、または API やマルチステップ API テストのパフォーマンスを分析します。
3. 時系列グラフ、トップリスト、表などの視覚化を作成します。

テスト実行については、[テスト実行の検索][6]を参照してください。

## テストバッチの確認

Explorer は、[Continuous Testing と CI/CD プロバイダー][2]で実行されたテストのバッチを表示します。各バッチは Datadog API ([CI/CD インテグレーション][2]、[datadog-ci][3] NPM パッケージ、または直接 API エンドポイントを介して) の呼び出しに対応し、一つまたは複数のテストの実行をトリガーします。

{{< img src="continuous_testing/open_sidepanel.png" alt="CI Results Explorer のサイドパネル" style="width:100%;">}}

1. バッチをクリックすると、バッチ CI/CD のメタデータとバッチテスト結果を含むサイドパネルが表示されます。
2. バッチの一部として実行されたテストの実行を調査し、テストの失敗をピンポイントで特定します。
3. 失敗したテスト結果をクリックすると、詳細な **Test Result** ページが表示され、問題の根本的な原因を調査することができます。

テストバッチについては、[テストバッチを検索する][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ja/continuous_testing/cicd_integrations
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /ja/continuous_testing/explorer/search/
[5]: /ja/continuous_testing/explorer/search_syntax/
[6]: /ja/continuous_testing/explorer/search_runs/
[7]: /ja/synthetics/
[8]: /ja/continuous_testing/