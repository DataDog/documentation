---
title: ログ管理
kind: Documentation
description: Datadog Agent を設定して、ホスト、コンテナー、およびサービスからログを収集します。
disable_sidebar: true
aliases:
  - /ja/guides/logs/
  - /ja/logs/logging_without_limits
further_reading:
  - link: /logs/guide/
    tag: ガイド
    text: Datadog を使用したロギングに関する追加ガイド
  - link: https://learn.datadoghq.com
    tag: ラーニング センター
    text: Datadog でのログ収集
---
{{< vimeo 293195142 >}}

</br>

インフラストラクチャーにより膨大な量のログイベントが生成されたり、インフラストラクチャーが著しく変動したりすることがあります。このような場合、ログ管理ソリューションに送信するログとアーカイブするログを決定しなければなりません。しかし、送信前にログを絞り込むと、カバレッジにギャップが生じ、有用なデータが除外されてしまう可能性があります。

Datadog のログ管理は、ログの取り込みをインデックスの作成から切り離すことでこのような制限を排除します。これにより、すべてのログを制限なしでコスト効率よく収集、処理、アーカイブ、検索、モニターすることができます（Logging without Limits\*）。Logging without Limits\* は、環境内のセキュリティの脅威を検出するためにログのインデックスを作成する必要がないため、Datadog の[セキュリティ監視][1]にも役立ちます。

## 収集

{{< img src="/logs/collect.png" alt="複数のソースからログを収集する" style="width:80%;">}}

[ログ収集とインテグレーション][2]: ホスト、コンテナ、クラウドプロバイダー、その他のソースからログの取り込みを開始します。

## 構成

{{< img src="/logs/configure.png" alt="ログをすべて 1 か所で構成する" style="width:80%;">}}

[ログコンフィギュレーション][3]: パイプラインとプロセッサを使用してすべてのログを処理および強化し、インデックスを使用してログ管理予算を制御し、取り込んだログからメトリクスを生成し、ストレージが最適化されたアーカイブ内でログを管理します。

## Connect

{{< img src="/logs/connect.png" alt="ログをメトリクスまたはトレースと相関させる" style="width:80%;">}}

メトリクスとトレースを使用して、可観測性の柱を活用します。

- [ログとトレースを接続する][4]</u>: ログとトレースを相互に関連付けて、アプリケーションの可観測性を高めます。
- [ログとメトリクスを相関させる][5]: Datadog 全体でログとメトリクスを相互に関連付ける方法を学びます。

## 確認

取り込んだログの確認を開始します。

{{< img src="/logs/explore.png" alt="取り込んだログを確認する" style="width:80%;">}}

- [ログエクスプローラー][6]: ログエクスプローラービュー、およびファセットとメジャーを追加する方法を確認します。
- [検索][7]: すべてのログを検索します。
- [Live Tail][8]: 取り込んだログをすべての環境でリアルタイムに確認できます。
- [分析][9]: インデックス付きログに対してログ分析を実行します。
- [パターン][10]: インデックス付きログをクラスター化して、Log Patterns を特定します。
- [保存ビュー][11]: 保存ビューを使用してログエクスプローラーを自動構成します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/security_monitoring/
[2]: /ja/logs/log_collection/
[3]: /ja/logs/log_configuration/
[4]: /ja/tracing/connect_logs_and_traces/
[5]: /ja/logs/guide/correlate-logs-with-metrics/
[6]: /ja/logs/explorer/
[7]: /ja/logs/explorer/search_syntax/
[8]: /ja/logs/live_tail/
[9]: /ja/logs/explorer/analytics/
[10]: /ja/logs/explorer/patterns/
[11]: /ja/logs/explorer/saved_views/