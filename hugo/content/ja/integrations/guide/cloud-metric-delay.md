---
aliases:
- /ja/integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
- /ja/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
- /ja/integrations/faq/cloud-metric-delay
description: API によって収集される AWS、Azure、Google Cloud、およびその他のクラウドインテグレーションメトリクスの予想される遅延について理解します。
further_reading:
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: よくあるご質問
  text: クラウドインスタンスに Datadog Agent をインストールするメリットは何ですか。
title: クラウドメトリクスの遅延
---
## 概要 {#overview}

Datadog のクラウドインテグレーション (AWS、Azure、Google Cloud など) を利用する場合、メトリクスは API によってクローラーで取り込まれます。クラウドプロバイダー API の制約により、メトリクスに遅延が発生する場合があります。

## 概要 {#summary}

| プロバイダー   | デフォルトのクローラー  |
|------------|------------------|
| Alibaba    | 10 分ごと |
| AWS        | 10 分ごと (3 分ごとに収集される [RDS メトリクス][3]を除く) |
| Azure      | 2 分ごと  |
| Cloudflare | 5 分ごと |
| GCP        | 5 分ごと  |

## クラウドプロバイダー {#cloud-providers}

特定のクラウドプロバイダーに関する仕様です。

### Alibaba {#alibaba}

Alibaba は 1 分単位でメトリクスを発行します。そのため、メトリクスの遅延は 7 〜 8 分程度になることが予想されます。

### AWS {#aws}

AWS は、2 つの粒度レベルのメトリクス (5 分および 1 分のメトリクス) を提供しています。CloudWatch から 5 分のメトリクスを受け取る場合、15 〜 20 分の遅延が発生する可能性があります。これは、CloudWatch が 5 〜 10 分のレイテンシーでデータを利用可能にし、さらに Datadog のデフォルトである 10 分 ([RDS メトリクス][3]の場合は 3 分) が加算されるためです。キューイングおよび CloudWatch API の制限により、さらに最大 5 分が加算される場合があります。CloudWatch で 1 分のメトリクスを受け取る場合、その可用性の遅延は約 2 分であるため、メトリクスを表示するまでの合計レイテンシーは 10 〜 12 分程度になる可能性があります。

さらに、CloudWatch API はデータを取得するためのメトリクスごとのクロールのみを提供しています。CloudWatch API にはレート制限があり、認証資格情報、リージョン、およびサービスの組み合わせに基づいて変動します。アカウントレベルに応じて、AWS で使用できるメトリクスは異なります。たとば、AWS 内で*詳細なメトリクス*に対して支払いを行うと、短時間で入手できるようになります。この詳細なメトリクスのサービスレベルは粒度にも適用され、一部のメトリクスでは 1 分ごと、それ以外は 5 分ごとに使用可能になります。

選択した [Datadog サイト][4] ({{< region-param key="dd_site_name" >}}) では、Amazon CloudWatch メトリクスストリームと Amazon Data Firehose をオプションで構成し、CloudWatch メトリクスを 2 ～ 3 分の遅延でより迅速に Datadog に取り込むことができます。このアプローチの詳細については、[メトリクスストリーミングに関するドキュメント][5]を参照してください。


### Azure {#azure}

Azure は 1 分単位でメトリクスを発行します。そのため、メトリクスの遅延は 4 ～ 5 分程度になることが予想されます。

### GCP {#gcp}

GCP は 1 分単位でメトリクスを発行します。そのため、メトリクスの遅延は 7 〜 8 分程度になることが予想されます。

## モニター {#monitors}

Datadog でモニターを作成する際、遅延メトリクスを選択すると警告メッセージが表示されます。Datadog では、これらのメトリクスに対して評価機関を延長し、モニターの評価を遅らせることを推奨しています。

<div class="alert alert-info">AWS ベースのメトリクスモニターの場合、{{< ui >}}Edit{{< /ui >}} は推奨される評価遅延 (多くの場合 900 秒) を表示できます。その値は AWS インテグレーションから取得されるものであり、{{< ui >}}Save{{< /ui >}} をクリックするまでは保存されません。保存された構成をチェックするには、モニターの {{< ui >}}Status{{< /ui >}} ページを開き、JSON をエクスポートして、 <code>evaluation_delay</code>を探します。フィールドが存在しない場合は、{{< ui >}}Edit{{< /ui >}} で遅延を設定し、モニターを保存してください。</div>

## メトリクスの高速化 {#faster-metrics}

システムレベルのメトリクスを実質的にゼロ遅延で取得するためには、可能な限り Datadog Agent をクラウドホストにインストールしてください。クラウドインスタンスに Agent をインストールするメリットの一覧は、[クラウドインスタンスに Datadog Agent をインストールするメリットは何ですか][1]のドキュメントを参照してください。

AWS、Azure、GCP インテグレーションの Datadog 側では、すべてのメトリクスに対するデフォルトのメトリクスクローラーを高速化できる場合があります。さらに、AWS の場合、Datadog はネームスペース固有のクローラーを用意しています。詳細については、[Datadog サポート][2]までお問い合わせください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /ja/help/
[3]: /ja/integrations/amazon-rds/#metrics
[4]: /ja/getting_started/site/
[5]: /ja/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/