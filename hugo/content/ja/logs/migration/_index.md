---
description: 既存のログソースを Datadog に送信し、Splunk で構築された検索、アラート、ダッシュボードを変換します。
further_reading:
- link: /logs/log_collection/
  tag: ドキュメント
  text: ログの収集とインテグレーション
- link: /logs/explorer/search_syntax/
  tag: ドキュメント
  text: ログ検索構文
- link: /logs/log_configuration/indexes/
  tag: ドキュメント
  text: ログインデックス
title: 移行
---
## 概要 {#overview}

Datadog Log Management に移行するには、ログを Datadog に送信する、およびチームが利用している検索、アラート、ダッシュボードを再作成するという 2 つのステップがあります。

## ログを Datadog に送信する {#send-your-logs-to-datadog}

ファイル、コンテナ、ネットワークソースからログを収集するように [Datadog Agent][1] を設定します。ログ収集をサポートする[インテグレーション][2]には、独自のログ設定が含まれています。

## クエリとアセットを変換する {#translate-your-queries-and-assets}

ログが Datadog に送信されたら、[移行ツール][3]を使用して、Splunk Processing Language (SPL) をDatadogの[ログ検索構文][4]に変換します。クエリを一度に 1 つずつ変換します。あるいは、Splunk のアラートやダッシュボードでクエリを一括変換し、それらを使用して Datadog のモニターやダッシュボードを作成します。移行ツールでは、ソースプラットフォームとして Splunk のみがサポートされています。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/logs/
[2]: /ja/integrations/
[3]: /ja/logs/migration/migration_tools/
[4]: /ja/logs/explorer/search_syntax/