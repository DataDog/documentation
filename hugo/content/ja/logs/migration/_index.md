---
description: 既存のログソースを Datadog に送信し、Splunk で構築した検索、アラート、ダッシュボードを変換してください。
further_reading:
- link: /logs/log_collection/
  tag: ドキュメント
  text: ログ収集とインテグレーション
- link: /logs/explorer/search_syntax/
  tag: ドキュメント
  text: ログ検索構文
- link: /logs/log_configuration/indexes/
  tag: ドキュメント
  text: ログインデックス
title: 移行
---
## 概要{#overview}

Datadog Log Management への移行には、ログを Datadog に送信することと、チームが利用している検索、アラート、ダッシュボードを再作成することの 2 つのステップがあります。

## ログを Datadog に送信する {#send-your-logs-to-datadog}

[Datadog Agent][1] を設定して、ファイル、コンテナ、ネットワークソースからログを収集してください。ログ収集をサポートする [Integrations][2] には、独自のログ構成が含まれています。

## クエリとアセットを変換する {#translate-your-queries-and-assets}

ログが Datadog に取り込まれたら、[Query Translation][3] を使用して Splunk Processing Language (SPL) を Datadog の [ログ検索構文][4] に変換します。クエリを 1 つずつ変換するか、Splunk のアラートやダッシュボード内のクエリを一括変換し、それらを使用して Datadog のモニターやダッシュボードを作成してください。Query Translation は、ソースプラットフォームとして Splunk のみに対応しています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/logs/
[2]: /ja/integrations/
[3]: /ja/logs/migration/query_translation/
[4]: /ja/logs/explorer/search_syntax/