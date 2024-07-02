---
title: Check Summary
description: "See the list of all your checks reporting to Datadog."
aliases:
- /monitors/check_summary/
further_reading:
- link: /monitors/
  tag: Documentation
  text: Learn how to create a monitor
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/manage/
  tag: Documentation
  text: Manage your monitors
---

## 概要

Datadog チェックの実行ごとにステータスを報告します。過去 24 時間に報告されたチェックが[チェックのサマリーページ][1]に表示されます。報告されるステータスには以下の 4 つがあります。

- `OK`
- `WARNING`
- `CRITICAL`
- `UNKNOWN`

## 検索

特定のチェックを探すには、サマリーページで `filter checks` 検索ボックスを使用します。チェック名をクリックして、そのチェックに紐づくステータスとタグを確認します。一覧をさらに絞り込むには、チェックパネル内の `filter checks` 検索ボックスを使用します。

{{< img src="monitors/check_summary/check_search.png" alt="チェック詳細" style="width:100%;">}}

## ダッシュボード

ダッシュボードにチェックステータスを表示するには、[チェックステータスウィジェット][2]を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/check/summary
[2]: /dashboards/widgets/check_status/
