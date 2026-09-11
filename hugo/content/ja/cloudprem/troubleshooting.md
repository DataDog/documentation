---
further_reading:
- link: /cloudprem/architecture/
  tag: ドキュメント
  text: CloudPrem アーキテクチャ
title: トラブルシューティング
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

このページでは、Datadog CloudPrem のデプロイや運用時によく発生する問題に対するトラブルシューティング情報をまとめています。代表的なエラー メッセージ、診断手順、アクセス権限、ストレージ設定、コンポーネントの健全性に関する問題を解決するためのヒントを掲載しています。問題の切り分けをすばやく進めたいときや、[Datadog サポート][1] に問い合わせる前に状況を整理したいときに活用してください。


## アクセス権限

もっとも多いエラーは、オブジェクト ストレージまたは metastore へのアクセス権限に起因するものです。原因を調べるもっとも手軽な方法は、`kubectl` を使って CloudPrem の各コンポーネント、つまり indexer Pod、metastore Pod、searcher Pod のログを確認することです。

## ストレージ関連のエラー

AWS 認証情報が誤っている場合は、indexer のログに `Unauthorized` を含む次のようなエラーが表示されます:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

リージョン設定が誤っている場合は、次のようなエラーが表示されます:

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/