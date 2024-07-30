---
aliases:
- /ja/integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
- /ja/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
- /ja/integrations/faq/cloud-metric-delay
further_reading:
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: よくあるご質問
  text: クラウドインスタンスに Datadog Agent をインストールした方がよいのはなぜですか
title: クラウドメトリクスの遅延
---

## 概要

Datadog のクラウドインテグレーション (AWS、Azure、Google Cloud など) を利用する場合、メトリクスは API によりクローラーで取り込まれます。クラウドプロバイダー API の制約により、メトリクスに遅延が発生する場合があります。

## Summary

| プロバイダー   | デフォルトのクローラー  |
|------------|------------------|
| Alibaba    | 10 分ごと |
| AWS        | 10 分ごと |
| Azure      | 2 分ごと  |
| Cloudflare | 15 分ごと |
| GCP        | 5 分ごと  |

## クラウドプロバイダー

特定のクラウドプロバイダーに関する仕様です。

### Alibaba

Alibaba は 1 分単位でメトリクスを発行しています。そのため、メトリクスの遅延は 7～8 分程度になることが予想されます。

### AWS

AWS はメトリクスに 2 つの粒度 (5 分と 1 分のメトリクス) を提供しています。CloudWatch から 5 分のメトリクスを受け取る場合、15〜20 分の遅延が発生することがあります。これは、CloudWatch が 5〜10分 のレイテンシーに Datadog のデフォルトである 10 分を加えてデータを利用できるようにするためです。キューイングと CloudWatch API の制限により、さらに 5 分かかることがあります。CloudWatch で 1 分のメトリクスを受信する場合、その可用性の遅延は約 2 分で、メトリクスを見るための合計レイテンシーは 10～12 分程度になる可能性があります。

さらに、CloudWatch API で提供されるのは、データを取得するためのメトリクス別のクロールだけです。CloudWatch API にはレート制限があり、認証証明書、リージョン、サービスの組み合わせに基づいて変化します。アカウント レベルにより、AWS で使用できるメトリクスは異なります。たとえば、AWS 上で*詳細なメトリクス*に対して支払いを行うと、短時間で入手できるようになります。この詳細なメトリクスのサービスのレベルは粒度にも適用され、一部のメトリクスは 1 分ごと、それ以外は 5 分ごとに使用可能になります。

{{% site-region region="us,us5,eu,ap1" %}}
選択した [Datadog サイト][1] ({{< region-param key="dd_site_name" >}}) で、オプションで Amazon CloudWatch Metric Streams と Amazon Kinesis Data Firehose を構成することで、CloudWatch メトリクスを 2〜3 分の遅延でより高速に Datadog に取り込むことができます。このアプローチの詳細については、[メトリクスストリーミングに関するドキュメント][2]を参照してください。

[1]: /ja/getting_started/site/
[2]: /ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
{{% /site-region %}}

### Azure

Azure は 1 分単位でメトリクスを発行しています。そのため、メトリクスの遅延は 4～5 分程度になることが予想されます。

### GCP

GCP は 1 分単位でメトリクスを発行しています。そのため、メトリクスの遅延は 7～8 分程度になることが予想されます。

## モニター

Datadog でモニターを作成する際に遅延メトリクスを選択すると警告メッセージが表示されます。Datadog は、これらのメトリクスについてタイムフレームを延長し、モニターの評価を遅らせることを推奨しています。

## メトリクスの高速化

システムレベルのメトリクスを実質的にゼロ遅延で取得するためには、可能な限り Datadog Agent をクラウドホストにインストールします。クラウドインスタンスに Agent をインストールするメリットの一覧は、ドキュメント[クラウドインスタンスに Datadog Agent をインストールするメリットは何ですか？][1]を参照してください。

AWS、Azure、および GCP のインテグレーションにおいて、Datadog 側ではすべてのメトリクスのデフォルトのメトリクスクローラーを高速化できる可能性があります。さらに、AWS の場合、Datadog はネームスペースに特化したクローラーを持っています。詳しくは [Datadog サポート][2]にお問い合わせください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /ja/help/