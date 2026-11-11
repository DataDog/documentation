---
aliases:
- /ja/logs/processing
description: ログコンフィギュレーションページからログを処理、強化、制御、管理します
further_reading:
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインのデバッグ
- link: /data_security/pci_compliance/
  tag: ドキュメント
  text: PCI DSS Compliance
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: ブログ
  text: Logging without Limits* の詳細
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: ブログ
  text: Datadog Log Pipeline Scanner でログ処理を調査
- link: /logs/guide/
  tag: ガイド
  text: Datadog を使用したロギングに関する追加ガイド
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Datadog を使用した Log Management インデックス戦略ガイド
title: ログコンフィギュレーション
---
## 概要{#overview}

Datadog Logging without Limits* は、ログの取り込みとインデックス作成を分離します。インデックスを作成して保持するログ、またはアーカイブするログを選択し、[{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Pipelines{{< /ui >}}][1] のログ設定ページからトップレベルで設定とコントロールを管理します。

Datadog MCP Server に接続された AI agent を通じて、ログ pipeline、インデックス、アーカイブを管理することもできます。`logs-configuration` ツールセットを有効にして、これらのリソースを表示、作成、更新、削除、並べ替えしてください。agent を接続するには、[Datadog MCP Server のセットアップ][13]を参照してください。利用可能なツールとプロンプトの例については、[ログ設定ツール][14]を参照してください。

## 構成オプション {#configuration-options}

- [pipeline][3]と[processor][4]を使用して、ログの処理を制御します。
- [属性とエイリアス][5]を設定し、ログ環境を一元化します。
- [取り込んだログからメトリクスを生成][6]して、取り込んだストリーム全体からのログデータを要約するコスト効率の高い方法として活用します。
- [ログインデックス][7]を使用して、ログ管理予算をきめ細かく管理します。
- 取り込んだログを独自のクラウドホストストレージバケットに転送して、将来のトラブルシューティングやコンプライアンス監査のために[アーカイブ][8]として保持します。
- Archive Search を使用して[アーカイブを検索][12]し、ストレージから直接リアルタイムでログをクエリします。プラットフォームの全機能へのアクセスや長期間の保持が必要な場合は、**Search & Rehydration** モードを使用してください。
- [ログデータアクセス][10]を制限クエリで制限します。

## ログエクスプローラー {#log-explorer}

コンフィギュレーションが完了したら、[ログエクスプローラー][11]でログの調査とトラブルシューティングを開始します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /ja/data_security/pci_compliance/
[3]: /ja/logs/log_configuration/pipelines
[4]: /ja/logs/log_configuration/processors
[5]: /ja/logs/log_configuration/attributes_naming_convention/
[6]: /ja/logs/log_configuration/logs_to_metrics/
[7]: /ja/logs/log_configuration/indexes
[8]: /ja/logs/log_configuration/archives/
[10]: /ja/logs/guide/logs-rbac/
[11]: /ja/logs/explorer/
[12]: /ja/logs/explorer/archive_search/
[13]: /ja/mcp_server/setup/
[14]: /ja/mcp_server/tools/#logs-configuration