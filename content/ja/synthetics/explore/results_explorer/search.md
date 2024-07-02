---
title: テストバッチを検索する
kind: documentation
description: 実行された CI ジョブのバッチを調査し、失敗したテスト結果のトラブルシューティングを行います。
aliases:
  - /synthetics/explorer/search
  - /continuous_testing/explorer/search/
further_reading:
- link: /synthetics/explore/results_explorer
  tag: ドキュメント
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
---

## 概要

After selecting a time frame from the dropdown menu on the top right, you can search for batches of CI jobs by clicking on the **CI Batches** event type in the [Synthetic Monitoring & Testing Results Explorer][1].

{{< img src="continuous_testing/explorer/results_explorer.png" alt="CI batches in the Synthetic Monitoring & Testing Results Explorer" style="width:100%;">}}

ファセットを使用すると、以下のアクションを実行できます。

- CI パイプラインで実行されている最新のテストバッチを観測する。
- CI バッチを集計し、CI パイプラインに追加するテスト ID を特定する。
- 失敗したテスト実行の数をブロックのステータスで比較する。

## ファセットの確認

左側のファセットパネルには、バッチを検索するために使用できる複数のファセットが表示されます。検索クエリのカスタマイズを開始するには、**Batch** で始まるファセットリストをクリックします。

### バッチ属性

**Batch** ファセットを使用すると、バッチの属性でフィルタリングできます。

| ファセット            | 説明                                                 |
|------------------|-------------------------------------------------------------|
| `Summary Status` | バッチのステータス: `Passed`、`Failed`、`In Progress`。 |
| `Duration`       | バッチの全体的な期間。                          |
| `ID`             | バッチ ID。                                               |

### CI 属性

**CI** ファセットを使用すると、バッチの CI 関連の属性をフィルタリングできます。

| ファセット          | 説明                                 |
|----------------|---------------------------------------------|
| `CI Provider`  | バッチに関連付けられている CI プロバイダー。  |
| `Job Name`     | バッチに関連付けられたジョブ名。     |
| `Job URL`      | バッチに関連付けられたジョブの URL。      |
| `Pipeline ID`  | バッチに関連付けられたパイプライン ID。  |
| `Pipeline Name` | バッチに関連付けられたパイプラインまたはリポジトリ名。 |
| `Pipeline Number` | バッチに関連付けられたパイプラインまたはビルド番号。 |
| `Pipeline URL` | バッチに関連付けられたパイプライン URL。 |
| `Stage Name`   | バッチに関連付けられたステージ名。   |

### テスト結果属性

**Test result** ファセットを使用すると、実行されたテスト結果の属性をフィルタリングできます。

| ファセット            | 説明                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| <code>実行ルール</code> | バッチのテスト結果に関連付けられた実行ルール: `Blocking`、`Non Blocking`、`Skipped`。 |
| `Fast Retries`   | バッチのテスト結果に関連付けられた高速再試行の数。                                |
| `Location`       | バッチのテスト結果に関連付けられたロケーション。                                              |
| `Test ID`        | バッチのテスト結果に関連付けられたテスト ID。                                               |
| `Test Name`      | バッチのテスト結果に関連付けられたテスト名。                                             |

### Git 属性

**Git** ファセットを使用すると、バッチの Git 関連の属性をフィルタリングできます。

| ファセット       | 説明                               |
|-------------|-------------------------------------------|
| `Author Email` | コミット作成者のメールアドレス。 |
| `Branch`    | バッチに関連付けられたブランチ。     |
| `Commit SHA`| バッチに関連付けられたコミット SHA。 |
| `Repository URL`| バッチに関連付けられた Git リポジトリの URL。 |
| `Tag`       | バッチに関連付けられた Git タグ。    |

過去 1 日間に実行された CI ジョブのバッチにフィルターをかけるには、`@ci.provider.name:github` といった検索クエリを作成し、時間範囲を`1d` に設定します。

CI バッチの検索については、[検索構文][2]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /continuous_testing/explorer/search_syntax
