---
title: CI Results Explorer
kind: documentation
description: Synthetic テストを実行する CI ジョブにドリルダウンします。
further_reading:
  - link: 'https://www.datadoghq.com/blog/datadog-synthetic-ci-cd-testing/'
    tag: ブログ
    text: Datadog Synthetic テストを CI/CD パイプラインに組み込む
  - link: 'https://learn.datadoghq.com/course/view.php?id=37'
    tag: ラーニングセンター
    text: CI/CD パイプラインで Synthetic テストを実行する方法を学ぶ
  - link: /synthetics/search/
    tag: ドキュメント
    text: Synthetic オブジェクトを検索する方法を学ぶ
---
## 概要

CI Results Explorer は、Synthetic テストを実行している CI ジョブを可視化します。

以下が可能です。

* 各 CI ジョブの実行にドリルダウンして、失敗したテスト結果を特定してトラブルシューティングします。
* さまざまなデバイスおよびブラウザに対して実行されたテスト結果を比較して、ブラウザ間およびデバイス間の問題を特定します。
* CI パイプラインでのテストの進行状況を追跡します。
* 修正する不安定なテストを特定します。

{{< img src="synthetics/ci/ci_results_explorer/ci_results_explorer.jpg" alt="CI Results Explorer"  style="width:100%;">}}

## バッチの確認

CI Results Explorer は、[Synthetic CI/CD テストインテグレーション][1]を介して実行されたテストのバッチを表示します。すべてのバッチは、1 つまたは複数のテスト実行をトリガーするための Datadog API の呼び出しに対応します (NPM パッケージを介して、または API エンドポイントを介して直接)。

バッチをクリックして、バッチ CI メタデータとバッチテスト結果を含むサイドパネルを開きます。バッチの一部として実行されたテストの実行を確認し、テストの失敗を特定します。失敗したテスト結果をクリックして、詳細な **Test Result** ページを表示し、問題の根本原因を調査します。

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

**CI** ファセットを使用すると、バッチの CI 関連の属性をフィルタリングできます。

| ファセット          | 説明                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | バッチに関連付けられている CI プロバイダー。  |
| `Pipeline URL` | バッチに関連付けられたパイプライン URL。 |

**Test result** ファセットを使用すると、バッチの一部として実行されたテスト結果の属性をフィルタリングできます。

| ファセット            | 説明                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Execution Rule` | バッチのテスト結果に関連付けられた実行ルール: `Blocking`、`Non Blocking`、`Skipped`。 |
| `Fast Retries`   | バッチのテスト結果に関連付けられた高速再試行の数。                                |
| `Location`       | バッチのテスト結果に関連付けられたロケーション。                                              |
| `Test ID`        | バッチのテスト結果に関連付けられたテスト ID。                                               |
| `Test Name`      | バッチのテスト結果に関連付けられたテスト名。                                             |

### クエリを作成する

CI Results Explorer のデータをクエリするには、**Tests** ページと[同じクエリ構文][2]を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/ci/
[2]: /ja/synthetics/search/