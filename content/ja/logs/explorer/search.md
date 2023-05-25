---
aliases:
- /ja/logs/search
description: ログをフィルターして、現在関心のあるログのサブセットに焦点を絞る、拡大する、またはシフトします。
further_reading:
- link: logs/explorer/analytics
  tag: ドキュメント
  text: ログをグループ化する方法
- link: logs/explorer/visualize
  tag: ドキュメント
  text: ログからビジュアライゼーションを作成する
- link: /logs/explorer/export
  tag: ドキュメント
  text: ログエクスプローラーからビューをエクスポートする
kind: documentation
title: ログを検索
---

## 概要

個々のログからの情報はリストとして視覚化すると便利ですが、集計することで価値ある情報にアクセスできる場合もあります。この情報にアクセスするには、[ログエクスプローラー][5]でログを検索し、時系列、トップリスト、ツリーマップ、円グラフまたはテーブルとして表示します。

ログエクスプローラーの検索は、時間範囲と検索クエリからなり、`key:value` 検索と全文検索が混在しています。

## 検索クエリ

例えば、過去 15 分間に Web ストアサービスがエラーステータスで生成したログをフィルタリングするには、`service:payment status:error rejected` のようなカスタムクエリを作成し、時間範囲を `Past 15 minutes` に設定します。

{{< img src="logs/explorer/search_filter.png" alt="ログエクスプローラーで、Web ストアサービスの支払い拒否のエラーログをフィルターする検索クエリを作成する" style="width:100%;" >}}

[インデックス化されたログ][1]は、全文検索と `key:value` 検索クエリの両方をサポートします。

**注**: `key:value` クエリでは、事前に[ファセットを宣言][2]する必要が**ありません**。

## 検索構文

ログエクスプローラーでログの検索やタイムフレームのカスタマイズを始めるには、[検索構文のドキュメント][3]と[カスタムタイムフレームのドキュメント][4]をお読みください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/indexes
[2]: /ja/logs/explorer/facets/
[3]: /ja/logs/search-syntax
[4]: /ja/dashboards/guide/custom_time_frames
[5]: /ja/logs/explorer/