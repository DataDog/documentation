---
title: Log Management
description: "Datadog Agent を設定して、ホスト、コンテナー、およびサービスからログを収集します。"
disable_sidebar: true
aliases:
  - /guides/logs/
  - /en/logs
  - /logs/logging_without_limits
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Log%20Management"
    tag: "リリースノート"
    text: "Datadog Log Management の最新リリースをチェック (アプリログインが必要です)"
  - link: "/logs/log_collection/"
    tag: "Documentation"
    text: "ログの収集開始"
  - link: "https://learn.datadoghq.com/courses/intro-to-log-management"
    tag: "ラーニング センター"
    text: "ログ管理の紹介"
  - link: 'https://dtdg.co/fe'
    tag: 'Foundation Enablement'
    text: 'Join an interactive session to optimize your Log Management'
  - link: "https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/"
    tag: "ブログ"
    text: "ログ異常検出によるインシデント調査の迅速化"
  - link: "https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/"
    tag: "ブログ"
    text: "Datadog のログ管理で IoT デバイスを大規模に監視する"
  - link: "https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/"
    tag: "ブログ"
    text: "Monitor your firewall logs with Datadog"
  - link: "https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/"
    tag: "ブログ"
    text: "CIDR 表記クエリを使用して、ネットワークトラフィックログをフィルターする"
  - link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
    tag: "ブログ"
    text: "Datadog Cloud SIEM で 1Password を監視"
  - link: "https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/"
    tag: "ブログ"
    text: "サブクエリを使用したログの動的なフィルタリングと相関付け"
  - link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
    tag: "ブログ"
    text: "ネットワークとセキュリティ分析のための DNS ログの監視"
cascade:
    algolia:
        rank: 70
---

## 概要

インフラストラクチャーの健全性を維持するためには、システム運用の重要な部分をログに記録することが重要です。現代のインフラストラクチャーは、1分 間に数千のログイベントを生成する能力を備えています。このような場合、ログ管理ソリューションに送信するログとアーカイブするログを決定しなければなりません。しかし、送信前にログを絞り込むと、カバレッジにギャップが生じ、有用なデータが除外されてしまう可能性があります。

Datadog ログ管理 (Datadog Logs または Logging とも呼ばれる) は、ログのインジェストをインデックス作成から切り離すことで、これらの制約を取り除きます。これにより、コスト効率よく、制限なしにすべてのログを収集、処理、アーカイブ、探索、監視することが可能になります (Logging without Limits\* とも呼ばれます)。

Logging without Limits\* は、[ログエクスプローラー][1]でトラブルシューティングを合理化し、インフラストラクチャーの問題を迅速に評価および修正する力を提供します。また、直感的なアーカイブ機能により、監査や評価時にセキュリティチームや IT チームをサポートします。[Datadog Cloud SIEM][2] は、ログのインデックスを作成することなく、環境内のセキュリティ脅威を検出します。

**注**: PCI 準拠の Datadog 組織のセットアップに関する情報については、[PCI DSS 準拠][3]を参照してください。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## 収集

ホスト、コンテナ、クラウドプロバイダーなどのソースから[ログを取り込み][4]、Datadog ログ管理を始めましょう。

## 構成

{{< img src="logs/lwl_marketecture_20231030.png" alt="ログの構成を一元管理" >}}

ログを取り込んだら、パイプラインやプロセッサですべてのログを処理してリッチ化し、インデックスでログ管理予算をコントロールし、取り込んだログからメトリクスを生成し、[ログ構成オプション][5]でストレージに最適化したアーカイブでログを管理することができます。

## Connect

{{< img src="/logs/connect.png" alt="ログをメトリクスまたはトレースと相関させる" style="width:80%;">}}

ログをメトリクスやトレースに接続することで、観測可能性の柱を活用することができます。

- [ログとトレースを接続する][6]ことで、アプリケーションの可観測性を高めます。
- [ログとメトリクスの相関付け][7]により、問題のコンテキストを把握し、サービス全体にマッピングすることができます。

## 確認

[ログエクスプローラー][1]でインジェストしたログの確認を開始します。

{{< img src="/logs/explore.png" alt="取り込んだログを確認する" style="width:80%;">}}

- [検索][8]: すべてのログを検索します。
- [Live Tail][9]: 取り込んだログをすべての環境でリアルタイムに確認できます。
- [分析][10]: インデックス付きログに対してログ分析を実行します。
- [パターン][11]: インデックス付きログをクラスター化して、ログパターンを特定します。
- [保存ビュー][12]: 保存ビューを使用してログエクスプローラーを自動構成します。


{{< learning-center-callout header="ラーニングセンターでログ管理入門をお試しください" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  実際のクラウドコンピュートキャパシティと Datadog のトライアルアカウントを使用して、コストをかけずに学ぶことができます。今すぐ登録して、ログの収集、クエリ、分析、メトリクス、監視、処理、ストレージ、アクセス制御を学習しましょう。
{{< /learning-center-callout >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /logs/explorer/
[2]: /security/cloud_siem/
[3]: /data_security/pci_compliance/
[4]: /logs/log_collection/
[5]: /logs/log_configuration/
[6]: /tracing/other_telemetry/connect_logs_and_traces/
[7]: /logs/guide/correlate-logs-with-metrics/
[8]: /logs/explorer/search_syntax/
[9]: /logs/live_tail/
[10]: /logs/explorer/analytics/
[11]: /logs/explorer/patterns/
[12]: /logs/explorer/saved_views/