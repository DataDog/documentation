---
aliases:
- /ja/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
- /ja/integrations/faq/aws-integration-and-cloudwatch-faq
title: AWS インテグレーションと CloudWatch の FAQ
---

### インテグレーションで AWS カスタムメトリクスを収集することは可能ですか？

はい。[AWS インテグレーションページ][1]の **Metric Collection** タブで、**Collect Custom Metrics** を有効化します。

### Datadog が公式にインテグレーションしていないサービスからメトリクスを収集するにはどうすればよいですか？

`Collect custom metrics` オプションを有効にすると、公式のインテグレーションがない `AWS/<namespace>` から来る AWS メトリクスもカスタムネームスペースの下に取り込まれます。[Set an AWS tag filter][2] API でカスタムネームスペースのフィルター文字列を使用すれば、これらのメトリクスをフィルタリングして、必要なメトリクスだけを残すことができます。

### Datadog の AWS インテグレーションは、どのように CloudWatch を使用していますか？

Datadog は CloudWatch モニタリング API を使用して、AWS リソースを監視しています。これらの API の主な使用方法は、`GetMetricData` エンドポイントを通じて生のメトリクスデータを収集することです。

その他の API は、メトリクスデータを充実させるために使用されます。いくつかの例を挙げます。

 * メトリクスに追加するカスタムメトリクスタグを収集する

 * 自動ミュートなど、リソースのステータスや 健全性に関する情報を収集する

 * ログストリームを収集する

### API リクエストの回数と、CloudWatch の使用量はどのように把握できますか？

Datadog は、インストールした各 AWS サブインテグレーションについて、利用可能なメトリクスを 10 分ごとに収集します。特定のサブインテグレーション (SQS、ELB、DynamoDB、AWS カスタムメトリクス) に対して多数の AWS リソースを持っている場合、AWS CloudWatch の請求に影響を与える可能性があります。

[AWS Billing インテグレーション][3]を利用して、CloudWatch API の使用量を監視することができます。

### CloudWatch のメトリクスを Datadog に受信する際の遅延を減らすにはどうしたらよいですか？

By default, Datadog collects AWS metrics every 10 minutes. See [Cloud Metric Delay][4] for more information. If you need to reduce the latency, contact [Datadog support][5] for assistance. To get CloudWatch metrics into Datadog faster with a 2-3 minute latency we recommend using the [Amazon CloudWatch Metric Streams and Amazon Data Firehose][6]. 


### なぜカスタム AWS/Cloudwatch メトリクスの平均値しか表示されないのでしょうか？

デフォルトでは、Datadog はカスタム AWS/Cloudwatch メトリクスの平均値のみを収集します。しかし、[Datadog サポート][5]に連絡することで、追加の値を利用することができます。これらは、(利用可能な場合) 最小値、最大値、合計値、サンプルカウントを含みます。

### CloudWatch と Datadog のデータの間に矛盾がありますか？

いくつかの重要な区別に注意する必要があります。

- Datadog は、Datadog の同等の CloudWatch メトリクスに対して、単一の CloudWatch 統計を収集します。CloudWatch の `Sum` と Datadog の `Average` を比較すると、不一致が発生します。一部の CloudWatch メトリクスでは、複数の統計が有用な場合があり、Datadog では同じ CloudWatch メトリクスに対して異なる統計で異なるメトリクス名を作成します。例えば、`aws.elb.latency` と `aws.elb.latency.maximum` のようにです。
- AWS のカウンターでは、`sum` `1 minute` に設定したグラフは、その時点までの 1 分間の発生回数の合計 (1 分当たりの割合) を表示します。Datadog は、AWS で選択したタイムフレームに関係なく、AWS からの生データを 1 秒あたりの値に正規化して表示しています。そのため、Datadog ではより低い値が表示される可能性があります。
- Overall, `min`, `max`, and `avg` have different meanings within AWS. AWS distinctly collects average latency, minimum latency, and maximum latency. When pulling metrics from AWS CloudWatch, Datadog only receives the average latency as a single timeseries per ELB. Within Datadog, when you select `min`, `max`, or `avg`, you are controlling how multiple timeseries are combined. For example, requesting `system.cpu.idle` without any filter returns one series for each host reporting that metric. Datadog combines these timeseries using [space aggregation][7]. Otherwise, if you requested `system.cpu.idle` from a single host, no aggregation is necessary and switching between `avg` and `max` yields the same result.

### Datadog 上のデータを CloudWatch に表示されるデータと一致させるためには、どのように調整すればよいでしょうか？

AWS CloudWatch は、1 分単位のデータに正規化された 1 分粒度のメトリクスをレポートします。Datadog は、秒単位のデータに正規化された 1 分粒度のメトリクスをレポートします。Datadog のデータを調整するには、60 倍してください。 また、メトリクスの統計値が同じであることを確認します。例えば、`IntegrationLatency` というメトリクスは、多くの異なる統計情報 (平均、最大、最小、パーセンタイル) を取得します。Datadog では、これらの統計はそれぞれ独自のメトリクスとして表現されます。
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### rollup() でデータを調整することはできますか？

ロールアップでは同様の結果は表示されません。`rollup(sum, 60)` のロールアップコールでは、サーバーはすべてのデータポイントを分ビンでグループ化し、各ビンの合計をデータポイントとして返します。しかし、AWS メトリクスの粒度は 1 分であるため、1 ビンあたり 1 つのデータポイントしかなく、変化がありません。

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /ja/integrations/amazon_billing/
[4]: /ja/integrations/guide/cloud-metric-delay/
[5]: /ja/help/
[6]: https://docs.datadoghq.com/ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /ja/metrics/introduction/#space-aggregation