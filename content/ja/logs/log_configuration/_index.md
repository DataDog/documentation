---
aliases:
- /ja/logs/processing
description: ログコンフィギュレーションページからログを処理、強化、制御、管理します
further_reading:
- link: /data_security/pci_compliance/
  tag: ドキュメント
  text: PCI 準拠の Datadog 組織をセットアップする
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: ブログ
  text: Logging without Limits* の詳細
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: ブログ
  text: Datadog Log Pipeline Scanner でログ処理を調査する
- link: /logs/guide/
  tag: ガイド
  text: Datadog を使用したロギングに関する追加ガイド
kind: ドキュメント
title: ログコンフィギュレーション
---

## 概要

Datadog Logging without Limits* は、ログの取り込みとインデックス作成を切り離します。[**Logs > Configuration**][1] のログ構成ページから、インデックスを作成して保持するログ、またはアーカイブするログを選択し、トップレベルで設定とコントロールを管理します。

**注**: PCI 準拠の Datadog 組織をセットアップするための情報は、[PCI DSS 準拠][2]をご覧ください。

{{< img src="logs/log_configuration_overview1.mp4" alt="Datadog アプリのログ構成セクション" video=true >}}

## コンフィギュレーションオプション

- [パイプライン][3]と[プロセッサ][4]を使用してログを処理する方法を制御します。
- [属性とエイリアス][5]を設定し、ログ環境を一元化します。
- 取り込んだストリーム全体からのログデータを要約するコスト効率の高い方法として、[取り込んだログからメトリクスを生成][6]します。
- [ログインデックス][7]を使用して、ログ管理予算をきめ細かく管理します。
- 取り込んだログを自身のクラウドホスティングされたストレージバケットに転送し、将来のトラブルシューティングやコンプライアンス監査用の[アーカイブ][8]として保管します。
- [アーカイブをリハイドレート][9]して、古いログイベントまたはインデックス作成から除外されたログイベントを分析または調査します。
- [ログデータアクセス][10]を制限クエリで制限します。

## Misconfigurations Explorer

コンフィギュレーションが完了したら、[ログエクスプローラー][11]でログの調査とトラブルシューティングを開始します。

## その他の参考資料

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
[9]: /ja/logs/log_configuration/rehydrating
[10]: /ja/logs/guide/logs-rbac/
[11]: /ja/logs/explorer/