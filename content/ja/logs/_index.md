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
    text: ログの収集および処理に役立つその他の記事
  - link: 'https://learn.datadoghq.com'
    tag: ラーニング センター
    text: Datadog でのログ収集
---
{{< vimeo 293195142 >}}

</br>

インフラストラクチャーにより膨大な量のログイベントが生成されたり、インフラストラクチャーが著しく変動したりすることがあります。このような場合、ログ管理ソリューションに送信するログとアーカイブするログを決定しなければなりません。しかし、送信前にログを絞り込むと、カバレッジにギャップが生じ、有用なデータが除外されてしまう可能性があります。

Datadog のログ管理は、ログの取り込みをインデックスの作成から切り離すことでこのような制限を排除します。これにより、すべてのログを制限なしでコスト効率よく収集、処理、アーカイブ、検索、モニターすることができます（Logging without Limits\*）。Logging without Limits\* は、環境内のセキュリティの脅威を検出するためにログのインデックスを作成する必要がないため、Datadog の[セキュリティ監視][1]にも役立ちます。

{{< whatsnext desc="Logging without Limits* なら、以下が可能です:">}}
  {{< nextlink href="/logs/log_collection">}}<u>ログの収集とインテグレーション</u>: ホスト、コンテナ、クラウドプロバイダーからすべてのログを収集。{{< /nextlink >}}
  {{< nextlink href="/logs/processing">}}<u>処理</u>: パイプラインおよびプロセッサーを使用してすべてのログを処理、加工。 {{< /nextlink >}}
  {{< nextlink href="/logs/live_tail">}}<u>Live Tail</u>: 収集したログをあらゆる環境でリアルタイムに確認。{{< /nextlink >}}
  {{< nextlink href="/logs/logs_to_metrics">}}<u>メトリクスの生成</u>: 収集したログからメトリクスを生成。{{< /nextlink >}}
  {{< nextlink href="/logs/archives">}}<u>アーカイブ</u>: 加工したすべてのログを S3 バケットにアーカイブ。{{< /nextlink >}}
  {{< nextlink href="/logs/indexes">}}<u>インデックスの作成</u>: インデックスに含めるログ/除外するログを動的に決定し、コストを制御。{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="ログのインデックスを作成したら、Log Explorer で検索します:">}}
  {{< nextlink href="/logs/explorer/">}}<u>Log Explorer</u>: Log Explorer ビューで、ファセットおよびメジャーを追加する方法を確認。{{< /nextlink >}}
  {{< nextlink href="/logs/explorer">}}<u>検索</u>: インデックス化されたすべてのログを検索。{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/analytics">}}<u>分析</u>: インデックス化されたログの分析を実行。{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/patterns">}}<u>パターン</u>: インデックス化されたログを {{< /nextlink >}}
{{< nextlink href="/tracing/advanced/connect_logs_and_traces/?tab=java">}}まとめることで、Log Patterns を発見。{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/saved_views/">}}<u>保存ビュー</u>: 保存ビューを使用して、Log Explorer を自動的に構成。{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="最後に、メトリクスやトレースを使用した可観測性を活用します:">}}
  {{< nextlink href="/tracing/connect_logs_and_traces/">}}<u>ログとトレースの関連付け</u>: 監視されているログに関連するトレースをピンポイントで確認。{{< /nextlink >}}
  {{< nextlink href="/dashboards/timeboards/#graph-menu">}}<u>ログとメトリクスの関連付け</u>: 監視されているログに関連するメトリクスをピンポイントで確認。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/security_monitoring/