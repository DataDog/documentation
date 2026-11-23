---
aliases:
- /ja/database_monitoring/guide/clickhouse/
description: ClickHouse データベースでの Database Monitoring の設定
disable_sidebar: true
further_reading:
- link: /database_monitoring/guide/clickhouse_agent_upgrade
  tag: ドキュメント
  text: Agent バージョン 7.84 より前のバージョンから ClickHouse インテグレーションをアップグレードします。
- link: https://www.datadoghq.com/blog/database-monitoring-for-clickhouse/
  tag: ブログ
  text: Datadog Database Monitoring で ClickHouse クエリのパフォーマンスを監視します。
title: ClickHouse のセットアップ
---
<div class="alert alert-info">
この機能はプレビュー版であり、Datadog Agent v7.78 以降が必要です。Datadog Database Monitoring for ClickHouse プレビューに参加されているお客様は、プレビュー期間中に発生した使用量について<strong>課金されることはありません</strong>。追加の有効化は不要です。以下のセットアップ手順に従って開始してください。
</div>

### サポートされている ClickHouse バージョン {#clickhouse-versions-supported}

|                              | セルフホスト | ClickHouse Cloud |
| ---------------------------- | ----------- | ---------------- |
| ClickHouse 23.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 24.x              | {{< X >}}   | {{< X >}}        |
| ClickHouse 25.x              | {{< X >}}   | {{< X >}}        |

### ホスティングタイプ別のセットアップ手順 {#setup-instructions-by-hosting-type}

ClickHouse データベースで Database Monitoring をセットアップする方法については、ホスティングタイプを選択してください。

{{< card-grid card_width="300px" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/selfhosted" src="integrations_logos/clickhouse.png" alt="セルフホスト" title="セルフホスト" >}}
  {{< image-card href="/database_monitoring/setup_clickhouse/cloud" src="integrations_logos/clickhouse.png" alt="ClickHouse Cloud" title="ClickHouse Cloud" >}}
{{< /card-grid >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}