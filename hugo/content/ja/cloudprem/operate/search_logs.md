---
description: Datadog で CloudPrem ログを検索 / 分析する方法を説明します。
further_reading:
- link: /cloudprem/ingest/
  tag: ドキュメント
  text: CloudPrem にログを取り込む
- link: /cloudprem/operate/troubleshooting/
  tag: ドキュメント
  text: CloudPrem のトラブルシューティング
- link: /logs/explorer/search_syntax/
  tag: ドキュメント
  text: ログ検索構文
title: CloudPrem ログを検索する
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## Logs Explorer で CloudPrem ログを確認する

1. [Datadog Log Explorer][1] を開きます。
2. 左側のファセット パネルで、**CLOUDPREM INDEXES** の下から検索対象のインデックスを 1 つ以上選択します。

特定のインデックスだけを選んで検索対象を絞り込むことも、クラスター内のすべてのインデックスを選んで横断検索することもできます。

CloudPrem インデックス名は次の形式です:

```
cloudprem--<CLUSTER_NAME>--<INDEX_NAME>
```

## 検索時の制限

CloudPrem インデックスは、他の Datadog ログ インデックスと一緒にクエリすることはできません。また、Flex Logs は CloudPrem ではサポートされていません。

[1]: https://app.datadoghq.com/logs

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}