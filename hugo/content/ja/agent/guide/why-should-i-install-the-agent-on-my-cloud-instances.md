---
aliases:
- /ja/agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
- /ja/integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
- /ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
further_reading:
- link: /integrations/guide/cloud-metric-delay/
  tag: ガイド
  text: クラウドメトリクスの遅延
title: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
---

Datadog Agent は、ホストで実行されるソフトウェアです。ホストからイベントとメトリクスを収集し、Datadog に送信します。ここで、モニタリングとパフォーマンスのデータを分析できます。Datadog Agent はオープンソースです。ソースコードは、GitHub の [DataDog/datadog-agent][1] から入手できます。

AWS、Azure、Google Cloud、その他のクラウドベースのメトリクスプロバイダーを使用している場合、インスタンスに Datadog Agent をインストールすると、いくつかのメリットがあります。以下はその例です。

* **より高い解像度 (粒度)** - クラウドプロバイダーは、5～25 分ごとにホストを外部からサンプリングして監視します。さらに、AWS は API を介して 1 分単位のメトリクスを提供します。Datadog はすべてのメトリクスを 1 秒間隔で保存しているため、AWS のメトリクスは後処理の段階で 60 秒間隔に平均化されます。ホストのパフォーマンスをよりきめ細かく把握するために、Datadog Agent は 15 秒ごとにパフォーマンス統計を収集し、ホスト内部で何が起きているかをより詳細に可視化します。

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="Agent vs AWS CloudWatch" style="width:70%;">}}

* **公開メトリクス** - Datadog は、デフォルトで 50 以上のメトリクスを有効にしています。Datadog のアプリケーション固有の[インテグレーション][2]により、さらに多くのメトリクスを追加することが可能です。

* **インテグレーション** - [{{< translate key="integration_count" >}} 件を超えるインテグレーション][2]により、Datadog Agent の機能はネイティブなメトリクスの枠を超えて拡張されます。

* **サービス全体でのタグの一貫性**: Agent レベルで適用したタグは、Agent が報告するすべてのメトリクス、ログ、およびトレースに付与されます。

* **DogStatsD によるカスタムメトリクス** - Datadog Agent があれば、内蔵の [StatsD クライアント][4]を使用してアプリケーションからカスタムメトリクスを送信し、アプリケーション、ユーザー、システムで発生していることを関連付けることができます。

* **カスタム Agent チェック** - さらに高度なカスタマイズを行うには、[カスタム Agent チェック][5]を実装して独自のシステムやアプリケーションからメトリクスやその他のデータを収集し、Datadog に送信します。

* **アプリケーションログ**: Datadog Agent は、クラウド VM やコンテナ上でローカルに生成されるアプリケーションログを[収集して転送][6]します。そのため、クラウドプロバイダーのインテグレーション経由で転送する必要はありません。これらのログには、Agent レベルのタグも適用されます。

* **Application Performance Monitoring (APM)** - [Agent を介して収集されたトレース][4]により、アプリケーションを包括的に可視化できます。これにより、エンドツーエンドのサービスパフォーマンスを把握し、潜在的なボトルネックを特定するのに役立ちます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://docs.datadoghq.com/ja/integrations/
[3]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=hostagent
[4]: https://docs.datadoghq.com/ja/tracing/
[5]: https://docs.datadoghq.com/ja/developers/custom_checks/
[6]: https://docs.datadoghq.com/ja/agent/logs/?tab=tailfiles