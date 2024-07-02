---
title: Log Configuration
kind: Documentation
description: "Process, enrich, control, and manage your logs from the Logs Configuration page"
aliases:
  - /logs/processing
further_reading:
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Set up a PCI-compliant Datadog organization
- link: "https://www.datadoghq.com/blog/logging-without-limits/"
  tag: Blog
  text: Learn more about Logging without Limits*
- link: "https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/"
  tag: Blog
  text: Investigate your log processing with the Datadog Log Pipeline Scanner
- link: /logs/guide/
  tag: Guide
  text: Additional guides about logging with Datadog
---

## Overview

Datadog Logging without Limits* decouples log ingestion and indexing. Choose which logs to index and retain, or archive, and manage settings and controls at a top-level from the log configuration page at [**Logs > Pipelines**][1].

**Note**: See [PCI DSS Compliance][2] for information on setting up a PCI-compliant Datadog organization.

## コンフィギュレーションオプション

- [パイプライン][3]と[プロセッサ][4]を使用してログを処理する方法を制御します。
- [属性とエイリアス][5]を設定し、ログ環境を一元化します。
- 取り込んだストリーム全体からのログデータを要約するコスト効率の高い方法として、[取り込んだログからメトリクスを生成][6]します。
- [ログインデックス][7]を使用して、ログ管理予算をきめ細かく管理します。
- 取り込んだログを自身のクラウドホスティングされたストレージバケットに転送し、将来のトラブルシューティングやコンプライアンス監査用の[アーカイブ][8]として保管します。
- [アーカイブをリハイドレート][9]して、古いログイベントまたはインデックス作成から除外されたログイベントを分析または調査します。
- [ログデータアクセス][10]を制限クエリで制限します。

## ログエクスプローラー

コンフィギュレーションが完了したら、[ログエクスプローラー][11]でログの調査とトラブルシューティングを開始します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /data_security/pci_compliance/
[3]: /logs/log_configuration/pipelines
[4]: /logs/log_configuration/processors
[5]: /logs/log_configuration/attributes_naming_convention/
[6]: /logs/log_configuration/logs_to_metrics/
[7]: /logs/log_configuration/indexes
[8]: /logs/log_configuration/archives/
[9]: /logs/log_configuration/rehydrating
[10]: /logs/guide/logs-rbac/
[11]: /logs/explorer/
