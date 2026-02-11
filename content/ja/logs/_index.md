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
description: ホスト、コンテナ、サービスからログを収集するようにDatadogエージェントを構成します。
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Release Notes
  text: Datadog Log Managementの最新リリースをチェック（要アプリログイン）
- link: /logs/log_collection/
  tag: Documentation
  text: ログの収集を開始します
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Learning Center
  text: ログ管理入門
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 対話型セッションに参加してログ管理を最適化
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: ログ異常検出によるインシデント調査の迅速化
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Datadog Log ManagementでIoTデバイスを大規模に監視
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: Blog
  text: Datadogでファイアウォールのログを監視する
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: CIDR表記クエリを使用してネットワークトラフィックログをフィルタリング
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Datadog Cloud SIEMで1Passwordを監視
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: サブクエリを使用してログを動的にフィルタリングおよび相関
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: DNSログを監視してネットワークとセキュリティを分析
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Datadogによるログ管理インデックス戦略ガイド
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Datadog Archive Searchで履歴ログの検索を効率化
title: ログ管理
---

{{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  Datadog Log Managementがログ、メトリック、トレースを1つのビューに統合し、ログ・データを分析するための豊富なコンテキストを提供する方法について、入門または中級のイネーブルメント・セッションで学んでください。
{{< /learning-center-callout >}}

## 概要

インフラの健全性を維持するためには、システム運用の重要な部分をログに記録することが非常に重要です。最新のインフラストラクチャには、1分間に数千のログイベントを生成する機能があります。このような状況では、ログ管理ソリューションに送信するログとアーカイブするログを選択する必要があります。しかし、送信前にログをフィルタリングしてしまうと、受信範囲にずれが生じたり、誤って貴重なデータが持ち去られてしまう可能性があります。

Datadog Log Managementは、Datadogログまたはロギングとも呼ばれ、ログの取り込みをインデックスから切り離すことで、これらの制限を排除します。これにより、制限なくすべてのログをコスト効率よく収集、処理、アーカイブ、探索、監視することができます。これは「制限のないロギング」とも呼ばれます*。

制限のないロギング*により、[ログエクスプローラ][1]での合理的なトラブルシューティングが可能になります。これにより、お客様とチームはインフラストラクチャの問題を迅速に評価して修正できます。監査や評価の際にセキュリティチームやITチームをサポートする直感的なアーカイブ機能を提供します。また、制限のないロギング*は、お客様の環境のセキュリティ脅威を検出する[Datadog Cloud SIEM][2]を強化し、ログにインデックスを作成する必要はありません。

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## コレクト

ホスト、コンテナ、クラウドプロバイダーなどから[ログを取り込み][4]、Datadog Log Managementの利用を開始します。

## 設定

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configure your logs all in one place" >}}

ログが取得されたら、パイプラインとプロセッサーを使用してすべてのログを処理し、充実させます。インデックスを使用してログ管理予算をコントロールしたり、取得したログからメトリックを生成したり、[ログ構成オプション][5]を使用してストレージに最適化されたアーカイブ内でログを管理したりすることもできます。

## 接続

{{< img src="/logs/connect.png" alt="Correlate logs with metrics or traces" style="width:80%;">}}

ログを指標とトレースに結びつけて、オブザーバビリティの柱を活用:

- [ログとトレース][6]を接続し、アプリケーションにオブザーバビリティをもたらします。
- [ログとメトリック][7]を関連付けて問題のコンテキストを取得し、サービス全体にマッピングします。

## 探索

[ログエクスプローラ][1]で取り込んだログの探索を開始します。

**ヒント**:Datadogのグローバル検索からログエクスプローラを開くには、<kbd>Cmd</kbd>/<kbd>Ctrl</kbd>+<kbd>K</kbd>キーを押して`logs`を検索します。

{{< img src="/logs/explore.png" alt="Explore your ingested logs" style="width:80%;">}}

- [検索][8]:すべてのログを検索します。
- [ライブテール][9]:取り込んだログをすべての環境でリアルタイムに確認できます。
- [分析][10]:インデックスされたログに対してログ分析を実行します。
- [パターン][11]:インデックスされたログをクラスタ化してログパターンを見つけます。
- [保存された][12]ビュー：保存されたビューを使用して、ログエクスプローラを自動的に設定します。


{{< learning-center-callout header="Try Introduction to Log Management in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  実際のクラウド・コンピューティング容量とDatadogトライアル・アカウントでコストをかけずに学習できます。今すぐ登録して、ログ収集、クエリ、分析、メトリック、監視、処理、ストレージ、アクセス制御の詳細をご確認ください。
{{< /learning-center-callout >}}

## さらに読む

{{< partial name="whats-next/whats-next.html" >}}
<br>
※制限のないロギングはDatadog, Inc.の商標です。

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