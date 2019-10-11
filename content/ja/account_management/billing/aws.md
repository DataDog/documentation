---
title: AWS インテグレーションの課金
kind: faq
aliases:
  - /ja/integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
---
## 概要

Datadog では、Datadog Agent を実行している AWS ホスト、および Datadog-AWS インテグレーションによって使用されるすべての EC2 インスタンスに対して課金が発生します。AWS インテグレーションによって使用される EC2 インスタンスで Agent を実行している場合に、**二重に課金されることはありません**。

他の AWS リソース (ELB、EBS、RDS、Dynamo など) は毎月の請求に含まれません。また、構成の除外は適用されません。

### メトリクスの除外

メトリクスの収集を制御するには、[Datadog-AWS インテグレーションタイル][1]を使用します。**Configuration** タブに移動し、アカウントを選択するか、新しいアカウントを追加します。各アカウントは、**Optionally limit metrics collection** の設定に基づいて制御されます。[ホストタグ][2]またはネームスペースに基づいてメトリクスを制限します。

{{< img src="account_management/billing/aws01.png" alt="AWS" responsive="true">}}

**注**: ELB メトリクスはフィルターで除外できないため、ELB メトリクスは課金されません。

インテグレーションタイルで既存の AWS アカウントに制限を追加した場合は、それまでに検出されたインスタンスが[インフラストラクチャーリスト][3]に最長 24 時間残る可能性があります。移行時間中、EC2 インスタンスのステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が実行されているホストは引き続き表示され、課金対象に含まれます。制限オプションの使用は、Agent が実行されていない EC2 インスタンスにのみ適用されます。

## トラブルシューティング
技術的な質問については、[Datadog のサポートチーム][4]にお問い合わせください。

課金に関するご質問は、[カスタマーサクセス][5]マネージャーにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: /ja/tagging/using_tags/#integrations
[3]: /ja/graphing/infrastructure
[4]: /ja/help
[5]: mailto:success@datadoghq.com