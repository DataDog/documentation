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

他の AWS リソース (ELB、RDS、Dynamo など) は毎月の請求に含まれません。また、構成の除外は適用されません。
その他のリソースをフィルターにかけるには、[API][8] を使用します。

## AWS リソースの除外

メトリクスの収集を制御するには、[Datadog-AWS インテグレーションタイル][3]を使用します。**Configuration** タブに移動し、アカウントを選択するか、新しいアカウントを追加します。各アカウントは、**Optionally limit resource collection** の設定に基づいて制御されます。[ホストタグ][4]、Lambda タグ、またはネームスペースに基づいてメトリクスを制限します。

{{< img src="account_management/billing/aws02.png" alt="AWS" >}}

**注**: ELB メトリクスはフィルターで除外できないため、ELB メトリクスは課金されません。

**注**: ホストリソースの除外設定は、EC2 とそれに接続された EBS ボリュームの両方に適用されます。

インテグレーションタイルで既存の AWS アカウントに制限を追加した場合は、それまでに検出されたインスタンスが[インフラストラクチャーリスト][5]に最長 2 時間残る可能性があります。移行時間中、EC2 インスタンスのステータスは `???` と表示されます。これは、課金対象に含まれません。

Agent が実行されているホストは引き続き表示され、課金対象に含まれます。制限オプションの使用は、Agent が実行されていない EC2 インスタンスにのみ適用されます。

## トラブルシューティング

技術的な質問については、[Datadog のサポートチーム][6]にお問い合わせください。

請求に関するご質問は、[カスタマーサクセス][7]マネージャーにお問い合わせください。

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: /ja/getting_started/tagging/using_tags/#integrations
[5]: /ja/infrastructure/
[6]: /ja/help/
[7]: mailto:success@datadoghq.com
[8]: https://docs.datadoghq.com/ja/api/latest/aws-integration/#set-an-aws-tag-filter