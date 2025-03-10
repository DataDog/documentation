---
description: すべてのテスト実行を調査し、失敗したテスト結果のトラブルシューティングを行います。
further_reading:
- link: /continuous_testing/explorer
  tag: ドキュメント
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
title: テスト実行の検索
---

## 概要

右上のドロップダウンメニューから時間帯を選択した後、[Synthetic Monitoring & Testing Results Explorer][1] の **Test Runs** イベントタイプをクリックすると、テスト実行を検索することができます。

{{< img src="continuous_testing/explorer_test_runs_1.png" alt="Synthetic Monitoring & Testing Results Explorer でテスト実行を検索・管理する" style="width:100%;" >}}

ファセットを使用すると、以下のアクションを実行できます。

- 再試行を必要とする最新のテスト実行を観測します。
- 失敗した API テスト実行を HTTP ステータスコードで集計し、傾向をプロットします。

## ファセットの確認

左側のファセットパネルには、テスト実行を検索するために使用できる複数のファセットが表示されます。検索クエリのカスタマイズを開始するには、**Common** で始まるファセットリストをクリックします。

### Common テスト実行属性

**Common** ファセットを使用すると、テスト実行の属性でフィルタリングできます。

| ファセット            | 説明                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Batch ID`        | テスト実行に関連付けられたバッチ ID。                                               |
| <code>実行ルール</code> | CI バッチのテスト結果に関連付けられた実行ルール: `Blocking`、`Non Blocking`、`Skipped`。 |
| `Location`       | バッチのテスト結果に関連付けられたロケーション。                                              |
| `Passed`        | テスト実行の全体的なステータス。                                               |
| `Run Type`      | テスト実行の実行タイプ。スケジュール、CI、または手動トリガーにすることができます。                                             |

### Timings 属性

**Timings** ファセットでは、API テスト実行のタイミングに関連する属性でフィルターをかけることができます。

| ファセット          | 説明                                 |
|----------------|---------------------------------------------|
| `DNS`  | API テスト実行のための DNS 名解決に費やされた時間。  |
| `ダウンロード`     | API テスト実行で、レスポンスのダウンロードにかかった時間。     |
| `First Byte`      | API テスト実行で、レスポンスの 1 バイト目を受信するまでにかかった時間。      |
| `Open`  | WebSocket テスト実行で、WebSocket が開かれたままの全体の時間。  |
| `Received` | WebSocket テスト実行で、WebSocket 接続がデータの受信に費やした全体の時間。 |
| `TCP` | API テスト実行のための TCP 接続の確立にかかった時間。 |
| `Total` | API テスト実行の総レスポンスタイム。 |

### HTTP 属性

**HTTP** ファセットを使用すると、HTTP 属性でフィルタリングできます。

| ファセット          | 説明                                 |
|----------------|---------------------------------------------|
| `HTTP Status Code`  | テスト実行の HTTP ステータスコード。  |

### gRPC 属性

**gRPC** ファセットは、gRPC テスト実行に関連するものです。

| ファセット       | 説明                               |
|-------------|-------------------------------------------|
| `Health Check Status`       | gRPC テストのヘルスチェックのステータス。ステータスは `Serving` または `Failing` です。    |

### SSL 属性

**SSL** ファセットは、SSL テスト実行に関連するものです。

| ファセット       | 説明                               |
|-------------|-------------------------------------------|
| `AltNames`       |SSL 証明書に関連付けられた代替レコード名。    |

### TCP 属性

**TCP** ファセットは、テスト実行中の TCP 接続に関連するものです。

| ファセット       | 説明                               |
|-------------|-------------------------------------------|
| `Connection Outcome`       | TCP 接続のステータス。結果は `established`、`timeout`、または `refused` となります。    |

再試行されたテストにフィルターをかけるには、`@result.isFastRetry:true` を使用して検索クエリを作成します。また、`@result.isLastRetry:true` フィールドを使用して、再試行が行われたテストの最後の実行を取得することができます。

テスト実行の検索については、[検索構文][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ja/continuous_testing/explorer/search_syntax