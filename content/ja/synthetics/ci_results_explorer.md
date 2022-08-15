---
aliases:
- /ja/synthetics/cicd_testing/ci_results_explorer
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

CI Results Explorer は、Synthetic テストを実行する CI ジョブを可視化する機能です。

{{< img src="synthetics/ci_results_explorer/ci_results_explorer_1.png" alt="CI Results Explorer" style="width:100%;">}}

以下のアクションを実現できます。

* 各 CI ジョブの実行を調査して、失敗したテスト結果を特定してトラブルシューティングします。
* さまざまなデバイスおよびブラウザに対して実行されたテスト結果を比較して、ブラウザ間およびデバイス間の問題を特定します。
* CI パイプラインでのテストの進行状況を追跡します。
* 修正する不安定なテストを特定します。

## テストバッチの確認

CI Results Explorer は、[Synthetics と CI/CD プロバイダー][1]で実行されたテストのバッチを表示します。各バッチは Datadog API ([CI/CD インテグレーション][1]、[datadog-ci][2] NPM パッケージ、または直接 API エンドポイントを介して) の呼び出しに対応し、一つまたは複数のテストの実行をトリガーします。

1. バッチをクリックすると、バッチ CI のメタデータとバッチテスト結果を含むサイドパネルが表示されます。
2. バッチの一部として実行されたテストの実行を調査し、テストの失敗をピンポイントで特定します。
3. 失敗したテスト結果をクリックすると、詳細な **Test Result** ページが表示され、問題の根本的な原因を調査することができます。

## 検索

### ファセットとタグ

ページの左側のパネルには、バッチを検索するために使用できるいくつかのファセットが一覧表示されます。

**Batch** ファセットを使用すると、バッチの属性でフィルタリングできます。

| ファセット            | 説明                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | バッチのステータス: `Passed`、`Failed`、`In Progress`。 |
| `Duration`       | バッチの全体的な期間。                          |
| `ID`             | バッチ ID。                                        |

**Git** ファセットを使用すると、バッチの Git 関連の属性をフィルタリングできます。

| ファセット       | 説明                               |
|-------------|-------------------------------------------|
| `Branch`    | バッチに関連付けられたブランチ。     |
| `Commit SHA`| バッチに関連付けられたコミット SHA。 |
| `Repository URL`| バッチに関連付けられた Git リポジトリの URL。 |
| `Tag`       | バッチに関連付けられた Git タグ。    |

**CI** ファセットを使用すると、バッチの CI 関連の属性をフィルタリングできます。

| ファセット          | 説明                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | バッチに関連付けられている CI プロバイダー。  |
| `Job Name`      | バッチに関連付けられたジョブ名。     |
| `Job URL`      | バッチに関連付けられたジョブの URL。      |
| `Pipeline ID`  | バッチに関連付けられたパイプライン ID。  |
| `Pipeline Name` | バッチに関連付けられたパイプラインまたはリポジトリ名。 |
| `Pipeline Number` | バッチに関連付けられたパイプラインまたはビルド番号。 |
| `Pipeline URL` | バッチに関連付けられたパイプライン URL。 |
| `Stage Name`   | バッチに関連付けられたステージ名。   |

**Test result** ファセットを使用すると、バッチの一部として実行されたテスト結果の属性をフィルタリングできます。

| ファセット            | 説明                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Execution Rule` | バッチのテスト結果に関連付けられた実行ルール: `Blocking`、`Non Blocking`、`Skipped`。 |
| `Fast Retries`   | バッチのテスト結果に関連付けられた高速再試行の数。                                |
| `Location`       | バッチのテスト結果に関連付けられたロケーション。                                              |
| `Test ID`        | バッチのテスト結果に関連付けられたテスト ID。                                               |
| `Test Name`      | バッチのテスト結果に関連付けられたテスト名。                                             |

### クエリを作成する

CI Results Explorer のデータをクエリするには、**Tests** ページで使用するのと[同じクエリ構文][3]を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/cicd_integrations
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /ja/synthetics/search/