---
aliases:
- /ja/integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
- /ja/integrations/faq/aws-integration-and-cloudwatch-faq
description: Datadog AWS インテグレーションと CloudWatch メトリクス収集に関するよくある質問。
title: AWS インテグレーションと CloudWatch の FAQ
---
### インテグレーションで AWS Custom メトリクスを収集することは可能ですか。{#can-i-collect-aws-custom-metrics-through-the-integration}

はい。[AWS インテグレーションページ][1]の [**メトリクスの収集**] タブで、[**Custom Metrics の収集**] を有効にします。

### AWS メトリクスをメトリクス名でフィルタリングすることは可能ですか。{#can-i-filter-aws-metrics-by-metric-name}

はい。[AWS インテグレーションページ][1]で [**Metric Collection**] タブを開き、CloudWatch 名前空間を展開して、メトリクス名のフィルターを追加します。[**Include**] を使用してその名前空間の該当する Datadog メトリクス名のみを収集するか、[**Exclude**] を使用して該当するメトリクス名以外をすべて収集します。

構文や必要なメトリクスの詳細については、「[AWS の概要][14]」を参照してください。プログラムでメトリクス名フィルターを管理する方法については、「[API を使用した AWS メトリクス名フィルターの設定][15]」を参照してください。

### Datadog の公式インテグレーションが提供されていないサービスのメトリクスを収集するにはどうすればよいですか。{#how-do-i-collect-metrics-from-a-service-for-which-datadog-doesnt-have-an-official-integration}

公式インテグレーションが存在しない `AWS/<namespace>` からの AWS メトリクスも、`Collect custom metrics` オプションが有効な場合はカスタム名前空間の下に取り込まれます。「[AWS タグのフィルター設定][2]」API を使用してカスタム名前空間に対してフィルター文字列を指定することで、これらのメトリクスを除外し、必要なメトリクスのみを残すことができます。

### Datadog の AWS インテグレーションは、どのように CloudWatch を使用していますか。{#how-does-the-datadog-aws-integration-use-cloudwatch}

Datadog は、CloudWatch モニタリング API を使用して AWS リソースを監視します。これらの API の主な用途は、`GetMetricData` エンドポイントを通じて生のメトリクスデータを収集することです。

その他の API は、メトリクスデータを補完するために使用されます。例をいくつか挙げます。

 * メトリクスに追加するカスタムタグの収集

 * 自動ミュートなど、リソースのステータスや健全性に関する情報の収集

 * ログストリームの収集

### API リクエストの回数および CloudWatch の使用状況をどのように監視できますか。{#how-many-api-requests-are-made-and-how-can-i-monitor-my-cloudwatch-usage}

Datadog は、インストールされている各 AWS サブインテグレーションについて、利用可能なメトリクスを 10 分ごとに収集します。特定のサブインテグレーション (SQS、ELB、DynamoDB、AWS Custom メトリクス) に対して多数の AWS リソースがある場合、AWS CloudWatch の利用料金に影響を与える可能性があります。

[AWS Billing インテグレーション][3]を利用して、CloudWatch API の使用量を監視することができます。

### CloudWatch のメトリクスを Datadog に受信する際の遅延を減らすにはどうしたらよいですか。{#how-can-i-reduce-the-delay-of-receiving-my-cloudwatch-metrics-to-datadog}

デフォルトでは、Datadog は AWS メトリクスを 10 分ごとに収集します。詳細については、「[クラウドメトリクスの遅延][4]」を参照してください。遅延を減らす必要がある場合は、[Datadog サポート][5]までお問い合わせください。CloudWatch メトリクスを 2 ～ 3 分の遅延でより迅速に Datadog に取り込むには、[Amazon CloudWatch メトリクスストリームと Amazon Data Firehose][6] を使用することをお勧めします。


### なぜカスタム AWS/CloudWatch メトリクスの平均値しか表示されないのでしょうか。{#why-am-i-only-seeing-the-average-values-of-my-custom-awscloudwatch-metrics}

デフォルトでは、Datadog はカスタム AWS/CloudWatch メトリクスの平均値のみを収集します。ただし、[Datadog サポート][5]にお問い合わせいただくことで、追加の値を利用できるようになります。これには (利用可能な場合)、最小値、最大値、合計、サンプル数が含まれます。

### CloudWatch と Datadog のデータの間に差異がありますか。{#is-there-a-discrepancy-between-my-data-in-cloudwatch-and-datadog}

いくつかの重要な区別に注意する必要があります。

- Datadog は、Datadog に対応する CloudWatch メトリクスに対して、単一の CloudWatch 統計情報を収集します。そのため、CloudWatch の `Sum` と Datadog の `Average` を比較すると、差異が生じます。一部の CloudWatch メトリクスでは複数の統計が役立つ場合があり、Datadog では同じ CloudWatch メトリクスであっても、統計情報ごとに異なるメトリクス名を作成しています。たとえば、`aws.elb.latency` や `aws.elb.latency.maximum` などです。
- AWS のカウンターメトリクスにおいて、`sum` `1 minute` に設定されたグラフは、その時点までの 1 分間に発生した合計数 (1 分間あたりのレート) を示します。一方、Datadog は、AWS で選択された時間枠に関係なく、AWS からの生データを 1 秒あたりの値に正規化して表示します。そのため、Datadog では値が低く表示されることがあります。
- AWS 内では全体として、`min`、`max`、および `avg` はそれぞれ異なる意味を持ちます。AWS は、平均レイテンシー、最小レイテンシー、最大レイテンシーを個別に収集します。AWS CloudWatch からメトリクスを取得する際、Datadog は ELB ごとに単一の時系列として平均レイテンシーのみを受信します。Datadog 内で `min`、`max`、または `avg` を選択するということは、複数の時系列データをどのように組み合わせるかを指定していることになります。たとえば、フィルターなしで `system.cpu.idle` を要求すると、そのメトリクスを報告するホストごとに 1 つの時系列が返されます。Datadog は、[スペース集計][7]を使用してこれらの時系列データを結合します。それ以外の場合、単一のホストから `system.cpu.idle` を要求したときは集計は不要であり、`avg` と `max` を切り替えても同じ結果が得られます。

### Datadog 上のデータを CloudWatch に表示されるデータと一致させるためには、どのように調整すればよいでしょうか。{#how-do-i-adjust-my-data-on-datadog-to-match-the-data-displayed-in-cloudwatch}

AWS CloudWatch は、1 分単位の粒度でメトリクスを報告し、1 分あたりのデータに正規化します。Datadog は、1 分単位の粒度でメトリクスを報告し、1 秒あたりのデータに正規化します。それで、Datadog でデータを調整するには、60 倍します。また、メトリクスの統計タイプが同じであることを確認してください。たとえば、`IntegrationLatency` というメトリクスは、平均、最大、最小、およびパーセンタイルといった、さまざまな統計を取得します。Datadog では、これらの統計はそれぞれ独自のメトリクスとして表されます。
  ```
aws.apigateway.integration_latency (average)
aws.apigateway.integration_latency.maximum
aws.apigateway.integration_latency.minimum
aws.apigateway.integration_latency.p50
  ```


#### rollup() はデータを調整しますか。{#will-a-rollup-adjust-my-data}

ロールアップ処理は、単に類似した結果を表示するものではありません。たとえば、`rollup(sum, 60)` のロールアップ呼び出しでは、サーバーはすべてのデータポイントを 1 分単位のビンにグループ化し、各ビンの合計を 1 つのデータポイントとして返します。しかし、AWS メトリクスの粒度は 1 分であるため、ビンあたりのデータポイントは 1 つしかなく、結果として変化はありません。

### 有効にした新しい AWS サービスのメトリクスが表示されないのはなぜですか。{#why-dont-i-see-metrics-for-a-new-aws-service-i-enabled}

最近新しい AWS サービスインテグレーションを有効にしたにもかかわらず Datadog でメトリクスが表示されない場合は、以下を確認してください。

1. **IAM 権限**: Datadog インテグレーションに関連付けられている IAM ロールまたは IAM ユーザーに、そのサービスで必要な権限が含まれていることを確認してください。サービス固有の権限要件については、各[AWS インテグレーションページ][8]を参照してください。
2. **リージョン**: リソースがデプロイされている AWS リージョンが [AWS インテグレーションページ][1] で有効になっていることを確認してください。
3. **CloudWatch の可用性**: AWS で CloudWatch コンソールを開き、期待されるメトリクスが存在することを確認してください。特定の条件が満たされるまで CloudWatch メトリクスを出力しないサービスがあります (例: インスタンスがアタッチされていない ELB はメトリクスを出力しません)。
4. **ポーリングの遅延**: API ポーリングによるメトリクス収集は、約 10 分間隔で行われます。[CloudWatch メトリクスストリーム][6]を使用する場合、2 〜 3 分の遅延が発生します。詳細な調査を行う前に、少なくとも 1 回のポーリングサイクルが完了するまで待機してください。

### API ポーリングと CloudWatch メトリクスストリームの違いは何ですか。{#what-is-the-difference-between-api-polling-and-cloudwatch-metric-streams}

| &nbsp; | API ポーリング (デフォルト)| CloudWatch メトリクスストリーム|
|---|---|---|
| **一般的なレイテンシー** | ~ 10 分 | 2 〜 3 分|
| **セットアップ** | AWS インテグレーションに含まれている| [Amazon Data Firehose][6] による個別のセットアップが必要|
| **AWS コスト** | CloudWatch`GetMetricData`API 呼び出し| CloudWatch メトリクスストリームおよび Firehose の配信料金|
| **カバレッジ** | すべての標準 CloudWatch 名前空間。カスタム名前空間には **Custom Metrics の収集**を有効にする必要がある| ほとんどの CloudWatch 名前空間 (一部除外あり)|
| **カスタム名前空間** | **Custom Metrics の収集**が有効な場合にサポート| ストリーム構成に名前空間を含めることでサポート|

詳細については、「[クラウドメトリクスの遅延][4]」および「[CloudWatch メトリクスストリームガイド][6]」を参照してください。

### メトリクスストリームを有効にした後、メトリクス値が 2 倍に見えるのはなぜですか。{#why-do-my-metric-values-look-doubled-after-enabling-metric-streams}

API ポーリングから CloudWatch メトリクスストリームに移行する際、両方の収集方法が同じメトリクスのデータを送信する重複期間が生じます。これにより、Datadog 上でメトリクス値が 2 倍に表示される可能性があります。

Datadog はストリーミング対象のネームスペースを自動的に検出し、それらに対するポーリングを停止するため、手動で API ポーリングを無効にする必要はありません。[AWS インテグレーションページ][1]の構成は変更しないでください。Datadog は引き続き API ポーリングを使用して、カスタムタグやメタデータ、およびメトリクスストリーム経由では送信できないメトリクス (`aws.s3.bucket_size_bytes` や `aws.billing.estimated_charges` など) を収集するためです。

検出には通常最大 5 分かかりますが、アクティブなポーリングクローラーのタイミングによっては、重複期間が長くなる場合があります。数分経っても値が 2 倍のまま表示される場合は、「[CloudWatch メトリクスストリームガイド][6]」を参照してトラブルシューティングを行ってください。

### Core インテグレーション以外に追加の設定が必要な AWS サービスはどれですか。{#which-aws-services-require-additional-setup-beyond-the-core-integration}

一部の AWS サービスは、デフォルトでは CloudWatch にメトリクスを出力しないため、追加構成定が必要です。

| サービス| 必要な追加設定|
|---|---|
| Amazon RDS (OS レベルのメトリクス)| RDS コンソールで[拡張モニタリング][9]を有効にする|
| Amazon S3 (Storage Lens メトリクス)| S3 コンソールで [Storage Lens][10] を設定する|
| AWS 請求メトリクス| [メトリクスの収集タブ][1]で `Billing` を有効にし、`budgets:ViewBudget` 権限を追加して、AWS コンソールで[請求メトリクス][11]を有効にします。詳細な手順については、「[AWS 請求を監視する][13]」を参照してください。|
| カスタム CloudWatch 名前空間| [メトリクスの収集タブ][1]で **Custom Metrics の収集** を有効にする|
| EC2 詳細モニタリング| EC2 コンソールでインスタンスごとに[詳細モニタリング][12]を有効にする|

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/api/latest/aws-integration/#set-an-aws-tag-filter
[3]: /ja/integrations/amazon_billing/
[4]: /ja/integrations/guide/cloud-metric-delay/
[5]: /ja/help/
[6]: https://docs.datadoghq.com/ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[7]: /ja/metrics/introduction/#space-aggregation
[8]: /ja/integrations/#cat-aws
[9]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.Enabling.html
[10]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html
[11]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[12]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-cloudwatch-new.html
[13]: /ja/integrations/guide/monitor-your-aws-billing-details/
[14]: /ja/getting_started/integrations/aws/#filter-metrics-by-metric-name
[15]: /ja/integrations/guide/aws-metric-name-filters/