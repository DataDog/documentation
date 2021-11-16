---
title: AWS インテグレーションの請求
kind: documentation
aliases:
  - /ja/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
---
## 概要

Datadog では、Datadog Agent を実行している AWS ホスト、および Datadog-AWS インテグレーションによって使用されるすべての EC2 インスタンスに対して課金が発生します。AWS インテグレーションによって使用される EC2 インスタンスで Agent を実行している場合に、**二重に課金されることはありません**。

Fargate と Lambda のインテグレーションタイル、およびカスタムメトリクスを設定すると、Datadog の請求に影響します。

他の AWS リソース (ELB、RDS、Dynamo など) は毎月の請求に含まれません。また、構成の除外は適用されません。

## AWS リソースの除外

メトリクスの収集を制御するには、[Datadog-AWS インテグレーションタイル][1]を使用します。**Configuration** タブに移動し、アカウントを選択するか、新しいアカウントを追加します。各アカウントは、**Optionally limit resource collection** の設定に基づいて制御されます。[ホストタグ][2]、Lambda タグ、またはネームスペースに基づいてメトリクスを制限します。

{{< img src="account_management/billing/aws02.png" alt="AWS" >}}

**注**: ELB メトリクスはフィルターで除外できないため、ELB メトリクスは課金されません。

**注**: ホストリソースの除外設定は、EC2 とそれに接続された EBS ボリュームの両方に適用されます。

インテグレーションタイルで既存の AWS アカウントに制限を追加した場合は、それまでに検出されたインスタンスが[インフラストラクチャーリスト][3]に最長 2 時間残る可能性があります。移行時間中、EC2 インスタンスのステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が実行されているホストは引き続き表示され、課金対象に含まれます。制限オプションの使用は、Agent が実行されていない EC2 インスタンスにのみ適用されます。

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][4]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][5]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: /ja/getting_started/tagging/using_tags/#integrations
[3]: /ja/infrastructure/
[4]: /ja/help/
[5]: mailto:success@datadoghq.com