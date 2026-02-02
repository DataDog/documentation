---
title: ログ管理
description: "Datadog Agent を設定して、ホスト、コンテナ、およびサービスからログを収集します。"
disable_sidebar: true
aliases:
  - /guides/logs/
  - /en/logs
  - /logs/logging_without_limits
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Log%20Management"
    tag: "Release Notes"
    text: "Datadog Log Management の最新リリースをチェック (アプリログインが必要です)"
  - link: "/logs/log_collection/"
    tag: "Documentation"
    text: "ログの収集開始"
  - link: "https://learn.datadoghq.com/courses/intro-to-log-management"
    tag: "Learning Center"
    text: "Log Management の紹介"
  - link: 'https://dtdg.co/fe'
    tag: 'Foundation Enablement'
    text: 'Log Management を最適化するためのインタラクティブセッションにご参加ください'
  - link: "https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/"
    tag: "Blog"
    text: "ログ異常検出によるインシデント調査の迅速化"
  - link: "https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/"
    tag: "Blog"
    text: "Datadog Log Management で IoT デバイスを大規模に監視する"
  - link: "https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/"
    tag: "Blog"
    text: "Datadog でファイアウォールのログを監視する"
  - link: "https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/"
    tag: "Blog"
    text: "CIDR 表記クエリを使用して、ネットワークトラフィックログをフィルターする"
  - link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
    tag: "Blog"
    text: "Datadog Cloud SIEM で 1Password を監視"
  - link: "https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/"
    tag: "Blog"
    text: "サブクエリを使用したログの動的なフィルタリングと相関付け"
  - link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
    tag: "Blog"
    text: "ネットワークとセキュリティ分析のための DNS ログの監視"
  - link: "https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/"
    tag: "Architecture Center"
    text: "Datadog を使用したログ管理のインデックス戦略ガイド"
  - link: "https://www.datadoghq.com/blog/archive-search/"
    tag: "Blog"
    text: "Datadog Archive Search を使用して、履歴ログをより効率的に検索"
cascade:
    algolia:
        rank: 70
algolia:
    tags: ['logs']
---

{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加" hide\_image="true" btn\_title="登録" btn\_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  入門または中級のイネーブルメントセッションに参加して、Datadog Log Management がログ、メトリクス、トレースを 1 つのビューに統合し、ログデータ分析に必要な、豊富なコンテキストを提供する仕組みを学びましょう。
{{< /learning-center-callout >}}

## 概要

インフラストラクチャーの健全性を維持するには、システム運用の重要な部分をログに記録することが不可欠です。最新のインフラストラクチャーでは、1 分あたり数千件のログイベントが発生することもあります。このような状況では、ログ管理ソリューションに送信するログとアーカイブするログを選択する必要があります。しかし、送信前にログをフィルタリングすると、カバレッジに抜けが生じたり、貴重なデータを誤って削除したりする可能性があります。

Datadog Log Management (Datadog ログまたはロギングとも呼ばれます) は、ログの取り込みとインデックス作成を切り離すことでこうした制約を解消します。これにより、すべてのログを制限なしにコスト効率よく収集、処理、アーカイブ、調査、監視できるようになります。これは、Logging without Limits* とも呼ばれます。

Logging without Limits* により、[ログエクスプローラー][1]でのトラブルシューティングが効率化され、管理者やチームはインフラストラクチャーの問題を迅速に評価して修正できるようになります。また、直感的なアーカイブ機能で、監査や評価の際にセキュリティチームと IT チームをサポートします。Logging without Limits* は、[Datadog Cloud SIEM][2] でも利用され、ログのインデックス作成を必要とすることなく、環境内のセキュリティ脅威の検出を可能にしています。

{{< vimeo url="https://player.vimeo.com/progressive\_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## 収集

Datadog Log Management の使用を開始するには、最初にホスト、コンテナ、クラウドプロバイダー、その他のソースから[ログを取り込み][4]ます。

## 構成

{{< img src="logs/lwl\_marketecture\_20231030.png" alt="ログの構成を一元管理" >}}

ログを取り込んだら、パイプラインやプロセッサによるログの処理と強化、インデックスを使ったログ管理予算の管理、取り込んだログからのメトリクス生成が可能になります。また、[\[ログ構成オプション]][5]でストレージに最適化したアーカイブでログを管理することもできます。

## 接続

{{< img src="/logs/connect.png" alt="ログをメトリクスまたはトレースと相関させる" style="width:80%;">}}

ログをメトリクスやトレースに接続すると、可観測性の重要な機能を活用することができます。

- [ログとトレースを接続して][6]、アプリケーションの可観測性を高めます。
- [ログとメトリクスを相関させて][7]問題のコンテキストを取得し、サービス全体にマッピングします。

## 調査

取り込んだログの調査には、[\[ログエクスプローラー]][1]を使用します。

**ヒント**:Datadog のグローバル検索からログエクスプローラーを開くには、<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd> を押して `logs` を検索します。

{{< img src="/logs/explore.png" alt="取り込んだログを調べる" style="width:80%;">}}

- [検索][8]:すべてのログを検索します。
- [Live Tail][9]:すべての環境で、取り込んだログをリアルタイムに表示します。
- [分析][10]:インデックス化されたログに対してログ分析を実行します。
- [パターン][11]:インデックス化されたログをクラスター化してログパターンを発見します。
- [保存ビュー][12]:保存ビューを使用してログエクスプローラーを自動で構成します。


{{< learning-center-callout header="ラーニングセンターでログ管理入門をお試しください" btn\_title="今すぐ登録" btn\_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  実際のクラウドの計算リソースと Datadog のトライアルアカウントを使って、無料で学習できます。今すぐ登録して、ログの収集、クエリ、分析、メトリクス、監視、処理、ストレージ、アクセス制御について詳しく学びましょう。
{{< /learning-center-callout >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /logs/explorer/
[2]: /security/cloud_siem/
[4]: /logs/log_collection/
[5]: /logs/log_configuration/
[6]: /tracing/other_telemetry/connect_logs_and_traces/
[7]: /logs/guide/correlate-logs-with-metrics/
[8]: /logs/explorer/search_syntax/
[9]: /logs/live_tail/
[10]: /logs/explorer/analytics/
[11]: /logs/explorer/patterns/
[12]: /logs/explorer/saved_views/
