---
aliases:
- /ja/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
kind: documentation
title: AWS インテグレーションの請求
---

## 概要

Datadog では、Datadog Agent を実行している AWS ホスト、および Datadog-AWS インテグレーションによって使用されるすべての EC2 インスタンスに対して課金が発生します。AWS インテグレーションによって使用される EC2 インスタンスで Agent を実行している場合に、**二重に課金されることはありません**。

**重要**: Datadog は EC2 インスタンスのメタデータを使用して、Agent を実行しているホストと AWS インテグレーションによってクロールされているホストの両方に対して二重請求が行われないようにします。EC2 インスタンスが [Instance Metadata Service Version 2 (IMDSv2)][1] の使用を必要とするように構成されている場合、二重請求を避けるために、[Agent 構成][2]でパラメーター `ec2_prefer_imdsv2` を `true` に設定しなければなりません。

Fargate と Lambda のインテグレーションタイル、およびカスタムメトリクスを設定すると、Datadog の請求に影響します。

ELB、RDS、DynamoDB などの他の AWS リソースは、インフラストラクチャーの月額請求に含まれず、構成除外も適用されません。

## AWS リソースの除外

一部のサービスに対して収集する AWS メトリクスを、特定のリソースに限定することができます。[Datadog-AWS インテグレーションページ][3]で、AWS アカウントを選択し、**Metric Collection** タブをクリックします。次に、**Limit Metric Collection to Specific Resources** で、EC2、Lambda、ELB、Application ELB、Network ELB、RDS、SQS、CloudWatch カスタムメトリクスのうち 1 つまたは複数に対するメトリクスを除外することが可能です。

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="Datadog AWS インテグレーションページ内の AWS アカウントのメトリクス収集タブ。AWS サービスを選択するドロップダウンメニューと key:value 形式でタグを追加するフィールドで、特定のリソースにメトリクス収集を制限するオプションが表示されている" >}}

また、[API][4] を利用して AWS のメトリクスを制限することも可能です。

**注**: Datadog の請求対象となるのは、EC2 (ホスト)、Lambda (アクティブ関数)、CloudWatch Custom Metrics (カスタムメトリクス) のみです。フィルターできる他のサービスのためにインテグレーションされたメトリクスは、Datadog の課金対象にはなりません。

**注**: EC2 メトリクスリソースの除外設定は、EC2 とそれに接続された EBS ボリュームの両方に適用されます。

インテグレーションページで既存の AWS アカウントに制限を追加した場合は、それまでに検出されたインスタンスが[インフラストラクチャーリスト][5]に最長 2 時間残る可能性があります。移行時間中、EC2 インスタンスのステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が稼働しているホストはまだ表示され、請求に含まれます。limit オプションを使用して、AWS からの `aws.ec2.*` メトリクス収集を制限し、AWS リソース EC2 インスタンスホストを制限します。

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][6]にお問い合わせください。

請求に関するご質問は、[カスタマーサクセス][7]マネージャーにお問い合わせください。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: /ja/api/latest/aws-integration/#set-an-aws-tag-filter
[5]: /ja/infrastructure/
[6]: /ja/help/
[7]: mailto:success@datadoghq.com