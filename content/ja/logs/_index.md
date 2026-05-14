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
description: ホスト、コンテナ、サービスからログを収集するように Datadog Agent を設定します。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Release Notes
  text: Datadog Log Management の最新リリースを確認する (アプリへのログインが必要)
- link: /logs/log_collection/
  tag: Documentation
  text: ログの収集を開始する
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Learning Center
  text: Log Management の概要
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Log Management を最適化するためのインタラクティブセッションに参加する
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: Log Anomaly Detection によるインシデント調査の迅速化
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Datadog Log Management を使用した大規模な IoT デバイスのモニタリング
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: Blog
  text: Datadog によるファイアウォールログのモニタリング
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: CIDR 表記のクエリを使用したネットワークトラフィックログのフィルタリング
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Datadog Cloud SIEM による 1Password のモニタリング
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: サブクエリを使用したログの動的なフィルタリングと相関付け
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: ネットワークおよびセキュリティ分析のための DNS ログのモニタリング
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Datadog による Log Management インデックス戦略ガイド
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Datadog Archive Search による過去ログの効率的な検索
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Sensitive Data Scanner の機械学習によるログ内の氏名の検出
title: Log Management
---
{{< learning-center-callout header="イネーブルメントウェビナーセッションへの参加" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  入門または中級のイネーブルメントセッションに参加して、Datadog Log Management がログ、メトリクス、トレースを単一のビューに統合し、ログデータの分析に役立つ豊富なコンテキストを提供する方法を学びましょう。
{{< /learning-center-callout >}}

## 概要 {#overview}

インフラストラクチャーの健全性を維持するには、システム運用の重要な部分をログに記録することが不可欠です。最新のインフラストラクチャーには、1 分間に数千ものログイベントを生成する能力があります。このような状況では、どのログをログ管理ソリューションに送信し、どのログをアーカイブするかを選択する必要があります。しかし、送信前にログをフィルタリングすると、カバレッジにギャップが生じたり、貴重なデータが誤って削除されたりする可能性があります。

Datadog Log Management (Datadog ログまたはロギングとも呼ばれます) は、ログの取り込みとインデックス作成を切り離すことで、これらの制限を解消します。これにより、すべてのログを制限なく、コスト効率よく収集、処理、アーカイブ、探索、モニタリングできるようになります。これは Logging without Limits\* としても知られています。

Logging without Limits\* は [ログエクスプローラー][1]での合理化されたトラブルシューティング体験を可能にし、ユーザーやチームがインフラストラクチャーの問題を迅速に評価して修正できるようにします。直感的なアーカイブ機能を提供し、監査や評価の際にセキュリティチームと IT チームをサポートします。Logging without Limits* は [Datadog Cloud SIEM][2] の基盤でもあり、ログのインデックス作成を必要とせずに環境内のセキュリティ脅威を検出します。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## 収集 {#collect}

Datadog Log Management を使い始めるには、ホスト、コンテナ、クラウドプロバイダー、その他のソースからの [ログの取り込み][4] を開始します。

##設定 {#configure}

{{< img src="logs/lwl_marketecture_20231030.png" alt="ログを 1 か所で設定" >}}

ログを取り込んだ後は、[ログ設定オプション][5]を使用して、パイプラインとプロセッサーによるログの処理と強化、インデックスによるログ管理予算の制御、取り込んだログからのメトリクス生成、ストレージが最適化されたアーカイブ内でのログ管理ができます。

##接続 {#connect}

{{< img src="/logs/connect.png" alt="ログとメトリクスまたはトレースの相関付け" style="width:80%;">}}

ログをメトリクスやトレースに接続することで、可観測性の柱を活用できます。

- [ログとトレースを接続][6]して、アプリケーションの可観測性を確保します。
-[ログとメトリクスを相関付け][7]して、問題のコンテキストを把握し、サービス全体にマッピングします。

##探索 {#explore}

[ログエクスプローラー][1]で、取り込んだログの探索を開始します。

**ヒント**: Datadog のグローバル検索から ログエクスプローラーを開くには、<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> キーを押しながら <kbd>K</kbd> キーを押し、`logs` を検索します。

{{< img src="/logs/explore.png" alt="取り込んだログの探索" style="width:80%;">}}

- [検索][8]: すべてのログを検索します。
-[Live Tail][9]: 取り込まれたログをすべての環境でリアルタイムで確認します。
-[分析][10]: インデックス化されたログに対してログ分析を実行します。
-[パターン][11]: インデックス化されたログをクラスタリングして、ログパターンを特定します。
-[Saved Views][12]: 保存済みビューを使用して、ログエクスプローラーを自動的に設定します。


{{< learning-center-callout header="ラーニングセンターで Log Management の概要を試す" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  実際のクラウドコンピューティング容量と Datadog トライアルアカウントを使用して、無料で学習できます。今すぐ登録して、ログ収集、クエリ、分析、メトリクス、モニタリング、処理、ストレージ、アクセス制御について詳しく学びましょう。
{{< /learning-center-callout >}}

## その他の参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/explorer/
[2]: /ja/security/cloud_siem/
[4]: /ja/logs/log_collection/
[5]: /ja/logs/log_configuration/
[6]: /ja/tracing/other_telemetry/connect_logs_and_traces/
[7]: /ja/logs/guide/correlate-logs-with-metrics/
[8]: /ja/logs/explorer/search_syntax/
[9]: /ja/logs/live_tail/
[10]: /ja/logs/explorer/analytics/
[11]: /ja/logs/explorer/patterns/
[12]: /ja/logs/explorer/saved_views/