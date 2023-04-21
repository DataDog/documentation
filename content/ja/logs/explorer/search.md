---
aliases:
- /ja/logs/search
description: ログをフィルターします。現在関心のあるログのサブセットに焦点を絞る、拡大する、またはシフトします。
further_reading:
- link: logs/explorer/group
  tag: ドキュメント
  text: クエリログのグループ化
- link: logs/explorer/visualize
  tag: ドキュメント
  text: ログからビジュアライゼーションを作成する
- link: /logs/explorer/export
  tag: ドキュメント
  text: ログエクスプローラーのビューをエクスポート
kind: documentation
title: ログを検索
---

## 概要

ログエクスプローラーの検索は、時間範囲と検索クエリからなり、`key:value` 検索と全文検索が混在しています。

### 検索クエリ

例えば、過去 5 分間に特定のサービスが特定のステータスで生成したログをフィルタリングするには、`service:payment status:error rejected` のようなカスタムクエリを作成し、時間範囲を `Past 5 minutes` に設定することができます。

{{< img src="logs/explorer/search_filter.jpg" alt="検索フィルター" style="width:100%;" >}}

[インデックス化されたログ][3]は、全文検索と `key:value` 検索クエリの両方をサポートします。

{{< site-region region="gov,us3,us5" >}}
**注**: `key:value` クエリでは、事前に[ファセットを宣言][1]する必要があります。

[1]: /ja/logs/explorer/facets/
{{< /site-region >}}

{{< site-region region="us,eu" >}}
**注**: `key:value` クエリでは、事前に[ファセットを宣言][1]する必要は**ありません**。

[1]: /ja/logs/explorer/facets/
{{< /site-region >}}

### 検索構文

ログエクスプローラーでログ検索を始めるには、[ログ検索構文ドキュメント][1]を参照し、カスタムタイムフレームの詳細については、[タイムフレームドキュメント][2]を読んでください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/search-syntax
[2]: /ja/dashboards/guide/custom_time_frames
[3]: /ja/logs/indexes