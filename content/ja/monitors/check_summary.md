---
title: Check Summary
kind: documentation
description: Datadog に報告されているすべてのチェックをリストします。
further_reading:
  - link: /monitors/monitor_types/
    tag: Documentation
    text: モニターの作成方法
  - link: /monitors/notifications/
    tag: Documentation
    text: モニター通知の設定
  - link: /monitors/manage_monitor/
    tag: Documentation
    text: モニターの管理
  - link: /monitors/downtimes/
    tag: Documentation
    text: モニターのダウンタイムをスケジュールする
---
## 概要

Datadog チェックの実行ごとにステータスを報告します。過去 24 時間に報告されたチェックが[チェックのサマリーページ][1]に表示されます。報告されるステータスには以下の 4 つがあります。

- `OK`
- `WARNING`
- `CRITICAL`
- `UNKNOWN`

## 検索

特定のチェックを探すには、サマリーページで `filter checks` 検索ボックスを使用します。チェック名をクリックして、そのチェックに紐づくステータスとタグを確認します。一覧をさらに絞り込むには、チェックパネル内の `filter checks` 検索ボックスを使用します。

{{< img src="monitors/check_summary/check_search.png" alt="チェック詳細"  style="width:100%;">}}

## ダッシュボード  

ダッシュボードにチェックステータスを表示するには、[チェックステータスウィジェット][2]を使用します。

## その他の参考資料 

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/check/summary
[2]: /ja/dashboards/widgets/check_status/