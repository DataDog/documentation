---
aliases:
- /ja/guides/logs/
- /ja/logs/logging_without_limits
cascade:
  algolia:
    rank: 70
description: Datadog Agent を設定して、ホスト、コンテナー、およびサービスからログを収集します。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: リリースノート
  text: Datadog Log Management の最新リリースをチェック (アプリログインが必要です)
- link: /logs/log_collection/
  tag: Documentation
  text: ログの収集開始
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: ラーニング センター
  text: ログ管理の紹介
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: ログ管理を最適化するためのインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: ブログ
  text: ログ異常検出によるインシデント調査の迅速化
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: ブログ
  text: Datadog のログ管理で IoT デバイスを大規模に監視する
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: ブログ
  text: Datadog でファイアウォールのログを監視する
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: ブログ
  text: CIDR 表記クエリを使用して、ネットワークトラフィックログをフィルターする
kind: Documentation
title: ログ管理
---

## 概要

インフラストラクチャーの健全性を維持するためには、システム運用の重要な部分をログに記録することが重要です。現代のインフラストラクチャーは、1分 間に数千のログイベントを生成する能力を備えています。このような場合、ログ管理ソリューションに送信するログとアーカイブするログを決定しなければなりません。しかし、送信前にログを絞り込むと、カバレッジにギャップが生じ、有用なデータが除外されてしまう可能性があります。

Datadog ログ管理 (Datadog Logs または Logging とも呼ばれる) は、ログのインジェストをインデックス作成から切り離すことで、これらの制約を取り除きます。これにより、コスト効率よく、制限なしにすべてのログを収集、処理、アーカイブ、探索、監視することが可能になります (Logging without Limits\* とも呼ばれます)。

Logging without Limits\* は、[ログエクスプローラー][1]でトラブルシューティングを合理化し、インフラストラクチャーの問題を迅速に評価および修正する力を提供します。また、直感的なアーカイブ機能により、監査や評価時にセキュリティチームや IT チームをサポートします。[Datadog Cloud SIEM][2] は、ログのインデックスを作成することなく、環境内のセキュリティ脅威を検出します。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## 収集

ホスト、コンテナ、クラウドプロバイダーなどのソースから[ログをインジェスト][3]し、Datadog ログ管理を始めましょう。

## 構成

{{< img src="/logs/configure.png" alt="ログをすべて 1 か所で構成する" style="width:80%;">}}

ログをインジェストしたら、パイプラインやプロセッサですべてのログを処理して充実させ、インデックスでログ管理予算をコントロールし、インジェストしたログからメトリクスを生成し、[ログコンフィギュレーションオプション][4]でストレージに最適化したアーカイブでログを管理することができます。

## Connect

{{< img src="/logs/connect.png" alt="ログをメトリクスまたはトレースと相関させる" style="width:80%;">}}

ログをメトリクスやトレースに接続することで、観測可能性の柱を活用することができます。

- [ログとトレースを接続する][5]ことで、アプリケーションを観察できるようになります。
- [ログとメトリクスの関連付け][6]により、問題のコンテキストを把握し、サービス全体にマッピングすることができます。

## 確認

[ログエクスプローラー][1]でインジェストしたログの確認を開始します。

{{< img src="/logs/explore.png" alt="取り込んだログを確認する" style="width:80%;">}}

- [検索][7]: すべてのログを検索します。
- [Live Tail][8]: 取り込んだログをすべての環境でリアルタイムに確認できます。
- [分析][9]: インデックス付きログに対してログ分析を実行します。
- [パターン][10]: インデックス付きログをクラスター化して、ログパターンを特定します。
- [保存ビュー][11]: 保存ビューを使用してログエクスプローラーを自動構成します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/explorer/
[2]: /ja/security/cloud_siem/
[3]: /ja/logs/log_collection/
[4]: /ja/logs/log_configuration/
[5]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[6]: /ja/logs/guide/correlate-logs-with-metrics/
[7]: /ja/logs/explorer/search_syntax/
[8]: /ja/logs/live_tail/
[9]: /ja/logs/explorer/analytics/
[10]: /ja/logs/explorer/patterns/
[11]: /ja/logs/explorer/saved_views/