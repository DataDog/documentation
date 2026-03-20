---
aliases:
- /ja/continuous_testing/explorer/search_runs/
description: すべてのテスト実行を調査し、失敗したテスト結果のトラブルシューティングを行います。
further_reading:
- link: /synthetics/explore/results_explorer
  tag: ドキュメント
  text: Learn about the Synthetic Monitoring & Testing Results Explorer
title: テスト実行の検索
---

## 概要

右上のドロップダウンメニューから時間帯を選択した後、[Synthetic Monitoring & Testing Results Explorer][1] の **Test Runs** イベントタイプをクリックすると、テスト実行を検索することができます。

{{< img src="continuous_testing/explorer/explorer_test_runs_2.png" alt="Synthetic Monitoring & Testing Results Explorer でテスト実行を検索・管理する" style="width:100%;">}}

ファセットを使用すると、以下のアクションを実行できます。

- 再試行を必要とする最新のテスト実行を観測します。
- 失敗した API テスト実行を HTTP ステータスコードで集計し、傾向をプロットします。

## ファセットの確認

左側のファセットパネルには、テスト実行を検索するために使用できる複数のファセットが表示されます。検索クエリのカスタマイズを開始するには、**Common** で始まるファセットリストをクリックします。

### Common テスト実行属性

<table>
  <thead>
    <tr>
      <th style="width: 30%;">ファセット</th>
      <th style="width: 70%;">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Batch ID</code></td>
      <td>テスト実行に関連付けられたバッチ ID</td>
    </tr>
    <tr>
      <td><code>Execution&nbsp;Rule</code></td>
      <td>CI バッチのテスト結果に関連付けられた実行ルール: Blocking, Non Blocking, Skipped</td>
    </tr>
    <tr>
      <td><code>Location</code></td>
      <td>バッチのテスト結果に関連付けられたロケーション</td>
    </tr>
    <tr>
      <td><code>Passed</code></td>
      <td>テスト実行の全体的なステータス</td>
    </tr>
    <tr>
      <td><code>Run Type</code></td>
      <td>テスト実行の種別。scheduled, CI, または manually triggered のいずれか</td>
    </tr>
    <tr>
      <td><code>Failure Code</code></td>
      <td>テスト失敗の理由を示すコード</td>
    </tr>
    <tr>
      <td><code>Test Type</code></td>
      <td>実行されるテストの種類</td>
    </tr>
    <tr>
      <td><code>Test Subtype</code></td>
      <td>テストの特定のサブタイプ</td>
    </tr>
    <tr>
      <td><code>Location Version</code></td>
      <td>プライベート テスト ロケーションのバージョン</td>
    </tr>
    <tr>
      <td><code>Location Platform</code></td>
      <td>プライベート ロケーションのプラットフォーム名</td>
    </tr>
    <tr>
      <td><code>Test ID</code></td>
      <td>テストの識別子</td>
    </tr>
    <tr>
      <td><code>Failure Message</code></td>
      <td>失敗の詳細メッセージ</td>
    </tr>
    <tr>
      <td><code>Result Retry Number</code></td>
      <td>テストの再試行回数</td>
    </tr>
    <tr>
      <td><code>Test Finished At</code></td>
      <td>テストの終了時刻のタイムスタンプ</td>
    </tr>
    <tr>
      <td><code>Test Started At</code></td>
      <td>テストの開始時刻のタイムスタンプ</td>
    </tr>
    <tr>
      <td><code>Test Triggered At</code></td>
      <td>テストのトリガー時刻のタイムスタンプ</td>
    </tr>
    <tr>
      <td><code>Test Will Retry At</code></td>
      <td>テストの次回再試行時刻のタイムスタンプ</td>
    </tr>
    <tr>
      <td><code>Trace ID</code></td>
      <td>追跡用のトレース ID</td>
    </tr>
    <tr>
      <td><code>Open Telemetry ID</code></td>
      <td>Open Telemetry の識別子</td>
    </tr>
    <tr>
      <td><code>Variable Name</code></td>
      <td>テストで使用される変数名</td>
    </tr>
  </tbody>
</table>

## Timings 属性

**Timings** ファセットでは、API テスト実行のタイミングに関連する属性でフィルターをかけることができます。

| ファセット          | 説明                                                     |
|----------------|-----------------------------------------------------------------|
| `DNS`          | API テスト実行のための DNS 名解決に費やされた時間。      |
| `ダウンロード`     | API テスト実行で、レスポンスのダウンロードにかかった時間。    |
| `First Byte`   | API テスト実行で、レスポンスの 1 バイト目を受信するまでにかかった時間。 |
| `Open`         | WebSocket テスト実行で、WebSocket が開かれたままの全体の時間。 |
| `Received`     | WebSocket テスト実行で、WebSocket 接続がデータの受信に費やした全体の時間。 |
| `TCP`          | API テスト実行のための TCP 接続の確立にかかった時間。 |
| `Total`        | API テスト実行の総レスポンスタイム。                    |

### HTTP 属性

**HTTP** ファセットを使用すると、HTTP 属性でフィルタリングできます。

| ファセット                  | 説明                                 |
|------------------------|---------------------------------------------|
| `HTTP Status Code`     | テスト実行の HTTP ステータスコード。      |

### gRPC 属性

**gRPC** ファセットは、gRPC テスト実行に関連するものです。

| ファセット                   | 説明                                                            |
|-------------------------|------------------------------------------------------------------------|
| `Health Check Status`   | gRPC テストのヘルスチェックのステータス。ステータスは `Serving` または `Failing` です。 |

### SSL 属性

**SSL** ファセットは、SSL テスト実行に関連するものです。

| ファセット     | 説明                                                      |
|-----------|------------------------------------------------------------------|
| `AltNames`| SSL 証明書に関連付けられた代替レコード名。     |

### TCP 属性

**TCP** ファセットは、テスト実行中の TCP 接続に関連するものです。

| ファセット                 | 説明                                                                           |
|-----------------------|---------------------------------------------------------------------------------------|
| <code>Connection&nbsp;Outcome</code>  | TCP 接続のステータス。結果は `established`、`timeout`、または `refused` となります。 |

### Devices 属性

**Devices** ファセットは、テスト実行で使用されたデバイスに関連します。

| ファセット                    | 説明                                                  |
|--------------------------|--------------------------------------------------------------|
| `Device Name`            | テストで使用したデバイスの名前。                         |
| `Device Resolution Width`| デバイスの解像度の幅。                              |
| `Device Resolution Height`| デバイスの解像度の高さ。                            |
| `Device Type`            | テストで使用したデバイスの種類。                         |

### Browser 属性

**Browser** ファセットは、ブラウザー テストに関連します。

| ファセット                  | 説明                                                     |
|------------------------|-----------------------------------------------------------------|
| `Browser Type`         | テストで使用したブラウザーの種類。                                  |
| `Browser Version`      | 使用したブラウザーのバージョン。                        |
| `Browser User Agent`   | 使用したブラウザーのユーザー エージェント。                                 |

### API 属性

**API** ファセットは、API テスト実行に関連します。

| ファセット                         | 説明                                                 |
|-------------------------------|-------------------------------------------------------------|
| `Resolved IP`                 | DNS 解決で得られた IP。                              |
| `DNS Resolution Server`       | DNS 解決に使用されたサーバー。                             |
| `Request Body`                | HTTP リクエストの本文。                                   |
| `Request Headers`             | HTTP リクエストのヘッダー。                                |
| `Request Host`                | HTTP リクエストの Host ヘッダー。                                   |
| `Request Message`             | HTTP リクエストのメッセージ。                                |
| `Request Metadata`            | HTTP リクエストに関連するメタ データ。                       |
| `Request URL`                 | HTTP リクエストの URL。                                    |
| `Response Body`               | HTTP レスポンスの本文。                                  |
| `Body Size`                   | レスポンス本文のサイズ。                                  |
| `Cache Headers Server`        | レスポンスのキャッシュ ヘッダーに含まれる Server。                      |
| `Cache Headers Vary`          | レスポンスのキャッシュ ヘッダーに含まれる Vary。                  |
| `Cache Headers Via`           | レスポンスのキャッシュ ヘッダーに含まれる Via。                   |
| `CDN Provider`                | レスポンス配信に使用された CDN プロバイダー。                     |
| `Response Close Status Code`  | レスポンス クローズ時のステータス コード。                       |
| `Response Is Body Truncated`  | レスポンス本文がトランケートされたかどうかを示します。                   |
| `Response Is Message Truncated`| レスポンス メッセージがトランケートされたかどうかを示します。               |
| `Response Message`            | HTTP レスポンスのメッセージ。                               |
| `Response Metadata`           | HTTP レスポンスに関連するメタ データ。                      |
| `Response Close Reason`       | レスポンス クローズの理由。                                  |
| `Response Redirects`          | レスポンス内のリダイレクト情報。                       |
| `Response Status Code`        | テスト実行の HTTP ステータスコード。                      |
| `Healthcheck Message Service` | ヘルス チェック メッセージ サービスに関する情報。                    |
| `Handshake Request Message`   | ハンドシェイク リクエスト時のメッセージ。                           |
| `Handshake Response Headers`  | ハンドシェイク レスポンス時のヘッダー。                          |
| `Handshake Response Status Code` | ハンドシェイク レスポンス時のステータス コード。                   |

### Mobile 属性

**Mobile** ファセットは、モバイル テストに関連します。

| ファセット                     | 説明                                                 |
|---------------------------|-------------------------------------------------------------|
| `Mobile Platform`         | モバイル デバイスのプラットフォーム名。                         |
| `Mobile Application`      | モバイル アプリケーションのバージョン ID。                       |
| `Mobile Platform Version` | モバイル プラットフォームのバージョン。                                 |
| `Device Resolution Pixel Ratio` | デバイス ディスプレイのピクセル比。                            |

### Continuous Testing 属性

**Continuous Testing** ファセットは、継続的テストに関連します。

| ファセット                    | 説明                                                                   |
|--------------------------|-------------------------------------------------------------------------------|
| `Concurrency Wait Time`  | 同時実行の待機時間。                                             |
| `Git Author Email`       | コミット作成者のメール アドレス。                                            |
| `Git Author Name`        | コミット作成者の名前。                                             |
| `Git Branch`             | 使用したリポジトリのブランチ。                                                |
| `Git URL`                | Git リポジトリの URL。                                                    |
| `CI Job Name`            | CI ジョブの名前。                                                           |
| `CI Job URL`             | CI ジョブの URL。                                                            |
| `CI Pipeline ID`         | CI パイプラインの識別子。                                               |
| `CI Pipeline Name`       | CI パイプラインの名前。                                                      |
| `CI Pipeline Number`     | CI パイプラインに割り当てられた番号。                                           |
| `CI Pipeline URL`        | CI パイプラインの URL。                                                       |
| `CI Provider Name`       | CI プロバイダー名。                                                      |
| `CI Stage Name`          | CI プロセス内のステージ名。                                          |
| `CI Workspace Path`      | CI プロセス内のワークスペース パス。                                                 |

### Step 属性

**Step** ファセットは、テスト ステップに関連します。

| ファセット         | 説明                    |
|---------------|--------------------------------|
| `Step ID`     | テスト ステップの識別子。     |
| `Step Name`   | テスト ステップの名前。        |
| `Step Status` | テスト ステップのステータス。      |


再試行されたテストにフィルターをかけるには、`@result.isFastRetry:true` を使用して検索クエリを作成します。また、`@result.isLastRetry:true` フィールドを使用して、再試行が行われたテストの最後の実行を取得することができます。

テスト実行の検索については、[検索構文][2]を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /ja/continuous_testing/explorer/search_syntax