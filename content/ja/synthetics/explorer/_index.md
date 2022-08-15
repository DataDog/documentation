---
aliases:
- /ja/synthetics/cicd_testing/ci_results_explorer
- /ja/synthetics/ci_results_explorer
description: Synthetic テストを実行する CI ジョブを調べます。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/
  tag: ブログ
  text: Datadog Synthetic テストを CI/CD パイプラインに組み込む
- link: https://learn.datadoghq.com/courses/synthetic-tests-ci-cd-pipeline
  tag: ラーニングセンター
  text: CI/CD パイプラインで Synthetic テストを実行する方法を学ぶ
- link: /synthetics/search/
  tag: ドキュメント
  text: Synthetic オブジェクトを検索する方法を学ぶ
kind: documentation
title: CI Results Explorer
---

## 概要

[CI Results Explorer][1] は、Synthetic テストを実行する CI ジョブを可視化する機能です。

{{< img src="synthetics/ci_results_explorer/ci_results_explorer_1.png" alt="CI Results Explorer" style="width:100%;">}}

以下のアクションを実現できます。

* すべての CI ジョブの実行を調査して、失敗したテスト結果を特定してトラブルシューティングします
* さまざまなデバイスおよびブラウザに対して実行されたテスト結果を比較して、ブラウザ間およびデバイス間の問題を特定します
* CI パイプラインでのテストの進行状況を追跡します
* 修正する不安定なテストを特定します

## テストバッチの確認

CI Results Explorer は、[Synthetics と CI/CD プロバイダー][1]で実行されたテストのバッチを表示します。各バッチは Datadog API ([CI/CD インテグレーション][2]、[datadog-ci][3] NPM パッケージ、または直接 API エンドポイントを介して) の呼び出しに対応し、一つまたは複数のテストの実行をトリガーします。

1. バッチをクリックすると、バッチ CI のメタデータとバッチテスト結果を含むサイドパネルが表示されます。
2. バッチの一部として実行されたテストの実行を調査し、テストの失敗をピンポイントで特定します。
3. 失敗したテスト結果をクリックすると、詳細な **Test Result** ページが表示され、問題の根本的な原因を調査することができます。

検索については、[テストバッチを検索する][4]を参照してください。

## 検索クエリを作成する

CI Results Explorerのデータに対するクエリを開始するには、[検索構文][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/ci
[2]: /ja/synthetics/cicd_integrations
[3]: https://www.npmjs.com/package/@datadog/datadog-ci
[4]: /ja/synthetics/explorer/search/
[5]: /ja/synthetics/explorer/search_syntax/