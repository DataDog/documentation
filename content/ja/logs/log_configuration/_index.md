---
title: ログコンフィギュレーション
kind: ドキュメント
description: ログコンフィギュレーションページからログを処理、強化、制御、管理します
aliases:
  - /ja/logs/processing
further_reading:
  - link: 'https://www.datadoghq.com/blog/logging-without-limits/'
    tag: ブログ
    text: Logging without Limits* の詳細
  - link: /logs/guide/
    tag: ガイド
    text: Datadog を使用したロギングに関する追加ガイド
---
## 概要

Datadog Logging without Limits* は、ログの取り込みとインデックス作成を切り離します。[ログコンフィギュレーションセクション][1]から、インデックスを作成して保持するログ、またはアーカイブするログを選択し、トップレベルで設定とコントロールを管理します。

{{< img src="logs/log_configuration_overview.gif" alt="Datadog アプリのログコンフィギュレーションセクション">}}

## コンフィギュレーションオプション

- [パイプライン][2]と[プロセッサ][3]を使用してログを処理する方法を制御します。
- [属性とエイリアス][4]を設定して、ログ環境を統合します。
- 取り込んだストリーム全体からのログデータを要約するコスト効率の高い方法として、[取り込んだログからメトリクスを生成][5]します。
- [ログインデックス][6]を使用して、ログ管理予算をきめ細かく管理します。
- 取り込んだログを独自のクラウドホストストレージバケットに転送して、将来のトラブルシューティングやコンプライアンス監査のために[アーカイブ][7]として保持します。
- [アーカイブをリハイドレート][8]して、古いログイベントまたはインデックス作成から除外されたログイベントを分析または調査します。
- [ログデータアクセス][9]を制限クエリで制限します。

## ログエクスプローラー

コンフィギュレーションが完了したら、[ログエクスプローラー][10]でログの調査とトラブルシューティングを開始します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /ja/logs/processing/pipelines/
[3]: /ja/logs/processing/processors/
[4]: /ja/logs/log_configuration/attributes_naming_convention/
[5]: /ja/logs/log_configuration/logs_to_metrics/
[6]: /ja/logs/log_configuration/indexes
[7]: /ja/logs/log_configuration/archives/
[8]: /ja/logs/log_configuration/rehydrating
[9]: /ja/logs/guide/logs-rbac/
[10]: /ja/logs/explorer/