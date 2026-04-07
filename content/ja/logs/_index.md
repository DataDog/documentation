---
algolia:
  tags:
  - logs
aliases:
- /ja/guides/logs/
- /ja/en/logs
- /ja/logs/logging_without_limits
cascade:
  algolia:
    rank: 70
description: Datadog Agent を、ホスト、コンテナ、およびサービスからログを収集するように構成します。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Release Notes
  text: Datadog Log Management の最新リリースをチェック (アプリログインが必要です)
- link: /logs/log_collection/
  tag: Documentation
  text: ログの収集開始
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Learning Center
  text: Log Management の紹介
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Log Management を最適化するためのインタラクティブなセッションにご参加ください
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: ログ異常検出によるインシデント調査の迅速化
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Datadog Log Management で IoT デバイスを大規模にモニターする
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: Blog
  text: Datadog でファイアウォールログをモニターする
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: CIDR 表記クエリを使用してネットワークトラフィックログをフィルターする
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Datadog Cloud SIEM で 1Password をモニターする
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: サブクエリを使用したログの動的なフィルタリングと相関付け
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: ネットワークとセキュリティ分析のための DNS ログのモニター
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Datadog を使用した Log Management インデックス戦略ガイド
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Datadog Archive Search を使用して、履歴ログをより効率的に検索
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Sensitive Data Scanner の ML を使用してログ内の人名を検出する
title: Log Management
---
{{< learning-center-callout header="エンゲージメントウェビナーセッションに参加する" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  入門または中級のイネーブルメントセッションに参加して、Datadog Log Management がログ、メトリクス、トレースを 1 つのビューに統合し、ログデータ分析に必要な、豊富なコンテキストを提供する仕組みを学びましょう。
{{< /learning-center-callout >}}

## 概要

インフラストラクチャーの健全性を維持するには、システム運用の重要な部分をログに記録することが不可欠です。最新のインフラストラクチャーでは、1 分あたり数千件のログイベントが発生することもあります。このような状況では、ログ管理ソリューションに送信するログとアーカイブするログを選択する必要があります。しかし、送信前にログをフィルタリングすると、カバレッジに抜けが生じたり、貴重なデータを誤って除いてしまったりする可能性があります。

Datadog Log Management (Datadog ログまたはロギングとも呼ぶ) は、ログの取り込みとインデックス作成を切り離すことでこうした制約を解消します。これにより、すべてのログを制限なしにコスト効率よく収集、処理、アーカイブ、調査、モニターできるようになります。これは、Logging without Limits\* とも呼ばれます。

Logging without Limits\* により、[ログエクスプローラー][1]でのトラブルシューティングが効率化され、管理者やチームはインフラストラクチャーの問題を迅速に評価して修正できるようになります。また、直感的なアーカイブ機能で、監査や評価の際にセキュリティチームと IT チームをサポートします。Logging without Limits* は、[Datadog Cloud SIEM][2] も強化します。ログのインデックス作成をしなくても、環境内のセキュリティ脅威を検出します。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## 収集

まず、ホスト、コンテナ、クラウドプロバイダーなどのソースから[ログを取り込み][4]、Datadog Log Management を始めましょう。

## 設定

{{< img src="logs/lwl_marketecture_20231030.png" alt="すべてのログを一元的に設定する" >}}

ログを取り込んだら、パイプラインやプロセッサによるログの処理と強化、インデックスを使ったログ管理予算のコントロール、取り込んだログからのメトリクス生成が可能になります。また、[ログ構成オプション][5]を使用して保管に最適化したアーカイブ内でログを管理することもできます。

## 接続

{{< img src="/logs/connect.png" alt="ログとメトリクスまたはトレースの相関" style="width:80%;">}}

ログをメトリクスやトレースに接続すると、可観測性の重要な機能を活用することができます。

 [ログとトレースを接続する][6]ことで、アプリケーションの可観測性を高めます。
[ログとメトリクスを相関付け][7]れば、問題のコンテキストを把握し、サービス全体にマッピングすることができます。

## 探索

[ログエクスプローラー][1]で取り込んだログを探索できます。

**ヒント**: Datadog のグローバル検索からログエクスプローラーを開くには、<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> キーを押しながら <kbd>K</kbd> キーを押して `logs` を検索します。

{{< img src="/logs/explore.png" alt="取り込んだログを探索する" style="width:80%;">}}

 [検索][8]: すべてのログを検索します。
[Live Tail][9]: すべての環境で取り込んだログをリアルタイムで見ることができます。
[分析][10]: インデックス化されたログに対してログ分析を実行します。
[パターン][11]: インデックス化されたログをクラスターにまとめて、ログパターンを特定します。
[Saved Views][12]: 保存ビューを使用してログエクスプローラーを自動設定します。


{{< learning-center-callout header="学習センターで Log Management の入門を試す" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  実際のクラウドの計算リソースと Datadog のトライアルアカウントを使って、無料で学習できます。今すぐ登録して、ログの収集、クエリ、分析、メトリクス、モニタリング、処理、ストレージ、アクセス制御について詳しく学びましょう。
{{< /learning-center-callout >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/explorer/
[2]: /ja/security/cloud_siem/
[4]: /ja/logs/log_collection/
[5]: /ja/logs/log_configuration/
[6]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[7]: /ja/logs/guide/correlatelogswithmetrics/
[8]: /ja/logs/explorer/search_syntax/
[9]: /ja/logs/live_tail/
[10]: /ja/logs/explorer/analytics/
[11]: /ja/logs/explorer/patterns/
[12]: /ja/logs/explorer/saved_views/