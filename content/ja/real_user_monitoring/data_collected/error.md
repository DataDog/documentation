---
title: RUM エラー
kind: documentation
further_reading:
  - link: 'https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/'
    tag: ブログ
    text: リアルユーザーモニタリング
  - link: /real_user_monitoring/dashboards/
    tag: ドキュメント
    text: 追加設定なしで使用できるダッシュボードでRUMデータを視覚化します
  - link: /real_user_monitoring/explorer/
    tag: ドキュメント
    text: Datadog でビューを検索する
  - link: /logs/processing/attributes_naming_convention/
    tag: ドキュメント
    text: Datadog標準属性
---
フロントエンドのエラーはリアルタイムモニタリング (RUM) で自動的に収集されます。エラーメッセージとスタックトレースが利用できる場合は含まれます。

## エラーの原因
フロントエンドのエラーは、それぞれの `error.origin` により 3 つのカテゴリーに分類されます。

- **network**: AJAX リクエストが原因の XHR または Fetch エラー。ネットワークエラーの特定の属性は[ドキュメント][1]を参照してください
- **source**: 未処理の例外または未処理の約束拒否（ソースコード関連）
- **console**: console.error() API 呼び出し

## 収集されるファセット

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.origin`  | 文字列 | エラーの発生元（コンソール、ネットワークなど）          |
| `error.kind`    | 文字列 | エラーのタイプまたは種類 (場合によってはコード)。                   |
| `error.message` | 文字列 | イベントについて簡潔にわかりやすく説明する 1 行メッセージ。 |
| `error.stack`   | 文字列 | スタックトレースまたはエラーに関する補足情報。     |

### ネットワークエラー

ネットワークエラーには失敗した HTTP リクエストに関する情報が含まれます。そのため次のファセットも収集されます。

| 属性                      | タイプ   | 説明                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `http.status_code`             | 数値 | 応答ステータスコード。                                                               |
| `http.url`                     | 文字列 | リソースの URL。                                                                       |
| `http.url_details.host`        | 文字列 | URL の HTTP ホスト部分。                                                          |
| `http.url_details.path`        | 文字列 | URL の HTTP パス部分。                                                          |
| `http.url_details.queryString` | オブジェクト | クエリパラメーターの key/value 属性として分解された、URL の HTTP クエリ文字列部分。 |
| `http.url_details.scheme`      | 文字列 | URL のプロトコル名 (HTTP または HTTPS)                                            |

### ソースエラー

ソースエラーには、エラーに関するコードレベルの情報が含まれます。エラーの種類に関する詳細は、 [MDN ドキュメント][2]を参照してください。

| 属性       | タイプ   | 説明                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.kind`    | 文字列 | エラーのタイプまたは種類 (場合によってはコード)。                   |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/data_collected/error/#network-errors
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error